import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles, Layout, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold text-xl tracking-tighter">enDesign</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            特徴
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            使い方
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/admin">
            ログイン
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4">
                  ✨ AIでホームページを自動生成
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  あなたのビジネスに<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                    最適なサイトを3分で。
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                  簡単な質問に答えるだけで、AIが業界・地域に合わせた最適なホームページ構造をご提案。気に入ればそのまま公開・カスタマイズも可能です。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                <Link href="/check" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full text-base h-12 px-8 shadow-lg transition-transform hover:-translate-y-1">
                    無料で診断・プレビューする <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">enDesignが選ばれる理由</h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">
                従来のデザイン制作の常識を覆す、圧倒的なスピードと品質を両立しました。
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">爆速セットアップ</h3>
                <p className="text-muted-foreground">
                  AIによる自動構築で、通常数週間かかるサイト制作がわずか数分で完了します。
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Layout className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">最適化されたデザイン</h3>
                <p className="text-muted-foreground">
                  業種や目的に合わせ、コンバージョン（お問い合わせ等）に最適化されたレイアウトを提供。
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">すべておまかせ</h3>
                <p className="text-muted-foreground">
                  専門知識は一切不要。質問に答えるだけで、コピーライティングから構成までAIが担当します。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                さあ、あなたのサイトを作りましょう。
              </h2>
              <p className="text-slate-300 md:text-xl">
                無料でプレビューまで確認できます。クレジットカードの登録は不要です。
              </p>
              <Link href="/check">
                <Button size="lg" variant="default" className="bg-white text-slate-900 hover:bg-slate-100 h-12 px-8 text-base">
                  無料で診断をはじめる
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 w-full border-t bg-white">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © 2026 enDesign. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              利用規約
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              プライバシーポリシー
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
