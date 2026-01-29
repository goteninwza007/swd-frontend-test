import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import Providers from "./providers";
import "antd/dist/reset.css";
import dynamic from "next/dynamic";
const LanguageSwitcher = dynamic(
  () => import("@/components/LanguageSwitcher"),
  { ssr: false },
);

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SWD Fronted Assignment",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LanguageSwitcher />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
