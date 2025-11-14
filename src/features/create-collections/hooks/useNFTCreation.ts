import { useState } from "react";
import { Address, parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { config } from "@/lib";
import { abiNFTMarketplaceFactory } from "@/abi.js";
import { toast } from "sonner";
import { FormState } from "../types";
export const useNFTCreation = ({
  contractAddress,
}: {
  contractAddress: Address;
}) => {
  const { writeContractAsync } = useWriteContract({ config });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  async function createCollection(form: FormState) {
    if (!form.name || !form.symbol || !form.description) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    setStep(0);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (val) formData.append(key, val as any);
      });

      const res = await fetch("/api/contracts/create", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      const metadataCID = result.data.metadataCID;

      setStep(1);
      const tx = await writeContractAsync({
        abi: abiNFTMarketplaceFactory,
        functionName: "createNFTCollection",
        address: contractAddress,
        args: [
          metadataCID,
          BigInt(form.maxSupply),
          parseEther(String(form.mintPrice)),
        ],
      });

      setStep(2);
      toast.success("🎉 NFT created successfully!", {
        description: `Tx: ${tx}`,
      });
    } catch (e: any) {
      toast.error(e.message || "Failed to create NFT");
    } finally {
      setLoading(false);
    }
  }

  return { createCollection, loading, step };
};
