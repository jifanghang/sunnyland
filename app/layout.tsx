import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sunnylandsports.com"),
  title: {
    default: "Sunnyland Sports — Play, made better",
    template: "%s · Sunnyland Sports",
  },
  description:
    "Signature floor curling sets and original sports and games from an experienced Ningbo manufacturer.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "256x256" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "Sunnyland — Play, made better.",
    description: "Signature curling sets and original games, designed in Ningbo and played around the world.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sunnyland — Play, made better." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunnyland — Play, made better.",
    description: "Signature curling sets and original games, designed in Ningbo and played around the world.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
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
