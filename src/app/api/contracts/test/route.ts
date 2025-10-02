import { NextResponse } from "next/server";
import { pinata } from "@/libs/config/pinataConfig";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // ambil data teks
    const selectedChain = formData.get("selectedChain") as string;
    const name = formData.get("name") as string;
    const symbol = formData.get("symbol") as string;
    const description = formData.get("description") as string;
    const mintPrice = formData.get("mintPrice") as string;
    const royaltyFee = formData.get("royaltyFee") as string;
    const maxSupply = formData.get("maxSupply") as string;
    const limitPerWallet = formData.get("limitPerWallet") as string;
    const artType = formData.get("artType") as string;

    // ambil file
    const collectionFile = formData.get("collectionFile") as File | null;
    const artworkFile = formData.get("artworkFile") as File | null;

    let collectionFileCID: string | null = null;
    let artworkFileCID: string | null = null;
    let metadataCID: string | null = null;

    // Step 1: Upload collectionFile (optional, misal logo koleksi)
    if (collectionFile) {
      const result = await pinata.upload.public.file(collectionFile);
      collectionFileCID = `ipfs://${result.cid}`;
    }

    // Step 2: Upload artwork (gambar NFT utama)
    if (artworkFile) {
      const result = await pinata.upload.public.file(artworkFile);
      artworkFileCID = `ipfs://${result.cid}`;
    }

    // Step 3: Buat metadata JSON (wajib untuk NFT 1155/721)
    if (artworkFileCID) {
      const metadata = {
        name,
        symbol,
        description,
        image: artworkFileCID, // pakai gambar NFT
        attributes: [
          { trait_type: "Chain", value: selectedChain },
          { trait_type: "Art Type", value: artType },
          { trait_type: "Mint Price", value: mintPrice },
          { trait_type: "Royalty Fee", value: royaltyFee },
          { trait_type: "Max Supply", value: maxSupply },
          { trait_type: "Limit Per Wallet", value: limitPerWallet },
        ],
        collection_logo: collectionFileCID || null,
      };

      // upload metadata JSON ke Pinata
      const metaResult = await pinata.upload.public.json(metadata);
      metadataCID = `ipfs://${metaResult.cid}`;
    }

    return NextResponse.json({
      status: "success",
      message: "NFT uploaded to Pinata",
      data: {
        collectionFileCID,
        artworkFileCID,
        metadataCID,
      },
    });
  } catch (err: any) {
    console.error("Upload Error:", err);
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
