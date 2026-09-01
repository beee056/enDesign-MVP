import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { jaJP } from "@clerk/localizations";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Nexus Suite Design System — Inter as the single SaaS typeface
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Japanese character supplement
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://en-design-mvp.vercel.app"),
  title: "enDesign｜いい仕事を、見つけてから作る。調査から始めるLP制作",
  description: "口コミ・SNS・検索・競合を先に調べ、事業者にしかない価値を見つけて試作LPへ。調査・戦略・デザイン・実装・手描きイラストまで一貫して行うWeb制作サービスです。",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "1024x1024" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  openGraph: {
    title: "enDesign｜いい仕事を、見つけてから作る。",
    description: "口コミ・SNS・検索・競合の調査から始める、事業者らしさが伝わるLP制作。",
    url: "https://en-design-mvp.vercel.app",
    siteName: "enDesign",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "enDesign - いい仕事を、見つけてから作る。調査から始めるLP制作",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "enDesign｜いい仕事を、見つけてから作る。",
    description: "口コミ・SNS・検索・競合の調査から始めるLP制作。",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const document = (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} ${notoSerifJP.variable} h-full antialiased`}
      style={{ fontFamily: "var(--font-inter), var(--font-noto-sans-jp), ui-sans-serif, system-ui, sans-serif" }}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );

  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) return document;

  return <ClerkProvider localization={jaJP}>{document}</ClerkProvider>;
}
