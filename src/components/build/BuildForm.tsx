"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildSchema, type BuildInput } from "@/lib/validations/build";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { submitBuild } from "@/lib/actions/build";

export function BuildForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<BuildInput>({
    resolver: zodResolver(buildSchema),
    defaultValues: {
      planId: "standard",
      pagePurpose: "",
      targetAudience: "",
      businessStrength: "",
      services: "",
      pricing: "",
      faq: "",
      accessInfo: "",
      contactMethod: "",
      designTone: "",
      referenceUrl: "",
      wantsIllustration: false,
    },
  });

  async function onSubmit(data: BuildInput) {
    setIsSubmitting(true);
    try {
      const result = await submitBuild(data);
      if (result.success) {
        alert("サイト構成の生成が完了しました！");
        router.push(`/sites/${result.siteSlug}`);
      }
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>サイト制作お申し込み</CardTitle>
        <CardDescription>
          入力内容と事前調査をもとに、LPの構成・文章・デザイン案を作成します。AIによる整理後、公開前に人が確認します。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* プラン選択 */}
            <FormField control={form.control} name="planId" render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>プラン選択</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-md">
                      <FormControl><RadioGroupItem value="standard" /></FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        基本LP制作 (¥150,000・税別)<br/><span className="text-sm text-muted-foreground">調査・設計・実装・修正1回</span>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-md bg-primary/5">
                      <FormControl><RadioGroupItem value="case-public" /></FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        事例公開協力 (¥110,000・税別)<br/><span className="text-sm text-muted-foreground">制作事例として公開許可をいただける場合</span>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-md">
                      <FormControl><RadioGroupItem value="custom" /></FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        オプション相談 (別途見積り)<br/><span className="text-sm text-muted-foreground">ページ追加・機能追加など</span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* 事業の深掘り */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">事業について教えてください</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="pagePurpose" render={({ field }) => (
                  <FormItem>
                    <FormLabel>ページの目的</FormLabel>
                    <FormControl><Input placeholder="例: 新規顧客の予約を増やしたい" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="targetAudience" render={({ field }) => (
                  <FormItem>
                    <FormLabel>誰に届けたいか</FormLabel>
                    <FormControl><Input placeholder="例: 30代の働く女性" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="businessStrength" render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>事業の強み・こだわり</FormLabel>
                    <FormControl><Textarea placeholder="例: 地元のオーガニック食材のみを使用している点" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            {/* コンテンツ情報 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">掲載したい内容</h3>
              <div className="grid grid-cols-1 gap-4">
                <FormField control={form.control} name="services" render={({ field }) => (
                  <FormItem>
                    <FormLabel>メニュー / サービス内容</FormLabel>
                    <FormControl><Textarea placeholder="箇条書きでご記入ください" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="pricing" render={({ field }) => (
                  <FormItem>
                    <FormLabel>料金</FormLabel>
                    <FormControl><Textarea placeholder="主な料金体系" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="faq" render={({ field }) => (
                  <FormItem>
                    <FormLabel>よくある質問</FormLabel>
                    <FormControl><Textarea placeholder="よく聞かれる質問と回答" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="accessInfo" render={({ field }) => (
                    <FormItem>
                      <FormLabel>アクセス情報</FormLabel>
                      <FormControl><Input placeholder="住所、最寄り駅など" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="contactMethod" render={({ field }) => (
                    <FormItem>
                      <FormLabel>予約/問い合わせ方法</FormLabel>
                      <FormControl><Input placeholder="電話番号、LINEリンクなど" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>
            </div>

            {/* デザイン */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">デザインのご希望</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="designTone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>好きな雰囲気</FormLabel>
                    <FormControl><Input placeholder="例: あたたかみのある、ナチュラルな感じ" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="referenceUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>参考サイトURL (任意)</FormLabel>
                    <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="wantsIllustration" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <FormLabel className="font-normal">手描きイラストを希望する（無料または追加オプション）</FormLabel>
                  </FormItem>
                )} />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "AIがサイトを生成中..." : "この内容でサイト生成を開始する"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
