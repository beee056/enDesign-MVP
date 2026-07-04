import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Gift, 
  MapPin, 
  ClipboardList, 
  Camera, 
  Building2, 
  Scissors, 
  GraduationCap, 
  Utensils, 
  Tractor, 
  Wrench,
  Search,
  HeartHandshake
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="px-4 lg:px-8 h-16 flex items-center border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <Link className="flex items-center justify-center transition-opacity hover:opacity-80" href="/">
          <div className="bg-primary/10 p-2 rounded-lg mr-2">
            <HeartHandshake className="h-5 w-5 text-primary" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">enDesign</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-8">
          <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#features">
            選ばれる理由
          </Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#free-value">
            無料でできること
          </Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#pricing">
            料金プラン
          </Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#industries">
            対象業種
          </Link>
        </nav>
        <div className="ml-auto md:ml-8 flex items-center gap-4">
          <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors hidden sm:block">
            ログイン
          </Link>
          <Link href="/check">
            <Button size="sm" className="rounded-full px-6 shadow-sm hover:shadow transition-all">
              無料診断へ
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* JSON-LD 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "enDesign",
              "url": "https://en-design-mvp.vercel.app",
              "logo": "https://en-design-mvp.vercel.app/logo.png",
              "description": "地域小規模事業者向けの無料Web診断と5万円からのホームページ制作サービス",
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "本当に無料診断だけで終わってもいいですか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "はい、完全無料です。ご自身で改善できるポイントをお伝えしますので、無理な営業等は一切行いません。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "月額費用はかかりますか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "enDesignからの月額保守費用は一切いただきません。ただし、独自ドメインの更新費用等はドメイン会社へのお支払いが発生します。"
                  }
                }
              ]
            })
          }}
        />

        {/* Hero Section */}
        <section className="w-full pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 bg-[#F5F7F5] relative overflow-hidden border-b border-slate-200/50">
          <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-5xl">
            <div className="flex flex-col items-center space-y-10 text-center">
              <div className="space-y-6 max-w-4xl">
                <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-white text-slate-700 shadow-sm mb-2">
                  <Search className="w-4 h-4 mr-2 text-primary" />
                  地域密着型のWebサポート
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-[1.15]">
                  いい仕事が、<br className="sm:hidden" />ちゃんと届くように。
                </h1>
                <p className="mx-auto max-w-[800px] text-slate-600 md:text-xl leading-relaxed font-medium">
                  Webに詳しくない地域事業者のための、無料Web診断と5万円からのホームページ制作。<br className="hidden md:block" />
                  自分でできることは無料で。一人では不安なところだけ、低価格で一緒に整えます。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center mt-4">
                <Link href="/check" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full text-base h-14 px-8 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                    無料Web診断をはじめる <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#pricing" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full text-base h-14 px-8 rounded-full bg-white hover:bg-slate-50 transition-all">
                    料金を見る
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {/* Decorative background elements (Warm & Gentle) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8F0E8] rounded-full blur-3xl -z-10 pointer-events-none opacity-60" />
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">enDesignが選ばれる理由</h2>
              <p className="mt-4 text-slate-600 md:text-lg max-w-2xl mx-auto">
                丸投げでも、自作でもない。一緒に伴走する「ちょうどいい」距離感。
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Search, title: "無料でWebの「もったいない」が分かる", desc: "まずは無料診断で、現在の課題を可視化します。" },
                { icon: ClipboardList, title: "自分で直せる手順まで見える", desc: "診断結果をもとに、優先順位を整理。自分でできることはご自身で。" },
                { icon: HeartHandshake, title: "5万円から一緒に作れる", desc: "不安な部分だけをプロにお任せ。明朗会計で安心です。" },
                { icon: CheckCircle2, title: "月額で縛らない", desc: "高額なリース契約や不要な月額保守費用は一切いただきません。" },
                { icon: Sparkles, title: "AIで下書き、人が仕上げる", desc: "AIで効率化しつつ、最後の言葉・写真・導線は人が丁寧に仕上げます。" },
                { icon: Gift, title: "紹介クレジット", desc: "紹介した方にもされた方にもお得なクレジット制度をご用意。" },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-start p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 mb-4">
                    <feature.icon className="h-6 w-6 text-slate-700" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free Value Section */}
        <section id="free-value" className="w-full py-16 md:py-24 bg-slate-900 text-white">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">無料でできること</h2>
              <p className="mt-4 text-slate-300 md:text-lg max-w-2xl mx-auto">
                お金をかけなくても、Web集客は改善できます。enDesignは出し惜しみしません。
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                "1分で完了するWeb診断",
                "改善ポイントの可視化",
                "自分で直すチェックリスト",
                "Googleマップ（MEO）設定確認",
                "FAQ（よくある質問）テンプレ提供",
                "スマホでOK！写真撮影リスト",
                "悪徳業者チェックリスト"
              ].map((item, i) => (
                <div key={i} className="flex items-center p-4 bg-white/10 rounded-xl border border-white/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mr-3 shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/check">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8">
                  無料で診断を試してみる
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Support & Community */}
        <section className="w-full py-16 md:py-24 bg-[#F5F7F5]">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center p-2 bg-white rounded-xl shadow-sm border border-slate-100 mb-2">
                  <MessageSquare className="h-6 w-6 text-primary mr-3" />
                  <span className="font-bold text-slate-900">無料チャット相談 ＆ FAQ蓄積</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  困ったことは、まずチャットで。
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  「これってどうすればいいの？」というご相談や案内は<strong>完全無料</strong>で対応いたします。（※実作業が発生する場合は有料となります）
                </p>
                <p className="text-slate-600 leading-relaxed">
                  また、皆様からいただいた「よくある質問」はFAQとして蓄積され、次に困っている同じ地域事業者の助けになります。
                </p>
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center p-2 bg-white rounded-xl shadow-sm border border-slate-100 mb-2">
                  <Gift className="h-6 w-6 text-primary mr-3" />
                  <span className="font-bold text-slate-900">紹介クレジット制度</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  助け合いが、お得に繋がる。
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  知人をご紹介いただき、その方が購入された場合に限り「紹介成立」となります。<br />
                  紹介してくださった方には、enDesign内で使える<strong>紹介クレジットを付与</strong>。
                </p>
                <p className="text-slate-600 leading-relaxed">
                  このクレジットはご自身のサイト改修に使っても良し、他の方へのプレゼントにしても良し。地域の輪を広げます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">料金プラン</h2>
              <p className="mt-4 text-slate-600 md:text-lg max-w-2xl mx-auto">
                必要なものを、必要なぶんだけ。明朗会計をお約束します。
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {/* Lite */}
              <div className="flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">Free / Lite</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-slate-900">¥0</span>
                  <span className="text-slate-500 font-medium"> 〜 5,000</span>
                </div>
                <ul className="space-y-3 flex-1">
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 shrink-0" /><span className="text-slate-600 text-sm">Free Check（無料診断）: 0円</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 shrink-0" /><span className="text-slate-600 text-sm">チャットでの相談・案内: 0円</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 shrink-0" /><span className="text-slate-600 text-sm">Lite相談（オンライン通話等）: 5,000円</span></li>
                </ul>
              </div>
              
              {/* Standard (5万円) */}
              <div className="flex flex-col p-6 rounded-2xl bg-white border-2 border-primary shadow-xl relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                  一番人気
                </div>
                <h3 className="text-xl font-bold text-slate-900">Standard Build</h3>
                <p className="text-sm text-slate-500 mt-1">すべておまかせの基本プラン</p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">¥50,000</span>
                </div>
                <ul className="space-y-3 flex-1 mb-6">
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" /><span className="text-slate-700 text-sm font-medium">1ページ構成（LP型）</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" /><span className="text-slate-700 text-sm font-medium">6ブロック (Hero/ServiceMenu/Value/FAQ/Access/CTA)</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" /><span className="text-slate-700 text-sm font-medium">写真10枚・簡易イラスト1点まで</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" /><span className="text-slate-700 text-sm font-medium">修正2回まで</span></li>
                </ul>
                <Link href="/check">
                  <Button className="w-full rounded-full">このプランで診断する</Button>
                </Link>
              </div>

              {/* Advanced */}
              <div className="flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">Plus / Max</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-slate-900">¥80,000</span>
                  <span className="text-slate-500 font-medium"> 〜</span>
                </div>
                <ul className="space-y-3 flex-1">
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 shrink-0" /><span className="text-slate-600 text-sm">Plus Build: 80,000円（ページ数や内容を追加）</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 shrink-0" /><span className="text-slate-600 text-sm">Max Build: 120,000円（充実した構成）</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 shrink-0" /><span className="text-slate-600 text-sm">※既存サイトのちょこっと修正（Mini Fix）は 30,000円〜承ります。</span></li>
                </ul>
              </div>
            </div>

            {/* Scope / Not to do */}
            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <Wrench className="h-5 w-5 mr-2 text-red-500" />
                5万円プランで「やらないこと」のお約束
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                低価格と高品質を両立させるため、以下の作業は5万円プランの対象外となります。あらかじめご了承ください。
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
                <li>・複雑なアニメーションの実装</li>
                <li>・完全オリジナルデザイン（イチからのデザイン）</li>
                <li>・EC（ネットショップ）機能の構築</li>
                <li>・独自の予約システム自作</li>
                <li>・SNS運用代行・広告運用</li>
                <li>・大量のページ制作</li>
                <li>・無制限の修正（3回目以降は別途お見積り）</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Target Industries */}
        <section id="industries" className="w-full py-16 md:py-24 bg-white border-t border-slate-100">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-10">こんな事業者様のお力になれます</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {[
                { icon: MapPin, label: "整体・整骨院" },
                { icon: Scissors, label: "美容室・サロン" },
                { icon: GraduationCap, label: "塾・習い事" },
                { icon: Building2, label: "工務店・職人" },
                { icon: Utensils, label: "飲食店・カフェ" },
                { icon: Tractor, label: "農家・生産者" }
              ].map((industry, i) => (
                <div key={i} className="flex flex-col items-center p-4 min-w-[100px]">
                  <div className="bg-slate-50 p-4 rounded-full mb-3 text-slate-600">
                    <industry.icon className="h-8 w-8" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{industry.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-slate-500 text-sm">その他、地域でがんばるすべてのスモールビジネスに対応可能です。</p>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="w-full py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                さあ、まずは無料診断から。
              </h2>
              <p className="text-slate-300 md:text-xl">
                質問に答えるだけで、あなたのビジネスのWeb課題が見えてきます。
              </p>
              <Link href="/check" className="mt-4">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full h-14 px-10 text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  無料でWeb診断をはじめる
                </Button>
              </Link>
            </div>
          </div>
          {/* Decorative */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-slate-900 -z-10" />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 w-full border-t bg-white">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <HeartHandshake className="h-4 w-4 text-primary mr-2" />
            <span className="font-bold text-slate-900">enDesign</span>
            <span className="ml-4 text-xs text-slate-500">
              © 2026 enDesign. All rights reserved.
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link className="text-xs text-slate-500 hover:text-slate-900 transition-colors" href="/terms">
              利用規約
            </Link>
            <Link className="text-xs text-slate-500 hover:text-slate-900 transition-colors" href="/privacy">
              プライバシーポリシー
            </Link>
            <Link className="text-xs text-slate-500 hover:text-slate-900 transition-colors" href="/legal">
              特定商取引法表記
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
