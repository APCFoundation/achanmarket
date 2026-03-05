# Phase 4: Testing Framework

**Priority: MEDIUM** | **Estimated Time: 2-3 days**

## Goal
Set up comprehensive testing with Vitest and React Testing Library.

## Tasks

### 4.1 Test Framework Setup
- [ ] Install Vitest: `pnpm add -D vitest @vitest/ui`
- [ ] Install React Testing Library: `pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event`
- [ ] Install MSW (Mock Service Worker): `pnpm add -D msw`
- [ ] Configure `vitest.config.ts` with Next.js support
- [ ] Add test scripts to `package.json`
- [ ] Create test utilities and custom render function

### 4.2 Unit Tests - Services
- [ ] Test `alchemy-service.ts` - API calls and error handling
- [ ] Test `contract-service.ts` - Pinata upload and contract interaction
- [ ] Test `mint-service.ts` - Minting logic and validation
- [ ] Test `listing-service.ts` - Listing creation and management
- [ ] Mock external APIs (Alchemy, Pinata) with MSW

### 4.3 Unit Tests - Hooks
- [ ] Test `useHydrate.ts` - SSR hydration guard
- [ ] Test `useTrendingNFTs.ts` - Data fetching and caching
- [ ] Test `useMint.ts` - Transaction states
- [ ] Test `useListing.ts` - Listing operations
- [ ] Test `useUserNFTs.ts` - Inventory management

### 4.4 Component Tests
- [ ] Test `ConnectButton.tsx` - Wallet connection flow
- [ ] Test `MintButton.tsx` - States and interactions
- [ ] Test `Navbar.tsx` - Navigation and responsive
- [ ] Test `TrendingNFTCarousel.tsx` - Carousel and data display
- [ ] Test `TopCollectionTable.tsx` - Sorting and pagination

### 4.5 Integration Tests
- [ ] Test NFT creation flow end-to-end
- [ ] Test minting flow with mocked transactions
- [ ] Test marketplace listing and buying flow
- [ ] Test wallet connection and chain switching
- [ ] Test error handling and recovery

### 4.6 E2E Tests (Optional Phase 4)
- [ ] Install Playwright: `pnpm add -D @playwright/test`
- [ ] Configure Playwright for Next.js
- [ ] Test critical user flows:
  - Connect wallet → Create collection → Mint NFT
  - List NFT → Buy NFT → View in inventory
- [ ] Run tests in CI/CD pipeline

### 4.7 Test Coverage
- [ ] Set up coverage reporting with `c8` or `v8`
- [ ] Aim for 70%+ coverage on services and hooks
- [ ] Aim for 50%+ coverage on components
- [ ] Exclude mock files and type definitions
- [ ] Add coverage badge to README

## Acceptance Criteria
- [ ] `pnpm test` runs all tests successfully
- [ ] Tests cover critical business logic (minting, trading)
- [ ] Mock data is separated from test logic
- [ ] CI/CD pipeline runs tests on every PR
- [ ] Coverage report is generated and accessible
- [ ] Tests are documented and maintainable

## Files to Create
- `vitest.config.ts`
- `src/test/setup.ts` - Test setup and global mocks
- `src/test/utils.tsx` - Custom render and test utilities
- `src/test/mocks/handlers.ts` - MSW request handlers
- `src/test/mocks/server.ts` - MSW server setup
- `src/services/__tests__/alchemy-service.test.ts`
- `src/hook/__tests__/useTrendingNFTs.test.ts`
- `src/components/__tests__/ConnectButton.test.tsx`
- `e2e/` folder with Playwright tests

## Test Script Commands
```bash
pnpm test           # Run all tests
pnpm test:watch     # Run in watch mode
pnpm test:ui        # Open Vitest UI
pnpm test:coverage  # Run with coverage report
pnpm test:e2e       # Run Playwright E2E tests
```

## Notes
- Use MSW to mock external APIs, not actual fetch mocking
- Test async operations with `waitFor` and `findBy` queries
- Keep tests deterministic by mocking timestamps and random values
- Use `beforeEach` to reset state between tests
- Don't test implementation details, test behavior
- Follow Arrange-Act-Assert pattern
