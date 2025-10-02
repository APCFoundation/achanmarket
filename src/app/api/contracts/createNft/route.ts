import { NextResponse } from "next/server";
import pinataSDK from "@pinata/sdk";

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_SECRET_API_KEY!
);

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

    // upload ke Pinata
    if (collectionFile) {
      const buffer = Buffer.from(await collectionFile.arrayBuffer());
      const result = await pinata.pinFileToIPFS(buffer, {
        pinataMetadata: { name: collectionFile.name },
      });
      collectionFileCID = `ipfs://${result.IpfsHash}`;
    }

    if (artworkFile) {
      const buffer = Buffer.from(await artworkFile.arrayBuffer());
      const result = await pinata.pinFileToIPFS(buffer, {
        pinataMetadata: { name: artworkFile.name },
      });
      artworkFileCID = `ipfs://${result.IpfsHash}`;
    }

    // metadata NFT → bisa kamu pin juga ke Pinata
    const metadata = {
      name,
      symbol,
      description,
      image: collectionFileCID,
      attributes: [
        { trait_type: "Chain", value: selectedChain },
        { trait_type: "Art Type", value: artType },
      ],
    };

    const metaResult = await pinata.pinJSONToIPFS(metadata, {
      pinataMetadata: { name: `${name}-metadata` },
    });

    return NextResponse.json({
      status: "success",
      message: "NFT uploaded to Pinata",
      data: {
        selectedChain,
        name,
        symbol,
        description,
        mintPrice,
        royaltyFee,
        maxSupply,
        limitPerWallet,
        artType,
        collectionFileCID,
        artworkFileCID,
        metadataCID: `ipfs://${metaResult.IpfsHash}`,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
