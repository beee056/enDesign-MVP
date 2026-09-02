import type { Metadata } from "next";
import Link from "next/link";
import styles from "../policy.module.css";

export const metadata: Metadata = {
  title: "利用規約 | enDesign",
  description: "enDesignのWeb制作・運用保守サービス利用規約です。",
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.logo} href="/">enDesign</Link>
        <Link className={styles.back} href="/">トップへ戻る</Link>
      </header>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>TERMS OF SERVICE</p>
        <h1>利用規約</h1>
        <p className={styles.updated}>最終更新日：2026年9月2日</p>
      </section>
      <div className={styles.body}>
        <p className={styles.lead}>本規約は、株式会社PIVOT&amp;QUESTが提供するenDesignの無料Web診断、Web制作、公開支援および運用・保守に適用されます。案件固有の条件は個別契約書・仕様書・見積書で確定します。</p>
        <section className={styles.section}><h2>第1条　契約と優先順位</h2><p>有料業務は、成果物、金額、支払条件、納期等を記録が残る方法で合意した時に成立します。内容が矛盾する場合は、個別契約書、合意済み仕様書・見積書、本規約の順で優先します。</p></section>
        <section className={styles.section}><h2>第2条　制作内容・料金</h2><p>標準LP制作は150,000円（税別・税込165,000円）です。事例掲載条件に別途同意いただける場合は110,000円（税別・税込121,000円）です。標準範囲は1ページ、スマートフォン対応、構成・文章支援、オリジナルイラスト、合意範囲内の公開前修正1回、外部問い合わせ導線および公開設定です。</p><p>追加ページ、撮影、有料素材、新機能、大幅な構成変更等は、追加内容・金額・納期影響を提示し、承認後に着手します。</p></section>
        <section className={styles.section}><h2>第3条　支払・着手・納期</h2><p>標準の支払条件は契約時50%、検収完了後7日以内に50%です。契約成立、着手金入金、主要素材・情報の受領がそろった日を着手日とし、納期は約1か月を目安とします。お客様による素材提出・確認の遅れ、追加変更、外部サービスの審査等がある場合は工程を調整します。</p></section>
        <section className={styles.section}><h2>第4条　お客様提供素材</h2><p>写真、ロゴ、文章、商標、人物情報等は、必要な著作権・肖像権・利用許諾を得たものをご提供ください。事業内容、価格、許認可、専門法令への適合性は、公開前にお客様が最終確認するものとします。</p></section>
        <section className={styles.section}><h2>第5条　確認・検収・公開</h2><p>お客様は、原則として納品後5営業日以内に表示、リンク、フォーム、文言を確認し、契約内容との具体的な不一致を通知します。公開は、検収、残金支払、写真・口コミ等の必要な権利確認が完了した後に行います。</p></section>
        <section className={styles.section}><h2>第6条　権利・イラスト・AI素材</h2><ul><li>お客様提供素材の権利は、お客様または正当な権利者に留保されます。</li><li>個別契約で譲渡または利用許諾の対象としたデザイン・文章・コードは、報酬完済後に合意範囲で利用できます。汎用ノウハウ、テンプレート、ライブラリ、第三者素材は対象外です。</li><li>手描きイラストの著作権は、別途譲渡合意がない限り制作者に留保され、対象Webサイト・公式SNSでの利用を標準範囲とします。</li><li>AIは構成・文章・画像の下書きや検証補助に利用する場合があります。人が事実、権利、表現、品質を確認します。AI生成物は第三者権利を侵害しないことや独占的な権利取得を保証するものではなく、必要に応じて人が修正・差替えます。</li></ul></section>
        <section className={styles.section}><h2>第7条　運用・保守</h2><p>月額5,000円（税別・税込5,500円）で、ドメイン・サーバー管理および月30分までの軽微な文言・画像差替え等を行います。新ページ、新機能、大幅なレイアウト変更、撮影、24時間監視、外部サービス自体の復旧保証は含みません。</p><p>採用環境で可能な場合、バックアップは週1回、4世代または30日を目安に保持します。復元可能な範囲は利用する外部サービスの仕様に従い、完全な復元や無停止を保証するものではありません。</p></section>
        <section className={styles.section}><h2>第8条　保守の終了・データ引継ぎ</h2><p>最低契約期間は設けず、30日前までの通知で終了できます。終了時は、残金・外部費用の精算後、ドメイン、公開データ、顧客提供素材、移管可能なソースおよび必要な管理情報の引継ぎ方法を確認します。汎用テンプレート、制作ツール、第三者ライセンス、内部運用情報は引渡対象外です。</p><p>移管または返却後、運用バックアップは原則30日以内に削除します。ただし、契約・請求・取引記録等、法令または正当な業務上の理由で保存が必要な情報は所定期間保持します。</p></section>
        <section className={styles.section}><h2>第9条　キャンセル・中途終了</h2><p>契約成立前のキャンセルは無料です。制作着手後にお客様都合で終了する場合、完了済み作業、取消不能な第三者費用、承認済み追加費用を明細化し、契約総額を上限として精算します。未使用の前払金がある場合は精算後に返金します。</p></section>
        <section className={styles.section}><h2>第10条　成果の非保証・外部サービス</h2><p>検索順位、アクセス数、問い合わせ数、売上、採用数等の成果は保証しません。Vercel、Google、SNS、予約・決済等の外部サービスの料金、審査、停止、障害、仕様変更、データ消失は各提供者の条件に従います。</p></section>
        <section className={styles.section}><h2>第11条　禁止事項・契約解除</h2><p>違法行為、第三者の権利侵害、不正アクセス、虚偽情報の掲載、安全確保が困難な指示を禁止します。重大な契約違反や支払遅延があり、相当期間を設けた是正要請にも応じない場合は、業務の中断または契約解除ができるものとします。</p></section>
        <section className={styles.section}><h2>第12条　責任・協議</h2><p>当社の責めに帰すべき事由による直接かつ通常の損害について、法令上制限できない場合を除き、当該契約で受領した報酬総額を責任上限とします。本規約に定めのない事項や疑義は、当事者間で誠実に協議します。</p></section>
        <p className={styles.note}>本ページは公開用の共通条件です。実際の案件では、重要事項説明、個別契約書、仕様書、見積書および必要な付属規約を確認してください。</p>
      </div>
      <footer className={styles.footer}><Link href="/">enDesign</Link><small>© PIVOT&amp;QUEST Inc.</small></footer>
    </main>
  );
}
