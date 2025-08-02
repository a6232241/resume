import ThemeToggle from "@src/components/ThemeToggle";
import "@src/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export const metadata: Metadata = {
  title: "蔡寬程的履歷",
  description: "蔡寬程的履歷，使用 Next.js 13 App Router 和 TypeScript 開發。",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: "en" | "zh" }>;
}>) {
  return (
    <html lang={(await params).lang} className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="p-4">
          <ThemeToggle />
        </header>
        {children}
      </body>
    </html>
  );
}
