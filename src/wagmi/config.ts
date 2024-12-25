import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { baseSepolia } from "viem/chains";

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  // ssr: true,
  // storage: createStorage({
  //   storage: cookieStorage,
  // }),
});
