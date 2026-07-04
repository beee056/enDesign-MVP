import { DiagnosisForm } from "@/components/check/DiagnosisForm";

export default function CheckPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">無料Web診断</h1>
        <p className="text-muted-foreground">
          5分で完了。あなたの事業の「もったいない」を見つけます。
        </p>
      </div>
      
      <DiagnosisForm />
    </div>
  );
}
