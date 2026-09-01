# enDesign MVP

enDesign は「いい仕事を、見つけてから作る。」調査起点のLP制作サービスです。
Googleマップ、検索、SNS、ポータル、口コミを横断して事業者の強みを診断し、営業提案用の試作から本制作、手描きイラスト、公開・保守まで一貫して行います。

## 主な機能 (MVP)
- **無料Web診断**: 現在のWeb発信、強み、顧客価値、改善優先度を整理。
- **調査起点のLP制作**: 口コミ・検索・SNS・競合調査から訴求と構成を設計。
- **人が確認する制作工程**: AIは整理と試作を支援し、事実確認・表現判断・公開判断は人が担当。
- **手描きイラスト**: 事業者の具体的な場面を人が描き、温度と親しみを加える。

## 現行の制作条件

- LP制作: 150,000円（税別）
- 事例公開にご協力いただける場合: 110,000円（税別）
- 公開前修正: 1回
- 納期目安: 必要素材の受領後から約1か月
- ドメイン・サーバー・保守: 月額5,000円（税別）
- 写真: 原則として事業者本人から提供
- 追加ページ・機能・修正等: オプションとして別途見積り

## 技術スタック
- **Framework**: Next.js 14 (App Router)
- **Database**: Neon (PostgreSQL) + Drizzle ORM
- **Auth**: Clerk
- **UI**: Tailwind CSS + shadcn/ui
- **AI**: Vercel AI SDK + OpenAI API (`gpt-4o`)

## 環境構築
1. リポジトリをクローン
2. `npm install`
3. `.env` ファイルを作成し、必要な環境変数を設定
4. `npm run db:push` でDBマイグレーションを実行
5. `npm run dev` でローカルサーバーを起動

## デプロイ
このプロジェクトは Vercel へのデプロイを前提として設計されています。
NeonデータベースとClerkの設定を行い、環境変数をVercelに設定してください。

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
