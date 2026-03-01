# AGENTS.md — Achan Market

> Comprehensive guide for AI agents and developers working with this codebase.

---

## Project Overview

**Achan Market** is an anime-themed, multi-chain NFT marketplace built with **Next.js 16** (App Router). Users can trade, mint, and create NFT collections across multiple EVM chains through a single unified interface. The app features an AI chatbot assistant with an anime personality, gamified UI elements, and a social leaderboard system.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS v4 + shadcn/ui (New York style) + Aceternity UI |
| Web3 | wagmi v2 + viem v2 + Reown AppKit (WalletConnect) |
| IPFS Storage | Pinata SDK |
| AI / LLM | Groq SDK (`openai/gpt-oss-20b` model) |
| Animation | GSAP + Framer Motion + CSS keyframes |
| Data Fetching | TanStack React Query v5 |
| Validation | Zod v4 |
| Charts | Recharts |
| Package Manager | pnpm 8.15.5 |
| Fonts | Inter (body), Press Start 2P (display/game) |

---

## Directory Structure

```
achanmarket/
├── public/                    # Static assets (characters, logos, chain icons, vectors)
├── design/                    # Design files (currently empty)
├── docs/                      # Documentation
├── src/
│   ├── abi.js                 # NFTFactory smart contract ABI
│   ├── app/                   # Next.js App Router pages & API routes
│   │   ├── layout.tsx         # Root layout (Provider, Toaster, fonts)
│   │   ├── page.tsx           # Landing page entry
│   │   ├── globals.css        # Global styles, theme vars, animations
│   │   ├── api/
│   │   │   ├── chatbot/route.ts       # Groq AI chatbot endpoint
│   │   │   ├── contracts/             # Contract-related API routes
│   │   │   │   ├── create/            # NFT creation endpoint
│   │   │   │   ├── createPinataGroup/ # Pinata group creation
│   │   │   │   └── test/              # Test endpoints
│   │   │   └── route.ts               # Base API route
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── layout.tsx     # Dashboard layout with Navbar
│   │   │   ├── page.tsx       # Main dashboard (Trending NFTs & Yappers)
│   │   │   └── create/        # NFT collection creation page
│   │   ├── game/              # Game mode pages
│   │   │   ├── layout.tsx     # Game layout (RPG-style)
│   │   │   ├── page.tsx       # Game home
│   │   │   └── choose/        # Character/game selection
│   │   ├── product/page.tsx   # Product detail page
│   │   └── try/page.tsx       # Experimental/test page
│   ├── components/            # Shared components
│   │   ├── ConnectButton.tsx   # Wallet connection button
│   │   ├── Icon.tsx            # Icon component
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── Provider.tsx        # Wagmi + React Query providers
│   │   └── ui/                 # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── drawer.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── multi-step-loader.tsx
│   │       ├── multi-step-loader-custom.tsx
│   │       ├── select.tsx
│   │       └── sonner.tsx
│   ├── features/              # Feature modules (domain-driven)
│   │   ├── landingPage/        # Landing page feature
│   │   │   ├── index.tsx       # Main landing page component
│   │   │   ├── components/     # Landing page UI (Character, Navigation, Chatbot, etc.)
│   │   │   ├── sections/       # Page sections (Hero, Features, Grid, Footer)
│   │   │   ├── layout/         # SectionOverview layout
│   │   │   └── utils/          # Landing page utilities
│   │   ├── dashboard/          # Dashboard feature
│   │   │   └── components/     # TrendingNFT, TrendingYappers
│   │   ├── game/               # Game mode feature (RPG-style UI)
│   │   │   ├── index.tsx
│   │   │   ├── GameLayoutContent.tsx
│   │   │   ├── components/     # AchanCompanion, GameTopHUD, GameBottomNav
│   │   │   └── pages/          # ChoosePage
│   │   ├── create-collections/ # NFT collection creation feature
│   │   │   ├── index.tsx
│   │   │   ├── types.ts
│   │   │   ├── components/     # FormControl, SwitchChain, HeaderClearForm
│   │   │   └── hooks/          # Feature-specific hooks
│   │   └── top-sections/       # Leaderboard/Top sections feature
│   │       ├── TopSections.tsx
│   │       ├── types.ts
│   │       ├── components/     # TopCollectionTable, TopYappers, SectionNavbar
│   │       ├── hooks/
│   │       └── lib/
│   ├── hook/                   # Global custom hooks
│   │   ├── useHydrate.tsx      # SSR hydration guard
│   │   ├── useMedia.tsx        # Responsive breakpoint detection
│   │   ├── useRefProduct.tsx   # Product page refs
│   │   └── useTrendingYappers.ts # Trending yappers data hook
│   ├── lib/                    # Core library & configuration
│   │   ├── index.ts            # Wagmi + Reown AppKit setup
│   │   ├── type.ts             # TypeScript interfaces (NftData, Yapper, etc.)
│   │   ├── contractAddress.ts  # Smart contract addresses per chain
│   │   ├── utils.ts            # Utility functions (cn)
│   │   ├── mockCollections.ts  # Mock NFT collection data
│   │   ├── mockTrendingNFTs.ts # Mock trending NFT data
│   │   ├── mockYappers.ts      # Mock yapper/social data
│   │   ├── config/
│   │   │   ├── pinataConfig.ts # Pinata SDK initialization
│   │   │   └── queryClient.ts  # TanStack Query client (singleton)
│   │   ├── validation/
│   │   │   ├── index.ts        # Generic Zod validation helper
│   │   │   └── nft-validation.ts # NFT creation validation schemas
│   │   └── exception/
│   │       └── ResponseError.ts # Custom error class
│   ├── services/               # Backend service layer
│   │   ├── contract-service.ts       # NFT creation service (Pinata upload)
│   │   ├── learn-contract-services.ts # Contract learning/reference service
│   │   └── temp.data.route.ts        # Temporary data route handler
│   └── utils/                  # Utility functions
│       ├── hashObject.ts       # Object hashing
│       ├── rateLimit.ts        # Rate limiting utility
│       ├── shortenAddress.ts   # EVM address shortening
│       └── truncateString.ts   # String truncation
├── .env.example                # Environment variable template
├── components.json             # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration (image domains)
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

---

## Supported EVM Chains

The app supports multi-chain connectivity via Reown AppKit:

- Ethereum Mainnet
- Polygon
- Arbitrum
- Optimism
- Base
- Avalanche
- BSC (Binance Smart Chain)
- opBNB
- Berachain
- Sepolia (testnet)

> The NFTFactory smart contract is currently deployed only on **Sepolia** (`0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99`).

---

## Smart Contract (NFTFactory)

The ABI in `src/abi.js` defines an `NFTFactory` contract with:

| Function | Description |
|---|---|
| `createNFTCollection(uri, maxSupply, price)` | Creates a new NFT collection, returns NFT contract address |
| `collections(uint256)` | View collection by ID (id, creator, nftAddress) |
| `getUserCollections(address)` | View all collections for a user |
| `userCollections(address, uint256)` | View specific user collection ID |
| `CollectionCreated` (event) | Emitted when a new collection is created |

---

## Environment Variables

Required environment variables (see `.env.example`):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_PROJECT_ID` | Reown/WalletConnect project ID |
| `NEXT_PUBLIC_ALCHEMY_KEY` | Alchemy API key (NFT data indexing) |
| `GROQ_API_KEY` | Groq API key for AI chatbot |
| `PINATA_JWT` | Pinata JWT for IPFS uploads |
| `PINATA_GATEWAY_URL` | Pinata gateway URL |

