import * as z from "zod";

export const diagnosisSchema = z.object({
  businessName: z.string().min(1, "事業者名を入力してください"),
  contactName: z.string().min(1, "担当者名を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z.string().optional(),
  industry: z.string().min(1, "業種を入力してください"),
  region: z.string().min(1, "地域を入力してください"),
  hasPhysicalStore: z.boolean().default(false),
  address: z.string().optional(),
  
  // URL情報
  websiteUrl: z.string().optional(),
  googleMapsUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  lineUrl: z.string().optional(),
  otherSnsUrl: z.string().optional(),

  // アンケート・悩み
  purposes: z.array(z.string()).min(1, "少なくとも1つの目的を選択してください"),
  pains: z.array(z.string()).min(1, "少なくとも1つの悩みを選択してください"),
  
  // 新規追加: セカンドオピニオン・制作姿勢・素材・イラスト
  currentVendorStatus: z.string().optional(),
  buildPreferences: z.array(z.string()).default([]),
  budget: z.string().optional(),
  designTones: z.array(z.string()).default([]),
  wantsIllustration: z.boolean().default(false),
  illustrationDetails: z.string().optional(),
  materialsAvailable: z.array(z.string()).default([]),
  referralCode: z.string().optional(),
});

export type DiagnosisInput = z.infer<typeof diagnosisSchema>;
