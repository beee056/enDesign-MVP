import type { Metadata } from "next";
import Link from "next/link";
import styles from "../policy.module.css";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | enDesign",
  description: "enDesignの販売条件、支払方法、納期、キャンセル等の表示です。",
};

const rows = [
  ["販売事業者", "株式会社PIVOT&QUEST（サービス名：enDesign）"],
  ["代表責任者", "田邊 勇人（代表取締役）"],
  ["所在地", "茨城県つくば市。詳細住所は、請求をいただいた場合に申込みの判断前に十分な余裕をもって遅滞なく開示します。"],
  ["電話番号", "請求をいただいた場合に遅滞なく開示します。お問い合わせは原則メールで承ります。"],
  ["メールアドレス", "info@p-quest.com"],
  ["サイトURL", "https://en-design-mvp.vercel.app"],
  ["販売価格", "LP制作150,000円（税別・税込165,000円）。事例掲載条件に同意いただける場合110,000円（税別・税込121,000円）。運用・保守は月額5,000円（税別・税込5,500円）。追加作業は事前見積りです。"],
  ["商品代金以外の料金", "銀行振込手数料、有料素材、撮影、外部予約・決済・メール等の利用料、個別見積りで明示した第三者費用。"],
  ["支払方法・時期", "銀行振込その他個別契約で定める方法。標準は契約時50%、残額は検収完了後7日以内です。"],
  ["役務の提供時期", "契約成立、着手金入金、必要素材・情報の受領後から約1か月を目安とし、個別契約の納期を優先します。素材・確認の遅れや追加変更がある場合は事前に調整します。"],
  ["修正・追加作業", "制作料金に、合意範囲内の公開前修正1回を含みます。追加ページ、大幅な構成変更、新機能等は内容・金額・納期影響を提示し、承認後に着手します。"],
  ["キャンセル・返金", "契約成立前は無料です。制作着手後にお客様都合で終了する場合は、完了済み作業、取消不能な第三者費用、承認済み追加費用を明細化して精算します。デジタル役務の性質上、検収・納品後のお客様都合による返金は原則として承りません。"],
] as const;

export default function LegalPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.logo} href="/">enDesign</Link>
        <Link className={styles.back} href="/">トップへ戻る</Link>
      </header>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>LEGAL INFORMATION</p>
        <h1>特定商取引法に<br />基づく表記</h1>
        <p className={styles.updated}>最終更新日：2026年9月2日</p>
      </section>
      <div className={styles.body}>
        <p className={styles.lead}>enDesignのWeb制作・運用保守に関する主な販売条件です。案件固有の成果物、金額、納期、権利条件は、個別契約書・仕様書・見積書で確定します。</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}><tbody>{rows.map(([label, value]) => <tr key={label}><th>{label}</th><td>{value}</td></tr>)}</tbody></table>
        </div>
        <p className={styles.note}>住所・電話番号の開示をご希望の場合は、上記メールアドレスへご請求ください。申込みの意思決定に先立って確認できるよう対応します。</p>
      </div>
      <footer className={styles.footer}><Link href="/">enDesign</Link><small>© PIVOT&amp;QUEST Inc.</small></footer>
    </main>
  );
}