---

## Key Patterns & Conventions

### Feature-Based Architecture
Code is organized by feature domain under `src/features/`. Each feature module contains its own `components/`, `hooks/`, `types.ts`, and `lib/` as needed. Shared components live in `src/components/`.

### Provider Hierarchy
The root layout wraps the app with:
1. **WagmiProvider** — Web3 wallet state (cookie-persisted)
2. **QueryClientProvider** — TanStack React Query (singleton client)
3. **Toaster** — Sonner toast notifications

### Theming
- CSS variables defined in `globals.css` using `@theme` (Tailwind v4 syntax)
- Light and `.dark` theme variants
- shadcn/ui uses HSL-based color variables
- Anime/RPG aesthetic with `Press Start 2P` font and custom glass-panel effects

### Wallet Integration
- `useAppKit()` hook from Reown opens wallet connection modal
- `useAccount()` from wagmi provides connected wallet state
- `useHydrate()` hook prevents SSR hydration mismatches for wallet-dependent UI

### Validation
- Zod schemas defined in `src/lib/validation/nft-validation.ts`
- Generic validation helper in `src/lib/validation/index.ts` wraps `safeParse()`
- Custom `ResponseError` class for structured error responses

### IPFS Upload Flow
1. Artwork file uploaded to Pinata as `0.png` in a named folder
2. Metadata JSON (with IPFS CID reference to artwork) uploaded as `0.json`
3. Returns the metadata CID (`ipfs://...`) used as the NFT token URI

