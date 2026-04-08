import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas"
});

const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "C3 - Crore Club Consultant Bootcamp",
  description:
    "3-day live bootcamp with Shobhit Singhal for professionals who want to move from corporate dependency to consulting independence.",
  icons: {
    icon: "/favicon.png"
  },
  openGraph: {
    title: "C3 - Crore Club Consultant Bootcamp",
    description:
      "Register for the C3 Crore Club Consultant Bootcamp and unlock strategy, skills, systems, and bonuses for only ₹999.",
    images: ["/cover.webp"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable}`}>
      <body className="bg-bg font-body text-white antialiased">{children}</body>
    </html>
  );
}
