"use client";
import { useState } from "react";
import Head from "next/head";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function Page() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState("");

  // Mock NFT data - in a real app, this would come from your API or blockchain
  const nfts = [
    {
      id: 1,
      name: "ChainBase Ape",
      price: 0.5,
      image: "/api/placeholder/300/300",
    },
    {
      id: 2,
      name: "Base Bull",
      price: 0.75,
      image: "/api/placeholder/300/300",
    },
    {
      id: 3,
      name: "Ethereum Eagle",
      price: 1.2,
      image: "/api/placeholder/300/300",
    },
  ];

  const handlePurchase = async (nft) => {
    if (!publicKey) {
      setTransactionStatus("Please connect your wallet first");
      return;
    }

    setSelectedNFT(nft);
    setTransactionStatus("Initializing transaction...");

    try {
      // In a real application, this would:
      // 1. Process payment on Solana
      // 2. Bridge SOL to Base chain
      // 3. Purchase NFT on Base
      // 4. Transfer NFT to buyer's wallet

      setTransactionStatus("Processing payment on Solana...");
      // Simulate transaction delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setTransactionStatus("Bridging to Base chain...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setTransactionStatus("Purchasing NFT on Base...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setTransactionStatus("Transferring NFT to your wallet...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setTransactionStatus("Purchase completed successfully!");
    } catch (error) {
      console.error(error);
      setTransactionStatus("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Cross-Chain NFT Marketplace</title>
        <meta
          name="description"
          content="Buy NFTs with Solana, receive on Base"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cross-Chain NFT Marketplace</h1>
          <div className="flex items-center space-x-4">
            <WalletMultiButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">
            Featured NFTs on Base Chain
          </h2>
          <p className="text-gray-400">Pay with Solana, receive NFTs on Base</p>
        </div>

        {transactionStatus && (
          <div className="bg-gray-800 p-4 rounded-lg mb-8 text-center">
            <p
              className={
                transactionStatus.includes("failed")
                  ? "text-red-400"
                  : "text-green-400"
              }
            >
              {transactionStatus}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="h-64 bg-gray-700 relative">
                {/* Placeholder for NFT image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">NFT Image</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{nft.name}</h3>
                <p className="text-gray-400 mb-4">{nft.price} SOL</p>
                <button
                  onClick={() => handlePurchase(nft)}
                  className="w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg transition duration-200"
                  disabled={transactionStatus.includes("Processing")}
                >
                  {transactionStatus.includes("Processing") &&
                  selectedNFT?.id === nft.id
                    ? "Processing..."
                    : "Buy with Solana"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">1</span>
              </div>
              <h3 className="font-semibold">Connect Wallet</h3>
              <p className="text-gray-400 text-sm mt-2">
                Connect your Solana wallet
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">2</span>
              </div>
              <h3 className="font-semibold">Pay with SOL</h3>
              <p className="text-gray-400 text-sm mt-2">
                Complete payment on Solana chain
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">3</span>
              </div>
              <h3 className="font-semibold">Automatic Bridge</h3>
              <p className="text-gray-400 text-sm mt-2">
                We bridge your assets to Base
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">4</span>
              </div>
              <h3 className="font-semibold">Receive NFT</h3>
              <p className="text-gray-400 text-sm mt-2">
                Get your NFT on Base chain
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Cross-Chain NFT Marketplace - Powered by Solana and Base</p>
        </div>
      </footer>
    </div>
  );
}
