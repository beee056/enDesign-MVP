"use client";

import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/app/check/check.module.css";

interface AnswerOption { label: string; value: string; score?: number; }
interface Question { id: string; eyebrow: string; title: string; description: string; options: AnswerOption[]; }
interface DiagnosisResult { score: number; level: string; heading: string; summary: string; priority: string; strengths: string[]; selfActions: string[]; consultActions: string[]; }

const questions: Question[] = [
  { id: "goal", eyebrow: "DESTINATION", title: "いま、一番増やしたいものは？", description: "最も近いものをひとつ選んでください。", options: [
    { label: "問い合わせ・相談", value: "inquiry" }, { label: "来店・予約", value: "visit" }, { label: "信頼・認知", value: "trust" }, { label: "採用応募", value: "recruit" },
  ]},
  { id: "website", eyebrow: "CURRENT MAP", title: "現在のWebサイトはどんな状態ですか？", description: "SNSやGoogleマップだけの場合は「サイトはない」を選びます。", options: [
    { label: "サイトはない", value: "none", score: 0 }, { label: "あるが、古い・放置している", value: "old", score: 1 }, { label: "更新しているが、成果が分からない", value: "active", score: 2 }, { label: "役割が明確で、成果も把握している", value: "working", score: 3 },
  ]},
  { id: "message", eyebrow: "YOUR VALUE", title: "選ばれる理由は、初めての人にも伝わりますか？", description: "お客様の言葉で、違いを説明できるかを考えてください。", options: [
    { label: "自分でもうまく説明できない", value: "unclear", score: 0 }, { label: "説明できるが、Webには載っていない", value: "offline", score: 1 }, { label: "載せているが、伝わっているか不安", value: "listed", score: 2 }, { label: "事例やお客様の声と一緒に伝えている", value: "clear", score: 3 },
  ]},
  { id: "mobile", eyebrow: "ON THE GO", title: "スマートフォンで見たとき、読みやすいですか？", description: "文字・写真・ボタンの押しやすさを思い出してください。", options: [
    { label: "確認したことがない", value: "unknown", score: 0 }, { label: "見づらい・崩れている", value: "broken", score: 0 }, { label: "読めるが、少し使いづらい", value: "usable", score: 2 }, { label: "迷わず読めて、問い合わせまで進める", value: "smooth", score: 3 },
  ]},
  { id: "discovery", eyebrow: "FINDABILITY", title: "検索・Googleマップ・SNSから見つけてもらえますか？", description: "入口が複数あり、同じ情報につながっているかを確認します。", options: [
    { label: "ほとんど整えていない", value: "none", score: 0 }, { label: "どれか一つだけ使っている", value: "single", score: 1 }, { label: "複数使っているが、連携していない", value: "separate", score: 2 }, { label: "情報を揃え、サイトへつないでいる", value: "connected", score: 3 },
  ]},
  { id: "contact", eyebrow: "NEXT ACTION", title: "興味を持った人が、すぐ相談・予約できますか？", description: "電話、フォーム、LINEなどの次の行動が迷わず選べるかを見ます。", options: [
    { label: "連絡先が分かりにくい", value: "hidden", score: 0 }, { label: "電話番号やメールだけ載せている", value: "basic", score: 1 }, { label: "問い合わせ導線はある", value: "available", score: 2 }, { label: "目的別の導線があり、反応も確認している", value: "optimized", score: 3 },
  ]},
  { id: "operation", eyebrow: "KEEP SAILING", title: "公開後に情報を更新できる体制がありますか？", description: "営業時間、実績、料金などが古いままにならないかを確認します。", options: [
    { label: "担当者も更新方法も決まっていない", value: "none", score: 0 }, { label: "必要なときに業者へ頼む", value: "vendor", score: 1 }, { label: "自分たちで更新できる", value: "self", score: 2 }, { label: "定期的に確認・改善している", value: "routine", score: 3 },
  ]},
];

