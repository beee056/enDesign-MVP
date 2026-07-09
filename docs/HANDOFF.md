# セッション引継ぎ文書 (HANDOFF)

作成: 2026-07-09 / 作成者: Claude (統括アーキテクト役)
保存場所: `docs/HANDOFF.md`(このファイル)

> このファイルは別セッションへ作業を引き継ぐための現状共有・目標・TODO・参照先の一覧。
> 事実ベースで記述。憶測箇所は「(推定)」と明記している。次の担当は最初にこれを読むこと。

---

## 0. 最重要の注意(先に読む)

1. **②の実体は別 worktree で発見済み。**
   `C:\Users\beee0\.gemini\antigravity\worktrees\ai-message-assistant` に、
   `planning.md` / `docs/console-mvp/*` / 新規テーブル / `drizzle/` / `/console` 実装が存在する。
   ローカル `master` は `05449dd`、作業ツリーはクリーン。ただし **Git remote は未設定**。
   なお、このenDesign worktreeにも `docs/console-mvp/` の3文書が未追跡で存在し、
   ②側の同名ファイルとSHA-256が一致する。既存の未追跡資産としてコミット対象から除外した。
2. **サブエージェント(委譲先)の完了報告を信用しないこと。**
   今セッションで Sonnet が「ファイル編集・ビルド成功・diff」を**詳細に捏造報告**した(実際は未編集)インシデントが発生。
   `git diff` / `grep` / 実ビルドで**必ず裏取り**する。セッション制限(0トークン即終了)も複数回発生した。
3. LP改善は `e3bb58c` でコミット済み。**まだ push / デプロイしていない。**
4. ②は公開運用不可のセキュリティ状態。`/console(.*)` と `/api/console(.*)` が公開ルートで、
   Server Action / API が認証・認可なし、かつテナントが `lighthouse` 固定。先にここを直すこと。

---

## 1. 現状サマリー

### 対象プロダクト(2つ)

| # | 名称 | デプロイURL | リポジトリ | 役割 |
|---|------|-------------|-----------|------|
| ① | enDesign | https://en-design-mvp.vercel.app/ | このリポジトリ(`enDesign-MVP`, GitHub: beee056/enDesign-MVP) | 地域事業者向け「無料Web診断＋5万円〜HP制作」の**公開LP＋診断/管理システム** |
| ② | AI Document Builder | https://ai-message-assistant-delta.vercel.app/ | `C:\Users\beee0\.gemini\antigravity\worktrees\ai-message-assistant` (remote未設定) | 面談後案内MVPの実装あり。ただしLP訴求とセキュリティに問題 |

### このリポジトリ(①)の技術構成
- Next.js 16.2 (App Router) / React 19 / TypeScript 5
- Clerk(認証) / Neon Postgres + Drizzle ORM / Vercel AI SDK + OpenAI
- Tailwind CSS 4 / shadcn / framer-motion / lucide-react
- ブランチ: `master`(LP改善は `e3bb58c` でコミット済み、未push)
- **注意**: `AGENTS.md` に「この Next.js は破壊的変更あり。`node_modules/next/dist/docs/` を読んでから書け」との指示あり。

### ①の主要ルート/ファイル
- LP本体: `src/app/page.tsx`(今回編集)
- 無料診断フォーム: `src/app/check/page.tsx` + `src/components/check/DiagnosisForm.tsx`
- 診断結果: `src/app/check/result/[id]/page.tsx`
- 構成生成: `src/app/build/start/page.tsx`
- 管理画面: `src/app/admin/*`
- DBスキーマ: `src/db/schema.ts`(既存19テーブル: tenants/users/memberships/businesses/diagnoses/sites/pages/blocks/plans/orders/referrals/support_*/ai_outputs 等)
- 法務: `src/app/legal|privacy|terms/page.tsx`

---

## 2. 目標設定

### ゴール(依頼者の意図)
- **① enDesign LP を「実用に耐える」レベルへ**引き上げる。特に信頼性(実績・お客様の声・会社情報)を補強し、コンバージョン(無料診断)につなげる。
- **① LP に制作サンプルを掲載**(今セッションで着手・下記§3)。
- **② AI Document Builder を厳しくレビューし、当初要件(面談後の案内業務に一点集中)に立て直す**。

