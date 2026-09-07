import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/landing/TrackedLink";
import styles from "./home.module.css";

const concerns = [
  { image: "/brand/story/concern-website.webp", title: "何から手をつければいいか分からない", alt: "Web制作の進め方に悩む人の手描きイラスト" },
  { image: "/brand/story/concern-price.webp", title: "費用の相場がよく分からない", alt: "Web制作の費用を心配する手描きイラスト" },
  { image: "/brand/story/concern-timing.webp", title: "時間がなくて後回しになっている", alt: "時間が取れず困っている様子の手描きイラスト" },
  { image: "/brand/story/concern-sns.webp", title: "SNSとの使い分けが分からない", alt: "SNSとWebサイトの違いに悩む手描きイラスト" },
];

const firstSteps = [
  { number: "1", title: "話す", text: "いまの状況や、困りごと、やりたいことを伺います。", image: "/brand/story/step-talk.webp", alt: "相談しながら話を整理する二人のイラスト" },
  { number: "2", title: "分ける", text: "自分でできること、あとでよいこと、プロに任せることに分けます。", image: "/brand/story/step-sort.webp", alt: "付箋とペンで情報を分けるイラスト" },
  { number: "3", title: "届ける", text: "調査で見つけた強みを、伝わるページへ組み立てます。", image: "/brand/story/step-deliver.webp", alt: "海を進む帆船のイラスト" },
];

const principles = [
  ["01", "中立の立場で考える", "特定のツールや業者に偏らず、事業に合う方法を選びます。"],
  ["02", "難しい言葉を使わない", "専門用語は、初めての人にも分かる言葉に直します。"],
  ["03", "無理にすすめない", "必要がなければ、作らない選択も含めてお伝えします。"],
  ["04", "長く伴走する", "作って終わりではなく、育てていく視点で支えます。"],
] as const;

const deliverables = [
  "公開情報の横断調査・競合比較", "訴求設計・構成・文章整理", "オリジナルLPデザインと実装", "スマートフォン・PC対応",
  "問い合わせ・MAP・SNS導線", "ファビコン・OGP・基本SEO", "人が描くオリジナルイラスト", "公開前確認と修正1回",
];

const workflow = [
  ["01", "調査", "検索・SNS・口コミ・競合から、伝えるべき事実を集めます。"],
  ["02", "診断", "強み、顧客価値、差別化、足りない情報を整理します。"],
  ["03", "試作", "その事業者らしい言葉と見た目で、LPの完成像を作ります。"],
  ["04", "対話", "試作を見ながら、事実確認と必要素材をすり合わせます。"],
  ["05", "本制作", "ご提供写真と手描きイラストを反映し、公開品質に仕上げます。"],
  ["06", "公開・保守", "表示と導線を確認して公開し、必要に応じて運用を支えます。"],
];

const faqs = [
  ["相談だけでも本当に大丈夫ですか？", "はい。制作を前提にしない無料Web診断から始められます。現状を整理したうえで、制作が必要かどうかも含めてお伝えします。"],
  ["写真が手元に少なくても相談できますか？", "相談・試作段階では進められます。本制作では、実際の事業の魅力を正確に伝えるため、原則として事業者様から写真をご提供いただきます。"],
  ["AIだけで制作するサービスですか？", "いいえ。調査や整理の効率化にはAIを使いますが、事実確認、訴求判断、デザイン品質、公開判断は人が行います。最終イラストも人が描きます。"],
  ["公開後の修正はできますか？", "制作料金には公開前の修正1回が含まれます。公開後の軽微な更新は保守範囲で、大幅な追加・改修は事前のお見積りで対応します。"],
  ["納期はどのくらいですか？", "必要な写真や確認事項が揃ってから、約1か月が目安です。追加オプションなどで変わる場合は、着手前にお伝えします。"],
];