const priorityContent = {
  website: { priority: "まず、Web上の受け皿を整える", selfActions: ["GoogleマップとSNSの基本情報を同じ内容に揃える", "営業時間・対応地域・連絡先を最新にする", "よく聞かれる質問を3つ書き出す"], consultActions: ["事業の強みを1ページに整理する", "問い合わせまでの導線を設計する"] },
  message: { priority: "選ばれる理由を、相手の言葉に直す", selfActions: ["お客様に喜ばれた理由を3つ書き出す", "競合ではなく自社を選んだ理由を聞く", "専門用語を初めての人向けに言い換える"], consultActions: ["口コミ・競合・SNSを横断して強みを整理する", "強みが伝わる構成と文章を設計する"] },
  mobile: { priority: "スマホで迷わないページにする", selfActions: ["自分のスマホで全ページを確認する", "文字が小さい場所を洗い出す", "電話・問い合わせボタンを押して確認する"], consultActions: ["スマホ中心の情報設計へ組み直す", "読み込み速度と操作性を確認する"] },
  discovery: { priority: "見つけてもらう入口をつなぐ", selfActions: ["Googleマップの写真と営業時間を更新する", "SNSプロフィールに公式サイトを設定する", "すべての媒体で事業名・住所・電話番号を揃える"], consultActions: ["検索・マップ・SNSからの導線を整理する", "入口ごとに伝える情報の役割を決める"] },
  contact: { priority: "興味を、相談につなげる", selfActions: ["各ページに連絡方法を1つ以上置く", "問い合わせ後の流れを短く説明する", "フォームの必須項目を減らす"], consultActions: ["目的別のCTAを設計する", "問い合わせ前の不安をFAQで解消する"] },
  operation: { priority: "公開後も古くならない仕組みを作る", selfActions: ["月1回の確認日を決める", "更新する情報と担当者を決める", "古い料金・写真・実績を洗い出す"], consultActions: ["更新範囲と保守ルールを決める", "自分で直す部分と依頼する部分を分ける"] },
} as const;

const goalLabels: Record<string, string> = { inquiry: "問い合わせ・相談", visit: "来店・予約", trust: "信頼・認知", recruit: "採用応募" };
const strengthLabels: Record<string, string> = { website: "Web上の受け皿がある", message: "価値を言葉にし始めている", mobile: "スマホでの見え方を意識できている", discovery: "見つけてもらう入口がある", contact: "相談につながる導線がある", operation: "更新を続ける土台がある" };
const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeGCpXgMTn58hODYTrwYX2OWh1nQd1ZCmLVMcenhqEYuvPJqw/viewform?usp=publish-editor";

function buildResult(answers: Record<string, AnswerOption>): DiagnosisResult {
  const scoredIds = questions.filter((item) => item.id !== "goal").map((item) => item.id);
  const total = scoredIds.reduce((sum, id) => sum + (answers[id]?.score ?? 0), 0);
  const score = Math.round((total / (scoredIds.length * 3)) * 100);
  const lowestScore = Math.min(...scoredIds.map((id) => answers[id]?.score ?? 0));
  const goal = goalLabels[answers.goal?.value] ?? "次の成果";
  if (lowestScore >= 2) {
    return {
      score,
      level: "順調に進んでいます",
      heading: "今ある土台を、成果につなげる",
      priority: "今ある土台を、成果につなげる",
      summary: `${goal}につながる基本の土台は整っています。次は、反応を確かめながら伝え方と導線を少しずつ磨いていく段階です。`,
      strengths: scoredIds.slice(0, 2).map((id) => strengthLabels[id]),
      selfActions: ["月ごとの問い合わせ・予約数を記録する", "よく見られるページと離脱箇所を確認する", "お客様の声や実績を定期的に追加する"],
      consultActions: ["目標に合わせて改善の優先順位を決める", "数字と利用者の声から次の改善案を設計する"],
    };
  }
  const weakestId = scoredIds.reduce((weakest, id) => (answers[id]?.score ?? 0) < (answers[weakest]?.score ?? 0) ? id : weakest) as keyof typeof priorityContent;
  const strengths = scoredIds.filter((id) => (answers[id]?.score ?? 0) >= 2).slice(0, 2).map((id) => strengthLabels[id]);
  const content = priorityContent[weakestId];
  return { score, level: score >= 75 ? "順調に進んでいます" : score >= 50 ? "伸びしろが見えています" : "整理すると大きく変わります", heading: content.priority, priority: content.priority, summary: `${goal}につなげるための土台を確認しました。全部を一度に変える必要はありません。まずは優先度の高い部分から、できることと任せることを分けるのがおすすめです。`, strengths: strengths.length ? strengths : ["課題に気づき、見直す準備ができている"], selfActions: [...content.selfActions], consultActions: [...content.consultActions] };
}

