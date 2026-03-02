# 🎮 Achan Market

> An anime-themed, multi-chain NFT marketplace built with **Next.js 16** (App Router).

Trade, mint, and create NFT collections across multiple EVM chains through a single unified interface — featuring an AI chatbot assistant with an anime personality, gamified UI elements, and a social leaderboard system.

---

## ✨ Features

- **Multi-Chain NFT Trading** — Trade NFTs across Ethereum, Polygon, Arbitrum, Base, BSC, and more
- **NFT Collection Creation** — Create and deploy NFT collections with drag-and-drop uploads to IPFS (Pinata)
- **AI Chatbot** — Anime-persona chatbot assistant powered by Groq AI (`openai/gpt-oss-20b`)
- **Game Mode** — RPG-style gamified UI with HUD, companion character, and glass-panel effects
- **Leaderboard** — Trending NFTs and Top Yappers social leaderboard with sparkline charts
- **Animated Landing Page** — GSAP/CSS keyframe animations, card flip effects, floating navigation
- **Wallet Integration** — Connect any EVM wallet via Reown AppKit (WalletConnect)

---

## 🛠️ Tech Stack

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

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** 8.15.5 (recommended, specified in `packageManager`)

  ```bash
  npm install -g pnpm@8.15.5
  ```

### 1. Clone the repository

```bash
git clone https://github.com/your-username/achanmarket.git
cd achanmarket
```

### 2. Set up environment variables

Copy the example environment file and fill in your own API keys:

```bash
cp .env.example .env
```

Then open `.env` and fill in the required values:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_PROJECT_ID` | [Reown Cloud](https://cloud.reown.com/) (WalletConnect) |
| `NEXT_PUBLIC_ALCHEMY_KEY` | [Alchemy Dashboard](https://dashboard.alchemy.com/) |
| `GROQ_API_KEY` | [Groq Console](https://console.groq.com/) |
| `PINATA_API_KEY` | [Pinata](https://app.pinata.cloud/) |
| `PINATA_API_SECRET` | [Pinata](https://app.pinata.cloud/) |
| `PINATA_JWT` | [Pinata](https://app.pinata.cloud/) |
| `PINATA_GATEWAY_URL` | Your Pinata dedicated gateway URL |
| `THIRDWEB_API_KEY` | [Thirdweb Dashboard](https://thirdweb.com/dashboard) |
| `THIRDWEB_CLIENT_KEY` | [Thirdweb Dashboard](https://thirdweb.com/dashboard) |
| `CREATE_NFT_CONTRACT_ADDRESS` | Pre-filled with Sepolia contract (`0x9D7f...5E99`) |
| `OPENSEA_API_KEY` | [OpenSea Developer](https://docs.opensea.io/) |
| `MONGO_DB` | Your MongoDB connection password |

> ⚠️ **Important:** Never commit your `.env` file. It is already in `.gitignore`.

### 3. Install dependencies

```bash
pnpm install
```

### 4. Run the development server

```bash
pnpm dev
```

Or with **Turbopack** for faster HMR:

```bash
pnpm devbo
```

The app will be running at [http://localhost:3000](http://localhost:3000).

### 5. Build for production (optional)

```bash
pnpm build
pnpm start
```

---

## 📁 Project Structure

```
achanmarket/
├── public/                    # Static assets (characters, logos, chain icons)
├── docs/                      # Documentation
├── src/
│   ├── abi.js                 # NFTFactory smart contract ABI
│   ├── app/                   # Next.js App Router pages & API routes
│   │   ├── layout.tsx         # Root layout (Provider, Toaster, fonts)
│   │   ├── page.tsx           # Landing page entry
│   │   ├── globals.css        # Global styles, theme vars, animations
│   │   ├── api/               # API routes (chatbot, contracts)
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── game/              # Game mode pages
│   │   └── product/           # Product detail page
│   ├── components/            # Shared components (Navbar, ConnectButton, ui/)
│   ├── features/              # Feature modules (domain-driven)
│   │   ├── landingPage/       # Landing page (Hero, Features, Chatbot, etc.)
│   │   ├── dashboard/         # Dashboard (TrendingNFT, TrendingYappers)
│   │   ├── game/              # Game mode (RPG-style UI)
│   │   ├── create-collections/# NFT collection creation
│   │   └── top-sections/      # Leaderboard & Top sections
│   ├── hook/                  # Global custom hooks
│   ├── lib/                   # Core library & configuration
│   │   ├── config/            # Pinata, QueryClient configs
│   │   ├── validation/        # Zod schemas & helpers
│   │   └── exception/         # Custom error classes
│   ├── services/              # Backend service layer
│   └── utils/                 # Utility functions
├── .env.example               # Environment variable template
├── components.json            # shadcn/ui configuration
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies & scripts
```

---

## 🔗 Supported Chains

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

> **Note:** The NFTFactory smart contract is currently deployed only on **Sepolia** (`0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99`).

---

## 📡 API Routes

| Route | Method | Description |
|---|---|---|
| `/api/chatbot` | `GET` | Initialize AI chatbot with system prompt |
| `/api/chatbot` | `POST` | Send messages to Groq AI, get responses |
| `/api/contracts/create` | `POST` | Create NFT collection (upload to Pinata + IPFS) |
| `/api/contracts/createPinataGroup` | varies | Create Pinata file groups |
| `/api/contracts/test` | varies | Test endpoints |

---

## 🧩 Key Patterns

- **Feature-Based Architecture** — Code organized by domain under `src/features/`, each with its own `components/`, `hooks/`, and `types`
- **Provider Hierarchy** — WagmiProvider → QueryClientProvider → Toaster
- **Anime/RPG Theming** — HSL-based CSS variables, `Press Start 2P` font, glass-panel effects
- **IPFS Upload Flow** — Artwork → Pinata → Metadata JSON → Token URI
- **Zod Validation** — Schema-based validation with `safeParse()` wrapper and `ResponseError` class

---

## 📜 Available Scripts

```bash
pnpm dev        # Start dev server
pnpm devbo      # Start dev server with Turbopack
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

---

## 📄 License

This project is public and open-sourced.
