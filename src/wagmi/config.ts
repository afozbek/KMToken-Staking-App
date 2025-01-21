"use client";

import { http, createConfig } from "wagmi";
import { baseSepolia } from "viem/chains";
import { metaMask } from "wagmi/connectors";

const connectors = typeof window !== "undefined" ? [metaMask()] : [];

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  connectors,
  ssr: true,
});
