import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { jaJP } from "@clerk/localizations";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "enDesign｜地域事業者のための無料Web診断・5万円からのホームページ制作",
  description: "いい仕事が、ちゃんと届くように。Webに詳しくない地域事業者のための無料Web診断と、5万円からの明朗会計ホームページ制作。自分でできることは無料で、一人では不安なところだけを低価格で一緒に整えます。",
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
        className={`${inter.className} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
