import type { Metadata } from "next";
import { Geist, Geist_Mono, Tomorrow } from "next/font/google";
import "./globals.css";
import { cookieToInitialState } from "wagmi";
import { config } from "../wagmi/config";
import { headers } from "next/headers";
import { WagmiProviders } from "../wagmi/Provider";
import { WalletConnectorProvider } from "./context/walletContext";
import DefaultLayout from "@/layouts/DefaultLayout";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headers_ = await headers();
  const initialState = cookieToInitialState(config, headers_.get("cookie"));

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fontTomorrow.variable} antialiased`}
      >
        <WagmiProviders initialState={initialState}>
          <WalletConnectorProvider>
            <DefaultLayout>{children}</DefaultLayout>
          </WalletConnectorProvider>
        </WagmiProviders>
      </body>
    </html>
  );
}
