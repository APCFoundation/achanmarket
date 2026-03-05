# Phase 3: Trading & Buying Flow

**Priority: HIGH** | **Estimated Time: 4-5 days**

## Goal
Build complete NFT marketplace functionality for buying, selling, and trading.

## Tasks

### 3.1 Product Detail Page Enhancement
- [ ] Replace experimental `/product` page with real NFT detail page
- [ ] Create `/nft/[contract]/[tokenId]/page.tsx` route
- [ ] Display NFT metadata (name, description, attributes)
- [ ] Show current owner, price history, and trading activity
- [ ] Add high-resolution image viewer with zoom

### 3.2 Listing Functionality
- [ ] Create `src/services/listing-service.ts`
- [ ] Implement `createListing(nft, price, duration)` with approval flow
- [ ] Add listing management (update price, cancel listing)
- [ ] Create listing UI with price input and duration selector
- [ ] Implement approval check for marketplace contract

### 3.3 Buying Flow
- [ ] Create `BuyButton` component with price validation
- [ ] Implement `buyNFT(listingId)` in listing service
- [ ] Add purchase confirmation modal
- [ ] Handle transaction states (pending, success, error)
- [ ] Update ownership after successful purchase

### 3.4 Offer System (Optional V1)
- [ ] Create offer structure (price, expiration, buyer)
- [ ] Implement `makeOffer(nft, price, duration)`
- [ ] Add offer acceptance/rejection flow
- [ ] Create offer notification system
- [ ] Display active offers on NFT detail page

### 3.5 Marketplace Contract Integration
- [ ] Create or integrate marketplace smart contract (if not existing)
- [ ] Add marketplace ABI to `src/abi.js`
- [ ] Implement listing creation, update, cancellation
- [ ] Handle royalties and platform fees
- [ ] Add events listening for real-time updates

### 3.6 User Inventory Management
- [ ] Enhance `Inventory` component with real data
- [ ] Create `src/hook/useUserNFTs.ts` to fetch owned NFTs
- [ ] Display NFTs by collection with filtering
- [ ] Add actions: List for sale, Transfer, Burn
- [ ] Show estimated value of portfolio

### 3.7 Activity Feed
- [ ] Create activity feed component
- [ ] Track events: Mint, List, Buy, Transfer, Offer
- [ ] Add filters (by collection, by event type)
- [ ] Implement real-time updates via WebSocket or polling
- [ ] Show activity on collection and user profile pages

### 3.8 Price History & Analytics
- [ ] Create price chart component (using Recharts)
- [ ] Fetch historical price data
- [ ] Add volume and floor price trends
- [ ] Display rarity ranking (if metadata available)
- [ ] Add "View on OpenSea/Etherscan" links

## Acceptance Criteria
- [ ] Users can view detailed NFT pages with full metadata
- [ ] Owners can list NFTs for sale at custom prices
- [ ] Buyers can purchase listed NFTs seamlessly
- [ ] Transaction fees and royalties are handled correctly
- [ ] Activity feed shows all marketplace events
- [ ] Price charts display accurate historical data
- [ ] Users can manage their NFT inventory with actions

## Files to Modify
- `src/app/product/page.tsx` → Replace with real implementation
- `src/features/landingPage/components/inventory/Inventory.tsx` → Enhance
- `src/app/dashboard/page.tsx` → Add marketplace navigation

## New Files to Create
- `src/services/listing-service.ts`
- `src/services/marketplace-service.ts`
- `src/hook/useListing.ts`
- `src/hook/useUserNFTs.ts`
- `src/hook/useActivity.ts`
- `src/app/nft/[contract]/[tokenId]/page.tsx`
- `src/components/BuyButton.tsx`
- `src/components/SellButton.tsx`
- `src/components/ListingModal.tsx`
- `src/components/ActivityFeed.tsx`
- `src/components/PriceChart.tsx`

## Notes
- Consider using existing marketplace protocols (Seaport, Wyvern) vs custom contract
- Handle royalties properly for creator earnings
- Add security checks: reentrancy, overflow, approval validation
- Test with small amounts on testnet before mainnet
- Consider gasless transactions using relayers (optional advanced feature)
