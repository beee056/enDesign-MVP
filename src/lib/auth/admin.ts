import { currentUser } from "@clerk/nextjs/server";

/**
 * 管理画面(/admin)へのアクセス可否を判定する。
 *
 * 判定方法: 環境変数 `ADMIN_EMAILS`(カンマ区切り)に登録されたメールアドレスと、
 * ログイン中の Clerk ユーザーのメールアドレスを照合する。
 *
 * fail-closed: `ADMIN_EMAILS` が未設定/空の場合は誰も管理者と見なさない(安全側)。
 * そのため本番(Vercel)とローカル(.env)の双方に `ADMIN_EMAILS` を設定すること。
 * 例: ADMIN_EMAILS="owner@example.com,staff@example.com"
 */
export async function isAdminUser(): Promise<boolean> {
  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (allowlist.length === 0) return false;

  const user = await currentUser();
  if (!user) return false;

  const userEmails = user.emailAddresses.map((e) =>
    e.emailAddress.toLowerCase()
  );

  return userEmails.some((email) => allowlist.includes(email));
}
