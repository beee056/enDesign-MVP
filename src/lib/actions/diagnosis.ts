"use server";

import { db } from "@/db";
import { businesses, diagnoses, aiOutputs, tenants } from "@/db/schema";
import { diagnosisSchema, type DiagnosisInput } from "@/lib/validations/diagnosis";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

// 無料診断はログイン不要のため、ゲスト用の固定テナントに紐づける。
const GUEST_TENANT_ID = "00000000-0000-0000-0000-000000000000";

export async function submitDiagnosis(data: DiagnosisInput) {
  try {
    // Validate input
    const parsed = diagnosisSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error("Invalid form data");
    }

    // 0. ゲストテナントを冪等に用意(存在しなければ作成)。
    //    businesses.tenant_id は tenants への外部キー(NOT NULL)のため、
    //    これが無いと business の INSERT が外部キー違反で失敗する。
    await db
      .insert(tenants)
      .values({
        id: GUEST_TENANT_ID,
        name: "ゲスト診断",
        slug: "guest",
        ownerUserId: "system",
      })
      .onConflictDoNothing();

    // 1. ビジネス情報の保存
    const [business] = await db.insert(businesses).values({
      tenantId: GUEST_TENANT_ID, // ゲスト診断用の固定テナント
      name: data.businessName,
      ownerName: data.contactName,
      email: data.email,
      phone: data.phone,
      industry: data.industry,
      region: data.region,
      address: data.address,
      hasPhysicalStore: data.hasPhysicalStore,
      websiteUrl: data.websiteUrl,
      googleMapsUrl: data.googleMapsUrl,
      instagramUrl: data.instagramUrl,
      lineUrl: data.lineUrl,
      otherSnsUrl: data.otherSnsUrl,
    }).returning();

    // 2. AIによる診断と推奨事項の生成 (GPT-4o)
    const prompt = `
あなたは地域小規模事業者向けの親身なWebコンサルタントです。
以下の事業者情報とアンケート結果に基づき、Webサイトやオンライン集客の診断結果を生成してください。
enDesignの思想は「自分でできることは無料で、一人では不安なところだけ低価格(5万円〜)で一緒に整える」です。

【事業者情報】
- 業種: ${data.industry}
- 地域: ${data.region}
- 実店舗の有無: ${data.hasPhysicalStore ? "あり" : "なし"}
- 現在のWebサイト: ${data.websiteUrl || "なし"}
- Googleマップ: ${data.googleMapsUrl || "なし"}
- SNS(Instagram等): ${data.instagramUrl || "なし"}

【課題・要望】
- 目的: ${data.purposes.join(", ")}
- 悩み: ${data.pains.join(", ")}
- 現在の業者: ${data.currentVendorStatus || "特になし"}
- 制作姿勢: ${data.buildPreferences.join(", ")}
- 予算感: ${data.budget || "未定"}
- イラスト希望: ${data.wantsIllustration ? "あり (" + (data.illustrationDetails || "") + ")" : "なし"}

以下の形式のJSONで結果を返してください。
- scoreTotal: 総合スコア (0-100)
- scoreBasicInfo: 基本情報スコア (0-100)
- scoreGoogleMaps: Googleマップスコア (0-100)
- scoreWebsite: サイトスコア (0-100)
- scoreSns: SNSスコア (0-100)
- goodPoints: 良いところ（3つ）
- improvementPoints: もったいないところ（3つ）
- selfHelpActions: お金をかけずに自分で直せる行動リスト（3つ）
- freeAdvice: お金をかけなくていいことへのアドバイス（3つ）
- recommendedPlan: おすすめのプラン（Free Check / Lite相談(5000円) / Standard Build(5万円) / Plus Build(8万円) / Max Build(12万円)）
- summary: 親身な総評メッセージ
    `;

    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        scoreTotal: z.number().min(0).max(100),
        scoreBasicInfo: z.number().min(0).max(100),
        scoreGoogleMaps: z.number().min(0).max(100),
        scoreWebsite: z.number().min(0).max(100),
        scoreSns: z.number().min(0).max(100),
        goodPoints: z.array(z.string()).length(3),
        improvementPoints: z.array(z.string()).length(3),
        selfHelpActions: z.array(z.string()).length(3),
        freeAdvice: z.array(z.string()).length(3),
        recommendedPlan: z.string(),
        summary: z.string(),
      }),
      prompt,
    });

    const aiData = result.object;

    const recommendationsJson = JSON.stringify({
      goodPoints: aiData.goodPoints,
      improvementPoints: aiData.improvementPoints,
      selfHelpActions: aiData.selfHelpActions,
      freeAdvice: aiData.freeAdvice,
      recommendedPlan: aiData.recommendedPlan,
      summary: aiData.summary,
    });

    // 3. 診断結果の保存
    const [diagnosis] = await db.insert(diagnoses).values({
      businessId: business.id,
      purpose: data.purposes.join(","),
      pains: data.pains.join(","),
      buildPreference: data.buildPreferences.join(","),
      scoreTotal: aiData.scoreTotal,
      scoreBasicInfo: aiData.scoreBasicInfo,
      scoreGoogleMaps: aiData.scoreGoogleMaps,
      scoreWebsite: aiData.scoreWebsite,
      scoreSns: aiData.scoreSns,
      freeSummary: aiData.summary,
      recommendations: recommendationsJson,
      status: "completed",
    }).returning();

    // 4. AI出力のログ保存
    await db.insert(aiOutputs).values({
      relatedType: 'diagnosis',
      relatedId: diagnosis.id,
      outputType: 'diagnosis_result',
      promptVersion: 'v2',
      inputJson: data as any,
      outputJson: aiData as any,
    });

    return { success: true, diagnosisId: diagnosis.id };
  } catch (error) {
    console.error("Diagnosis submission error:", error);
    return { success: false, error: "診断の送信に失敗しました" };
  }
}
