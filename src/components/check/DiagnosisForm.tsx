"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { diagnosisSchema, type DiagnosisInput } from "@/lib/validations/diagnosis";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { submitDiagnosis } from "@/lib/actions/diagnosis";

const PURPOSES = [
  "集客したい", "予約を増やしたい", "問い合わせを増やしたい",
  "採用を強くしたい", "信頼感を高めたい", "Web業者の内容を見直したい",
  "HPを作りたい", "HPをリニューアルしたい", "Googleマップを整えたい",
  "SNSとの導線を整えたい"
];

const PAINS = [
  "HPが古い", "HPがない", "スマホで見づらい", "問い合わせが少ない",
  "予約導線が弱い", "Googleマップを管理できていない", "口コミを活かせていない",
  "SNSが続かない", "SNSから予約につながらない", "業者に何を頼めばよいか分からない",
  "月額サービスの中身が不透明", "採用ページがない", "代表やスタッフの魅力が伝わっていない",
  "何から直せばいいか分からない"
];

const BUILD_PREFERENCES = [
  "自分で作りたい(費用を抑えたい)", "プロと一緒に作りたい(費用と手間のバランス)", "ほとんど任せたい(プロにお願いしたい)", "まず診断だけでいい"
];

export function DiagnosisForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<DiagnosisInput>({
    resolver: zodResolver(diagnosisSchema) as any,
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      industry: "",
      region: "",
      hasPhysicalStore: false,
      address: "",
      websiteUrl: "",
      googleMapsUrl: "",
      instagramUrl: "",
      lineUrl: "",
      otherSnsUrl: "",
      purposes: [],
      pains: [],
      currentVendorStatus: "",
      buildPreferences: [],
      budget: "",
      designTones: [],
      wantsIllustration: false,
      illustrationDetails: "",
      materialsAvailable: [],
      referralCode: "",
    },
  });

  async function onSubmit(data: DiagnosisInput) {
    setIsSubmitting(true);
    try {
      const result = await submitDiagnosis(data);
      if (result.success) {
        router.push(`/check/result/${result.diagnosisId}`);
      }
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 mb-6" style={{boxShadow: "0 1px 3px rgba(0,0,0,0.06)"}}>
        <h2 className="text-lg font-semibold text-[#0f172a] mb-1">無料Web診断・ご相談フォーム</h2>
        <p className="text-sm text-[#475569]">
          現状の課題やご希望をお聞かせください。入力内容をもとにAIと専門スタッフが無料で診断し、「自分で直せること」「お金をかけなくていいこと」をアドバイスします。
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          {/* Step 1: 基本情報 */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden" style={{boxShadow: "0 1px 3px rgba(0,0,0,0.06)"}}>
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center text-white text-xs font-bold shrink-0">1</div>
              <h3 className="text-sm font-semibold text-[#0f172a]">基本情報</h3>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="businessName" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-[#475569]">事業者名 <span className="text-[#10b981]">必須</span></FormLabel>
                  <FormControl><Input placeholder="株式会社enDesign" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="contactName" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-[#475569]">担当者名 <span className="text-[#10b981]">必須</span></FormLabel>
                  <FormControl><Input placeholder="山田 太郎" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-[#475569]">メールアドレス <span className="text-[#10b981]">必須</span></FormLabel>
                  <FormControl><Input type="email" placeholder="info@example.com" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-[#475569]">電話番号 <span className="text-[#94a3b8]">任意</span></FormLabel>
                  <FormControl><Input placeholder="03-1234-5678" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="industry" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-[#475569]">業種 <span className="text-[#10b981]">必須</span></FormLabel>
                  <FormControl><Input placeholder="美容室、飲食店、工務店など" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="region" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-[#475569]">地域 <span className="text-[#10b981]">必須</span></FormLabel>
                  <FormControl><Input placeholder="東京都渋谷区" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="hasPhysicalStore" render={({ field }) => (
                <FormItem className="md:col-span-2 flex flex-row items-center gap-3 rounded-lg border border-[#e2e8f0] px-4 py-3 bg-[#f8fafc] cursor-pointer">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div>
                    <FormLabel className="text-sm font-medium text-[#0f172a] cursor-pointer">実店舗・事業所がある</FormLabel>
                    <FormDescription className="text-xs text-[#94a3b8]">Googleマップ対策が必要な場合はチェック</FormDescription>
                  </div>
                </FormItem>
              )} />
            </div>
          </div>

          {/* Step 2: 現在のWeb状況 */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden" style={{boxShadow: "0 1px 3px rgba(0,0,0,0.06)"}}>
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center text-white text-xs font-bold shrink-0">2</div>
              <h3 className="text-sm font-semibold text-[#0f172a]">現在のWeb状況</h3>
            </div>
            <div className="p-5 space-y-4">
              <FormField control={form.control} name="websiteUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-[#475569]">現在のWebサイトURL <span className="text-[#94a3b8]">任意</span></FormLabel>
                  <FormControl><Input placeholder="https://example.com" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="googleMapsUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-[#475569]">GoogleマップのURL <span className="text-[#94a3b8]">任意</span></FormLabel>
                  <FormControl><Input placeholder="Googleマップの共有リンク" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                </FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="instagramUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-[#475569]">Instagramアカウント <span className="text-[#94a3b8]">任意</span></FormLabel>
                    <FormControl><Input placeholder="@account_name" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="lineUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-[#475569]">公式LINE <span className="text-[#94a3b8]">任意</span></FormLabel>
                    <FormControl><Input placeholder="リンクまたはID" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                  </FormItem>
                )} />
              </div>
            </div>
          </div>

          {/* Step 3: 目的と悩み */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden" style={{boxShadow: "0 1px 3px rgba(0,0,0,0.06)"}}>
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center text-white text-xs font-bold shrink-0">3</div>
              <h3 className="text-sm font-semibold text-[#0f172a]">目的と悩み</h3>
            </div>
            <div className="p-5 space-y-6">
              <FormField control={form.control} name="purposes" render={() => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">目的（複数選択可）</FormLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {PURPOSES.map((item) => (
                      <FormField key={item} control={form.control} name="purposes" render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2.5 rounded-lg border border-[#e2e8f0] px-3 py-2.5 hover:bg-[#f8fafc] transition-colors cursor-pointer">
                          <FormControl>
                            <Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) =>
                              checked ? field.onChange([...field.value, item]) : field.onChange(field.value?.filter((v) => v !== item))
                            } />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer text-sm text-[#334155] leading-none m-0">{item}</FormLabel>
                        </FormItem>
                      )} />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="pains" render={() => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">悩み・課題（複数選択可）</FormLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {PAINS.map((item) => (
                      <FormField key={item} control={form.control} name="pains" render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2.5 rounded-lg border border-[#e2e8f0] px-3 py-2.5 hover:bg-[#f8fafc] transition-colors cursor-pointer">
                          <FormControl>
                            <Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) =>
                              checked ? field.onChange([...field.value, item]) : field.onChange(field.value?.filter((v) => v !== item))
                            } />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer text-sm text-[#334155] leading-none m-0">{item}</FormLabel>
                        </FormItem>
                      )} />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          {/* Step 4: 制作のご希望 */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden" style={{boxShadow: "0 1px 3px rgba(0,0,0,0.06)"}}>
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center text-white text-xs font-bold shrink-0">4</div>
              <h3 className="text-sm font-semibold text-[#0f172a]">制作・サポートのご希望</h3>
            </div>
            <div className="p-5 space-y-5">
              <FormField control={form.control} name="currentVendorStatus" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-[#475569]">現在のWeb業者の有無・不満など <span className="text-[#94a3b8]">任意</span></FormLabel>
                  <FormControl><Input placeholder="例：月額1万円払っているが何もしてくれない" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="buildPreferences" render={() => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">制作の進め方（複数選択可）</FormLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {BUILD_PREFERENCES.map((item) => (
                      <FormField key={item} control={form.control} name="buildPreferences" render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2.5 rounded-lg border border-[#e2e8f0] px-3 py-2.5 hover:bg-[#f8fafc] transition-colors cursor-pointer">
                          <FormControl>
                            <Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) =>
                              checked ? field.onChange([...field.value, item]) : field.onChange(field.value?.filter((v) => v !== item))
                            } />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer text-sm text-[#334155] leading-none m-0">{item}</FormLabel>
                        </FormItem>
                      )} />
                    ))}
                  </div>
                </FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="budget" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-[#475569]">想定のご予算感 <span className="text-[#94a3b8]">任意</span></FormLabel>
                    <FormControl><Input placeholder="例：なるべく0円で、5万円まで 等" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="referralCode" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-[#475569]">紹介コード <span className="text-[#94a3b8]">お持ちの方</span></FormLabel>
                    <FormControl><Input placeholder="知人からの紹介コード" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="wantsIllustration" render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 rounded-lg border border-[#e2e8f0] px-4 py-3 bg-[#f8fafc] cursor-pointer">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div>
                    <FormLabel className="text-sm font-medium text-[#0f172a] cursor-pointer">オリジナルイラストの作成を希望する</FormLabel>
                    <FormDescription className="text-xs text-[#94a3b8]">写真で伝わりにくい強みや、スタッフの似顔絵などを手描きで作成します（有料プラン対象）。</FormDescription>
                  </div>
                </FormItem>
              )} />
              {form.watch("wantsIllustration") && (
                <FormField control={form.control} name="illustrationDetails" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-[#475569]">イラストのご要望</FormLabel>
                    <FormControl><Input placeholder="例：代表の似顔絵、作業風景の解説など" {...field} className="bg-white border-[#e2e8f0] text-sm h-9" /></FormControl>
                  </FormItem>
                )} />
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5" style={{boxShadow: "0 1px 3px rgba(0,0,0,0.06)"}}>
            <p className="text-xs text-[#94a3b8] mb-4 text-center leading-relaxed">
              送信することで、<a href="/terms" target="_blank" className="underline hover:text-[#10b981]">利用規約</a>および<a href="/privacy" target="_blank" className="underline hover:text-[#10b981]">プライバシーポリシー</a>に同意したものとみなします。入力情報はAIによる診断とサポート履歴の蓄積（匿名化）に利用されます。
            </p>
            <Button type="submit" className="w-full h-12 text-base font-semibold bg-[#10b981] hover:bg-[#059669] text-white rounded-lg" disabled={isSubmitting}>
              {isSubmitting ? "診断中... (約10〜20秒かかります)" : "無料でWeb診断する"}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
}