---

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/chatbot` | `GET` | Initialize AI chatbot with system prompt |
| `/api/chatbot` | `POST` | Send messages to Groq AI, get responses |
| `/api/contracts/create` | `POST` | Create NFT collection (upload to Pinata) |
| `/api/contracts/createPinataGroup` | varies | Create Pinata file groups |
| `/api/contracts/test` | varies | Test endpoints |

### AI Chatbot Persona
The chatbot uses Groq's `openai/gpt-oss-20b` model with a custom system prompt:
- Persona: **Frieren** (calm, soft, cute anime girl)
- Calls users **"investor-san"**
- Responds only about Achan Market features
- Default language: English (adapts to user's language)

---

## Development Commands

```bash
pnpm dev        # Start dev server
pnpm devbo      # Start dev server with Turbopack
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

---

## Key UI Features

### Landing Page
- Animated character entrance with GSAP/CSS keyframes
- Floating navigation with clip-path morphing on hover
- Card flip effects (3D perspective transforms)
- Inventory panel (user's NFTs, requires wallet)
- Integrated AI chatbot panel
- Hero, Features, Grid, and Footer sections

### Dashboard
- Trending NFTs with collection data
- Trending Yappers (Twitter/social leaderboard with sparkline charts)
- Trade, Mint, and Create navigation
- Wallet connection with address display

### Game Mode
- RPG-style layout with HUD (top bar + bottom nav)
- Achan Companion character
- Choose page for game/character selection
- Glass-panel UI effects with ornate borders

### Create Collections
- Multi-step form with chain selector
- Drag-and-drop file upload (react-dropzone)
- Real-time Zod validation
- Multi-step loading animation during creation

---

## Path Aliases

Configured in `tsconfig.json`:

```
@/* → ./src/*
```

---

## Image Domains

Allowed remote image sources (configured in `next.config.mjs`):
- `i.ibb.co.com` — Image hosting
- `ipfs.io` — IPFS gateway
- `somnia-avatar-v2-view-prod-dot-metaverse-browser-422108.uc.r.appspot.com` — Avatar service
- `i2.seadn.io`, `i2c.seadn.io` — OpenSea CDN
- `pbs.twimg.com` — Twitter profile images
- `picsum.photos` — Placeholder images
- `placehold.co` — Placeholder images

---

## Notes for Agents

1. **Mock data is used extensively** — `mockCollections.ts`, `mockTrendingNFTs.ts`, `mockYappers.ts` provide placeholder data. Real API integrations (OpenSea, MagicEden, Moralis, Kaito) are planned but not yet implemented.
2. **The smart contract is only on Sepolia** — Other chain addresses in `contractAddress.ts` are empty strings.
3. **Some files are learning/reference code** — `learn-contract-services.ts` and `temp.data.route.ts` appear to be experimental or reference implementations.
4. **The `src/features/landingPage/a.ts`** file appears to be a scratch/temporary file.
5. **The `try/` route** is an experimental/testing page.
6. **shadcn/ui** components are configured with the "new-york" style variant and use Lucide icons.
7. **Aceternity UI** is registered as an additional component registry in `components.json`.
8. **No testing framework** is currently set up — there are no test files or testing dependencies.
9. **No CI/CD** — The `.github/workflows/` directory exists but is empty.
10. **Language mix** — Some code comments are in **Indonesian** (Bahasa Indonesia), e.g., CSS comments like `/* Tambahkan ini */` = "Add this".
