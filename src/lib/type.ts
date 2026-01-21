export interface ApiReponse<T> {
  status: string;
  message: string;
  data: T;
}

export type MetadataCID = {
  metadataCID: string;
};

export interface ApiReponseError {
  status: string;
  message: string;
}

export interface NftData {
  contract: {
    address: string;
    name: string | null;
    symbol: string | null;
    totalSupply: string | null;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSeaMetadata: {
      floorPrice: number | null;
      collectionName: string | null;
      collectionSlug: string | null;
      safelistRequestStatus: string | null;
      imageUrl: string | null;
      description: string | null;
      externalUrl: string | null;
      twitterUsername: string | null;
      discordUrl: string | null;
      bannerImageUrl: string | null;
      lastIngestedAt: string | null;
    };
    isSpam: boolean;
    spamClassifications: any[];
  };
  tokenId: string;
  tokenType: string;
  name: string | null;
  description: string | null;
  tokenUri: string;
  image: {
    cachedUrl: string | null;
    thumbnailUrl: string | null;
    pngUrl: string | null;
    contentType: string | null;
    size: number | null;
    originalUrl: string | null;
  };
  animation: {
    cachedUrl: string | null;
    contentType: string | null;
    size: number | null;
    originalUrl: string | null;
  };
  raw: {
    tokenUri: string;
    metadata?: {
      name?: string;
      description?: string;
      image?: string;
      imageUrl?: string;
      attributes?: {
        value: string;
        trait_type: string;
      }[];
    };
    error: string | null;
  };
  collection: any;
  mint: {
    mintAddress: string | null;
    blockNumber: number | null;
    timestamp: string | null;
    transactionHash: string | null;
  };
  owners: any;
  timeLastUpdated: string;
  balance: string;
  acquiredAt: {
    blockTimestamp: string | null;
    blockNumber: number | null;
  };
}

export interface Yapper {
  user_id: string;
  twitter: {
    username: string;
    name: string;
    url: string;
    imageUrl: string;
  };
  yaps: {
    yaps_all: number;
    yaps_l24h: number;
    yaps_l48h: number;
    yaps_l7d: number;
    yaps_l30d: number;
    yaps_l3m: number;
    yaps_l6m: number;
    yaps_l12m: number;
  };
}

type ChartPoint = {
  time: string;
  yaps: number;
};

export interface YapperWithChart extends Yapper {
  chartData: ChartPoint[];
}

export interface UploadPinataResponse {
  id: string;
  name: string;
  cid: string;
  size: number;
  created_at: string;
  number_of_files: number;
  mime_type: string;
  group_id: string | null;
  keyvalues: Record<string, string>;
  vectorized: boolean;
  network: string;
}
