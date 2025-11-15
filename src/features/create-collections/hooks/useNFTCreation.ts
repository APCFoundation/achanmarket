import { useState } from "react";
import { Address, parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { config } from "@/lib";
import { abiNFTMarketplaceFactory } from "@/abi.js";
import { toast } from "sonner";
import { FormState } from "../types";
import hashObject from "@/lib/hashObject";
export const useNFTCreation = ({
  contractAddress,
}: {
  contractAddress: Address;
}) => {
  const { writeContractAsync } = useWriteContract({ config });
  const [uploading, setUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [metadata, setMetadata] = useState<any | null>();
  const [previousMetadataHash, setPreviousMetadataHash] = useState<
    string | null
  >();
  async function createCollection(
    form: FormState,
    callback: (e: string) => void
  ) {
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
      setCurrentStep(1);
      const currentMetadataHash = hashObject({
        name: form.name,
        symbol: form.symbol,
        description: form.description,
        artType: form.artType,
        // You could also include file names if you want to detect image changes
        collectionFileName: form.collectionFile?.name || "",
        artworkFileName: form.artworkFile?.name || "",
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
      const supply = BigInt(form.maxSupply);
      const price = parseEther(String(form.mintPrice));

      // Step 4: Waiting for transaction
      setCurrentStep(2);

      // 🧾 Kirim transaksi ke blockchain
      const tx = await writeContractAsync({
        abi: abiNFTMarketplaceFactory,
        functionName: "createNFTCollection",
        address: contractAddress,
        args: [metadata, supply, price],
      });

      // Step 5: Success
      setCurrentStep(3);

      // ✅ Jika transaksi sukses
      if (typeof tx === "string" && tx.startsWith("0x")) {
        await callback(tx);
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
  }

  return { createCollection, uploading, currentStep };
};
