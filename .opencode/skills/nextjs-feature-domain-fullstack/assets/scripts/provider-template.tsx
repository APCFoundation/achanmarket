// Provider Setup Template
// Location: src/components/Provider.tsx
// Purpose: Wrap app with Wagmi, TanStack Query, and other providers
// Rules: Keep providers separate from business logic

'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Import your configurations from lib/config/
// import { wagmiConfig } from '@/lib/config/wagmiConfig';
// import { queryClient } from '@/lib/config/queryClient';

/**
 * Provider Component Template
 * 
 * Wraps the application with all necessary context providers.
 * Order matters - WagmiProvider must wrap QueryClientProvider
 * for proper Web3 + data fetching integration.
 * 
 * Usage:
 * In src/app/layout.tsx:
 * 
 * import { Provider } from '@/components/Provider';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <Provider>{children}</Provider>
 *       </body>
 *     </html>
 *   );
 * }
 */

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {/* Add other providers here */}
        {/* <ThemeProvider> */}
        {/* <AuthProvider> */}
        
        {/* UI Components that need to be inside providers */}
        {/* <Toaster /> */}
        
        {children}
        
        {/* </AuthProvider> */}
        {/* </ThemeProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

/**
 * Wagmi Configuration Template
 * Location: src/lib/config/wagmiConfig.ts
 */
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

/**
 * Query Client Configuration Template
 * Location: src/lib/config/queryClient.ts
 */
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global defaults
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Global mutation defaults
      retry: 1,
    },
  },
});

/**
 * Pinata Configuration Template (IPFS)
 * Location: src/lib/config/pinataConfig.ts
 */
import { PinataSDK } from 'pinata';

export const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT || '',
  pinataGateway: process.env.PINATA_GATEWAY_URL || '',
});
