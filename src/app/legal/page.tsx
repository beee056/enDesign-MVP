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
  ["所在地", "茨城県つくば市谷田部1144-392"],
  ["電話番号", "請求をいただいた場合に遅滞なく開示します。電話相談は提供しておらず、お問い合わせはメールまたは面談予約ページで承ります。"],
  ["メールアドレス", "info@p-quest.com"],
  ["サイトURL", "https://endesign.p-quest.com"],
  ["販売価格", "LP制作150,000円（税込）。事例掲載条件に同意いただける場合110,000円（税込）。標準範囲は1ページ最大7セクション、オリジナルイラスト1点、合意範囲内の公開前修正1回等です。運用・保守は任意で月額5,000円（税込）。追加作業は事前見積りです。"],
  ["商品代金以外の料金", "銀行振込手数料、有料素材、撮影、外部予約・決済・メール等の利用料、個別見積りで明示した第三者費用。"],
  ["支払方法・時期", "銀行振込その他個別契約で定める方法。標準は契約時50%、残額は検収完了後7日以内です。"],
  ["役務の提供時期", "契約成立、着手金入金、必要素材・情報の受領後から約1か月を目安とし、個別契約の納期を優先します。素材・確認の遅れや追加変更がある場合は事前に調整します。"],
  ["修正・追加作業", "制作料金に、合意範囲内の公開前修正1回を含みます。追加ページ、大幅な構成変更、新機能等は内容・金額・納期影響を提示し、承認後に着手します。"],
  ["納品・サービスと権利", "納品とは、確認用または公開用Webサイトへのアクセスを可能にし、完成通知を行うことをいいます。当社管理の制作物を、制作契約が有効に存続する期間中に利用いただく管理・利用許諾型サービスです。ソースコード、編集可能データ、テンプレート、プロンプト等は、個別契約に明記した場合を除き納品・譲渡しません。月額保守への加入は任意であり、保守未加入のみを理由に公開を停止しません。"],
  ["契約終了時", "30日前までの通知で運用・保守を終了できます。終了時は公開および利用許諾を終了し、当社管理の公開URLを停止します。お客様名義の独自ドメインはお客様に帰属し、当社はDNS接続等の管理を終了します。継続利用や制作データの買い取りは別途契約です。"],
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
        <p className={styles.updated}>最終更新日：2026年9月20日</p>
      </section>
      <div className={styles.body}>
        <p className={styles.lead}>enDesignのWeb制作・運用保守に関する主な販売条件です。案件固有の成果物、金額、納期、権利条件は、個別契約書・仕様書・見積書で確定します。</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}><caption className={styles.srOnly}>enDesignの販売条件</caption><tbody>{rows.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table>
        </div>
        <p className={styles.note}>電話番号の開示をご希望の場合は、上記メールアドレスへご請求ください。申込みの意思決定に先立って確認できるよう対応します。面談は<a href="https://calendar.app.google/BXkqAHMvNuv1TVn8A" target="_blank" rel="noreferrer">面談予約ページ（新しいタブで開きます）</a>からご予約いただけます。</p>
      </div>
      <footer className={styles.footer}><Link href="/">enDesign</Link><small>© PIVOT&amp;QUEST Inc.</small></footer>
    </main>
  );
}