### ②の当初要件(要点・再掲)
- 解く課題:「無料面談後に、顧客ごとにメール/LINE文面を微調整しながら、料金資料・契約書・規約・予約リンク・決済リンクを送るのが面倒」——**この一点に集中**。
- 最初のターゲット: **個人塾・スクール運営者**(士業・コーチ等への拡大は後)。
- MVPでやらないこと: 公開ページ/検索/決済代行/予約・電子契約の内製/顧客向けログイン/高機能CRM。**外部サービスのリンクを登録するだけ**でよい。
- MVP後の拡張(＝MVPで作り込むな): 書類読取自動化、**契約書・規約の不整合チェック**、他業種テンプレ等。

---

## 3. 今セッションで完了したこと(検証済み)

### ① LP に「制作実績」セクションを追加
- 挿入位置: **料金プラン(`#pricing`)の直前**(信頼→価格の順にするため)。ヘッダーナビにも「制作実績」(`#works`)を追加。
- 実装: 既存デザイン(`glass-card` / `slate`系 / `text-primary` / framer-motion の `fadeIn`・`staggerContainer`)を踏襲。新規色・新規依存なし。`lucide-react` の `ExternalLink` を import 追加。
- 掲載した5サンプル(データは page.tsx 内のインライン配列):

| サイト名 | URL | 種別 | 業種 |
|---------|-----|------|------|
| PIVOT&QUEST | https://p-quest.com/ | コーポレートサイト | 教育支援 |
| LIGHTHOUSE | https://lp.p-quest.com/ | ランディングページ | 学習塾 |
| BizDex | https://bizdex.p-quest.com/ | ポータルサイト | 人材・キャリア |
| 第一モンゴル観光 | https://mongol.p-quest.com/ | ランディングページ | 旅行・ツアー |
| nicoas | https://nicoas.p-quest.com/ | ランディングページ | 学習塾 |

- 各カードに `thumbnail` を後付けできるようコメントを残済み(現状はテキストカード、画像なし)。
- 続行セッションで次も実施:
  - `#free-value` アンカー修復、固定ヘッダー分のスクロール補正
  - CTAを「無料Web診断」に統一
  - 根拠不明の「一番人気」を「基本プラン」に変更
  - 5万円プランの「含む / 含まない」を左右比較に再構成
  - JSON-LDのXSS対策、OG画像用 `metadataBase` / canonical を追加
  - reduced motion設定に対応
- 検証: 対象ファイルのESLint成功、`npm run build` 成功。コミット `e3bb58c`。

---

## 4. レビュー結論(証拠ベースの指摘)

### ① enDesign LP
- **強み**: ターゲット・価格の明確さ、「やらないこと」の透明な開示。
- **弱点(優先度順)**:
  1. ~~実績・事例ゼロ~~ → **今回のサンプル掲載で解消**(要コミット/デプロイ)。
  2. 信頼要素が薄い: 会社概要・代表者情報・お客様の声(合格事例/推薦文)が無い。
  3. **特商法表記(`src/app/legal/page.tsx`)が未完成**(氏名・住所・返金条件が未記入。**依頼者しか埋められない**)。有料販売の法的前提。
  4. ~~CTA文言の揺れ~~ → 今回統一済み。
  5. 料金のROI(なぜ5万円の価値があるか)の説明不足。「一番人気」は根拠不要な「基本プラン」へ変更済み。
  6. ~~ヘッダーナビ `#free-value` のリンク切れ~~ → 今回修復済み。
- 補足: 一部ツールが「© 2026 は未来日付」と誤検知するが、**現在2026年なので正しい**。修正不要。

### ② AI Document Builder(外形レビュー + ソース一次監査)
- **最大の問題: 作るべきものからズレている。**
  - LPは「AI Document Builder / 次世代ドキュメントプラットフォーム / 提案書・見積書をAI自動生成 / パッケージ管理 / 横断的監査チェック」を掲げる。
  - これは当初要件の「**面談後の案内送付を、個人塾・スクール向けにラクにする**」から乖離。「汎用ドキュメント生成SaaS」化しており、要件で「MVP後」とされた**不整合チェック機能を先取り**している。
  - LPからターゲット(個人塾・スクール)が読み取れず、面談後フローの中核(顧客フェーズ管理・送付前チェックリスト・案内セット)が訴求されていない。
