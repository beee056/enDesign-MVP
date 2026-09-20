import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuickDiagnosis } from "@/components/check/QuickDiagnosis";
import styles from "./check.module.css";

export const metadata: Metadata = {
  title: "2〜3分の無料Web診断｜enDesign",
  description: "7つの質問に答えるだけで、Webの優先課題と次にできることがその場で分かります。個人情報の入力は不要です。",
  alternates: { canonical: "/check" },
};

export default function CheckPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="enDesign トップページ">
          <Image src="/brand/logo.png" alt="enDesign" width={1565} height={820} priority />
        </Link>
        <p>2〜3分・個人情報の入力なし</p>
      </header>
      <main><QuickDiagnosis /></main>
      <footer className={styles.footer}>© 2026 enDesign / PIVOT&amp;QUEST</footer>
    </div>
  );
}