export function QuickDiagnosis() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerOption>>({});
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasAnsweredRef = useRef(false);
  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const mailHref = useMemo(() => result ? `mailto:info@p-quest.com?subject=${encodeURIComponent("enDesign 無料Web相談")}&body=${encodeURIComponent(`診断スコア: ${result.score}点\n優先課題: ${result.priority}\n\n相談したい内容:`)}` : "mailto:info@p-quest.com", [result]);

  useEffect(() => {
    if (hasAnsweredRef.current && !result) questionHeadingRef.current?.focus();
  }, [currentIndex, result]);

  function selectOption(option: AnswerOption) {
    const nextAnswers = { ...answers, [question.id]: option };
    hasAnsweredRef.current = true;
    setAnswers(nextAnswers);
    track("quick_diagnosis_answered", { question: question.id });
    if (currentIndex === questions.length - 1) {
      const nextResult = buildResult(nextAnswers);
      setResult(nextResult);
      track("quick_diagnosis_completed");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setCurrentIndex((index) => index + 1);
  }

  function restart() { hasAnsweredRef.current = false; setAnswers({}); setCurrentIndex(0); setResult(null); window.scrollTo({ top: 0, behavior: "smooth" }); }

  if (result) return (
    <section className={styles.result} aria-live="polite">
      <div className={styles.resultHero}><div><p className={styles.eyebrow}>YOUR WEB ROUTE</p><p className={styles.resultLevel}>{result.level}</p><h1>{result.heading}</h1><p className={styles.resultSummary}>{result.summary}</p></div><div className={styles.score} aria-label={`診断スコア ${result.score}点`}><span>WEB SCORE</span><strong>{result.score}</strong><small>/ 100</small></div></div>
      <div className={styles.resultGrid}>
        <article><span className={styles.cardNumber}>01</span><h2>すでにできていること</h2><ul>{result.strengths.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><span className={styles.cardNumber}>02</span><h2>今日から自分でできること</h2><ol>{result.selfActions.map((item) => <li key={item}>{item}</li>)}</ol></article>
        <article><span className={styles.cardNumber}>03</span><h2>相談すると早いこと</h2><ul>{result.consultActions.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </div>
      <div className={styles.nextStep}><div className={styles.nextStepCopy}><p className={styles.eyebrow}>CHOOSE YOUR NEXT PORT</p><h2>結果に納得できたら、次の方法を選べます。</h2><p>どれを選んでも無料です。制作を前提にした申込みではありません。</p></div><div className={styles.actionGrid}>
        <article><span>01</span><h3>Googleフォームで相談</h3><p>診断結果を見ながら、気になることをフォームで相談できます。</p><a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryAction} onClick={() => track("google_consultation_form_opened")}>無料相談フォームへ<span className={styles.visuallyHidden}>（新しいタブで開きます）</span></a></article>
        <article><span>02</span><h3>結果をPDFで保存</h3><p>この診断結果を、その場でPDFとして端末に保存できます。</p><button type="button" onClick={() => window.print()} className={styles.primaryAction}>PDFとして保存</button></article>
        <article><span>03</span><h3>メールで相談</h3><p>フォームを使わず、メールで診断結果について相談できます。</p><a href={mailHref} className={styles.primaryAction}>メールを開く</a></article>
      </div></div>
      <div className={styles.resultFooter}><button type="button" onClick={restart}>もう一度診断する</button><Link href="/">LPへ戻る</Link></div>
    </section>
  );

  return (
    <section className={styles.diagnosisPanel} aria-labelledby="diagnosis-question">
      <div className={styles.progressHeader}><div><span>QUESTION {String(currentIndex + 1).padStart(2, "0")}</span><strong>{currentIndex + 1} / {questions.length}</strong></div><div className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${progress}%` }} /></div></div>
      <div className={styles.questionLayout}><div className={styles.questionCopy}><p className={styles.eyebrow}>{question.eyebrow}</p><h1 id="diagnosis-question" ref={questionHeadingRef} tabIndex={-1}>{question.title}</h1><p>{question.description}</p><Image src="/brand/story/sailboat.webp" width={260} height={270} alt="次の目的地へ進む船の手描きイラスト" priority={currentIndex === 0} /></div><div className={styles.options}>{question.options.map((option, index) => <button key={`${question.id}:${option.value}`} type="button" onClick={() => selectOption(option)}><span>{String.fromCharCode(65 + index)}</span><strong>{option.label}</strong><b aria-hidden="true">→</b></button>)}</div></div>
      <div className={styles.navigation}><button type="button" onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} disabled={currentIndex === 0}>← 前の質問</button><span>入力内容・個人情報は送信されません</span></div>
    </section>
  );
}
