"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Gift, 
  MapPin, 
  ClipboardList, 
  Building2, 
  Scissors, 
  GraduationCap, 
  Utensils, 
  Tractor, 
  Wrench,
  Search,
  HeartHandshake
} from "lucide-react";

const fadeIn: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-primary/20">
      
      {/* JSON-LD 構造化データ (Client Component内でもNext.jsのSSR時にレンダリングされます) */}
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

      {/* Header (Glassmorphism) */}
      <header className="px-4 lg:px-8 h-16 flex items-center bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <Link className="flex items-center justify-center transition-opacity hover:opacity-80" href="/">
          <div className="bg-gradient-to-br from-primary to-blue-500 p-2 rounded-xl mr-2 shadow-sm">
            <HeartHandshake className="h-5 w-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">enDesign</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-8">
          <Link className="text-sm font-bold text-slate-600 hover:text-primary transition-colors" href="#features">選ばれる理由</Link>
          <Link className="text-sm font-bold text-slate-600 hover:text-primary transition-colors" href="#free-value">無料でできること</Link>
          <Link className="text-sm font-bold text-slate-600 hover:text-primary transition-colors" href="#pricing">料金プラン</Link>
        </nav>
        <div className="ml-auto md:ml-8 flex items-center gap-4">
          <Link href="/admin" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors hidden sm:block">
            ログイン
          </Link>
          <Link href="/check">
            <Button size="sm" className="rounded-full px-6 shadow-md hover:shadow-lg transition-all bg-slate-900 text-white hover:bg-slate-800">
              無料診断へ
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        
        {/* Hero Section (Aurora & Framer Motion) */}
        <section className="w-full pt-24 pb-20 md:pt-36 md:pb-32 lg:pt-48 lg:pb-40 relative overflow-hidden aurora-bg border-b border-slate-200/50">
          <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-5xl">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
              className="flex flex-col items-center space-y-10 text-center"
            >
              <motion.div variants={fadeIn} className="space-y-6 max-w-4xl flex flex-col items-center">
                <div className="inline-flex items-center rounded-full border border-white/50 bg-white/50 backdrop-blur-md px-4 py-1.5 text-sm font-bold text-primary shadow-sm mb-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  地域密着型のWebサポート
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] text-slate-900">
                  いい仕事が、<br />
                  <span className="text-gradient">ちゃんと届くように。</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-slate-600 md:text-xl leading-relaxed font-medium mt-6">
                  Webに詳しくない地域事業者のための、無料Web診断と5万円からのホームページ制作。<br className="hidden md:block" />
                  自分でできることは無料で。一人では不安なところだけ、低価格で一緒に整えます。
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center mt-8">
                <Link href="/check" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full text-base h-14 px-8 rounded-full shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_60px_-15px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-1 bg-slate-900 text-white hover:bg-slate-800 group">
                    無料Web診断をはじめる 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#pricing" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full text-base h-14 px-8 rounded-full bg-white/50 backdrop-blur-md hover:bg-white transition-all border-slate-200">
                    料金を見る
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          {/* Decorative Floater */}
          <motion.div 
            className="absolute top-20 right-10 md:top-40 md:right-32 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -z-10"
            animate={{ y: [0, 50, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-10 left-10 md:bottom-20 md:left-32 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl -z-10"
            animate={{ y: [0, -40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </section>

        {/* Features Section (Glassmorphism & Stagger) */}
        <section id="features" className="w-full py-24 lg:py-32 bg-white relative">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="text-center mb-20"
            >
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900">enDesignが選ばれる理由</h2>
              <p className="mt-6 text-slate-500 md:text-lg max-w-2xl mx-auto font-medium">
                丸投げでも、自作でもない。一緒に伴走する「ちょうどいい」距離感。
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { icon: Search, title: "無料でWebの「もったいない」が分かる", desc: "まずは無料診断で、現在の課題を可視化します。" },
                { icon: ClipboardList, title: "自分で直せる手順まで見える", desc: "診断結果をもとに、優先順位を整理。自分でできることはご自身で。" },
                { icon: HeartHandshake, title: "5万円から一緒に作れる", desc: "不安な部分だけをプロにお任せ。明朗会計で安心です。" },
                { icon: CheckCircle2, title: "月額で縛らない", desc: "高額なリース契約や不要な月額保守費用は一切いただきません。" },
                { icon: Sparkles, title: "AIで下書き、人が仕上げる", desc: "AIで効率化しつつ、最後の言葉・写真・導線は人が丁寧に仕上げます。" },
                { icon: Gift, title: "紹介クレジット", desc: "紹介した方にもされた方にもお得なクレジット制度をご用意。" },
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeIn} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex flex-col items-start p-8 rounded-3xl glass-card relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    <div className="p-4 bg-gradient-to-br from-slate-100 to-white rounded-2xl shadow-inner border border-slate-100 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Support & Community */}
        <section className="w-full py-24 bg-slate-50 border-y border-slate-200/50">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="space-y-6">
                <div className="inline-flex items-center p-2 bg-white rounded-xl shadow-sm border border-slate-100 mb-2">
                  <MessageSquare className="h-5 w-5 text-primary mr-3" />
                  <span className="font-bold text-slate-900 text-sm">無料チャット相談 ＆ FAQ蓄積</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-slate-900 leading-tight">
                  困ったことは、<br/>まずチャットで。
                </h2>
                <p className="text-slate-500 leading-relaxed font-medium">
                  「これってどうすればいいの？」というご相談や案内は<strong>完全無料</strong>で対応いたします。（※実作業が発生する場合は有料となります）
                </p>
                <p className="text-slate-500 leading-relaxed font-medium">
                  また、皆様からいただいた「よくある質問」はFAQとして蓄積され、次に困っている同じ地域事業者の助けになります。
                </p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="space-y-6">
                <div className="inline-flex items-center p-2 bg-white rounded-xl shadow-sm border border-slate-100 mb-2">
                  <Gift className="h-5 w-5 text-blue-500 mr-3" />
                  <span className="font-bold text-slate-900 text-sm">紹介クレジット制度</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-slate-900 leading-tight">
                  助け合いが、<br/>お得に繋がる。
                </h2>
                <p className="text-slate-500 leading-relaxed font-medium">
                  知人をご紹介いただき、その方が購入された場合に限り「紹介成立」となります。<br />
                  紹介してくださった方には、enDesign内で使える<strong>紹介クレジットを付与</strong>。
                </p>
                <p className="text-slate-500 leading-relaxed font-medium">
                  このクレジットはご自身のサイト改修に使っても良し、他の方へのプレゼントにしても良し。地域の輪を広げます。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-20">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900">料金プラン</h2>
              <p className="mt-6 text-slate-500 md:text-lg max-w-2xl mx-auto font-medium">
                必要なものを、必要なぶんだけ。明朗会計をお約束します。
              </p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8 mb-20 items-center">
              {/* Lite */}
              <motion.div variants={fadeIn} className="flex flex-col p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-slate-900">Free / Lite</h3>
                <div className="mt-4 mb-8">
                  <span className="text-4xl font-extrabold text-slate-900">¥0</span>
                  <span className="text-slate-500 font-medium"> 〜</span>
                </div>
                <ul className="space-y-4 flex-1">
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-slate-400 mr-3 shrink-0" /><span className="text-slate-600 text-sm font-medium">Free Check（無料診断）: 0円</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-slate-400 mr-3 shrink-0" /><span className="text-slate-600 text-sm font-medium">チャットでの相談・案内: 0円</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-slate-400 mr-3 shrink-0" /><span className="text-slate-600 text-sm font-medium">Lite相談（通話等）: 5,000円</span></li>
                </ul>
              </motion.div>
              
              {/* Standard */}
              <motion.div variants={fadeIn} className="flex flex-col p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative transform md:-translate-y-8 border border-slate-800">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-blue-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  一番人気
                </div>
                <h3 className="text-2xl font-bold">Standard Build</h3>
                <p className="text-sm text-slate-400 mt-2 font-medium">すべておまかせの基本プラン</p>
                <div className="mt-6 mb-8">
                  <span className="text-5xl font-extrabold text-white">¥50,000</span>
                </div>
                <ul className="space-y-4 flex-1 mb-8">
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" /><span className="text-slate-300 text-sm font-medium">1ページ構成（LP型）</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" /><span className="text-slate-300 text-sm font-medium">6ブロック構成</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" /><span className="text-slate-300 text-sm font-medium">写真10枚・簡易イラスト1点</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" /><span className="text-slate-300 text-sm font-medium">修正2回まで</span></li>
                </ul>
                <Link href="/check">
                  <Button className="w-full rounded-full h-12 bg-white text-slate-900 hover:bg-slate-100 font-bold">このプランで診断する</Button>
                </Link>
              </motion.div>

              {/* Advanced */}
              <motion.div variants={fadeIn} className="flex flex-col p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-slate-900">Plus / Max</h3>
                <div className="mt-4 mb-8">
                  <span className="text-4xl font-extrabold text-slate-900">¥80,000</span>
                  <span className="text-slate-500 font-medium"> 〜</span>
                </div>
                <ul className="space-y-4 flex-1">
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-slate-400 mr-3 shrink-0" /><span className="text-slate-600 text-sm font-medium">Plus Build: 80,000円（内容追加）</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-slate-400 mr-3 shrink-0" /><span className="text-slate-600 text-sm font-medium">Max Build: 120,000円（充実構成）</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-slate-400 mr-3 shrink-0" /><span className="text-slate-600 text-sm font-medium">※Mini Fix（修正のみ）: 30,000円〜</span></li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Scope / Not to do */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-red-50/30 border border-red-100 rounded-3xl p-8 md:p-10 max-w-4xl mx-auto backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <Wrench className="h-6 w-6 mr-3 text-red-500" />
                5万円プランで「やらないこと」のお約束
              </h3>
              <p className="text-slate-600 text-sm mb-6 font-medium leading-relaxed">
                低価格と高品質を両立させるため、以下の作業は5万円プランの対象外となります。あらかじめご了承ください。
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 text-sm font-medium text-slate-700">
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-3" />複雑なアニメーションの実装</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-3" />完全オリジナルデザイン</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-3" />EC（ネットショップ）機能の構築</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-3" />独自の予約システム自作</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-3" />SNS運用代行・広告運用</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-3" />大量のページ制作</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-3" />無制限の修正</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Target Industries */}
        <section id="industries" className="w-full py-20 bg-slate-50 border-t border-slate-100">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-12">こんな事業者様のお力になれます</h2>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { icon: MapPin, label: "整体・整骨院" },
                { icon: Scissors, label: "美容室・サロン" },
                { icon: GraduationCap, label: "塾・習い事" },
                { icon: Building2, label: "工務店・職人" },
                { icon: Utensils, label: "飲食店・カフェ" },
                { icon: Tractor, label: "農家・生産者" }
              ].map((industry, i) => (
                <div key={i} className="flex flex-col items-center p-4">
                  <div className="bg-white p-5 rounded-full mb-4 text-slate-600 shadow-sm border border-slate-100">
                    <industry.icon className="h-8 w-8" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{industry.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="w-full py-32 bg-slate-900 text-white relative overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex flex-col items-center justify-center space-y-8 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                さあ、まずは無料診断から。
              </h2>
              <p className="text-slate-300 md:text-xl font-medium">
                質問に答えるだけで、あなたのビジネスのWeb課題が見えてきます。
              </p>
              <Link href="/check" className="mt-8">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full h-16 px-12 text-lg font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all hover:-translate-y-1">
                  無料でWeb診断をはじめる
                </Button>
              </Link>
            </motion.div>
          </div>
          {/* Decorative */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-slate-900 to-slate-900 -z-10" />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 w-full bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-6 sm:mb-0">
            <HeartHandshake className="h-5 w-5 text-primary mr-2" />
            <span className="font-extrabold text-slate-900 text-lg">enDesign</span>
            <span className="ml-4 text-xs font-medium text-slate-400">
              © 2026 enDesign. All rights reserved.
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link className="text-xs font-bold text-slate-500 hover:text-primary transition-colors" href="/terms">利用規約</Link>
            <Link className="text-xs font-bold text-slate-500 hover:text-primary transition-colors" href="/privacy">プライバシーポリシー</Link>
            <Link className="text-xs font-bold text-slate-500 hover:text-primary transition-colors" href="/legal">特定商取引法表記</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
