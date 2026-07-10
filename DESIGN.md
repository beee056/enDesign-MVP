# enDesign DESIGN.md

> Purpose: AIエージェント/開発者がenDesignのLP・診断画面・管理画面を同じ視覚言語で改善できるようにするためのデザイン仕様。
> Reference method: VoltAgent/awesome-design-md の「DESIGN.mdで雰囲気・色・余白・部品・禁止事項を言語化する」方式を参考にした。外部ブランドの見た目はコピーしない。

---

## 1. Visual theme & atmosphere

enDesignは、地域事業者の「いい仕事が、ちゃんと届くように。」を支えるWeb診断・制作サービス。
見た目は派手なAI SaaSではなく、相談しやすい診断カルテ、町の職人の作業台、公開前チェックリストの空気を持つ。

- Primary mood: 信頼できる、明朗会計、やさしい伴走感
- Secondary mood: AIで速いが、最後は人が見る安心感
- Signature element: 「診断カルテ」風のカード。白い紙面、細い罫線、淡いエメラルド、手順番号で課題が整理されていく印象
- Avoid: 未来的すぎるネオン、過剰なグラデーション、抽象的なAI波形、根拠のない実績数値

## 2. Color palette & roles

| Token | Hex | Role |
|---|---:|---|
| `canvas` | `#f8fafc` | ページ全体の静かな背景 |
| `paper` | `#ffffff` | カード、フォーム、診断結果 |
| `ink` | `#0f172a` | 見出し、主要テキスト、濃いCTA |
| `body` | `#475569` | 本文 |
| `muted` | `#64748b` | 補足文、メタ情報 |
| `hairline` | `#e2e8f0` | 罫線、カード境界 |
| `primary` | `#10b981` | 無料診断、成功、AI+人間のポジティブな進行 |
| `primary-deep` | `#059669` | ホバー、強調 |
| `primary-soft` | `#ecfdf5` | バッジ、アイコン背景、診断スコア背景 |
| `dark-band` | `#0f172a` | AI+人間プロセス、最終CTA |
| `sky-accent` | `#3b82f6` | 補足リンク、紹介/外部リンクのサブアクセント |

Primary green is functional, not decorative. It should mean 「次に進める」「改善できる」「安心して相談できる」.

## 3. Typography rules

Use the app's existing sans stack via Tailwind (`font-sans`). The voice is clear and practical.

| Role | Size guide | Weight | Tracking | Use |
|---|---:|---:|---:|---|
| Hero | `text-5xl`〜`lg:text-8xl` | 800 | tight | LP hero only |
| Section heading | `text-3xl`〜`md:text-5xl` | 800 | tight | Major sections |
| Card title | `text-lg`〜`text-xl` | 700 | normal | Feature/pricing cards |
| Body | `text-sm`〜`md:text-lg` | 500 | normal | 説明文 |
| Eyebrow | `text-xs`〜`text-sm` | 700 | `0.18em` | HOW WE BUILD / SCOPE 等 |
| Step number | `font-mono text-xs` | 700 | `0.2em` | 順序が意味を持つ工程のみ |

Japanese copy should be short and concrete. Use words a local business owner recognizes: 無料診断, 問い合わせ, 料金, 写真, 修正, 導線.

## 4. Component stylings

### Buttons

- Primary CTA: `rounded-full`, dark slate background, white text, medium shadow. Label must name the action: `無料Web診断をはじめる`.
- Secondary CTA: white or transparent card-like button with slate border. Use for `料金を見る`, `できることを見る`.
- On dark: white button on `dark-band`; do not use green fill unless it is the only action.
- Focus states: visible ring using `primary`/`ring`; keyboard users must never lose position.

### Cards

- Standard card: white/paper surface, `rounded-3xl`, `hairline` border, subtle shadow.
- Diagnosis/card-like surfaces: show clear labels, checklist rows, and left-aligned content. Avoid vague icon-only cards.
- Featured pricing card: polarity flip with `dark-band`, white text, and green checkmarks.
- Works cards: always include type + industry tags, short practical result, and external-link affordance.

### Badges

- Primary badge: `primary-soft` background + deep green text for progress/positive states.
- Dark badge: slate fill + white text for category labels like `ランディングページ`.
- Do not use badges for unverified claims such as `一番人気` unless backed by data.

### Forms

- Forms should feel like a guided diagnosis, not an application form.
- Prefer progressive steps, saved draft messaging, and immediate micro-feedback.
- Every optional field should explain why it helps.

## 5. Layout principles

- Container width: 5xl for hero/copy, 6xl for grids and pricing.
- Section rhythm: 96px〜128px vertical padding on desktop, 64px〜96px on mobile.
- Hero is a thesis: headline first, then concrete promise, then one primary CTA.
- Use three-column grids only when the items are naturally comparable.
- Numbered markers are reserved for real sequences: diagnosis → AI draft → human finish.
- Pricing must show boundaries: `含まれるもの / 含まれないもの` before asking for purchase intent.

## 6. Depth & elevation

| Level | Treatment | Use |
|---|---|---|
| 0 | Flat with hairline | Tables, simple rows |
| 1 | `0 1px 3px rgba(0,0,0,.06)` | Normal cards |
| 2 | Hover lift + larger soft shadow | LP feature/works cards |
| 3 | Dark band contrast | AI+human process and final CTA |

Motion should be calm. Use fade/translate for section reveals; avoid constant decorative movement except restrained hero ambience. Respect reduced motion.

## 7. Do's and don'ts

### Do

- Lead with free diagnosis and transparent 5万円〜 pricing.
- Explain what is included and what is not included.
- Show concrete local-business contexts: 整体、美容室、塾、工務店、飲食店.
- Make AI+human workflow visually explicit.
- Prefer honest microcopy over hype.

### Don't

- Do not imply guaranteed sales increases without evidence.
- Do not hide monthly costs or introduce subscription language unless it exists.
- Do not make the service look like a high-end agency if the offer is low-cost伴走.
- Do not use generic AI visuals as the main identity.
- Do not copy visual identities from external DESIGN.md examples.

## 8. Responsive behavior

- Mobile first. CTA stack vertically; cards become one column.
- Header navigation hides secondary anchors on mobile but keeps the primary diagnosis CTA visible.
- Touch targets should be at least 44px high.
- Pricing card highlight should not rely on vertical offset on small screens.
- Long Japanese headings need manual line breaks only where they improve meaning.

## 9. Agent prompt guide

When improving UI, follow this brief:

> Build enDesign as a calm, transparent Web診断カルテ for local business owners. Use a slate/white paper surface, emerald only for progress and primary actions, large honest Japanese headings, rounded diagnostic cards, and clear pricing boundaries. Make the AI+human workflow visible, but keep the service human and practical.

Quality check before shipping:

- Is the primary CTA still `無料Web診断`?
- Does the page explain both free value and paid scope?
- Are unverified claims removed or softened?
- Does the design still feel approachable to non-technical local owners?
- Are reduced motion and mobile layouts preserved?
