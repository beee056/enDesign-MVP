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
        <p className={styles.updated}>最終更新日：2026年9月20日</p>
      </section>
      <div className={styles.body}>
        <p className={styles.lead}>株式会社PIVOT&amp;QUEST（以下「当社」）は、enDesignに関して取得する個人情報を、以下の方針に基づき取り扱います。</p>
        <section className={styles.section}><h2>1. 取得する情報</h2><p>氏名、事業者名、所在地・地域、メールアドレス、希望する連絡方法、Webサイト・SNS・Googleビジネスプロフィール等の情報、第1段階・第2段階のGoogleフォーム回答、相談内容、課題、予算・希望時期、面談予約日時、契約・請求・支払情報、アクセス・通信記録等を取得する場合があります。Webサイト上の7問の簡易診断はブラウザ内で処理され、回答内容は当社へ送信されません。電話相談は提供しておらず、電話番号を必須情報として取得しません。</p></section>
        <section className={styles.section}><h2>2. 利用目的</h2><ul><li>Webサイト上での無料Web診断の判定および結果表示</li><li>第1段階・第2段階フォームの回答照合、相談対応、本人・事業者確認および連絡</li><li>面談予約、調査、提案、見積り、契約、制作、公開、公開基盤利用および請求</li><li>問い合わせ対応、品質・安全性の改善、不正利用防止</li><li>法令対応、紛争対応および権利保護</li><li>制作契約で包括的な同意を得た実績紹介、SNS、広告、営業資料および制作例への掲載</li></ul><p>診断結果のPDFは、利用者がブラウザの印刷・保存機能で端末内に作成するもので、保存したPDFの内容が保存操作だけで当社へ送信されることはありません。実績利用の対象に秘密情報、未公開情報、フォーム回答その他の個人情報は含みません。</p></section>
        <section className={styles.section}><h2>3. AI・外部サービスの利用</h2><p>構成・文章の下書き、情報整理、画像案、検証補助等に外部AIサービスを利用する場合があります。個人情報・秘密情報は、業務上必要な範囲かつ各サービスの設定・契約上許容される範囲に限定し、人が事実・表現・品質を確認します。</p><p>Google Forms、Google Drive、Google Calendar、Vercel、メール、電子契約、会計その他のクラウドサービスを利用し、または制作・イラスト等を外部事業者へ委託する場合があります。その場合、必要な範囲に限定し、提供者の公表情報、契約、アクセス権限および取扱状況を確認します。</p></section>
        <section className={styles.section}><h2>4. 第三者提供</h2><p>法令に基づく場合、生命・身体・財産の保護に必要な場合、業務委託に必要な場合、合併・事業承継等の場合を除き、本人の同意なく個人情報を第三者へ提供しません。</p></section>
        <section className={styles.section}><h2>5. 安全管理・保存期間・契約終了時の取扱い</h2><p>アクセス制御、認証、共有範囲の管理、バックアップ、端末管理、不要データ削除、事故時の調査・連絡等を行います。情報は利用目的、契約、法令上の保存義務に必要な期間保持し、その後削除または匿名化します。当社アカウント内で管理する、契約者が提供した問い合わせ・申込情報その他の契約者固有データ（制作物・制作データを除きます）は、契約終了後30日以内の請求により、利用サービスが対応する一般的な形式で契約者へ提供します。請求がない場合は契約終了後60日以内、提供した場合は提供後30日以内に削除します。ただし、法令または正当な業務上の理由で保存が必要な記録を除きます。</p></section>
        <section className={styles.section}><h2>6. 開示・訂正・利用停止等</h2><p>本人確認のうえ、保有個人データの利用目的通知、開示、訂正、追加、削除、利用停止等の請求に法令に従って対応します。</p></section>
        <section className={styles.section}><h2>7. お問い合わせ</h2><p>株式会社PIVOT&amp;QUEST（所在地：茨城県つくば市谷田部1144-392、代表者・担当：田邊勇人）<br />本ポリシーに関する開示・訂正・利用停止等の正式なご請求は、<a href="mailto:info@p-quest.com">info@p-quest.com</a>までご連絡ください。一般の面談は、<a href="https://calendar.app.google/BXkqAHMvNuv1TVn8A" target="_blank" rel="noreferrer">面談予約ページ（新しいタブで開きます）</a>から予約できます。</p></section>
        <p className={styles.note}>利用する外部サービスや国外移転の実態に重要な変更がある場合は、本ポリシーを更新します。</p>
      </div>
      <footer className={styles.footer}><Link href="/">enDesign</Link><small>© PIVOT&amp;QUEST Inc.</small></footer>
    </main>
  );
}
