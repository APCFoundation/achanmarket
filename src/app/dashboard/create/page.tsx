"use client";

import {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { SwitchChain } from "@/features/dashboard/createpage";
import hashObject from "@/lib/hashObject";
import { FormState } from "@/features/create-collections/types";
import HeaderClearForm from "@/features/create-collections/components/HeaderClearForm";
import {
  DescriptionFields,
  Fields,
  CollectionSection,
  FormSection,
} from "@/features/create-collections/components/FormControl";
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
    selectedChain: "base",
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
  const { caipNetwork, chainId } = useAppKitNetwork();
  const { writeContractAsync } = useWriteContract({ config });
  const { switchChain } = useSwitchChain({ config });
  const [uploading, setUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [metadata, setMetadata] = useState<any | null>();
  const [previousMetadataHash, setPreviousMetadataHash] = useState<
    string | null
  >();
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

  const {
    getRootProps: getCollectionRootProps,
    getInputProps: getCollectionInputProps,
    isDragActive: isCollectionDragActive,
  } = useDropzone({
    onDrop: onDropCollection,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
  });

  const {
    getRootProps: getArtworkRootProps,
    getInputProps: getArtworkInputProps,
    isDragActive: isArtworkDragActive,
  } = useDropzone({
    onDrop: onDropArtwork,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

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

  const submitHandle2 = async () => {
    if (!form.name || !form.symbol || !form.description) {
      toast.error("Please fill all required fields");
      return;
    }

    setUploading(true);
    setCurrentStep(0);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("symbol", form.symbol);
      formData.append("description", form.description);
      formData.append("artType", form.artType);

      if (form.collectionFile)
        formData.append("collectionFile", form.collectionFile);
      if (form.artworkFile) formData.append("artworkFile", form.artworkFile);

      // Step 1: Uploading image
      setCurrentStep(0);
      const currentMetadataHash = hashObject({
        name,
        symbol,
        description,
        artType,
        // You could also include file names if you want to detect image changes
        collectionFileName: collectionFile?.name || "",
        artworkFileName: artworkFile?.name || "",
      });
      // Check if metadata or images changed
      const metadataChanged = currentMetadataHash !== previousMetadataHash;
      if (!metadata) {
        const res = await fetch("/api/contracts/create", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();
        if (!res.ok || !result?.data?.metadataCID) {
          throw new Error(result?.message || "Upload failed");
        }

        const { metadataCID } = result.data;
        setMetadata(metadataCID);
        console.log("✅ Metadata CID:", metadataCID);
      }
      // 🚀 Upload metadata to backend

      // Step 3: Creating NFT
      setCurrentStep(1);

      // Convert values
      const supply = BigInt(maxSupply);
      const price = parseEther(String(mintPrice));

      // Step 4: Waiting for transaction
      setCurrentStep(2);

      // 🧾 Kirim transaksi ke blockchain
      const tx = await writeContractAsync({
        abi: abiNFTMarketplaceFactory,
        functionName: "createNFTCollection",
        address: MARKETPLACE_CONTRACT_ADDRESS,
        args: [metadata, supply, price],
      });

      // Step 5: Success
      setCurrentStep(3);

      // ✅ Jika transaksi sukses
      if (typeof tx === "string" && tx.startsWith("0x")) {
        toast.success("🎉 NFT contract created successfully!", {
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

        // Tunggu sebentar sebelum menutup loader agar user bisa melihat status "success"
        setTimeout(() => {
          setUploading(false);
          setCurrentStep(0); // Reset untuk next time
        }, 2000);
      } else {
        throw new Error("Transaction hash not received");
      }
    } catch (error: any) {
      console.error("❌ NFT Creation Error:", error);
      const message =
        error?.shortMessage ||
        error?.message ||
        "Transaction failed or rejected";
      toast.error(`Failed to create NFT contract: ${message}`, {
        position: "top-center",
      });
      setUploading(false);
      setCurrentStep(0);
    }
  };

  useEffect(() => {
    if (selectedChain !== caipNetwork?.name) {
      const id = NETWORK_IDS[selectedChain];
      console.log(id);
      switchChain({ chainId: NETWORK_IDS[selectedChain] });
    }
  }, [selectedChain, switchChain, caipNetwork]);

  return (
    <div className={""}>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={uploading}
        currentStep={currentStep}
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
            <DescriptionFields
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              value={description}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side - Art type selection */}
              <div className="space-y-3">
                {/* Same Artwork Option */}
                <div
                  onClick={() =>
                    setForm((prev) => ({ ...prev, artType: "same" }))
                  }
                  className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    artType === "same"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {artType === "same" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">
                        Same Artwork
                      </h3>
                      <p className="text-sm text-gray-600">
                        An ERC-1155 collection where everyone mints the same
                        artwork
                      </p>
                    </div>
                  </div>
                </div>

                {/* Unique Artwork Option */}
                <div
                  onClick={() =>
                    setForm((prev) => ({ ...prev, artType: "unique" }))
                  }
                  className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    artType === "unique"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {artType === "unique" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="flex gap-1 flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded"></div>
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-400 rounded"></div>
                      <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-red-400 rounded"></div>
                      <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">
                        Unique Artwork
                      </h3>
                      <p className="text-sm text-gray-600">
                        An ERC-721 collection where everyone mints a unique
                        artwork
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Artwork upload */}
              <div className="space-y-2">
                {artType === "same" && (
                  <>
                    {artworkFile ? (
                      <div className="border-2 border-gray-300 border-dashed rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Upload className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-black">
                                {artworkFile.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(artworkFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={removeArtworkFile}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        {...getArtworkRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors min-h-[200px] flex flex-col items-center justify-center ${
                          isArtworkDragActive
                            ? "border-blue-400 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input {...getArtworkInputProps()} />
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2 font-medium">
                          {isArtworkDragActive
                            ? "Drop the files here..."
                            : "Drop your artwork here to upload"}
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          File types allowed: .jpg, .png. Max file size: 10MB
                        </p>
                        <Button
                          variant="outline"
                          className="bg-white border-gray-300 text-black hover:bg-gray-50"
                        >
                          Choose Image...
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {artType == "unique" && (
                  <>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors min-h-[200px] flex flex-col items-center justify-centerborder-gray-300 hover:border-gray-400
                    `}
                    >
                      <p className="text-gray-600 mb-2 font-medium">
                        Metadata URL
                      </p>
                      <p className="text-[10px] text-gray-500 mb-4">
                        Check our step-by-step guide on how to generate and
                        upload your collection assets and metadata.
                      </p>
                      <input
                        className={
                          "w-full text-[10px] placeholder:text-[10px] px-2 py-2"
                        }
                        type="text"
                        placeholder={"https://ipfs.io/<CID>"}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={submitHandle2}
            disabled={uploading}
            className="w-full flex justify-center items-center  bg-lime-500 py-5 mt-5 text-center text-black font-press cursor-pointer "
          >
            {uploading ? (
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