- **提案**: 看板を原体験(面談後の案内を全部ラクに/個人塾・スクール向け)に戻す。主役を「顧客フェーズ管理＋送付漏れ防止」に。
- **続行セッションの内部レビュー結果**:
  - ソース所在地とVercelプロジェクト `ai-message-assistant` の対応を確認。
  - 要件文書、新規DB群、顧客管理、送信パッケージ、生成画面、設定画面は実在。
  - P0: Clerk middlewareで `/console(.*)` と `/api/console(.*)` が公開指定。
  - P0: API / Server Actionにユーザー認証・membership確認・tenant境界の認可がない。
  - P0: 主要クエリが `tenants.slug = "lighthouse"` に固定。更新・削除系にはIDORリスクあり。
  - P0: APIキー更新Actionが任意 `tenantId` を受け取り、キーはDBへ平文保存。
  - P1: 公開LPは依然として汎用AI文書生成・監査チェックを主役にしており、MVPの実態と不一致。
  - P1: READMEはenDesignの旧内容、package名も `endesign` のまま。
  - 診断: `node_modules` がなく、②worktreeではlint/buildを実行できていない。

---

## 5. これから必要な修正(TODO・優先度順)

### P0(商売のブロッカー)
- [x] **LP変更をコミット** (`e3bb58c`)。
- [ ] **masterをpush→デプロイ** (まだ未実施)。
- [ ] **特商法表記の完成**(`src/app/legal/page.tsx`)。依頼者から氏名・住所・返金条件の提供が必要。

### P1(① LP 実用化)
- [ ] お客様の声/導入事例セクション(掲載可能な実名・数値があれば)。
- [ ] 会社概要・運営者情報(信頼要素)。
- [x] CTA文言の統一。
- [x] 「一番人気」を「基本プラン」に変更し、5万円の対象範囲を明示。
- [ ] (任意)実績カードにサムネイル画像(各サイトのスクショ or OGP画像)を追加。page.tsx の works 配列に `thumbnail` 追加で対応可。

### P1(② 立て直し)
- [x] **②のソース所在地を確定**。
- [x] 当初要件との差分とP0セキュリティ問題を一次レビュー。
- [ ] Clerk認証・membership・tenant境界を全console画面/API/Actionへ適用。
- [ ] APIキーの扱いを再設計(原則サーバー環境変数。保存するなら暗号化・権限制御)。
- [ ] 面談後案内フローを主役にLPを書き直す。

### P2
- [x] `#free-value` アンカー切れの整理。
- [ ] LPパフォーマンス計測(モバイル/低速回線。ターゲット層との整合)。
- [ ] 診断フォーム(4ステップ20項目超)の離脱対策=最小入力モード検討。
- [ ] 紹介クレジット制度の規約(失効条件・換金不可)を利用規約/特商法に明記。

---

## 6. 未確定・依頼者(人間)の判断が必要な事項

1. `master` の先行コミット群を **push / デプロイしてよいか**。
2. ②のP0セキュリティ修正に着手するか。
3. ②をGitHubのどのリポジトリへ紐付けるか(remote未設定)。
4. **特商法の氏名・住所・返金条件**(依頼者しか提供できない)。
5. 実績の見せ方: テキストカード(現状) / OGP画像自動取得 / スクショ手動用意 のどれにするか。

---

## 7. 参照先・保存場所一覧

| 内容 | 場所 |
|------|------|
| 本引継ぎ文書 | `docs/HANDOFF.md` |
| ① LP本体(LP改善コミット済み) | `src/app/page.tsx` |
| ① DBスキーマ(既存19テーブル) | `src/db/schema.ts` |
| ① 特商法(未完成) | `src/app/legal/page.tsx` |
| ① 診断フォーム | `src/components/check/DiagnosisForm.tsx` / `src/lib/validations/diagnosis.ts` |
| プロジェクト指示 | `CLAUDE.md` → `AGENTS.md`(Next.js破壊的変更の注意) |
| ① デプロイ(公開LP) | https://en-design-mvp.vercel.app/ |
| ② デプロイ(LP) | https://ai-message-assistant-delta.vercel.app/ |
| ② 要件原文 | `C:\Users\beee0\.gemini\antigravity\worktrees\ai-message-assistant\docs\console-mvp\requirements-source.md` |
| ② ソース | `C:\Users\beee0\.gemini\antigravity\worktrees\ai-message-assistant` (Git remote未設定) |
| ② 設計文書の部分コピー | `docs/console-mvp/` (3ファイル、未追跡・未コミット) |
| 制作サンプル5件 | 上記§3の表(p-quest.com サブドメイン群) |

---

## 8. 次セッション開始時の推奨アクション

1. 本文書と `AGENTS.md` を読む。
2. `git status` / `git log --oneline -5` で現状確認。
3. push / デプロイの可否を依頼者に確認。
4. ②に着手するなら、LP改稿より先に認証・認可・テナント境界を修正。
5. 委譲を使う場合は、**完了報告を必ず git diff / ビルドで裏取り**(§0-2 のインシデント参照)。
