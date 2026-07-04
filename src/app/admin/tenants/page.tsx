import { db } from "@/db";
import { tenants, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminTenantsPage() {
  const records = await db.select({
    id: tenants.id,
    name: tenants.name,
    slug: tenants.slug,
    plan: tenants.plan,
    status: tenants.status,
    createdAt: tenants.createdAt,
    // ownerEmail: users.email, // If we had a direct relationship or join
  })
  .from(tenants)
  // .leftJoin(users, eq(tenants.ownerUserId, users.clerkUserId))
  .orderBy(desc(tenants.createdAt))
  .limit(50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">テナント一覧</h1>
        <p className="text-muted-foreground">登録されている事業者・サイト（テナント）の管理画面です。</p>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>作成日時</TableHead>
              <TableHead>テナント名</TableHead>
              <TableHead>URL Slug</TableHead>
              <TableHead>プラン</TableHead>
              <TableHead>ステータス</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.createdAt.toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{record.name}</TableCell>
                <TableCell>{record.slug}.endesign.jp</TableCell>
                <TableCell>
                  <Badge variant="outline">{record.plan}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={record.status === "active" ? "default" : "secondary"}>
                    {record.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {records.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  テナントデータがありません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
