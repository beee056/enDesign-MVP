import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',          // 管理画面
        '/check/result/',   // 個別の診断結果ページ（個人情報含むためインデックスさせない）
        '/api/',            // APIエンドポイント
        '/sign-in/'         // ログイン画面
      ],
    },
    sitemap: 'https://endesign.p-quest.com/sitemap.xml',
  }
}
