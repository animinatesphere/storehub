import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const BASE_URL = "https://storehub-eight.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ClientFlow — Build your store, share one link, get paid",
    template: "%s — ClientFlow",
  },
  description:
    "ClientFlow lets anyone in Nigeria sell online in minutes. Build a storefront, share a link on WhatsApp or Instagram, and accept payments via Paystack — no website skills needed.",
  keywords: ["online store Nigeria", "sell online Nigeria", "Paystack store", "Nigerian marketplace", "ClientFlow"],
  authors: [{ name: "ClientFlow" }],
  creator: "ClientFlow",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: BASE_URL,
    siteName: "ClientFlow",
    title: "ClientFlow — Build your store, share one link, get paid",
    description:
      "The simplest way for Nigerian sellers to build an online store, share a link, and get paid via Paystack. Free to start.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClientFlow — Nigeria's seller platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClientFlow — Build your store, share one link, get paid",
    description:
      "The simplest way for Nigerian sellers to build an online store, share a link, and get paid via Paystack.",
    images: ["/og-image.png"],
    creator: "@clientflow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
