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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    resolver: zodResolver(diagnosisSchema),
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
    <Card className="w-full max-w-3xl mx-auto shadow-sm border-slate-200">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6 rounded-t-xl">
        <CardTitle className="text-2xl text-slate-900">無料Web診断・ご相談フォーム</CardTitle>
        <CardDescription className="text-base text-slate-600 mt-2">
          現状の課題やご希望をお聞かせください。<br className="hidden md:inline" />
          入力内容をもとにAIと専門スタッフが無料で診断し、「自分で直せること」「お金をかけなくていいこと」をアドバイスします。
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            
            {/* Step 1: 基本情報 */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-primary/10 text-primary font-bold w-8 h-8 rounded-full flex items-center justify-center mr-3">1</div>
                <h3 className="text-xl font-bold text-slate-900">基本情報</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-11">
                <FormField control={form.control} name="businessName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>事業者名 (必須)</FormLabel>
                    <FormControl><Input placeholder="株式会社enDesign" {...field} className="bg-white" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="contactName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>担当者名 (必須)</FormLabel>
                    <FormControl><Input placeholder="山田 太郎" {...field} className="bg-white" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス (必須)</FormLabel>
                    <FormControl><Input type="email" placeholder="info@example.com" {...field} className="bg-white" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>電話番号 (任意)</FormLabel>
                    <FormControl><Input placeholder="03-1234-5678" {...field} className="bg-white" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="industry" render={({ field }) => (
                  <FormItem>
                    <FormLabel>業種 (必須)</FormLabel>
                    <FormControl><Input placeholder="美容室、飲食店、工務店など" {...field} className="bg-white" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="region" render={({ field }) => (
                  <FormItem>
                    <FormLabel>地域 (必須)</FormLabel>
                    <FormControl><Input placeholder="東京都渋谷区" {...field} className="bg-white" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="hasPhysicalStore" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-slate-50">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>実店舗・事業所がある</FormLabel>
                      <FormDescription>Googleマップ対策が必要な場合はチェックを入れてください。</FormDescription>
                    </div>
                  </FormItem>
                )} />
              </div>
            </div>

            {/* Step 2: 現在のWeb状況 */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-primary/10 text-primary font-bold w-8 h-8 rounded-full flex items-center justify-center mr-3">2</div>
                <h3 className="text-xl font-bold text-slate-900">現在のWeb状況</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4 pl-11">
                <FormField control={form.control} name="websiteUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>現在のWebサイトURL (任意)</FormLabel>
                    <FormControl><Input placeholder="https://example.com" {...field} className="bg-white" /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="googleMapsUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>GoogleマップのURL (任意)</FormLabel>
                    <FormControl><Input placeholder="Googleマップの共有リンク" {...field} className="bg-white" /></FormControl>
                  </FormItem>
                )} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="instagramUrl" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagramアカウント (任意)</FormLabel>
                      <FormControl><Input placeholder="@account_name" {...field} className="bg-white" /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="lineUrl" render={({ field }) => (
                    <FormItem>
                      <FormLabel>公式LINE (任意)</FormLabel>
                      <FormControl><Input placeholder="リンクまたはID" {...field} className="bg-white" /></FormControl>
                    </FormItem>
                  )} />
                </div>
              </div>
            </div>

            {/* Step 3: 目的と悩み */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-primary/10 text-primary font-bold w-8 h-8 rounded-full flex items-center justify-center mr-3">3</div>
                <h3 className="text-xl font-bold text-slate-900">目的と悩み</h3>
              </div>
              
              <div className="space-y-8 pl-11">
                <FormField control={form.control} name="purposes" render={() => (
                  <FormItem>
                    <div className="mb-3"><FormLabel className="text-base font-bold text-slate-800">目的 (複数選択可)</FormLabel></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PURPOSES.map((item) => (
                        <FormField key={item} control={form.control} name="purposes" render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-200 p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                            <FormControl>
                              <Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(field.value?.filter((value) => value !== item))
                              }} />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer w-full">{item}</FormLabel>
                          </FormItem>
                        )} />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="pains" render={() => (
                  <FormItem>
                    <div className="mb-3"><FormLabel className="text-base font-bold text-slate-800">悩み・課題 (複数選択可)</FormLabel></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PAINS.map((item) => (
                        <FormField key={item} control={form.control} name="pains" render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-200 p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                            <FormControl>
                              <Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(field.value?.filter((value) => value !== item))
                              }} />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer w-full">{item}</FormLabel>
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
            <div className="space-y-6 border-t border-slate-100 pt-8">
              <div className="flex items-center">
                <div className="bg-primary/10 text-primary font-bold w-8 h-8 rounded-full flex items-center justify-center mr-3">4</div>
                <h3 className="text-xl font-bold text-slate-900">制作・サポートのご希望</h3>
              </div>
              
              <div className="space-y-6 pl-11">
                <FormField control={form.control} name="currentVendorStatus" render={({ field }) => (
                  <FormItem>
                    <FormLabel>現在のWeb業者の有無・不満など (任意)</FormLabel>
                    <FormControl><Input placeholder="例：月額1万円払っているが何もしてくれない" {...field} className="bg-white" /></FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="buildPreferences" render={() => (
                  <FormItem>
                    <div className="mb-3"><FormLabel className="text-base">制作の進め方 (複数選択可)</FormLabel></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {BUILD_PREFERENCES.map((item) => (
                        <FormField key={item} control={form.control} name="buildPreferences" render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(field.value?.filter((value) => value !== item))
                              }} />
                            </FormControl>
                            <FormLabel className="font-normal">{item}</FormLabel>
                          </FormItem>
                        )} />
                      ))}
                    </div>
                  </FormItem>
                )} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="budget" render={({ field }) => (
                    <FormItem>
                      <FormLabel>想定のご予算感 (任意)</FormLabel>
                      <FormControl><Input placeholder="例：なるべく0円で、5万円まで 等" {...field} className="bg-white" /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="referralCode" render={({ field }) => (
                    <FormItem>
                      <FormLabel>紹介コード (お持ちの方)</FormLabel>
                      <FormControl><Input placeholder="知人からの紹介コード" {...field} className="bg-white" /></FormControl>
                    </FormItem>
                  )} />
                </div>
                
                <FormField control={form.control} name="wantsIllustration" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-slate-50">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>オリジナルイラストの作成を希望する</FormLabel>
                      <FormDescription>写真で伝わりにくい強みや、スタッフの似顔絵などを手描きで作成します（有料プラン対象）。</FormDescription>
                    </div>
                  </FormItem>
                )} />
                
                {form.watch("wantsIllustration") && (
                  <FormField control={form.control} name="illustrationDetails" render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>イラストのご要望</FormLabel>
                      <FormControl><Input placeholder="例：代表の似顔絵、作業風景の解説など" {...field} className="bg-white" /></FormControl>
                    </FormItem>
                  )} />
                )}
              </div>
            </div>

            <div className="pt-6">
              <p className="text-sm text-slate-500 mb-4 text-center">
                送信することで、<a href="/terms" target="_blank" className="underline hover:text-primary">利用規約</a>および<a href="/privacy" target="_blank" className="underline hover:text-primary">プライバシーポリシー</a>に同意したものとみなします。<br/>
                ※入力情報はAIによる診断とサポート履歴の蓄積（匿名化）に利用されます。
              </p>
              <Button type="submit" className="w-full h-14 text-lg font-bold shadow-md rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? "診断中... (約10〜20秒かかります)" : "無料でWeb診断する"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
