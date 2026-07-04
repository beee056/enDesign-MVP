"use server";

import { db } from "@/db";
import { businesses, diagnoses } from "@/db/schema";
import { diagnosisSchema, type DiagnosisInput } from "@/lib/validations/diagnosis";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function submitDiagnosis(data: DiagnosisInput) {
  // Validate input
  const parsed = diagnosisSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid form data");
  }

  const input = parsed.data;

  // 1. Rule-based scoring
  let scoreBasicInfo = 10;
  let scoreWebsite = input.websiteUrl ? 20 : 0;
  let scoreGoogleMaps = input.googleMapsUrl ? 20 : 0;
  let scoreSns = (input.instagramUrl || input.lineUrl || input.otherSnsUrl) ? 20 : 0;
  
  // Example logic for trust/mobile/vendorRisk
  let scoreTrust = 10;
  let scoreFaq = 10;
  let scoreRecruit = 0;
  let scoreVendorRisk = input.pains.includes("月額サービスの中身が不透明") ? -10 : 10;

  const scoreTotal = scoreBasicInfo + scoreWebsite + scoreGoogleMaps + scoreSns + scoreTrust + scoreFaq + scoreRecruit + scoreVendorRisk;

  // 2. AI Comment Generation
  const promptText = `
  以下の地域の小規模事業者からWeb診断の依頼がありました。
  業種: ${input.industry}
  目的: ${input.purposes.join(", ")}
  悩み: ${input.pains.join(", ")}
  スコア: ${scoreTotal}/100

  これに基づき、以下の項目について「やさしく」「専門用語を避けて」「寄り添うような」トーンでコメントを作成してください。
  NG表現：「危険です」「必ず集客できます」「放置すると終わりです」などの煽り文句は禁止。
  `;

  const { object: aiResult } = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      goodPoints: z.string().describe("今の良いところ（褒めるポイント）"),
      missedOpportunities: z.string().describe("もったいないポイント"),
      diyFixes: z.string().describe("今すぐ自分で直せること（お金をかけなくていいこと）"),
      recommendedPlan: z.string().describe("おすすめプランとその理由"),
      overallSummary: z.string().describe("やさしい総評"),
    }),
    prompt: promptText,
  });

  // 3. Save to DB
  // In a real app with auth, we'd wrap this in a transaction and link to a tenant if logged in.
  // For MVP / public check, we create an orphan business/diagnosis temporarily or link to a guest session.
  
  // 3-0. Create Guest Tenant
  const [newTenant] = await db.insert(tenants).values({
    name: "Guest - " + input.businessName,
    slug: "guest-" + Date.now() + Math.floor(Math.random() * 1000),
    ownerUserId: "guest",
    plan: "free_check",
  }).returning({ id: tenants.id });

  // 3-1. Create Business Record (Guest)
  const [newBusiness] = await db.insert(businesses).values({
    tenantId: newTenant.id,
    name: input.businessName,
    ownerName: input.contactName,
    email: input.email,
    phone: input.phone,
    industry: input.industry,
    region: input.region,
    hasPhysicalStore: input.hasPhysicalStore,
    websiteUrl: input.websiteUrl,
    googleMapsUrl: input.googleMapsUrl,
    instagramUrl: input.instagramUrl,
    lineUrl: input.lineUrl,
    otherSnsUrl: input.otherSnsUrl,
  }).returning({ id: businesses.id });

  // 3-2. Create Diagnosis Record
  const [newDiagnosis] = await db.insert(diagnoses).values({
    tenantId: newTenant.id,
    businessId: newBusiness.id,
    purpose: input.purposes.join(","),
    pains: input.pains.join(","),
    buildPreference: input.buildPreferences.join(","),
    scoreTotal,
    scoreBasicInfo,
    scoreGoogleMaps,
    scoreWebsite,
    scoreMobile: 10,
    scoreSns,
    scoreTrust,
    scoreFaq,
    scoreRecruit,
    scoreVendorRisk,
    freeSummary: aiResult.overallSummary,
    recommendations: JSON.stringify(aiResult),
    status: "completed",
  }).returning({ id: diagnoses.id });

  return { success: true, diagnosisId: newDiagnosis.id };
}
