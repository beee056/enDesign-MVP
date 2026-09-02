import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleCheck,
  FileSearch,
  HandHeart,
  MapPinned,
  MessageCircleMore,
  MonitorSmartphone,
  Paintbrush,
  PenTool,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TrackedLink } from "@/components/landing/TrackedLink";
import styles from "./home.module.css";

const researchLenses = [
  {
    icon: MapPinned,
    number: "01",
    title: "見つける",
    lead: "Googleマップだけでは終わらない。",
    body: "検索・SNS・ポータル・口コミを横断し、基本情報、実写真、顧客の言葉、店主のこだわりを集めます。",
    tags: ["Googleマップ", "SNS", "口コミ", "検索"],
  },
  {
    icon: FileSearch,
    number: "02",
    title: "読み解く",
    lead: "強みを、載せる順番まで決める。",
    body: "店主の言葉と口コミが一致する点を核に、競合との差、創出価値、欠けている情報、CTAを診断します。",
    tags: ["特徴・こだわり", "差別化", "顧客価値", "CTA"],
  },
  {
    icon: PenTool,
    number: "03",
    title: "先に見せる",
    lead: "話す前に、試作で伝える。",
    body: "調査結果をもとに営業提案用LPを制作。抽象的な提案書ではなく、その事業者らしい画面を見ながら話せます。",
    tags: ["LP戦略", "デザイン", "実装", "試作公開"],
  },
];

const deliverables = [
  "公開情報の横断調査・競合比較",
  "訴求設計・ページ構成・文章整理",
  "オリジナルLPデザインと実装",
  "PC・タブレット・スマートフォン対応",
  "問い合わせ導線・Googleマップ・SNS連携",
  "ファビコン・OGP・基本SEO設定",
  "人が描く温かみのあるイラスト",
  "公開前確認と修正1回",
];

const workflow = [
  ["01", "調査", "口コミ・検索・SNS・競合から、伝えるべき事実を集めます。"],
  ["02", "診断", "強み、差別化、顧客価値、情報不足、CTAを整理します。"],
  ["03", "試作", "事業者ごとの言葉と空気に合わせ、LPの完成像を作ります。"],
  ["04", "対話", "試作を見ながら、事実確認と必要素材のすり合わせを行います。"],
  ["05", "本制作", "いただいた写真と手描きイラストを反映し、公開品質に仕上げます。"],
  ["06", "公開・保守", "表示・導線を確認して公開。必要に応じて継続保守します。"],
];

const faqs = [
  ["写真が手元に少なくても依頼できますか？", "試作段階は公開情報と差し替え前提の枠で構成できます。本制作では、事業者ご本人から実際の写真をご提供いただきます。"],
  ["AIだけで制作するサービスですか？", "いいえ。調査・整理・試作の効率化にはAIを使いますが、事実確認、訴求判断、デザイン品質、公開判断は人が行います。最終イラストも人が描きます。"],
  ["公開後の修正はできますか？", "制作料金には公開前の修正1回が含まれます。公開後の大幅な追加・改修は別途お見積り、軽微な保守は月額保守の範囲で対応します。"],
  ["納期はどのくらいですか？", "必要な写真・原稿確認事項などが揃ってから、1か月程度が目安です。内容や追加オプションにより変動する場合は事前にお伝えします。"],
];

