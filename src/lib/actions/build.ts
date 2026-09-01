"use server";

import { db } from "@/db";
import { sites, pages, blocks, tenants, businesses } from "@/db/schema";
import { buildSchema, type BuildInput } from "@/lib/validations/build";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function submitBuild(data: BuildInput) {
  const parsed = buildSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid form data");
  }
  const input = parsed.data;

  // 1. Determine block limit based on plan
  const blockLimit = 12;

  // 2. Generate site structure via AI
  const promptText = `
  以下の事業者の要望に基づき、Webサイト（ランディングページ）の構成とコピーを生成してください。
  プラン: ${input.planId} (最大ブロック数: ${blockLimit})
  ページの目的: ${input.pagePurpose}
  ターゲット: ${input.targetAudience}
  事業の強み: ${input.businessStrength}
  サービス内容: ${input.services}
  料金: ${input.pricing}
  よくある質問: ${input.faq}
  トーン: ${input.designTone}

  出力は配列で、各ブロックの情報をJSONで返してください。
  ブロックの種類 (blockType) は以下から適切なものを選んでください:
  Hero, Problem, ServiceMenu, Value, Staff, Story, Gallery, Voice, FAQ, Access, CTA
  `;

  const { object: aiResult } = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      siteTitle: z.string().describe("Webサイトのタイトル候補"),
      themePreset: z.string().describe("warm_local, clean_trust, natural_craft 等から選択"),
      blocks: z.array(z.object({
        blockType: z.string(),
        sortOrder: z.number(),
        content: z.record(z.string(), z.any()).describe("ブロック固有のテキストデータ（見出し、本文など）"),
      })).max(blockLimit)
    }),
    prompt: promptText,
  });

  // 3. Save to DB
  // For MVP guest flow, we assume a newly created tenant or link to existing.
  // Here we just create a dummy tenant to hold the generated site.
  const [newTenant] = await db.insert(tenants).values({
    name: "Tenant for " + aiResult.siteTitle,
    slug: "site-" + Date.now() + Math.floor(Math.random() * 1000),
    ownerUserId: "guest",
    plan: input.planId,
  }).returning({ id: tenants.id, slug: tenants.slug });

  const [newBusiness] = await db.insert(businesses).values({
    tenantId: newTenant.id,
    name: aiResult.siteTitle,
    email: "dummy@example.com",
    industry: "その他",
  }).returning({ id: businesses.id });

  const [newSite] = await db.insert(sites).values({
    tenantId: newTenant.id,
    businessId: newBusiness.id,
    title: aiResult.siteTitle,
    slug: newTenant.slug,
    themePreset: aiResult.themePreset,
  }).returning({ id: sites.id, slug: sites.slug });

  const [newPage] = await db.insert(pages).values({
    tenantId: newTenant.id,
    siteId: newSite.id,
    title: "Home",
    slug: "home",
    pageType: "lp",
  }).returning({ id: pages.id });

  const blocksToInsert = aiResult.blocks.map((b) => ({
    tenantId: newTenant.id,
    pageId: newPage.id,
    blockType: b.blockType,
    sortOrder: b.sortOrder,
    contentJson: b.content,
  }));

  await db.insert(blocks).values(blocksToInsert);

  return { success: true, siteId: newSite.id, siteSlug: newSite.slug };
}
