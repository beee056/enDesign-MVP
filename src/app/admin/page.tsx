import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { diagnoses, businesses, tenants } from "@/db/schema";
import { sql } from "drizzle-orm";

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
        <p className="text-muted-foreground">enDesignの全体状況を確認できます。</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総テナント数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalTenants}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">登録事業者数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalBusinesses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">実施された診断数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalDiagnoses}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
