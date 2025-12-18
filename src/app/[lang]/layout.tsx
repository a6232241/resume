import DayNightVisuals from "@src/components/DayNightVisuals";
import SocialLinks from "@src/components/SocialLinks";
import ThemeToggle from "@src/components/ThemeToggle";
import ThemeProvider from "@src/context/ThemeContext";
import "@src/styles/globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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
  title: "Kuan-Cheng Cai's Resume",
  description: "Kuan-Cheng Cai's Resume, built with Next.js 13 App Router and TypeScript.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const messages = await getMessages({ locale: lang });

  return (
    <ThemeProvider>
      <html lang={lang} className="h-full" suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                try {
                  const theme = localStorage.getItem("theme");
                  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  if (theme === "dark" || (!theme && systemPrefersDark)) {
                    document.documentElement.classList.add("dark");
                  }
                } catch (e) {}
              })();
            `,
            }}
            suppressHydrationWarning // 關鍵：避免 hydration mismatch
          />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <NextIntlClientProvider messages={messages}>
            <DayNightVisuals />
            <header className="sticky top-0 z-50 flex flex-row items-center justify-between bg-[var(--background)] p-4">
              <ThemeToggle />
              <SocialLinks />
            </header>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
