import type { Metadata } from "next";
import { Lora, Public_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/get-dictionary";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["500", "600", "700"],
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: `${dict.meta.siteName} — ${dict.meta.tagline}`,
    description: dict.home.heroSubtitle,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} className={`${lora.variable} ${publicSans.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header locale={locale as Locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
      </body>
    </html>
  );
}
