# Architecture — Achan Market

> System architecture and design decisions for the Achan Market NFT marketplace.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Browser)                         │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ Landing Page  │  │  Dashboard   │  │  Game Mode   │   ...pages   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘                │
│         │                 │                 │                       │
│         └─────────────────┼─────────────────┘                       │
│                           ▼                                         │
│              ┌────────────────────────┐                              │
│              │    Feature Modules     │  (domain logic + UI)         │
│              └────────────┬───────────┘                              │
│                           ▼                                         │
│         ┌─────────────────────────────────────┐                     │
│         │         Shared Components           │                     │
│         │  (Navbar, ConnectButton, shadcn/ui) │                     │
│         └─────────────────┬───────────────────┘                     │
│                           ▼                                         │
│    ┌──────────────────────────────────────────────┐                 │
│    │              Provider Layer                   │                 │
│    │  WagmiProvider → QueryClientProvider → App    │                 │
│    └──────────────────────┬───────────────────────┘                 │
│                           │                                         │
├───────────────────────────┼─────────────────────────────────────────┤
│                    NETWORK BOUNDARY                                  │
├───────────────────────────┼─────────────────────────────────────────┤
│                           ▼                                         │
│              ┌────────────────────────┐                              │
│              │   Next.js API Routes   │  (server-side)               │
│              │  /api/chatbot           │                              │
│              │  /api/contracts/*       │                              │
│              └─────────┬──────────────┘                              │
│                        │                                             │
│           ┌────────────┼────────────┐                                │
│           ▼            ▼            ▼                                │
│     ┌──────────┐ ┌──────────┐ ┌──────────────┐                     │
│     │ Groq AI  │ │  Pinata  │ │  EVM Chains  │                     │
│     │ (LLM)    │ │  (IPFS)  │ │  (Contracts) │                     │
│     └──────────┘ └──────────┘ └──────────────┘                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Layer Architecture

```
┌─────────────────────────────────────────────────┐
│                  Presentation                    │
│  src/app/ (routes) + src/features/ (UI modules) │
├─────────────────────────────────────────────────┤
│               Shared Components                  │
│      src/components/ + src/components/ui/        │
├─────────────────────────────────────────────────┤
│                Custom Hooks                      │
│    src/hook/ (global) + features/*/hooks/        │
├─────────────────────────────────────────────────┤
│               Service Layer                      │
│              src/services/                       │
├─────────────────────────────────────────────────┤
│              Core / Library                      │
│  src/lib/ (config, types, validation, mocks)    │
├─────────────────────────────────────────────────┤
│                Utilities                         │
│              src/utils/                          │
├─────────────────────────────────────────────────┤
│              API Layer                           │
│          src/app/api/ (Route Handlers)           │
├─────────────────────────────────────────────────┤
│           External Services                      │
│    Groq AI  ·  Pinata IPFS  ·  EVM Blockchains  │
└─────────────────────────────────────────────────┘
```

### Layer Descriptions

| Layer | Path | Responsibility |
|---|---|---|
| **Presentation** | `src/app/`, `src/features/` | Page routing (App Router) and feature-scoped UI modules with sections, components, and layouts |
| **Shared Components** | `src/components/` | Reusable UI primitives (Navbar, ConnectButton) and shadcn/ui design system components |
| **Custom Hooks** | `src/hook/`, `src/features/*/hooks/` | Encapsulated stateful logic — hydration guards, media queries, data fetching |
| **Service Layer** | `src/services/` | Business logic for contract interactions and IPFS uploads via Pinata |
| **Core / Library** | `src/lib/` | Configuration (wagmi, Pinata, React Query), TypeScript types, Zod validation schemas, mock data, and contract addresses |
| **Utilities** | `src/utils/` | Pure helper functions (address shortening, rate limiting, string truncation, hashing) |
| **API Layer** | `src/app/api/` | Next.js Route Handlers acting as BFF — proxying to Groq AI and handling file uploads |
| **External Services** | — | Third-party integrations: Groq (AI), Pinata (IPFS), EVM chains via wagmi/viem |

---

## Data Flow Diagrams

### NFT Collection Creation Flow

```
User fills form
       │
       ▼
┌──────────────────┐     Zod validation      ┌─────────────────┐
│  FormControl.tsx  │ ──────────────────────► │ nft-validation   │
│  (create-collections)                       │ (Zod schemas)    │
└──────┬───────────┘                          └─────────────────┘
       │
       ▼  POST /api/contracts/create
┌──────────────────┐
│  API Route        │
│  (Route Handler)  │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ ContractService   │
│ .create()         │
└──────┬───────────┘
       │
       ├──► Upload artwork to Pinata ──► returns imageCID
       │
       ├──► Build metadata JSON with ipfs://imageCID
       │
       ├──► Upload metadata to Pinata ──► returns metadataCID
       │
       ▼
┌──────────────────┐
│  Smart Contract   │  createNFTCollection(metadataCID, maxSupply, price)
│  (NFTFactory)     │
└──────────────────┘
       │
       ▼
  NFT Collection deployed on-chain
```

### Wallet Connection Flow

```
User clicks "Connect Wallet"
       │
       ▼
┌──────────────────┐
│  ConnectButton /  │  calls useAppKit().open({ view: "Connect" })
│  Navbar           │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Reown AppKit     │  WalletConnect modal
│  (Modal)          │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  WagmiProvider    │  useAccount() → { address, isConnected }
│  (State)          │  Cookie-persisted via cookieStorage
└──────┬───────────┘
       │
       ▼
  UI updates with wallet address
  (guarded by useHydrate for SSR)
```

### AI Chatbot Flow

```
User sends message
       │
       ▼
┌──────────────────┐
│  Chatbot UI       │  (features/landingPage/components/chatbot)
└──────┬───────────┘
       │
       ▼  POST /api/chatbot
┌──────────────────┐
│  API Route        │  Appends message to conversation array
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Groq SDK         │  model: "openai/gpt-oss-20b"
│  (LLM)            │  System prompt: Frieren persona
└──────┬───────────┘
       │
       ▼
  AI response returned to UI
  (persona: anime assistant "investor-san")
```

---

## Feature Module Structure

Each feature follows a consistent internal organization:

```
src/features/<feature-name>/
├── index.tsx          # Feature entry point / main component
├── types.ts           # Feature-specific TypeScript types
├── components/        # UI components scoped to this feature
│   ├── ComponentA.tsx
│   └── ComponentB.tsx
├── hooks/             # Feature-specific custom hooks
│   └── useFeatureData.ts
├── sections/          # Page sections (for page-level features)
│   ├── HeroSection.tsx
│   └── FooterSection.tsx
├── layout/            # Layout wrappers
│   └── SectionOverview.tsx
├── lib/               # Feature-specific utilities or data
└── utils/             # Feature-specific helpers
```

### Feature Modules

| Feature | Route | Purpose |
|---|---|---|
| `landingPage` | `/` | Marketing landing page with hero, features, grid, footer, chatbot, and inventory |
| `dashboard` | `/dashboard` | NFT trading dashboard with trending NFTs and social leaderboard |
| `game` | `/game` | RPG-style gamified experience with character companion and HUD |
| `create-collections` | `/dashboard/create` | Multi-step NFT collection creation form with chain selection |
| `top-sections` | used in dashboard | Leaderboard tables for top collections and top yappers |

---

## Provider & Context Architecture

```
<html>
  <body>
    └── Provider.tsx
        ├── WagmiProvider          ← Web3 wallet state (cookie-persisted)
        │   └── QueryClientProvider ← TanStack React Query (singleton)
        │       └── <main>
        │           ├── Toaster    ← Sonner toast notifications
        │           └── {children} ← Page content
```

### State Management

| Concern | Solution |
|---|---|
| Wallet / Chain state | wagmi hooks (`useAccount`, `useSignMessage`, etc.) |
| Server state / caching | TanStack React Query v5 |
| Client-side hydration | Custom `useHydrate` hook |
| Responsive layout | Custom `useMedia` hook (react-responsive) |
| Form state | React local state + Zod validation |
| Theme | CSS variables (Tailwind v4 `@theme`) + `.dark` class |

---

## Styling Architecture

```
globals.css
├── @import "tailwindcss"          ← Tailwind v4 base
├── @config tailwind.config.ts     ← Theme extensions
├── :root { ... }                  ← CSS custom properties (light)
├── .dark { ... }                  ← Dark theme overrides
├── @theme { ... }                 ← Tailwind v4 theme tokens (HSL)
├── @layer utilities { ... }       ← Custom utilities (rpg-glass-panel, font-game, ornate-border)
├── Custom animations              ← Character entrance, rotations, nav, loaders
└── Component overrides             ← Wallet button, scrollbar, number inputs
```

### Design System Stack

```
Tailwind CSS v4 (utility-first)
    └── shadcn/ui (New York variant, Radix primitives)
        └── Aceternity UI (additional registry)
            └── Custom CSS (anime/RPG themed)
```

---

## External Service Integrations

```
                    ┌─────────────────────────┐
                    │      Achan Market        │
                    └─────────┬───────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
    ┌───────────────┐ ┌──────────────┐ ┌───────────────┐
    │   Groq AI     │ │  Pinata      │ │  EVM Chains   │
    │               │ │              │ │               │
    │ • Chat API    │ │ • File upload│ │ • Ethereum    │
    │ • gpt-oss-20b │ │ • IPFS pin   │ │ • Polygon     │
    │ • System      │ │ • Metadata   │ │ • Arbitrum    │
    │   prompts     │ │   storage    │ │ • Base        │
    └───────────────┘ └──────────────┘ │ • Optimism    │
                                       │ • Avalanche   │
    ┌───────────────┐                  │ • BSC         │
    │  Planned      │                  │ • opBNB       │
    │               │                  │ • Berachain   │
    │ • OpenSea API │                  │ • Sepolia     │
    │ • MagicEden   │                  └───────────────┘
    │ • Moralis     │
    │ • Kaito API   │                  ┌───────────────┐
    └───────────────┘                  │  Reown AppKit │
                                       │ (WalletConnect)│
                                       └───────────────┘
```

| Service | Purpose | Auth |
|---|---|---|
| **Groq** | AI chatbot (Frieren persona) | `GROQ_API_KEY` (server-side) |
| **Pinata** | IPFS file storage for NFT artwork + metadata | `PINATA_JWT` + `PINATA_GATEWAY_URL` (server-side) |
| **Reown AppKit** | Multi-chain wallet connection modal | `NEXT_PUBLIC_PROJECT_ID` (client-side) |
| **Alchemy** | NFT data indexing (planned) | `NEXT_PUBLIC_ALCHEMY_KEY` (client-side) |

---

## Route Map

```
/                          → Landing Page (LandingPage feature)
├── /dashboard             → NFT Dashboard (TrendingNFT + TrendingYappers)
│   └── /dashboard/create  → Create NFT Collection (create-collections feature)
├── /game                  → Game Mode (RPG layout)
│   └── /game/choose       → Character/Game Selection
├── /product               → Product Detail Page
├── /try                   → Experimental Page
└── /api
    ├── /api/chatbot       → AI Chatbot (GET init, POST chat)
    └── /api/contracts
        ├── /create        → Create NFT (Pinata upload)
        ├── /createPinataGroup → Group management
        └── /test          → Test endpoints
```

---

## Smart Contract Architecture

```
┌────────────────────────────────┐
│         NFTFactory             │  (Deployed on Sepolia)
│                                │
│  createNFTCollection()         │──► Deploys new NFT contract
│  collections[]                 │──► Registry of all collections
│  getUserCollections()          │──► Query by creator address
│  userCollections[]             │──► User → collection ID mapping
│                                │
│  Event: CollectionCreated      │──► (collectionId, creator, nftAddress)
└────────────────────────────────┘
         │
         ▼ deploys
┌────────────────────────────────┐
│      NFT Contract (ERC-721)    │  (One per collection)
│                                │
│  • URI (ipfs://metadataCID)    │
│  • Max Supply                  │
│  • Mint Price                  │
└────────────────────────────────┘
```

---

## Security Boundaries

| Boundary | What's Protected |
|---|---|
| **Server-side API keys** | `GROQ_API_KEY`, `PINATA_JWT`, `PINATA_GATEWAY_URL` — never exposed to client |
| **Client-side public keys** | `NEXT_PUBLIC_PROJECT_ID`, `NEXT_PUBLIC_ALCHEMY_KEY` — safe for browser |
| **File validation** | Max 10MB, allowed types: PNG/JPEG/JPG/GIF — enforced in `ContractService` |
| **Input validation** | Zod schemas for NFT creation fields — enforced before any upload |
| **Rate limiting** | `src/utils/rateLimit.ts` — available but integration TBD |
| **Wallet signing** | `useSignMessage` for wallet authentication on connect |
