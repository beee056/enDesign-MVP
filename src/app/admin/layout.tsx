import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-background border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">enDesign Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">
            ダッシュボード
          </Link>
          <Link href="/admin/diagnoses" className="block px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">
            診断一覧
          </Link>
          <Link href="/admin/tenants" className="block px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">
            テナント一覧
          </Link>
          <Link href="/admin/support" className="block px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">
            サポート履歴 / FAQ
          </Link>
          <Link href="/admin/referrals" className="block px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">
            紹介クレジット管理
          </Link>
        </nav>
        <div className="p-4 border-t flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
          <span className="text-sm font-medium text-muted-foreground">アカウント</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
