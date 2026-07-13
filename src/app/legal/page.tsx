import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "特定商取引法に基づく表記 | enDesign",
  description: "enDesignの特定商取引法に基づく表記",
};

export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">特定商取引法に基づく表記</h1>
        <p className="mt-4 text-lg text-slate-600">最終更新日: 2026年7月13日</p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-8 prose prose-slate max-w-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 bg-slate-50 w-1/3 font-semibold text-slate-900">販売事業者名</th>
                  <td className="py-4 px-4">enDesign（エンデザイン）</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 bg-slate-50 font-semibold text-slate-900">代表責任者名</th>
                  <td className="py-4 px-4">田邊 勇人</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 bg-slate-50 font-semibold text-slate-900">所在地</th>
                  <td className="py-4 px-4">茨城県つくば市<br/><span className="text-sm text-slate-500">※以降の詳細な住所は、ご請求をいただいた場合に遅滞なく開示いたします。</span></td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 bg-slate-50 font-semibold text-slate-900">電話番号</th>
                  <td className="py-4 px-4">ご請求をいただいた場合に遅滞なく開示いたします。<br/><span className="text-sm text-slate-500">※お問い合わせは原則メールにて承っております。</span></td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 bg-slate-50 font-semibold text-slate-900">メールアドレス</th>
                  <td className="py-4 px-4">info@p-quest.com</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 bg-slate-50 font-semibold text-slate-900">サイトURL</th>
                  <td className="py-4 px-4">https://en-design-mvp.vercel.app</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 bg-slate-50 font-semibold text-slate-900">販売価格</th>
                  <td className="py-4 px-4">各プランおよび見積書に記載の金額（税込表示）</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 bg-slate-50 font-semibold text-slate-900">商品代金以外に必要な料金</th>
                  <td className="py-4 px-4">
                    ・銀行振込の場合の振込手数料<br/>
                    ・独自ドメイン取得・更新にかかる費用（お客様ご自身で契約される場合）<br/>
                    ・インターネット接続料金その他の通信回線に関する費用
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 bg-slate-50 font-semibold text-slate-900">支払方法および支払時期</th>
                  <td className="py-4 px-4">
                    クレジットカード決済、または銀行振込<br/>
                    原則として、前払いにてお願いしております。
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 bg-slate-50 font-semibold text-slate-900">商品の引渡時期</th>
                  <td className="py-4 px-4">
                    お客様との協議・見積もりのうえ決定した納期によります。<br/>
                    （Standard Buildプランで通常2〜3週間程度）
                  </td>
                </tr>
                <tr>
                  <th className="py-4 px-4 bg-slate-50 font-semibold text-slate-900">返品・キャンセル・返金について</th>
                  <td className="py-4 px-4">
                    ・無料Web診断およびチャット相談は無料のため、返金の対象外です。<br/>
                    ・有料プランは、<strong>制作着手前</strong>であればキャンセルを承ります。この場合、お支払い済みの費用は振込手数料等の実費を差し引いて返金いたします。<br/>
                    ・オーダーメイドのサービスという性質上、<strong>制作着手後</strong>のお客様都合による返金は原則としてお受けできません。ただし進捗状況に応じて個別にご相談に応じます。<br/>
                    ・当方の責めに帰すべき事由により契約内容を履行できない場合は、協議のうえ返金など適切に対応いたします。<br/>
                    ・詳細は利用規約をあわせてご確認ください。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link href="/" className="text-primary hover:underline font-medium">
              ← トップページに戻る
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
