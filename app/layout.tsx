import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sunnyland-sports.openai.app"),
  title: {
    default: "Sunnyland Sports — Play, made better",
    template: "%s · Sunnyland Sports",
  },
  description:
    "Signature floor curling sets and original sports and games from an experienced Ningbo manufacturer.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
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
      <body>{children}</body>
    </html>
  );
}
