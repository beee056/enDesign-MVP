import { db } from "@/db";
import { sites, pages, blocks } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

export const dynamic = "force-dynamic";

export default async function TenantSitePage({ params }: { params: { slug: string } }) {
  // スラグからサイト情報を取得
  const siteRecord = await db.query.sites.findFirst({
    where: eq(sites.slug, params.slug),
  });

  if (!siteRecord) {
    return notFound();
  }

  // サイトに紐づくHomeページを取得
  const pageRecord = await db.query.pages.findFirst({
    where: eq(pages.siteId, siteRecord.id),
  });

  if (!pageRecord) {
    return notFound();
  }

  // ページに紐づくブロックを取得してソート
  const pageBlocks = await db.query.blocks.findMany({
    where: eq(blocks.pageId, pageRecord.id),
    orderBy: [asc(blocks.sortOrder)],
  });

  return (
    <div className={`min-h-screen theme-${siteRecord.themePreset}`}>
      {/* 簡易ヘッダー */}
      <header className="p-4 border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">{siteRecord.title}</h1>
        </div>
      </header>

      {/* ブロック描画 */}
      <main>
        {pageBlocks.length > 0 ? (
          pageBlocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            コンテンツがありません
          </div>
        )}
      </main>

      {/* 簡易フッター */}
      <footer className="p-8 border-t bg-muted/20 text-center mt-20">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteRecord.title} | Powered by enDesign
        </p>
      </footer>
    </div>
  );
}
