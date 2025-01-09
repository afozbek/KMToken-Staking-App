import type { Metadata } from "next";
import { Geist, Geist_Mono, Tomorrow } from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontTomorrow = Tomorrow({
  variable: "--font-tomorrow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Staking Dapp",
  description: "Staking Dapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fontTomorrow.variable} antialiased`}
      >
        <DefaultLayout>{children}</DefaultLayout>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