export default function Home() {
  const organizationJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "enDesign",
    url: "https://en-design-mvp.vercel.app",
    description:
      "公開情報の横断調査から、事業者らしさが伝わるランディングページの試作・制作・公開までを支援するWeb制作サービス。",
    areaServed: "Japan",
  }).replace(/</g, "\\u003c");

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd }} />

      <div className={styles.notice}>
        <span>GOOD WORK DESERVES TO BE SEEN</span>
        <p>口コミや実力はあるのに、Webで伝わりきっていない事業者へ。</p>
      </div>

      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="enDesign トップページ">
          <span className={styles.logoMark}>en</span>
          <span>
            <strong>enDesign</strong>
            <small>RESEARCH × DESIGN × HUMAN TOUCH</small>
          </span>
        </Link>
        <nav className={styles.nav} aria-label="メインナビゲーション">
          <Link href="#method">私たちの方法</Link>
          <Link href="#case">制作事例</Link>
          <Link href="#price">料金</Link>
          <Link href="#flow">制作の流れ</Link>
        </nav>
        <TrackedLink href="/check" location="header" className={styles.headerCta}>
          無料診断を依頼する <ArrowRight aria-hidden="true" />
        </TrackedLink>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.heroLabel}>
              <span>WEB PRODUCTION FOR GOOD BUSINESSES</span>
              <span>つくば発・全国対応</span>
            </div>
            <h1>
              <span>いい仕事を、</span>
              <span className={styles.heroAccent}>見つけてから作る。</span>
            </h1>
            <p className={styles.heroLead}>
              enDesignは、依頼を待ってからヒアリングするだけの制作会社ではありません。
              口コミ・SNS・検索・競合を先に調べ、その事業者にしかない価値を見つけ、
              <strong> 試作LPという見える形</strong>にしてから対話を始めます。
            </p>
            <div className={styles.heroActions}>
              <TrackedLink href="/check" location="hero" className={styles.primaryCta}>
                まず無料でWeb診断 <ArrowRight aria-hidden="true" />
              </TrackedLink>
              <Link href="#method" className={styles.textCta}>
                制作方法を見る <ChevronRight aria-hidden="true" />
              </Link>
            </div>
            <dl className={styles.heroFacts}>
              <div><dt>¥150,000</dt><dd>LP制作・税別<small>税込165,000円</small></dd></div>
              <div><dt>¥110,000</dt><dd>事例公開協力・税別<small>税込121,000円</small></dd></div>
              <div><dt>1 month</dt><dd>素材受領後の目安</dd></div>
            </dl>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroVisualWash} aria-hidden="true" />
            <div className={styles.heroStamp}>
              <span>RESEARCH FIRST</span>
              <strong>調べることから、<br />デザインは始まる。</strong>
            </div>
            <Image
              src="/brand/endesign-process-illustration.webp"
              alt="口コミや写真、地図、Webサイト案を机の上で丁寧に整理するデザイナーの手描きイラスト"
              width={1280}
              height={853}
              priority
              sizes="(max-width: 920px) 100vw, 56vw"
              className={styles.heroImage}
            />
            <div className={styles.heroNote}>
              <span>FROM VOICES TO VALUE</span>
              口コミの言葉と、店主のこだわりが重なる場所を探します。
            </div>
          </div>
        </section>

        <section className={styles.difference}>
          <div className={styles.differenceIntro}>
            <p className={styles.eyebrow}>OUR DIFFERENCE</p>
            <h2>制作の順番が、<br />少し違います。</h2>
          </div>
          <div className={styles.comparison}>
            <div className={styles.comparisonMuted}>
              <span>よくある制作</span><p>問い合わせ</p><i /><p>ヒアリング</p><i /><p>見積り</p><i /><p>ゼロから制作</p>
            </div>
            <div className={styles.comparisonMain}>
              <span>enDesign</span><p>公開情報を調査</p><i /><p>強みと差別化を診断</p><i /><p>事業者専用のLPを試作</p><i /><p>画面を見ながら対話</p>
            </div>
          </div>
          <p className={styles.differenceNote}>
            抽象的な営業資料ではなく、あなたの事業を調べて作った画面がある。
            だから「頼んだら何ができるのか」を、想像だけで判断する必要がありません。
          </p>
        </section>

        <section id="method" className={styles.method}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>RESEARCH → STRATEGY → PROTOTYPE</p><h2>事業者らしさは、<br />情報の間にあります。</h2></div>
            <p>評価点や営業時間を並べるだけでは、誰が作っても同じページになります。私たちが見るのは、店主の言葉、顧客の実感、競合との違い、写真に映る空気です。</p>
          </div>
          <div className={styles.lensGrid}>
            {researchLenses.map((item) => (
              <article key={item.number} className={styles.lensCard}>
                <div className={styles.lensTop}><item.icon aria-hidden="true" /><span>{item.number}</span></div>
                <p className={styles.lensTitle}>{item.title}</p>
                <h3>{item.lead}</h3>
                <p>{item.body}</p>
                <ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="case" className={styles.caseSection}>
          <div className={styles.caseMedia}>
            <div className={styles.browserBar} aria-hidden="true"><span /><span /><span /><p>営業提案用 LP PROTOTYPE</p></div>
            <div className={styles.caseImageFrame}>
              <Image src="/works/sower-proposal.webp" alt="筑波山麓のベーカリーカフェを想定した営業提案用LPのファーストビュー" fill sizes="(max-width: 900px) 100vw, 58vw" className={styles.caseImage} />
            </div>
            <span className={styles.caseBadge}>PROPOSAL DEMO / PUBLIC INFORMATION</span>
          </div>
          <div className={styles.caseCopy}>
            <p className={styles.eyebrow}>ONE PROTOTYPE, ONE STORY</p>
            <h2>「パン屋です」では、<br />終わらせない。</h2>
            <p className={styles.caseLead}>公開情報から見えたのは、古い納屋、筑波山へ向かう朝の時間、焼きたてのパン、店内で過ごす静けさ。それらを「遠回りしたくなる朝」という一つの物語に編集しました。</p>
            <div className={styles.casePoints}>
              <div><Search aria-hidden="true" /><span><strong>調査</strong>写真・口コミ・営業情報を横断</span></div>
              <div><Sparkles aria-hidden="true" /><span><strong>戦略</strong>価格ではなく、訪れる体験を主役に</span></div>
              <div><Paintbrush aria-hidden="true" /><span><strong>表現</strong>実写真と温かなイラストを編集</span></div>
              <div><MonitorSmartphone aria-hidden="true" /><span><strong>実装</strong>全幅で崩れないレスポンシブ設計</span></div>
            </div>
            <p className={styles.caseCaption}>※営業提案用の試作事例です。公開情報を基に構成し、写真・口コミ等の本公開利用には事業者の許諾が必要です。</p>
          </div>
        </section>

        <section className={styles.valueSection}>
          <div className={styles.valueTitle}><p className={styles.eyebrow}>WHAT WE CREATE</p><h2>ページの見た目だけでなく、<br />選ばれる理由をつくる。</h2></div>
          <div className={styles.valueGrid}>
            <article><MessageCircleMore aria-hidden="true" /><span>01</span><h3>顧客の言葉で伝わる</h3><p>口コミに繰り返し現れる言葉を、見出しや安心材料へ。内輪の表現だけにしません。</p></article>
            <article><HandHeart aria-hidden="true" /><span>02</span><h3>人の温度が残る</h3><p>写真だけにも、AI画像だけにも頼らず、人が描くイラストを事業者の場面に合わせて差し込みます。</p></article>
            <article><ShieldCheck aria-hidden="true" /><span>03</span><h3>事実の線を越えない</h3><p>公開情報、推測、本人確認事項を分け、架空の実績・資格・口コミを作らずに魅力を伝えます。</p></article>
          </div>
        </section>

        <section id="price" className={styles.priceSection}>
          <div className={styles.priceIntro}><p className={styles.eyebrow}>PRICE & SCOPE</p><h2>分かりにくい見積りに、<br />しません。</h2><p>基本制作範囲を先に明示し、追加が必要な場合は着手前にお伝えします。</p></div>
          <div className={styles.priceCard}>
            <div className={styles.priceMain}>
              <p>LP制作 基本料金</p>
              <div><strong>150,000</strong><span>円／税別</span></div>
              <p className={styles.taxIncluded}>税込165,000円</p>
              <small>事例としての公開にご協力いただける場合</small>
              <div className={styles.discountPrice}><strong>110,000</strong><span>円／税別</span></div>
              <p className={styles.taxIncluded}>税込121,000円</p>
              <TrackedLink href="/check" location="pricing" className={styles.priceCta}>無料Web診断を依頼する <ArrowRight aria-hidden="true" /></TrackedLink>
            </div>
            <div className={styles.priceIncludes}>
              <p>基本料金に含まれるもの</p>
              <ul>{deliverables.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
            </div>
          </div>
          <div className={styles.maintenance}>
            <div><span>DOMAIN / SERVER / CARE</span><h3>公開後の運用・保守　月額5,000円／税別</h3><p className={styles.maintenanceTax}>税込5,500円</p></div>
            <p>ドメイン・サーバーの管理、稼働確認、契約範囲内の軽微な更新に対応します。大幅なページ追加、機能開発、構成変更はオプションとして事前見積りします。</p>
          </div>
          <p className={styles.priceFootnote}>写真は原則として事業者様にご提供いただきます。公開前修正は1回。納期は必要素材の受領後から約1か月が目安です。</p>
        </section>

        <section id="flow" className={styles.flowSection}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>WORKFLOW</p><h2>調べるところから、<br />公開後まで。</h2></div>
            <p>必要な場面ではヒアリングを行います。自動化で速くしながら、判断を人から奪わない進め方です。</p>
          </div>
          <ol className={styles.flowList}>{workflow.map(([number, title, body]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
        </section>

        <section className={styles.targetSection}>
          <p className={styles.eyebrow}>WHO WE WORK WITH</p>
          <div><h2>知識や実力はある。<br />でも、Webでは伝わりきっていない。</h2><ul>{["社労士", "税理士", "行政書士", "塾・教育", "採用に悩む企業"].map((item) => <li key={item}>{item}</li>)}</ul></div>
          <p>口コミや紹介では評価されている一方、検索から来た人には違いが見えない。そんな事業者ほど、調査から始めるLP制作が活きます。</p>
        </section>

        <section className={styles.faqSection}>
          <div><p className={styles.eyebrow}>FAQ</p><h2>ご依頼前に、<br />よくある質問。</h2></div>
          <div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalCtaTop}><span>LET&apos;S FIND WHAT MAKES YOU DIFFERENT.</span><CircleCheck aria-hidden="true" /></div>
          <h2>あなたの事業にしかない良さを、<br />まず私たちに調べさせてください。</h2>
          <p>無料Web診断から始められます。制作を依頼するかは、診断内容を見てから決めてください。</p>
          <TrackedLink href="/check" location="bottom" className={styles.finalButton}>無料Web診断を依頼する <ArrowRight aria-hidden="true" /></TrackedLink>
        </section>
      </main>

      <footer className={styles.footer}>
        <div><Link href="/" className={styles.footerLogo}>enDesign</Link><p>いい仕事を、見つけてから作る。</p></div>
        <nav aria-label="フッターナビゲーション"><Link href="/terms">利用規約</Link><Link href="/privacy">プライバシーポリシー</Link><Link href="/legal">特定商取引法表記</Link><Link href="/support">お問い合わせ</Link><Link href="/admin">管理者ログイン</Link></nav>
        <small>© 2026 enDesign / PIVOT&amp;QUEST</small>
      </footer>
    </div>
  );
}
