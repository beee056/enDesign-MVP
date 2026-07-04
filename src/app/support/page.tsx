import { SupportForm } from "@/components/support/SupportForm";

export default function SupportPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">お問い合わせ・サポート</h1>
        <p className="text-muted-foreground">
          使い方がわからない場合や、内容の修正をご希望の場合はこちらからお問い合わせください。
        </p>
      </div>
      
      <SupportForm />
    </div>
  );
}
