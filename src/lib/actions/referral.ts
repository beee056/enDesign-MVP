"use server";

import { db } from "@/db";
import { referrals, referralCredits, creditTransfers, users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * 成約時（購入完了時）に紹介ステータスを更新し、クレジットを付与する
 */
export async function processReferralReward(referralId: string, orderId: string, orderAmount: number) {
  const referralRecord = await db.query.referrals.findFirst({
    where: eq(referrals.id, referralId),
  });

  if (!referralRecord || referralRecord.status !== "invited") {
    throw new Error("Invalid or already processed referral");
  }

  // クレジット額の計算ルール（MVP仕様）
  let creditAmount = 0;
  if (orderAmount >= 120000) creditAmount = 10000;
  else if (orderAmount >= 80000) creditAmount = 8000;
  else if (orderAmount >= 50000) creditAmount = 5000;
  else if (orderAmount >= 30000) creditAmount = 3000;
  else if (orderAmount >= 5000) creditAmount = 500;

  // 10,000円を上限とする
  if (creditAmount > 10000) creditAmount = 10000;

  if (creditAmount > 0) {
    // ステータスを更新
    await db.update(referrals)
      .set({
        status: "credited",
        referredOrderId: orderId,
        creditedAt: new Date(),
      })
      .where(eq(referrals.id, referralId));

    // クレジットの付与
    await db.insert(referralCredits).values({
      ownerTenantId: referralRecord.referrerTenantId!,
      ownerUserId: referralRecord.referrerUserId!,
      amount: creditAmount,
      remainingAmount: creditAmount,
      sourceReferralId: referralId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1年後
    });
  }

  return { success: true, creditAmount };
}

/**
 * クレジットを他人に譲渡する
 */
export async function transferCredit(fromUserId: string, toEmail: string, amount: number, message: string) {
  // 実際には fromUser の残高チェックとトランザクション処理が必要
  // MVPとしては、transferレコードを作成し、管理者が承認・手動調整する運用とする
  const [transfer] = await db.insert(creditTransfers).values({
    fromUserId,
    toEmail,
    amount,
    message,
    status: "pending",
  }).returning({ id: creditTransfers.id });

  return { success: true, transferId: transfer.id };
}
