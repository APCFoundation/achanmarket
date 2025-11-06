import { NextResponse } from "next/server";
import { pinata } from "@/lib/config/pinataConfig";
type UploadResponse = {
  id: string;
  name: string;
  cid: string;
  size: number;
  created_at: string;
  number_of_files: number;
  mime_type: string;
  group_id: string | null;
  keyvalues: Record<string, string>;
  vectorized: boolean;
  network: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
];

function removeSpaceAndUppercase(str = "") {
  return String(str)
    .replace(/\s+/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9-_]/g, "");
}

function badRequest(msg: string) {
  return NextResponse.json({ status: "error", message: msg }, { status: 400 });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") ?? "").trim();
    const symbol = String(formData.get("symbol") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const artType = String(formData.get("artType") ?? "same").trim();

    if (!name) return badRequest("Missing required field: name");
    if (!symbol) return badRequest("Missing required field: symbol");

    const collectionFile = formData.get("collectionFile") as File | null;
    const artworkFile = formData.get("artworkFile") as File | null;

    const metadata = {
      name,
      description,
      image: "",
      attributes: [{ trait_type: "Art Type", value: artType || "same" }],
    };

    const baseName = removeSpaceAndUppercase(name || "NFT");
    const NAME_FOLDER_IMAGE = `${baseName}-IMAGE`;
    const METADATA_FOLDER_IMAGE = `${baseName}-METADATA`;

    // TEMP: mock upload file
    const renamedArtwork = new File(["memek"], "0.txt", { type: "text/plain" });

    const imageResult: UploadResponse = await pinata.upload.public
      .fileArray([renamedArtwork])
      .name(NAME_FOLDER_IMAGE);

    if (!imageResult?.cid) throw new Error("Failed to upload image to Pinata");

    const metadataJson = JSON.stringify(
      { ...metadata, image: `ipfs://${imageResult.cid}` },
      null,
      2
    );

    const metadataFile = new File([metadataJson], "0.json", {
      type: "application/json",
    });

    const metaResult: UploadResponse = await pinata.upload.public
      .fileArray([metadataFile])
      .name(METADATA_FOLDER_IMAGE);

    if (!metaResult?.cid)
      throw new Error("Failed to upload metadata to Pinata");

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
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { status: "error", message: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
