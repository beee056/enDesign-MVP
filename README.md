# enDesign MVP

enDesign は、地域の小規模事業者が「Webに弱いだけで損をしない」ためのWeb診断・制作支援サービスです。
高額で不透明なWeb制作やSNS運用代行に代わる、適正価格で持続可能なオルタナティブを提供します。

## 主な機能 (MVP)
- **無料Web診断**: フォーム入力に基づき、サイトの有無やSNS活用状況をスコアリング。AIによるやさしいアドバイスを生成。
- **サイト自動生成**: 診断結果と要望をもとに、AIがLPの構成とコピーを自動生成。
- **サポートとFAQ抽出**: 顧客からの問い合わせを管理し、有用なものをAIが自動でFAQ候補として抽出。
- **紹介・クレジット制度**: 既存顧客の紹介による成約でクレジットを付与し、サポート費用や運用費に充当可能。

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
