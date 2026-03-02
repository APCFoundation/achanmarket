# Phase 2: Minting Functionality

**Priority: HIGH** | **Estimated Time: 2-3 days**

## Goal
Enable users to mint NFTs from collections deployed via the platform.

## Tasks

### 2.1 Smart Contract Integration
- [ ] Review NFTFactory contract ABI in `src/abi.js`
- [ ] Create `src/services/mint-service.ts` for minting operations
- [ ] Implement `mintNFT(collectionAddress, quantity, price)` function
- [ ] Add transaction monitoring with wagmi/viem
- [ ] Handle gas estimation and fee display

### 2.2 Mint UI Components
- [ ] Create `MintButton` component with states (idle, loading, success, error)
- [ ] Add `QuantitySelector` component (with max supply validation)
- [ ] Create `MintModal` with price breakdown (NFT price + gas)
- [ ] Add success modal with transaction hash and Etherscan link
- [ ] Implement error modal with retry option

### 2.3 Collection Detail Page
- [ ] Create `/collection/[address]/page.tsx` route
- [ ] Display collection info (name, description, image, total supply)
- [ ] Show mint price and remaining supply
- [ ] Add minting interface (button + quantity selector)
- [ ] Display minted NFTs gallery (with pagination)

### 2.4 Wallet Integration
- [ ] Validate wallet has sufficient balance before mint
- [ ] Check if user is on correct chain
- [ ] Add automatic chain switching if needed
- [ ] Handle wallet rejection gracefully
- [ ] Add "Add token to wallet" button after mint

### 2.5 Transaction Management
- [ ] Create `src/hook/useMint.ts` for minting logic
- [ ] Track transaction status (pending, confirmed, failed)
- [ ] Add transaction history to localStorage
- [ ] Create `TransactionHistory` component
- [ ] Implement optimistic UI updates

### 2.6 Post-Mint Experience
- [ ] Show success animation after mint
- [ ] Display newly minted NFT in user's inventory
- [ ] Add social sharing (Twitter/X)
- [ ] Send confirmation email (optional, requires backend)

## Acceptance Criteria
- [ ] Users can mint NFTs from any collection
- [ ] Mint button shows correct price and quantity
- [ ] Transaction status is clear and updated in real-time
- [ ] Users can view their minted NFTs in inventory
- [ ] Failed transactions show helpful error messages
- [ ] Gas fees are displayed before confirmation

## Files to Modify
- `src/abi.js` → Ensure all mint functions are present
- `src/app/dashboard/create/page.tsx` → Link to collection detail
- `src/features/landingPage/components/inventory/Inventory.tsx` → Show minted NFTs

## New Files to Create
- `src/services/mint-service.ts`
- `src/hook/useMint.ts`
- `src/hook/useTransaction.ts`
- `src/app/collection/[address]/page.tsx`
- `src/components/MintButton.tsx`
- `src/components/MintModal.tsx`
- `src/components/QuantitySelector.tsx`
- `src/components/TransactionHistory.tsx`

## Notes
- Test thoroughly on Sepolia first
- Handle edge cases: sold out, insufficient funds, wrong chain
- Consider batch minting for gas optimization
- Add cooldown between mints to prevent spam
