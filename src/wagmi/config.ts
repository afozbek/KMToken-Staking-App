import { http, createConfig, injected } from "wagmi";
import { baseSepolia } from "viem/chains";

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  connectors: [injected()],
  ssr: true,
});
