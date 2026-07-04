import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { db } from "@/db";
import { diagnoses, businesses, tenants } from "@/db/schema";
import { sql, desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // 統計データの簡易取得
  const stats = await db.select({
    totalDiagnoses: sql<number>`count(${diagnoses.id})`,
    totalBusinesses: sql<number>`count(${businesses.id})`,
    totalTenants: sql<number>`count(${tenants.id})`,
  }).from(diagnoses)
    .leftJoin(businesses, sql`${diagnoses.businessId} = ${businesses.id}`)
    .leftJoin(tenants, sql`${diagnoses.tenantId} = ${tenants.id}`);

  const data = stats[0] || { totalDiagnoses: 0, totalBusinesses: 0, totalTenants: 0 };

  // 直近の診断結果を取得 (最新5件)
  const recentDiagnoses = await db.select({
    id: diagnoses.id,
    score: diagnoses.scoreTotal,
    createdAt: diagnoses.createdAt,
    businessName: businesses.name,
    industry: businesses.industry,
    region: businesses.region,
  }).from(diagnoses)
    .leftJoin(businesses, sql`${diagnoses.businessId} = ${businesses.id}`)
    .orderBy(desc(diagnoses.createdAt))
    .limit(5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">ダッシュボード</h1>
        <p className="text-slate-500 mt-2">enDesign全体の利用状況と直近のアクティビティを確認できます。</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">登録事業者数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{data.totalBusinesses}</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">実施された診断数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{data.totalDiagnoses}</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">総テナント数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{data.totalTenants}</div>
          </CardContent>
        </Card>
      </div>

      {/* 直近の診断結果テーブル */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>直近の無料Web診断</CardTitle>
          <CardDescription>最近実施されたWeb診断の結果一覧です。</CardDescription>
        </CardHeader>
        <CardContent>
          {recentDiagnoses.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              まだ診断履歴がありません。
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b border-slate-200 transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">日付</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">事業者名</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">業種 / 地域</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">スコア</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-slate-500">アクション</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {recentDiagnoses.map((d) => (
                    <tr key={d.id} className="border-b border-slate-200 transition-colors hover:bg-slate-50/50">
                      <td className="p-4 align-middle text-slate-600">
                        {d.createdAt ? new Date(d.createdAt).toLocaleDateString('ja-JP') : '-'}
                      </td>
                      <td className="p-4 align-middle font-medium text-slate-900">
                        {d.businessName || '不明'}
                      </td>
                      <td className="p-4 align-middle text-slate-600">
                        {d.industry || '-'} <br className="md:hidden" />
                        <span className="text-xs text-slate-400">{d.region || '-'}</span>
                      </td>
                      <td className="p-4 align-middle">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                          {d.score}点
                        </span>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <Link href={`/check/result/${d.id}`} target="_blank">
                          <Button variant="ghost" size="sm" className="h-8 text-slate-500 hover:text-slate-900">
                            詳細を見る <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
