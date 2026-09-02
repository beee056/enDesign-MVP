import type { Metadata } from "next";
import Link from "next/link";
import styles from "../policy.module.css";

export const metadata: Metadata = {
  title: "プライバシーポリシー | enDesign",
  description: "enDesignにおける個人情報の取扱い方針です。",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.logo} href="/">enDesign</Link>
        <Link className={styles.back} href="/">トップへ戻る</Link>
      </header>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>PRIVACY POLICY</p>
        <h1>プライバシー<br />ポリシー</h1>
        <p className={styles.updated}>最終更新日：2026年9月2日</p>
      </section>
      <div className={styles.body}>
        <p className={styles.lead}>株式会社PIVOT&amp;QUEST（以下「当社」）は、enDesignに関して取得する個人情報を、以下の方針に基づき取り扱います。</p>
        <section className={styles.section}><h2>1. 取得する情報</h2><p>氏名、事業者名、地域、メールアドレス、電話番号、Webサイト・SNS情報、相談内容、予算・時期、フォーム回答、契約・請求・支払情報、アクセス・通信記録等を取得する場合があります。</p></section>
        <section className={styles.section}><h2>2. 利用目的</h2><ul><li>無料Web診断、相談、本人確認および連絡</li><li>調査、提案、見積り、契約、制作、公開、保守および請求</li><li>問い合わせ対応、品質・安全性の改善、不正利用防止</li><li>法令対応、紛争対応および権利保護</li><li>別途同意を得た事例掲載</li></ul></section>
        <section className={styles.section}><h2>3. AI・外部サービスの利用</h2><p>構成・文章の下書き、情報整理、画像案、検証補助等に外部AIサービスを利用する場合があります。秘密情報・個人情報は、業務上必要な範囲および同意・契約上許容される範囲で取り扱い、人が事実・表現・品質を確認します。</p><p>制作、サーバー、フォーム、メール、電子契約、会計等を外部事業者へ委託する場合、必要な範囲で情報を取り扱わせ、契約・選定・監督を行います。</p></section>
        <section className={styles.section}><h2>4. 第三者提供</h2><p>法令に基づく場合、生命・身体・財産の保護に必要な場合、業務委託に必要な場合、合併・事業承継等の場合を除き、本人の同意なく個人情報を第三者へ提供しません。</p></section>
        <section className={styles.section}><h2>5. 安全管理・保存期間</h2><p>アクセス制御、認証、共有範囲の管理、バックアップ、端末管理、不要データ削除、事故時の調査・連絡等を行います。情報は利用目的、契約、法令上の保存義務に必要な期間保持し、その後削除または匿名化します。</p></section>
        <section className={styles.section}><h2>6. 開示・訂正・利用停止等</h2><p>本人確認のうえ、保有個人データの利用目的通知、開示、訂正、追加、削除、利用停止等の請求に法令に従って対応します。</p></section>
        <section className={styles.section}><h2>7. お問い合わせ</h2><p>本ポリシーに関するお問い合わせは、info@p-quest.com までご連絡ください。</p></section>
        <p className={styles.note}>利用する外部サービスや国外移転の実態に重要な変更がある場合は、本ポリシーを更新します。</p>
      </div>
      <footer className={styles.footer}><Link href="/">enDesign</Link><small>© PIVOT&amp;QUEST Inc.</small></footer>
    </main>
  );
}
