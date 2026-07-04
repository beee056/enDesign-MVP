import { db } from "@/db";
import { diagnoses, businesses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DiagnosisResultPage({ params }: { params: { id: string } }) {
  // DBから診断結果と事業者情報を取得
  const diagnosisRecord = await db.query.diagnoses.findFirst({
    where: eq(diagnoses.id, params.id),
  });

  if (!diagnosisRecord) {
    return notFound();
  }

  const businessRecord = await db.query.businesses.findFirst({
    where: eq(businesses.id, diagnosisRecord.businessId!),
  });

  // JSON形式で保存されているAIからの推薦コメントをパース
  let aiComments: any = {};
  if (diagnosisRecord.recommendations) {
    try {
      aiComments = JSON.parse(diagnosisRecord.recommendations);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-4xl space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">{businessRecord?.name} 様のWeb診断結果</h1>
        <p className="text-xl">
          総合スコア: <span className="text-4xl font-extrabold text-primary">{diagnosisRecord.scoreTotal}</span> / 100
        </p>
        <p className="text-muted-foreground whitespace-pre-wrap">{diagnosisRecord.freeSummary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">✨ 今の良いところ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{aiComments.goodPoints}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">💡 もったいないポイント</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{aiComments.missedOpportunities}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🛠 今すぐ自分で直せること</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{aiComments.diyFixes}</p>
        </CardContent>
      </Card>

      <Card className="bg-muted/50 border-primary">
        <CardHeader>
          <CardTitle>🎯 おすすめの進め方・プラン</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="whitespace-pre-wrap">{aiComments.recommendedPlan}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="outline" size="lg" asChild>
              <Link href="/support">Lite相談する (¥5,000)</Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/build/start">5万円プランで一緒に作る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
