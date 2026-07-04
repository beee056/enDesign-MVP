import { db } from "@/db";
import { diagnoses, businesses } from "@/db/schema";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDiagnosesPage() {
  const records = await db.select({
    id: diagnoses.id,
    score: diagnoses.scoreTotal,
    status: diagnoses.status,
    createdAt: diagnoses.createdAt,
    businessName: businesses.name,
    industry: businesses.industry,
    region: businesses.region,
  })
  .from(diagnoses)
  .leftJoin(businesses, eq(diagnoses.businessId, businesses.id))
  .orderBy(desc(diagnoses.createdAt))
  .limit(50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">診断一覧</h1>
        <p className="text-muted-foreground">過去に行われた無料Web診断の結果一覧です。</p>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日時</TableHead>
              <TableHead>事業者名</TableHead>
              <TableHead>業種/地域</TableHead>
              <TableHead>スコア</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead className="text-right">アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.createdAt.toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{record.businessName}</TableCell>
                <TableCell>{record.industry} / {record.region}</TableCell>
                <TableCell>
                  <span className="font-bold text-primary">{record.score}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={record.status === "completed" ? "default" : "secondary"}>
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/check/result/${record.id}`}>
                    <Button variant="outline" size="sm">結果を見る</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {records.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  診断データがありません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
