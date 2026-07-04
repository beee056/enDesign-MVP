import { db } from "@/db";
import { diagnoses, businesses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, Lightbulb, MapPin, Search, MousePointerClick } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

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

  const goodPoints: string[] = Array.isArray(aiComments.goodPoints) ? aiComments.goodPoints : [];
  const improvementPoints: string[] = Array.isArray(aiComments.improvementPoints) ? aiComments.improvementPoints : [];
  const selfHelpActions: string[] = Array.isArray(aiComments.selfHelpActions) ? aiComments.selfHelpActions : [];
  const freeAdvice: string[] = Array.isArray(aiComments.freeAdvice) ? aiComments.freeAdvice : [];

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-5xl space-y-12">
      {/* ヘッダーセクション */}
      <div className="text-center space-y-6">
        <p className="text-primary font-semibold tracking-wider text-sm">FREE WEB DIAGNOSIS</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{businessRecord?.name} 様のWeb診断結果</h1>
        
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 max-w-2xl mx-auto mt-8">
          <p className="text-lg text-slate-500 mb-2 font-medium">総合スコア</p>
          <div className="flex items-center justify-center">
            <span className="text-5xl md:text-6xl font-extrabold text-primary">{diagnosisRecord.scoreTotal || 0}</span>
            <span className="text-xl md:text-2xl text-slate-400 ml-2 mt-2 md:mt-4">/ 100</span>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-left bg-slate-50 p-6 rounded-2xl text-slate-700 leading-relaxed border border-slate-100">
          <p className="whitespace-pre-wrap">{diagnosisRecord.freeSummary || aiComments.summary}</p>
        </div>
      </div>

      {/* スコア詳細 */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Search className="w-6 h-6 mr-2 text-primary" />
          分野別スコア
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-none border-slate-200">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm text-slate-500 font-medium">基本情報・インフラ</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl md:text-3xl font-bold text-slate-800">{diagnosisRecord.scoreBasicInfo || 0}<span className="text-sm md:text-base text-slate-400 font-normal ml-1">点</span></div>
            </CardContent>
          </Card>
          <Card className="shadow-none border-slate-200">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm text-slate-500 font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> MEO (Googleマップ)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl md:text-3xl font-bold text-slate-800">{diagnosisRecord.scoreGoogleMaps || 0}<span className="text-sm md:text-base text-slate-400 font-normal ml-1">点</span></div>
            </CardContent>
          </Card>
          <Card className="shadow-none border-slate-200">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm text-slate-500 font-medium flex items-center">
                <MousePointerClick className="w-4 h-4 mr-1" /> Webサイト・導線
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl md:text-3xl font-bold text-slate-800">{diagnosisRecord.scoreWebsite || 0}<span className="text-sm md:text-base text-slate-400 font-normal ml-1">点</span></div>
            </CardContent>
          </Card>
          <Card className="shadow-none border-slate-200">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm text-slate-500 font-medium">SNS連携</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl md:text-3xl font-bold text-slate-800">{diagnosisRecord.scoreSns || 0}<span className="text-sm md:text-base text-slate-400 font-normal ml-1">点</span></div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 良いところ・もったいないところ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-100 shadow-sm">
          <CardHeader className="bg-green-50/50 border-b border-green-50">
            <CardTitle className="text-green-700 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              今の良いところ
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {goodPoints.length > 0 ? goodPoints.map((point, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">•</span>
                  <span className="text-slate-700 leading-relaxed">{point}</span>
                </li>
              )) : <li className="text-slate-500">データがありません</li>}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-orange-100 shadow-sm">
          <CardHeader className="bg-orange-50/50 border-b border-orange-50">
            <CardTitle className="text-orange-700 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              もったいないポイント
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {improvementPoints.length > 0 ? improvementPoints.map((point, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-orange-400 mr-2 mt-0.5">•</span>
                  <span className="text-slate-700 leading-relaxed">{point}</span>
                </li>
              )) : <li className="text-slate-500">データがありません</li>}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 具体的な行動リスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm h-full">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              お金をかけずに自分で直せること
            </CardTitle>
            <CardDescription>まずはここから着手するのがおすすめです。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {selfHelpActions.length > 0 ? selfHelpActions.map((action, i) => (
                <li key={i} className="flex items-start p-3 bg-slate-50 rounded-lg">
                  <div className="bg-white text-slate-500 font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 shrink-0 shadow-sm border border-slate-100">{i+1}</div>
                  <span className="text-slate-700 text-sm leading-relaxed">{action}</span>
                </li>
              )) : <li className="text-slate-500">データがありません</li>}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm h-full">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <CheckCircle2 className="w-5 h-5 mr-2 text-primary" />
              お金をかけなくていいこと
            </CardTitle>
            <CardDescription>無理に業者に頼まなくてもよい領域です。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {freeAdvice.length > 0 ? freeAdvice.map((advice, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-primary mr-2 mt-0.5">✓</span>
                  <span className="text-slate-700 text-sm leading-relaxed">{advice}</span>
                </li>
              )) : <li className="text-slate-500">データがありません</li>}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* おすすめプランとCTA */}
      <Card className="bg-primary/5 border-primary/20 shadow-md">
        <CardHeader className="text-center pb-2">
          <p className="text-primary font-bold text-sm mb-2">NEXT STEP</p>
          <CardTitle className="text-2xl">おすすめの進め方・プラン</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-4 px-6 md:px-12 pb-10">
          <p className="whitespace-pre-wrap text-center text-slate-700 text-lg">{aiComments.recommendedPlan}</p>
          
          <div className="flex flex-col gap-4 justify-center pt-6 max-w-sm mx-auto">
            <Link href="/support" className="w-full">
              <Button variant="outline" size="lg" className="w-full bg-white border-primary/30 hover:bg-primary/5 h-14">
                チャットで無料相談する
              </Button>
            </Link>
            <Link href="/#pricing" className="w-full">
              <Button size="lg" className="w-full shadow-lg h-14">
                料金プランを見る
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
