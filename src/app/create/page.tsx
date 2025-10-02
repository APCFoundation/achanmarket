"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useSwitchChain } from "wagmi";
import { config, wagmiAdapter } from "@/libs";

const NETWORK_IDS: Record<string, number> = {
  base: 8453, // Base mainnet
  ethereum: 1, // Ethereum mainnet
  polygon: 137, // Polygon mainnet
  arbitrum: 42161, // Arbitrum One
  optimism: 10, // Optimism mainnet
  bsc: 56, // BNB Smart Chain
  berachain: 80084, // (contoh ID, cek yg benar)
  avalanche: 43114, // Avalanche C-Chain mainnet
};

type FormState = {
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
  const [uploading, setUploading] = useState(false);
  const { caipNetwork, caipNetworkId, chainId } = useAppKitNetwork();
  const { switchChain, chains } = useSwitchChain({ config });
  // console.log(caipNetwork?.name, caipNetworkId, chainId);
  // console.log(chains);
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

  const submitHandle = async () => {
    setUploading(true);
    try {
      const formData = new FormData();

      // tambahkan field biasa
      formData.append("selectedChain", form.selectedChain);
      formData.append("name", form.name);
      formData.append("symbol", form.symbol);
      formData.append("description", form.description);
      formData.append("mintPrice", String(form.mintPrice));
      formData.append("royaltyFee", String(form.royaltyFee));
      formData.append("maxSupply", String(form.maxSupply));
      formData.append("limitPerWallet", String(form.limitPerWallet));
      formData.append("artType", form.artType);

      // tambahkan file (jangan lupa cek null biar aman)
      if (form.collectionFile) {
        formData.append("collectionFile", form.collectionFile);
      }
      if (form.artworkFile) {
        formData.append("artworkFile", form.artworkFile);
      }

      // fetch ke BE
      const req = await fetch("/api/contracts/test", {
        method: "POST",
        body: formData,
        // ❌ JANGAN set Content-Type manual,
        // biarkan browser set otomatis (dengan boundary multipart)
      });

      const request = await req.json();
      console.log("Response BE:", request);
    } catch (error) {
      console.log(error, "memek");
    } finally {
      setUploading(false);
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
      <Navbar />
      <div className="min-h-screen bg-white p-6 font-press">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-end mb-8">
            <button
              onClick={clearForm}
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear Form
            </button>
          </div>

          <div className="space-y-6">
            {/* EVM Chain */}
            <div className="space-y-2">
              <Label htmlFor="chain" className="text-black font-medium">
                EVM Chain <span className="text-red-500">*</span>
              </Label>
              <Select
                value={selectedChain}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, selectedChain: val }))
                }
              >
                <SelectTrigger className="w-full bg-white border-gray-300 text-black">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="base">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Base
                    </div>
                  </SelectItem>
                  <SelectItem value="ethereum">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      Ethereum
                    </div>
                  </SelectItem>
                  <SelectItem value="polygon">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Polygon
                    </div>
                  </SelectItem>
                  <SelectItem value="arbitrum">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Arbitrum
                    </div>
                  </SelectItem>
                  <SelectItem value="optimism">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Optimism
                    </div>
                  </SelectItem>
                  <SelectItem value="bsc">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      BSC (Binance Smart Chain)
                    </div>
                  </SelectItem>
                  <SelectItem value="berachain">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Berachain
                    </div>
                  </SelectItem>
                  <SelectItem value="avalanche">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Avalanche
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name and Symbol */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-black font-medium">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                  placeholder="The Pond"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="symbol" className="text-black font-medium">
                  Symbol <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="symbol"
                  value={symbol}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, symbol: e.target.value }))
                  }
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                  placeholder="POND"
                />
              </div>
            </div>
            {/* price and royaltie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mintPrice" className="text-black font-medium">
                  Mint Price <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mintPrice"
                  value={mintPrice}
                  type="number"
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      mintPrice: val === "" ? "" : Number(val),
                    }));
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="royaltyFee" className="text-black font-medium">
                  Royalty Fee <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="royaltyFee"
                  value={royaltyFee}
                  type="number"
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      royaltyFee: val === "" ? "" : Number(val),
                    }));
                  }}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                />
              </div>
            </div>
            {/* Max supply & Mint Limit per Wallet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="MaxSupply" className="text-black font-medium">
                  Max Supply <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="MaxSupply"
                  value={maxSupply}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      maxSupply: val === "" ? "" : Number(val),
                    }));
                  }}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="limit" className="text-black font-medium">
                  Max Limit per Wallet <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="limit"
                  value={limitPerWallet}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      limitPerWallet: val === "" ? "" : Number(val),
                    }));
                  }}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Collection Image */}
            <div className="space-y-2">
              <Label className="text-black font-medium">Collection Image</Label>
              <p className="text-sm text-gray-600">
                Image that will be shown as the main image for the collection.
                Recommended: 800×800px jpg
              </p>

              <div className="mt-4">
                {collectionFile ? (
                  <div className="border-2 border-gray-300 border-dashed rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black">
                            {collectionFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(collectionFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    {...getCollectionRootProps()}
                    className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                      isCollectionDragActive
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input {...getCollectionInputProps()} />
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      {isCollectionDragActive
                        ? "Drop the files here..."
                        : "Drop your artwork here to upload"}
                    </p>
                    <Button
                      variant="outline"
                      className="bg-white border-gray-300 text-black hover:bg-gray-50"
                    >
                      Choose Image...
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {/* description */}
            <div className="flex flex-col gap-3">
              <Label className="text-black font-medium">Description</Label>
              <textarea
                name="description"
                id="description-1"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                className="px-2 py-3  border-gray-300 border-2"
                cols={30}
                rows={10}
              ></textarea>
            </div>
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
            onClick={submitHandle}
            className="w-full bg-lime-500 py-3 text-center text-black font-press pt-10 cursor-pointer "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
