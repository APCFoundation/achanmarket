import {
  mainnet,
  polygon,
  sepolia,
  optimism,
  arbitrum,
  base,
  avalanche,
} from "wagmi/chains";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage } from "wagmi";
const networks = [mainnet, arbitrum];
import { createAppKit } from "@reown/appkit/react";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

// Set up metadata
const metadata = {
  name: "A-Chan Market",
  description: "Marketplace NFT with anime style",
  url: "http://localhost", // origin must match your domain & subdomain
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  networks,
  projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum, avalanche, base, optimism, polygon, sepolia],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

const config = wagmiAdapter.wagmiConfig;

export { config, wagmiAdapter, modal };
