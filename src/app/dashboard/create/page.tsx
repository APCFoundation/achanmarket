"use client";

import { useState, useCallback, useEffect } from "react";
import { abiNFTMarketplaceFactory } from "@/abi.js";
import { Address, parseEther } from "viem";
import { Upload, X, Check, ExternalLink } from "lucide-react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useSwitchChain, useWriteContract } from "wagmi";
import { config } from "@/lib";
import { Square } from "ldrs/react";
import "ldrs/react/Square.css";
import { toast } from "sonner";
import Link from "next/link";
import { MultiStepLoader } from "@/components/ui/multi-step-loader-custom";
import SwitchChain from "@/features/create-collections/components/SwitchChain";
import hashObject from "@/lib/hashObject";
import { FormState } from "@/features/create-collections/types";
import HeaderClearForm from "@/features/create-collections/components/HeaderClearForm";
import {
  DescriptionFields,
  Fields,
  CollectionSection,
  FormSection,
  ArtTypeSelector,
} from "@/features/create-collections/components/FormControl";
import { useNFTCreation } from "@/features/create-collections/hooks/useNFTCreation";
const NETWORK_IDS: Record<string, number> = {
  base: 8453, // Base mainnet
  ethereum: 1, // Ethereum mainnet
  polygon: 137, // Polygon mainnet
  arbitrum: 42161, // Arbitrum One
  optimism: 10, // Optimism mainnet
  bsc: 56, // BNB Smart Chain
  berachain: 80084, // (contoh ID, cek yg benar)
  avalanche: 43114, // Avalanche C-Chain mainnet
  sepolia: 11155111,
};

const MARKETPLACE_CONTRACT_ADDRESS = process.env
  .MARKETPLACE_CONTRACT_ADDRESS as Address;

export default function Component() {
  const [form, setForm] = useState<FormState>({
    selectedChain: "sepolia",
    name: "The Pond",
    symbol: "POND",
    description: "",
    mintPrice: "",
    royaltyFee: "",
    maxSupply: "",
    limitPerWallet: "",
    collectionFile: null,
    artType: "same",
    artworkFile: null,
  });
  const {
    selectedChain,
    name,
    symbol,
    description,
    mintPrice,
    royaltyFee,
    maxSupply,
    limitPerWallet,
    collectionFile,
    artType,
    artworkFile,
  } = form;
  const { caipNetwork } = useAppKitNetwork();
  const { switchChain } = useSwitchChain({ config });

  const {
    createCollection,
    currentStep: step,
    uploading: loading,
  } = useNFTCreation({ contractAddress: MARKETPLACE_CONTRACT_ADDRESS });
  const onDropCollection = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setForm((prev) => ({ ...prev, collectionFile: acceptedFiles[0] }));
    }
  }, []);

  const onDropArtwork = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setForm((prev) => ({ ...prev, artworkFile: acceptedFiles[0] }));
    }
  }, []);

  const clearForm = () => {
    setForm({
      selectedChain: "base",
      name: "",
      symbol: "",
      description: "",
      mintPrice: "",
      royaltyFee: "",
      maxSupply: "",
      limitPerWallet: "",
      collectionFile: null,
      artType: "same",
      artworkFile: null,
    });
  };

  const removeFile = () => {
    setForm((prev) => ({ ...prev, collectionFile: null }));
  };

  const removeArtworkFile = () => {
    setForm((prev) => ({ ...prev, artworkFile: null }));
  };

  const loadingStates = [
    { text: "Uploading to ipfs" },
    { text: "Creating NFT..." },
    { text: "Waiting for transaction..." },
    { text: "Nft succesfully created" },
  ];

  const submitHandle = async () => {
    createCollection(form, (tx) => {
      toast.success("🎉 NFT created successfully!", {
        position: "top-center",
        description: (
          <Link
            href={"https://sepolia.etherscan.io/tx/" + tx}
            target={"_blank"}
          >
            check transaction
          </Link>
        ),
        action: {
          label: (
            <div>
              <ExternalLink className="w-4 h-4 ml-2" />
            </div>
          ),
          onClick: () => {
            window.open("https://sepolia.etherscan.io/tx/" + tx, "_blank");
          },
        },
      });
    });
  };

  useEffect(() => {
    const targetChainId = NETWORK_IDS[selectedChain];

    if (!targetChainId) return;
    if (targetChainId === caipNetwork?.id) return;

    // initial sync only
    switchChain({ chainId: targetChainId });
  }, []);

  return (
    <div className={""}>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        currentStep={step}
      />
      <div className="min-h-screen bg-white p-6 font-press">
        <div className="max-w-2xl mx-auto">
          {/* HeaderClearForm */}
          <HeaderClearForm clearForm={clearForm} />
          <div className="space-y-6">
            {/* EVM Chain */}
            <SwitchChain
              value={selectedChain}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, selectedChain: val }))
              }
            />

            {/* Name and Symbol */}
            <FormSection>
              <Fields
                name="Name"
                id="name"
                value={name}
                placeholder="The Pond"
                type="text"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Fields
                name="Symbol"
                id="symbol"
                value={symbol}
                placeholder="Pond"
                type="text"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </FormSection>
            {/* price and royaltie */}
            <FormSection>
              <Fields
                name={"Mint Price"}
                id="mintPrice"
                value={mintPrice}
                placeholder="0.01"
                type={"number"}
                onChange={(e) => {
                  const val = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    mintPrice: val === "" ? "" : Number(val),
                  }));
                }}
              />
              <Fields
                name={"Royalty Fee"}
                id="royaltyFee"
                value={royaltyFee}
                type={"number"}
                placeholder={"10-100"}
                onChange={(e) => {
                  const val = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    royaltyFee: val === "" ? "" : Number(val),
                  }));
                }}
              />
            </FormSection>
            {/* Max supply & Mint Limit per Wallet */}
            <FormSection>
              <Fields
                id="MaxSupply"
                value={maxSupply}
                name="Max Supply"
                type="number"
                onChange={(e) => {
                  const val = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    maxSupply: val === "" ? "" : Number(val),
                  }));
                }}
              />
              <Fields
                id="limit"
                name="Max Limit per Wallet"
                value={limitPerWallet}
                type="number"
                onChange={(e) => {
                  const val = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    limitPerWallet: val === "" ? "" : Number(val),
                  }));
                }}
              />
            </FormSection>

            {/* Collection Image */}
            <CollectionSection
              collectionFile={collectionFile}
              onDropCollection={onDropCollection}
              removeCollectionFile={removeFile}
            />
            {/* description */}
            <DescriptionFields setForm={setForm} value={description} />
            <ArtTypeSelector
              artworkFile={artworkFile}
              artType={artType}
              setForm={setForm}
              onDropArtwork={onDropArtwork}
              removeArtworkFile={removeArtworkFile}
            />
          </div>
          <button
            onClick={submitHandle}
            disabled={loading}
            className="w-full flex justify-center items-center  bg-lime-500 py-5 mt-5 text-center text-black font-press cursor-pointer "
          >
            {loading ? (
              <Square
                size="20"
                stroke="5"
                strokeLength="0.25"
                bgOpacity="0.1"
                speed="1.2"
                color="black"
              />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
