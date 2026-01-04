import { NextResponse } from "next/server";
import { pinata } from "@/lib/config/pinataConfig";
import { UploadPinataResponse } from "@/lib/type";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
];

export function badRequest(msg: any, statusCode: number = 400) {
  return NextResponse.json({ status: "error", message: msg }, { status: 400 });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") ?? "").trim();
    const symbol = String(formData.get("symbol") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const collectionFileRaw = formData.get("collectionFile");
    const artworkFileRaw = formData.get("artworkFile");

    const collectionFile =
      collectionFileRaw instanceof File ? collectionFileRaw : null;
    const artworkFile = artworkFileRaw instanceof File ? artworkFileRaw : null;

    // File validations
    if (artworkFile.size > MAX_FILE_SIZE) {
      return badRequest("Artwork file size must be less than 10 MB");
    }
    if (!ALLOWED_IMAGE_TYPES.includes(artworkFile.type)) {
      return badRequest("Unsupported artwork file type");
    }
    // Prepare metadata
    const metadata = {
      name,
      description,
      image: "",
      attributes: [{ trait_type: "Art Type" }],
    };

    // Sanitize folder/name
    const baseName = removeSpaceAndUppercase(name || "NFT");

    // Upload artwork -> metadata
    try {
      const renamedArtwork = new File([artworkFile], "0.png", {
        type: artworkFile.type,
      });
      const NAME_FOLDER_IMAGE = `${baseName}-IMAGE`;

      const imageResult: UploadPinataResponse = await pinata.upload.public
        .fileArray([renamedArtwork])
        .name(NAME_FOLDER_IMAGE);

      if (!imageResult || !imageResult.cid) {
        return NextResponse.json(
          { status: "error", message: "Failed to upload image to Pinata" },
          { status: 500 }
        );
      }

      const METADATA_FOLDER_IMAGE = `${baseName}-METADATA`;
      const metadataJson = JSON.stringify(
        { ...metadata, image: `ipfs://${imageResult.cid}` },
        null,
        2
      );
      const metadataFile = new File([metadataJson], "0.json", {
        type: "application/json",
      });

      const metaResult: UploadPinataResponse = await pinata.upload.public
        .fileArray([metadataFile])
        .name(METADATA_FOLDER_IMAGE);

      if (!metaResult || !metaResult.cid) {
        return NextResponse.json(
          { status: "error", message: "Failed to upload metadata to Pinata" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          status: "success",
          message: "NFT uploaded to Pinata",
          data: {
            metadataCID: `ipfs://${metaResult.cid}`,
          },
        },
        { status: 200 }
      );
    } catch (uploadErr: any) {
      console.error("Pinata upload error:", uploadErr);
      return NextResponse.json(
        { status: "error", message: "Failed to upload to Pinata" },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { status: "error", message: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
