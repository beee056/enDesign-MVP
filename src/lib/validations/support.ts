import * as z from "zod";

export const supportSchema = z.object({
  tenantId: z.string().optional(), // ログインしていない場合はダミーで対応
  businessName: z.string().min(1, "事業者名を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  category: z.string().min(1, "カテゴリを選択してください"),
  subject: z.string().min(1, "件名を入力してください"),
  body: z.string().min(10, "お問い合わせ内容は10文字以上で入力してください"),
});

export type SupportInput = z.infer<typeof supportSchema>;
