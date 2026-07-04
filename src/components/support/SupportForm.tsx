"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supportSchema, type SupportInput } from "@/lib/validations/support";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { submitSupport } from "@/lib/actions/support";

const CATEGORIES = [
  "使い方について", "料金・プランについて", "内容の修正依頼", "エラー・不具合", "解約について", "その他"
];

export function SupportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<SupportInput>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      businessName: "",
      email: "",
      category: "",
      subject: "",
      body: "",
    },
  });

  async function onSubmit(data: SupportInput) {
    setIsSubmitting(true);
    try {
      const result = await submitSupport(data);
      if (result.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto text-center py-12">
        <CardTitle className="text-2xl text-green-600 mb-4">お問い合わせを受け付けました</CardTitle>
        <CardDescription className="text-base">
          担当者が確認次第、メールにてご返信いたします。
          （ご質問内容は匿名化のうえ、他の方の参考になるようFAQとして公開される場合がございます）
        </CardDescription>
        <Button className="mt-8" onClick={() => setSubmitted(false)}>別のお問い合わせをする</Button>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>サポート・お問い合わせ</CardTitle>
        <CardDescription>
          お困りのことや修正のご依頼はこちらからご連絡ください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="businessName" render={({ field }) => (
              <FormItem>
                <FormLabel>事業者名 (必須)</FormLabel>
                <FormControl><Input placeholder="株式会社enDesign" {...field} /></FormControl>
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

            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>カテゴリ (必須)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="お問い合わせの種類を選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="subject" render={({ field }) => (
              <FormItem>
                <FormLabel>件名 (必須)</FormLabel>
                <FormControl><Input placeholder="例: 営業時間の変更方法について" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="body" render={({ field }) => (
              <FormItem>
                <FormLabel>お問い合わせ内容 (必須)</FormLabel>
                <FormControl><Textarea className="min-h-[150px]" placeholder="詳細をご記入ください" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "送信中..." : "送信する"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