export default function Home() {
  const organizationJsonLd = JSON.stringify({
    "@context": "https://schema.org", "@type": "ProfessionalService", name: "enDesign", url: "https://en-design-mvp.vercel.app",
    description: "公開情報の調査から、事業者らしさが伝わるLPの試作・制作・公開までを支援するWeb制作サービス。", areaServed: "Japan",
  }).replace(/</g, "\\u003c");

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd }} />
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="enDesign トップページ"><Image src="/brand/logo.png" alt="enDesign" width={1565} height={820} priority /></Link>
        <nav className={styles.nav} aria-label="メインナビゲーション"><Link href="#about">私たちの考え方</Link><Link href="#works">制作事例</Link><Link href="#price">料金</Link><Link href="#flow">制作の流れ</Link></nav>
        <TrackedLink href="/check" location="header" className={styles.headerCta}>無料で相談する <span aria-hidden="true">→</span></TrackedLink>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>WEB SUPPORT FROM TSUKUBA</p>
              <h1><span>いい仕事が、</span><span>ちゃんと届くように。</span></h1>
              <p className={styles.heroLead}>Webに詳しくない事業者のための、調査から始めるLP制作。口コミ・SNS・検索・競合を先に読み解き、その事業にしかない価値を見つけます。</p>
              <div className={styles.heroActions}><TrackedLink href="/check" location="hero" className={styles.primaryCta}>無料でWeb診断を依頼する <span aria-hidden="true">→</span></TrackedLink><Link href="#approach" className={styles.textCta}>進め方を見る</Link></div>
              <ul className={styles.heroTrust}><li><b>01</b><span>相談だけでもOK</span></li><li><b>02</b><span>制作を前提にしません</span></li><li><b>03</b><span>無料相談</span></li></ul>
            </div>
            <div className={styles.heroArt}><Image src="/brand/story/hero-river-journey.webp" alt="事業者の価値が川を渡り、必要な人へ届いていく様子を表した手描きイラスト" fill priority sizes="(max-width: 840px) 100vw, 52vw" /></div>
          </div>
        </section>

        <div className={styles.storyJourney}>
        <section id="about" className={styles.concernSection}>
          <div className={styles.sectionIntro}><p className={styles.eyebrow}>START WITH YOUR CONCERNS</p><h2><span>Webのこと、</span><span>ひとりで決めなくて大丈夫です。</span></h2><p>ページを作る前に、いま困っていることと、本当に必要なことを一緒に整理します。</p></div>
          <div className={styles.concernGrid}>{concerns.map((item, index) => <article className={styles.concernCard} key={item.title}><span className={styles.flag}>{String(index + 1).padStart(2, "0")}</span><div className={styles.concernImage}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 680px) 44vw, 22vw" /></div><h3>{item.title}</h3></article>)}</div>
        </section>

        <section id="approach" className={styles.approachSection}>
          <div className={styles.approachHeading}><p className={styles.eyebrow}>TALK · SORT · DELIVER</p><h2><span>作る前に、</span><span>いったん立ち止まって考える。</span></h2></div>
          <div className={styles.stepGrid}>{firstSteps.map((step) => <article key={step.number} className={styles.stepCard}><div className={styles.stepTitle}><span>{step.number}</span><h3>{step.title}</h3></div><div className={styles.stepImage}><Image src={step.image} alt={step.alt} fill sizes="(max-width: 680px) 72vw, 26vw" /></div><p>{step.text}</p></article>)}</div>
        </section>

        <section className={styles.partnerSection}>
          <div className={styles.partnerPortrait}><Image src="/brand/story/creator-portrait.webp" alt="マグカップを持って相談を聞く制作者の手描きイラスト" fill sizes="(max-width: 760px) 76vw, 30vw" /></div>
          <div className={styles.partnerCopy}><p className={styles.eyebrow}>A PARTNER ON THE SAME BOAT</p><h2><span>同じ船に乗るように、</span><span>一緒に考えます。</span></h2><div className={styles.principleGrid}>{principles.map(([number, title, text]) => <article key={title}><span className={styles.cardNumber}>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
        </section>

        <section id="works" className={styles.worksSection}>
          <div className={styles.sectionIntro}><p className={styles.eyebrow}>WORKS & PROTOTYPES</p><h2><span>業種を並べるのではなく、</span><span>その事業らしい物語をつくる。</span></h2><p>調査で見つけた言葉、写真、背景、顧客の実感を、ひとつの伝わる体験へ編集します。</p></div>
          <div className={styles.worksGrid}>
            <article><div className={styles.browser}><span /><span /><span /><b>WEB SITE</b></div><div className={styles.workImage}><Image src="/works/corporate-case.webp" alt="地域工務店のコーポレートサイト制作イメージ" fill sizes="(max-width: 760px) 92vw, 44vw" /></div><div className={styles.workCaption}><p>地域工務店のコーポレートサイト</p><span>コーポレートサイト</span></div></article>
            <article><div className={styles.browser}><span /><span /><span /><b>LP DESIGN</b></div><div className={styles.workImage}><Image src="/works/bakery-case.webp" alt="ベーカリーカフェのLP制作イメージ" fill sizes="(max-width: 760px) 92vw, 44vw" /></div><div className={styles.workCaption}><p>ベーカリーカフェの店舗サイト</p><span>店舗LP</span></div></article>
          </div>
          <p className={styles.worksNote}>※制作イメージを含みます。公開情報を使用した提案物は、納品前に事業者本人の確認と許諾を行います。</p>
        </section>
        </div>

        <section className={styles.valueSection}>
          <div><p className={styles.eyebrow}>WHAT WE CREATE</p><h2><span>見た目より先に、</span><span>選ばれる理由を</span><span>つくる。</span></h2></div>
          <div className={styles.valueList}><article><b>01</b><div><span>RESEARCH</span><h3>顧客の言葉から強みを見つける</h3><p>口コミ、SNS、検索、競合を横断し、繰り返し現れる価値を探します。</p></div></article><article><b>02</b><div><span>HUMAN TOUCH</span><h3>写真と手描きの温度を残す</h3><p>実際の写真と、人が描くイラストを使い、事業者らしい場面をつくります。</p></div></article><article><b>03</b><div><span>HONESTY</span><h3>事実と推測を混ぜない</h3><p>架空の実績や口コミを作らず、本人確認が必要な情報を分けて扱います。</p></div></article></div>
        </section>

        <section id="price" className={styles.priceSection}>
          <div className={styles.lighthouseArt}><Image src="/brand/story/lighthouse-island.webp" alt="料金と公開後の運用を見通す灯台の手描きイラスト" fill sizes="(max-width: 760px) 70vw, 28vw" /></div>
          <div className={styles.priceContent}><div className={styles.priceHeading}><p className={styles.eyebrow}>PRICE & SCOPE</p><h2>料金と制作範囲</h2><p>含まれる内容と追加費用の境界を、制作前に確認します。</p></div><div className={styles.pricePanel}><div className={styles.priceNumbers}><p>LP制作 基本料金</p><strong>150,000<small>円／税別</small></strong><span>税込165,000円</span><hr /><p>事例公開にご協力いただける場合</p><strong className={styles.discount}>110,000<small>円／税別</small></strong><span>税込121,000円</span></div><div className={styles.includes}><p>基本料金に含まれるもの</p><ul>{deliverables.map((item) => <li key={item}><b aria-hidden="true">✓</b>{item}</li>)}</ul><div className={styles.optionBoundary}><p>追加費用になるもの</p>{["ページ・機能の追加", "写真撮影・大幅な原稿作成", "公開後の構成変更"].map((item) => <span key={item}><b aria-hidden="true">—</b>{item}</span>)}</div></div></div><div className={styles.careBox}><div><span>DOMAIN / SERVER / CARE</span><h3>公開後の運用・保守</h3></div><strong>月額5,000円<small>／税別</small></strong><p>税込5,500円。ドメイン・サーバー管理、稼働確認、契約範囲内の軽微な更新に対応します。</p></div><p className={styles.priceNote}>写真は原則として事業者様にご提供いただきます。公開前修正は1回。納期は必要素材の受領後から約1か月が目安です。ページ追加や大幅な機能追加は、着手前に別途お見積りします。</p></div>
        </section>

        <section id="flow" className={styles.flowSection}>
          <div className={styles.sectionIntro}><p className={styles.eyebrow}>WORKFLOW</p><h2><span>調査から公開まで、</span><span>ひとつずつ進めます。</span></h2><p>自動化で速くしながら、確認が必要な場面では人が判断します。</p></div>
          <ol className={styles.flowList}>{workflow.map(([number, title, text]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
        </section>

        <section className={styles.targetSection}><Image className={styles.targetBoat} src="/brand/story/sailboat.webp" alt="次の目的地へ進む船の手描きイラスト" width={260} height={270} /><p className={styles.eyebrow}>WHO WE WORK WITH</p><h2><span>実力はある。</span><span>でも、Webでは伝わりきっていない。</span></h2><p>口コミや紹介では評価されている一方、検索から来た人には違いが見えない。そんな事業者の魅力を、調査から言葉と形にします。</p><ul>{["社労士", "税理士", "行政書士", "塾・教育", "採用に悩む企業"].map((item) => <li key={item}>{item}</li>)}</ul></section>

        <section className={styles.faqSection}><div className={styles.sectionIntro}><p className={styles.eyebrow}>FAQ</p><h2>よくある質問</h2></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">＋</span></summary><p>{answer}</p></details>)}</div></section>

        <section className={styles.finalCta}><Image src="/brand/story/final-open-sea.webp" alt="海へ向かって進む船と灯台の手描きイラスト" fill sizes="100vw" /><div className={styles.finalCtaContent}><h2><span>まだ作ると</span><span>決めていなくても、</span><span>大丈夫です。</span></h2><p>まずは、いま困っていることを一緒に整理しましょう。</p><TrackedLink href="/check" location="bottom" className={styles.finalButton}>無料でWeb診断を依頼する <span aria-hidden="true">→</span></TrackedLink><small>相談だけでもOK・制作を前提にしません</small></div></section>
      </main>

      <footer className={styles.footer}><div><Link href="/" className={styles.footerLogo} aria-label="enDesign トップページ"><Image src="/brand/logo.png" alt="enDesign" width={1565} height={820} /></Link><p>いい仕事が、ちゃんと届くように。</p></div><nav aria-label="フッターナビゲーション"><Link href="/terms">利用規約</Link><Link href="/privacy">プライバシーポリシー</Link><Link href="/legal">特定商取引法表記</Link><Link href="/support">お問い合わせ</Link><Link href="/admin">管理者ログイン</Link></nav><small>© 2026 enDesign / PIVOT&amp;QUEST</small></footer>
    </div>
  );
}
