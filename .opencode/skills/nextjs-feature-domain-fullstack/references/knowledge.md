# Next.js Feature-Domain Fullstack - Knowledge Reference

Complete reference for the feature-based architecture pattern. Use this when implementing specific features or need detailed understanding of layer responsibilities.

---

# Project Structure

```
my-project/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (providers)
│   │   ├── page.tsx            # Landing page
│   │   ├── globals.css         # Tailwind + theme vars
│   │   ├── api/                # API route handlers
│   │   │   └── feature-name/
│   │   │       └── route.ts
│   │   └── feature-name/       # Route groups
│   │       ├── page.tsx
│   │       └── layout.tsx
│   │
│   ├── features/               # Domain-driven feature modules
│   │   └── feature-name/       # One folder per feature
│   │       ├── index.tsx       # Feature entry point
│   │       ├── types.ts        # Feature-specific types
│   │       ├── components/     # Private UI components
│   │       ├── hooks/          # Feature-specific hooks
│   │       ├── lib/            # Feature utilities
│   │       └── sections/       # Page sections (page-level)
│   │
│   ├── components/             # Shared UI components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Navbar.tsx
│   │   └── Provider.tsx        # Context providers
│   │
│   ├── services/               # Backend service layer
│   │   └── feature-service.ts  # Business logic, external calls
│   │
│   ├── lib/                    # Core configuration
│   │   ├── index.ts            # SDK init (wagmi, etc.)
│   │   ├── type.ts             # Global types
│   │   ├── utils.ts            # Utility functions (cn)
│   │   ├── config/             # SDK configs
│   │   │   ├── pinataConfig.ts
│   │   │   └── queryClient.ts
│   │   └── validation/         # Zod schemas
│   │
│   ├── hook/                   # Global custom hooks
│   └── utils/                  # Pure helper functions
│
├── public/                     # Static assets
├── docs/                       # Project documentation
└── package.json
```

---

# Features Layer

Self-contained feature modules with private implementation details.

**Allowed:**
- React components (private to feature)
- Custom hooks (feature-specific)
- TypeScript types/interfaces
- Feature utilities
- Section components (for pages)

**Structure per feature:**
```
features/dashboard/
├── index.tsx              # Main export
├── types.ts               # Feature types
├── components/
│   ├── TrendingNFTs.tsx   # Private components
│   └── TrendingYappers.tsx
├── hooks/
│   └── useTrendingData.ts
└── sections/
    ├── HeroSection.tsx
    └── FooterSection.tsx
```

**Rules:**
- Don't import from other features (keep isolated)
- Export only what's needed from `index.tsx`
- Components in `components/` are private - not re-exported

---

# Services Layer

Business logic and external API calls. Services are called by API routes.

**Allowed:**
- Business logic
- External API integrations (Pinata, Groq, etc.)
- Smart contract interactions (read operations)
- Data transformation
- Validation (Zod schemas)

**Example Pattern:**
```typescript
// Services receive data, validate, call external APIs, return results
// See assets/scripts/service-template.ts for full template

class FeatureService {
  static async create(data: InputType) {
    // 1. Validate input with Zod
    const validated = schema.parse(data);
    
    // 2. Call external API (IPFS, AI, etc.)
    const result = await externalApi.call(validated);
    
    // 3. Transform and return
    return transformResult(result);
  }
}
```

**Rules:**
- Services are server-only (Node.js APIs)
- Never import services into client components
- Always use API routes as the boundary

---

# API Layer

Thin route handlers that delegate to services.

**Responsibilities:**
1. Receive HTTP request
2. Parse/validate input (Zod)
3. Call service layer
4. Return JSON response

**Pattern:**
```typescript
// API routes should be <20 lines
// See assets/scripts/api-route-template.ts for full template

export async function POST(request: Request) {
  const body = await request.json();
  const result = await FeatureService.create(body);
  return Response.json(result);
}
```

**Rules:**
- NO business logic here
- Always validate inputs
- Return consistent error responses

---

# Components Layer

Shared UI components used across features.

**Structure:**
```
components/
├── ui/                       # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
├── Navbar.tsx               # Shared layout components
├── ConnectButton.tsx        # Wallet connection
└── Provider.tsx             # App providers
```

**Rules:**
- shadcn components go in `ui/`
- Don't import from `features/`
- Keep presentation-only (no business logic)

---

# Web3 Integration Patterns

## Provider Setup

```typescript
// src/components/Provider.tsx
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## Wallet Connection

```typescript
// Using Reown AppKit
import { useAppKit } from '@reown/appkit';

