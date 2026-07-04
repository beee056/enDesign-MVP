import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, Users, FileText, Settings, HeartHandshake } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* サイドバー */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link className="flex items-center" href="/">
            <HeartHandshake className="h-5 w-5 text-primary mr-2" />
            <span className="font-bold text-lg tracking-tight">enDesign Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          <Link href="/admin" className="flex items-center px-4 py-3 text-sm font-medium rounded-md bg-slate-800 text-white">
            <LayoutDashboard className="mr-3 h-5 w-5 text-slate-400" />
            ダッシュボード
          </Link>
          <Link href="/admin/diagnoses" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <FileText className="mr-3 h-5 w-5 text-slate-400" />
            診断結果一覧
          </Link>
          <Link href="/admin/tenants" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Users className="mr-3 h-5 w-5 text-slate-400" />
            事業者管理
          </Link>
          <Link href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Settings className="mr-3 h-5 w-5 text-slate-400" />
            設定
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center px-2">
            <UserButton afterSignOutUrl="/" />
            <span className="ml-3 text-sm font-medium">アカウント</span>
          </div>
        </div>
      </aside>

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* モバイル用ヘッダー */}
        <header className="h-16 flex items-center justify-between px-4 bg-white border-b md:hidden">
          <Link className="flex items-center" href="/admin">
            <HeartHandshake className="h-5 w-5 text-primary mr-2" />
            <span className="font-bold text-lg">Admin</span>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </header>

        {/* ページコンテンツ */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
