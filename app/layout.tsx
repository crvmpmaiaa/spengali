// spencer-lynch/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono, Rye } from "next/font/google";
import "./globals.css";
import { WhatsAppWidget } from "@/components/footer/whatsapp-widget";
import { StructuredData } from "@/components/structured-data";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
const rye = Rye({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rye",
  display: "swap",
});

const BASE = "https://howdidhedothat.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/favicon-512.png",
  },
  title: {
    default: "Spencer Lynch · Close-Up Magician Liverpool · Memorable Magic",
    template: "%s · Spencer Lynch",
  },
  description:
    "Liverpool FC's Club Magician since 2006 and the first Club Magician at Everton FC. Close-up magic for corporate events, weddings, stadium hospitality and private parties across the UK.",
  keywords: [
    "close-up magician Liverpool",
    "corporate magician UK",
    "wedding magician Liverpool",
    "Liverpool FC magician",
    "Premier League magician",
    "Spencer Lynch magician",
    "Memorable Magic",
    "close-up magic corporate events",
    "magician for hire UK",
    "stadium hospitality magician",
  ],
  authors: [{ name: "Spencer Lynch", url: BASE }],
  creator: "Spencer Lynch",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: BASE,
    siteName: "Spencer Lynch · Memorable Magic",
    title: "Spencer Lynch · Close-Up Magician Liverpool",
    description:
      "Liverpool FC's official magician since 2006. Twenty years of close-up magic for stadiums, boardrooms, weddings and private events.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spencer Lynch · Close-Up Magician Liverpool",
    description:
      "Liverpool FC's official magician since 2006. Twenty years of close-up magic for stadiums, boardrooms, weddings and private events.",
  },
  alternates: { canonical: BASE },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} ${rye.variable}`}
    >
      <body className="bg-ink text-cream font-sans antialiased">
        <StructuredData />
        {children}
        <WhatsAppWidget phoneE164={process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "447000000000"} />
      </body>
    </html>
  );
}
