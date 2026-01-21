import { TopCollectionItem } from "../types";

export const mockCollections: TopCollectionItem[] = [
  {
    id: "1",
    name: "Azuki",
    imageUrl: "https://picsum.photos/seed/azuki/200",
    chain: {
      name: "ethereum",
      iconUrl: "/chain/eth.svg"
    },
    verified: true,
    price: { value: 3.2, currency: "ETH" },
    change24h: 108
  },
  {
    id: "2",
    name: "Bored Ape Yacht Club",
    imageUrl: "https://picsum.photos/seed/bayc/200",
    chain: {
      name: "ethereum",
      iconUrl: "/chain/eth.svg"
    },
    verified: true,
    price: { value: 24.5, currency: "ETH" },
    change24h: -12
  },
  {
    id: "3",
    name: "Doodles",
    imageUrl: "https://picsum.photos/seed/doodles/200",
    chain: {
      name: "hyperliquid",
      iconUrl: "/chain/hyperliquid.svg"
    },
    verified: false,
    price: { value: 320, currency: "HYPE" },
    change24h: 5
  },
  {
    id: "4",
    name: "CloneX",
    imageUrl: "https://picsum.photos/seed/clonex/200",
    chain: {
      name: "ethereum",
      iconUrl: "/chain/eth.svg"
    },
    verified: true,
    price: { value: 7.4, currency: "ETH" },
    change24h: 22
  },
  {
    id: "5",
    name: "Pudgy Penguins",
    imageUrl: "https://picsum.photos/seed/pudgy/200",
    chain: {
      name: "ethereum",
      iconUrl: "/chain/eth.svg"
    },
    verified: true,
    price: { value: 12.1, currency: "ETH" },
    change24h: 3
  },
  {
    id: "6",
    name: "Milady",
    imageUrl: "https://picsum.photos/seed/milady/200",
    chain: {
      name: "ethereum",
      iconUrl: "/chain/eth.svg"
    },
    verified: false,
    price: { value: 2.9, currency: "ETH" },
    change24h: -7
  },
  {
    id: "7",
    name: "Sappy Seals",
    imageUrl: "https://picsum.photos/seed/seals/200",
    chain: {
      name: "ethereum",
      iconUrl: "/chain/eth.svg"
    },
    verified: true,
    price: { value: 1.2, currency: "ETH" },
    change24h: 41
  },
  {
    id: "8",
    name: "BasedCats",
    imageUrl: "https://picsum.photos/seed/basedcats/200",
    chain: {
      name: "base",
      iconUrl: "/chain/coinbase.svg"
    },
    verified: false,
    price: { value: 320, currency: "base" },
    change24h: 78
  },
  {
    id: "9",
    name: "Moonbirds",
    imageUrl: "https://picsum.photos/seed/moonbirds/200",
    chain: {
      name: "ethereum",
      iconUrl: "/chain/eth.svg"
    },
    verified: true,
    price: { value: 2.3, currency: "ETH" },
    change24h: -18
  },
  {
    id: "10",
    name: "Farcaster Frames",
    imageUrl: "https://picsum.photos/seed/frames/200",
    chain: {
      name: "base",
      iconUrl: "/chain/coinbase.svg"
    },
    verified: false,
    price: { value: 120, currency: "base" },
    change24h: 12
  }
];
