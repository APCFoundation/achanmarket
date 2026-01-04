export interface TopCollection {
  id: string;
  name: string;
  image: string;
  price: number;
  changePercent: number;
  symbol: string;
};

export interface TopCreator {
  id: string;
  name: string;
  avatar: string;
  totalVolume: number;
  followers: number;
};

export interface TopLaunch  {
  id: string;
  name: string;
  image: string;
  minted: number;
  chain: string;
  symbol: string;
};

export type TypeSection = "collection" | "Yapper";

export type FormatTable = "table" | "compact";



export interface TopCollectionItem {
  id: string;                     // unique identifier
  name: string;                   // "Azuki"
  imageUrl: string;               // thumbnail image URL
  chain: {
    name: string;                 // "ethereum", "base", etc.
    iconUrl: string;              // small chain icon shown on the bottom-left
  };
  verified: boolean;              // whether blue-check is shown
  price: {
    value: number;                // 3, 320
    currency: string;             // "ETH", "HYPE"
  };
  change24h: number;              // 108 means +108%
}

