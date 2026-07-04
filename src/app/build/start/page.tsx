import { BuildForm } from "@/components/build/BuildForm";

export default function BuildStartPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">一緒に作ってみる</h1>
        <p className="text-muted-foreground">
          診断結果をもとに、実際にホームページの構成を作ってみましょう。
          入力いただいた内容をもとに、AIがサイトのベースを自動生成します。
        </p>
      </div>
      
      <BuildForm />
    </div>
  );
}
