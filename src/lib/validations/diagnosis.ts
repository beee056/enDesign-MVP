import * as z from "zod";

export const diagnosisSchema = z.object({
  businessName: z.string().min(1, "事業者名を入力してください"),
  contactName: z.string().min(1, "担当者名を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  phone: z.string().optional(),
  industry: z.string().min(1, "業種を選択・入力してください"),
  region: z.string().min(1, "地域を選択・入力してください"),
  hasPhysicalStore: z.boolean(),
  address: z.string().optional(),
  websiteUrl: z.string().url("正しいURL形式で入力してください").optional().or(z.literal("")),
  googleMapsUrl: z.string().url("正しいURL形式で入力してください").optional().or(z.literal("")),
  instagramUrl: z.string().url("正しいURL形式で入力してください").optional().or(z.literal("")),
  lineUrl: z.string().url("正しいURL形式で入力してください").optional().or(z.literal("")),
  otherSnsUrl: z.string().url("正しいURL形式で入力してください").optional().or(z.literal("")),
  
  purposes: z.array(z.string()).min(1, "目的を1つ以上選択してください"),
  pains: z.array(z.string()).min(1, "悩みを1つ以上選択してください"),
  buildPreferences: z.array(z.string()).min(1, "制作希望を選択してください"),
  designTones: z.array(z.string()).min(1, "希望のトーンを選択してください"),
});

export type DiagnosisInput = z.infer<typeof diagnosisSchema>;
