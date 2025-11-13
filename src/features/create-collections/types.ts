export type FormState = {
  selectedChain: string;
  name: string;
  symbol: string;
  description: string;
  mintPrice: number | "";
  royaltyFee: number | "";
  maxSupply: number | "";
  limitPerWallet: number | "";
  collectionFile?: File | null;
  artType: "same" | "unique";
  artworkFile: File | null;
};
