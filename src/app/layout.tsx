import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { siteConfig } from "@/data/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL("https://vishalrohera.tech"),
  title: {
    default: `${siteConfig.name}, ${siteConfig.role} in Ahmedabad`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: "https://vishalrohera.tech",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vishalrohera.tech",
    title: `${siteConfig.name}, ${siteConfig.role} in Ahmedabad`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // og:image is auto-injected from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}, ${siteConfig.role} in Ahmedabad`,
    description: siteConfig.description,
    // twitter:image falls back to app/opengraph-image.tsx
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // favicon + apple-touch-icon are auto-injected from app/icon.tsx & app/apple-icon.tsx
};

export const viewport: Viewport = {
  themeColor: "#07070f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
