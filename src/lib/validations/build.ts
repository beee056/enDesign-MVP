import * as z from "zod";

export const buildSchema = z.object({
  planId: z.string().min(1, "プランを選択してください"),
  pagePurpose: z.string().min(1, "ページの目的を入力してください"),
  targetAudience: z.string().min(1, "誰に届けたいかを入力してください"),
  businessStrength: z.string().min(1, "事業の強みを入力してください"),
  services: z.string().min(1, "メニュー/サービスを入力してください"),
  pricing: z.string().min(1, "料金を入力してください"),
  faq: z.string().min(1, "よくある質問を入力してください"),
  accessInfo: z.string().min(1, "アクセス情報を入力してください"),
  contactMethod: z.string().min(1, "予約/問い合わせ方法を入力してください"),
  designTone: z.string().min(1, "好きな雰囲気を入力してください"),
  referenceUrl: z.string().optional(),
  wantsIllustration: z.boolean(),
  // photos: z.any().optional(), // For MVP, we skip complex file upload validation in Zod
});

export type BuildInput = z.infer<typeof buildSchema>;
