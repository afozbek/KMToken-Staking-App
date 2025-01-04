import { http, createConfig, injected } from "wagmi";
import { baseSepolia } from "viem/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  connectors: [injected(), metaMask()],
});
