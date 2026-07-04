"use server";

import { db } from "@/db";
import { supportThreads, supportMessages, faqEntries, tenants } from "@/db/schema";
import { supportSchema, type SupportInput } from "@/lib/validations/support";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function submitSupport(data: SupportInput) {
  const parsed = supportSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid form data");
  }
  const input = parsed.data;

  // 1. Resolve Tenant (MVP fallback)
  let tenantId = input.tenantId;
  if (!tenantId) {
    // DBからダミー取得するか、新規作成するか（今回はGuest固定UUID等にせず新規作成する）
    const [newTenant] = await db.insert(tenants).values({
      name: "Support - " + input.businessName,
      slug: "support-" + Date.now(),
      ownerUserId: "guest",
    }).returning({ id: tenants.id });
    tenantId = newTenant.id;
  }

  // 2. Create Support Thread & Message
  const [thread] = await db.insert(supportThreads).values({
    tenantId: tenantId,
    category: input.category,
    subject: input.subject,
    status: "open",
  }).returning({ id: supportThreads.id });

  await db.insert(supportMessages).values({
    threadId: thread.id,
    senderType: "customer",
    body: input.body,
  });

  // 3. AI FAQ Extraction
  // 問い合わせ内容を解析し、FAQにできそうな一般的な質問であればドラフトを作成する
  try {
    const promptText = `
    以下の顧客からのお問い合わせ内容を分析し、これが「他の顧客にも役立つ一般的なFAQ」になり得るか判定してください。
    もしFAQになり得る場合、質問文を一般化し、想定される回答案（やさしいトーン）を生成してください。
    特定のアカウント情報や個人情報（${input.businessName}, ${input.email}など）は絶対に含めないでください。

    カテゴリ: ${input.category}
    件名: ${input.subject}
    内容: ${input.body}
    `;

    const { object: aiResult } = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        isFaqCandidate: z.boolean().describe("一般的なFAQとして登録する価値があるか"),
        generalizedQuestion: z.string().describe("一般化した質問文"),
        suggestedAnswer: z.string().describe("想定される回答案（やさしいトーン）"),
        category: z.string().describe("適したカテゴリ"),
      }),
      prompt: promptText,
    });

    if (aiResult.isFaqCandidate) {
      // 4. Save as Draft FAQ
      await db.insert(faqEntries).values({
        category: aiResult.category || input.category,
        question: aiResult.generalizedQuestion,
        answer: aiResult.suggestedAnswer,
        sourceThreadId: thread.id,
        status: "draft",
        visibility: "private",
      });
    }
  } catch (error) {
    console.error("AI FAQ extraction failed:", error);
    // AIの失敗でユーザーの問い合わせ体験を阻害しないためエラーは飲み込む
  }

  return { success: true };
}