export function ConnectButton() {
  const { open } = useAppKit();
  
  return (
    <button onClick={() => open()}>
      Connect Wallet
    </button>
  );
}
```

## Contract Interaction Hook

```typescript
// Feature-specific hook using TanStack Query
import { useMutation } from '@tanstack/react-query';

export function useCreateCollection() {
  return useMutation({
    mutationFn: async (data: CreateCollectionData) => {
      const response = await fetch('/api/contracts/create', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create collection');
      }
      
      return response.json();
    },
  });
}
```

---

# NFT Creation Flow (Complete Example)

## Feature Component

```typescript
// src/features/create-collections/index.tsx
'use client';

import { useState } from 'react';
import { FormControl } from './components/FormControl';
import { useCreateCollection } from './hooks/useCreateCollection';

export function CreateCollection() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null as File | null,
    maxSupply: 100,
    price: '0.01',
  });
  
  const { mutate, isPending } = useCreateCollection();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <FormControl 
        data={formData}
        onChange={setFormData}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Collection'}
      </button>
    </form>
  );
}
```

## Validation Schema

```typescript
// src/lib/validation/nft-validation.ts
import { z } from 'zod';

export const createNFTSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(1000).optional(),
  maxSupply: z.number().int().positive(),
  price: z.string().regex(/^\d+(\.\d+)?$/, 'Invalid price'),
  image: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024,
    'File must be less than 10MB'
  ),
});

export type CreateNFTInput = z.infer<typeof createNFTSchema>;
```

## Service Layer

```typescript
// src/services/contract-service.ts
import { pinata } from '@/lib/config/pinataConfig';
import { createNFTSchema } from '@/lib/validation/nft-validation';

export class ContractService {
  static async create(data: CreateNFTData) {
    // 1. Validate input
    const validated = createNFTSchema.parse(data);
    
    // 2. Upload image to IPFS
    const imageUpload = await pinata.upload.file(validated.image, {
      metadata: { name: '0.png' }
    });
    
    // 3. Create metadata JSON
    const metadata = {
      name: validated.name,
      description: validated.description,
      image: `ipfs://${imageUpload.IpfsHash}`,
    };
    
    // 4. Upload metadata to IPFS
    const metadataUpload = await pinata.upload.json(metadata, {
      metadata: { name: '0.json' }
    });
    
    // 5. Return data for smart contract
    return {
      metadataUri: `ipfs://${metadataUpload.IpfsHash}`,
      maxSupply: validated.maxSupply,
      price: validated.price,
    };
  }
}
```

## API Route

```typescript
// src/app/api/contracts/create/route.ts
import { ContractService } from '@/services/contract-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await ContractService.create(body);
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { error: 'Failed to create collection' },
      { status: 500 }
    );
  }
}
```

---

# AI Chatbot Integration

## API Route

```typescript
// src/app/api/chatbot/route.ts
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  const { messages } = await request.json();
  
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a helpful anime-themed assistant. Call users "investor-san".'
      },
      ...messages,
    ],
    model: 'openai/gpt-oss-20b',
  });
  
  return Response.json({
    message: completion.choices[0].message,
  });
}
```

## Client Hook

```typescript
// src/features/landingPage/hooks/useChatbot.ts
import { useMutation } from '@tanstack/react-query';

export function useChatbot() {
  return useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }]
        }),
      });
      return response.json();
    },
  });
}
```

---

# Environment Variables

**Client-side** (accessible in browser, prefix with `NEXT_PUBLIC_`):
```env
NEXT_PUBLIC_PROJECT_ID=          # Reown/WalletConnect
NEXT_PUBLIC_ALCHEMY_KEY=         # Blockchain indexing
```

**Server-side** (API routes only, NO prefix):
```env
GROQ_API_KEY=                    # AI service
PINATA_JWT=                      # IPFS uploads
PINATA_GATEWAY_URL=              # IPFS gateway
```

**Security rule:** Never prefix server-only keys with `NEXT_PUBLIC_`.

---

# Dependencies

Core stack:
```json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "zod": "^3.0.0",
  "@tanstack/react-query": "^5.0.0"
}
```

Web3 stack:
```json
{
  "wagmi": "^2.0.0",
  "viem": "^2.0.0",
  "@reown/appkit": "^1.0.0"
}
```

AI integration:
```json
{
  "groq-sdk": "^0.3.0"
}
```

---

# Resources

- **Next.js App Router:** https://nextjs.org/docs/app
- **Feature-Sliced Design:** https://feature-sliced.design/
- **TanStack Query:** https://tanstack.com/query/latest
- **wagmi:** https://wagmi.sh/
- **shadcn/ui:** https://ui.shadcn.com/
- **Reown AppKit:** https://reown.com/appkit
