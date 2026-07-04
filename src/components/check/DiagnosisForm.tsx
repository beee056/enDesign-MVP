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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  "自分で作りたい", "一緒に作りたい", "ほとんど任せたい", "まず診断だけでいい", "予算を抑えたい", "イラストも欲しい"
];

const DESIGN_TONES = [
  "やさしい", "信頼感", "親しみやすい", "明るい", "落ち着いた", "地域密着", "しっかり専門的", "シンプル", "手描き感"
];

import { useRouter } from "next/navigation";
import { submitDiagnosis } from "@/lib/actions/diagnosis";

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
      buildPreferences: [],
      designTones: [],
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
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Web診断・制作サポート お申し込みフォーム</CardTitle>
        <CardDescription>
          現状の課題やご希望を入力してください。入力内容をもとにAIと専門スタッフが無料で診断いたします。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* 基本情報 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">基本情報</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="businessName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>事業者名 (必須)</FormLabel>
                    <FormControl><Input placeholder="株式会社enDesign" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="contactName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>担当者名 (必須)</FormLabel>
                    <FormControl><Input placeholder="山田 太郎" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス (必須)</FormLabel>
                    <FormControl><Input type="email" placeholder="info@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>電話番号 (任意)</FormLabel>
                    <FormControl><Input placeholder="03-1234-5678" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="industry" render={({ field }) => (
                  <FormItem>
                    <FormLabel>業種 (必須)</FormLabel>
                    <FormControl><Input placeholder="美容室、飲食店など" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="region" render={({ field }) => (
                  <FormItem>
                    <FormLabel>地域 (必須)</FormLabel>
                    <FormControl><Input placeholder="東京都渋谷区" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            {/* 目的と悩み */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">目的と悩み</h3>
              
              <FormField control={form.control} name="purposes" render={() => (
                <FormItem>
                  <div className="mb-4"><FormLabel className="text-base">目的 (複数選択可)</FormLabel></div>
                  <div className="grid grid-cols-2 gap-2">
                    {PURPOSES.map((item) => (
                      <FormField key={item} control={form.control} name="purposes" render={({ field }) => (
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
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="pains" render={() => (
                <FormItem>
                  <div className="mb-4"><FormLabel className="text-base">悩み (複数選択可)</FormLabel></div>
                  <div className="grid grid-cols-2 gap-2">
                    {PAINS.map((item) => (
                      <FormField key={item} control={form.control} name="pains" render={({ field }) => (
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
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "送信中..." : "無料で診断する"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
