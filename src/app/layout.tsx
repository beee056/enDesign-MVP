import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { jaJP } from "@clerk/localizations";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://en-design-mvp.vercel.app"),
  title: "enDesign｜地域事業者のための無料Web診断・5万円からのホームページ制作",
  description: "いい仕事が、ちゃんと届くように。Webに詳しくない地域事業者のための無料Web診断と、5万円からの明朗会計ホームページ制作。自分でできることは無料で、一人では不安なところだけを低価格で一緒に整えます。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "enDesign｜地域事業者のための無料Web診断・ホームページ制作",
    description: "自分でできることは無料で。一人では不安なところだけ、低価格で一緒に整えます。",
    url: "https://en-design-mvp.vercel.app",
    siteName: "enDesign",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "enDesign - 地域事業者のための無料Web診断・ホームページ制作",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={jaJP}>
      <html
        lang="ja"
        className={`${inter.variable} ${notoSansJP.variable} h-full antialiased`}
        style={{ fontFamily: "var(--font-inter), var(--font-noto-sans-jp), ui-sans-serif, system-ui, sans-serif" }}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
