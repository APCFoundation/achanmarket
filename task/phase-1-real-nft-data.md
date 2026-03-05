# Phase 1: Real NFT Data Integration

**Priority: HIGH** | **Estimated Time: 3-4 days**

## Goal
Replace all mock data with real NFT data from Alchemy API and other sources.

## Tasks

### 1.1 Alchemy API Setup
- [ ] Install Alchemy SDK (if not already available via wagmi)
- [ ] Create `src/services/alchemy-service.ts` with API client
- [ ] Add environment validation for `NEXT_PUBLIC_ALCHEMY_KEY`
- [ ] Set up rate limiting and error handling
- [ ] Add TypeScript types for Alchemy API responses

### 1.2 Fetch Trending NFT Collections
- [ ] Create `src/hook/useTrendingNFTs.ts` to fetch real trending data
- [ ] Integrate with Alchemy's getCollectionsForOwner or NFT API
- [ ] Cache data with React Query (staleTime: 5 minutes)
- [ ] Add loading states and error boundaries
- [ ] Update `TrendingNFTCarousel` component to use real data

### 1.3 Fetch Collection Details
- [ ] Create `src/services/collection-service.ts`
- [ ] Implement getCollectionMetadata(collectionAddress, chain)
- [ ] Implement getCollectionFloorPrice(collectionAddress, chain)
- [ ] Add contract validation utilities
- [ ] Create `src/hook/useCollection.ts` for individual collection fetching

### 1.4 Update Top Collections Section
- [ ] Replace `mockCollections.ts` with API integration
- [ ] Create `src/hook/useTopCollections.ts`
- [ ] Update `TopCollectionTable` component
- [ ] Add sorting and filtering (by volume, floor price, etc.)
- [ ] Implement pagination for large collections

### 1.5 Fetch NFT Metadata
- [ ] Create `src/services/nft-service.ts`
- [ ] Implement getNFTsForCollection(collectionAddress, chain)
- [ ] Implement getNFTMetadata(contractAddress, tokenId, chain)
- [ ] Handle IPFS and HTTP image URLs
- [ ] Add image optimization and fallback handling

### 1.6 Error Handling & Loading States
- [ ] Create reusable `ErrorBoundary` component
- [ ] Add skeleton loaders for NFT cards
- [ ] Implement retry logic for failed requests
- [ ] Add toast notifications for API errors

## Acceptance Criteria
- [ ] Dashboard shows real NFT collections instead of mocks
- [ ] Images load correctly with fallbacks
- [ ] Loading states work during data fetch
- [ ] Errors are handled gracefully with user-friendly messages
- [ ] Data refreshes every 5 minutes automatically

## Files to Modify
- `src/hook/useTrendingYappers.ts` → Replace mock data
- `src/lib/mockTrendingNFTs.ts` → Deprecate and remove
- `src/lib/mockCollections.ts` → Deprecate and remove
- `src/features/dashboard/components/TrendingNFT.tsx` → Update data source
- `src/features/top-sections/components/TopCollectionTable.tsx` → Update data source

## New Files to Create
- `src/services/alchemy-service.ts`
- `src/services/collection-service.ts`
- `src/services/nft-service.ts`
- `src/hook/useTrendingNFTs.ts`
- `src/hook/useCollection.ts`
- `src/hook/useTopCollections.ts`
- `src/components/ErrorBoundary.tsx`
- `src/components/SkeletonCard.tsx`

## Notes
- Keep fallback to mock data in development mode only
- Consider caching strategies (React Query + localStorage)
- Ensure images from IPFS load correctly
- Test with multiple chains supported by the app
