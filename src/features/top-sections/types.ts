export type TopCollection = {
  id: string;
  name: string;
  image: string;
  price: number;
  changePercent: number;
  symbol: string;
};

export type TopCreator = {
  id: string;
  name: string;
  avatar: string;
  totalVolume: number;
  followers: number;
};

export type TopLaunch = {
  id: string;
  name: string;
  image: string;
  minted: number;
  chain: string;
  symbol: string;
};

export type TypeSection = "collection" | "Yapper";

export type FormatTable = "table" | "compact";

export type Collections = {
  imageUrl: string;
  name: string;
  isVerified: boolean;
  floorPrice: string;
  chains: string;
  prevFloorPrice1d: string;
  prevFloorPrice3d: string;
  prevFloorPrice5d: string;
  prevFloorPrice30d: string;
}[];
