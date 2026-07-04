import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F5]">
      {/* 簡易ヘッダー */}
      <header className="px-4 lg:px-8 h-16 flex items-center bg-white shadow-sm">
        <Link className="flex items-center justify-center transition-opacity hover:opacity-80" href="/">
          <div className="bg-primary/10 p-2 rounded-lg mr-2">
            <HeartHandshake className="h-5 w-5 text-primary" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">enDesign</span>
        </Link>
      </header>

      {/* ログインフォーム */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">管理者・事業者ログイン</h1>
          <p className="text-sm text-slate-600">
            診断結果の確認や、Webサイトの管理を行います。
          </p>
        </div>
        
        {/* ClerkのSignInコンポーネントを配置 */}
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl border border-slate-200 rounded-2xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
            }
          }}
        />
      </main>
      
      <footer className="py-6 text-center">
        <p className="text-xs text-slate-500">
          © 2026 enDesign. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
