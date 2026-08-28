import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sunnylandsports.com"),
  title: {
    default: "Sunnyland Sports — Play, made better",
    template: "%s · Sunnyland Sports",
  },
  description:
    "Floor curling, outdoor leisure sports, indoor sports and original indoor games from an experienced Ningbo manufacturer.",
  icons: {
    icon: [{ url: "/favicon.png?v=20260828", type: "image/png", sizes: "256x256" }],
    shortcut: "/favicon.png?v=20260828",
    apple: "/favicon.png?v=20260828",
  },
  openGraph: {
    type: "website",
    title: "Sunnyland Sports — Play, made better.",
    description: "Explore the 2026 Sunnyland range: curling, outdoor leisure sports, indoor sports and original indoor games.",
    images: [{ url: "/og-catalogue-2026.png", width: 1728, height: 910, alt: "Sunnyland Sports — 2026 product range" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunnyland Sports — Play, made better.",
    description: "Explore the 2026 Sunnyland range: curling, outdoor leisure sports, indoor sports and original indoor games.",
    images: ["/og-catalogue-2026.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png?v=20260828" type="image/png" sizes="256x256" />
        <link rel="shortcut icon" href="/favicon.png?v=20260828" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png?v=20260828" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
