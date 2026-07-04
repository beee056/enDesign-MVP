export function HeroBlock({ content }: { content: any }) {
  return (
    <section className="bg-primary/5 py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
          {content.headline || "見出しがここに入ります"}
        </h1>
        <p className="text-xl text-muted-foreground">
          {content.subHeadline || "サブコピーがここに入ります。事業の魅力や特徴を簡潔に伝えます。"}
        </p>
      </div>
    </section>
  );
}

export function ServiceMenuBlock({ content }: { content: any }) {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">サービス・メニュー</h2>
      <div className="prose prose-lg mx-auto text-center">
        <p>{content.description || "メニューの詳細がここに入ります"}</p>
      </div>
    </section>
  );
}

export function DefaultBlock({ type, content }: { type: string, content: any }) {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto border-t">
      <h2 className="text-2xl font-bold text-muted-foreground mb-4">[{type}] Block</h2>
      <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
        {JSON.stringify(content, null, 2)}
      </pre>
    </section>
  );
}

export function BlockRenderer({ block }: { block: { blockType: string; contentJson: any } }) {
  const content = block.contentJson || {};
  
  switch (block.blockType) {
    case "Hero":
      return <HeroBlock content={content} />;
    case "ServiceMenu":
      return <ServiceMenuBlock content={content} />;
    // 他のブロックタイプも必要に応じて追加
    default:
      return <DefaultBlock type={block.blockType} content={content} />;
  }
}
