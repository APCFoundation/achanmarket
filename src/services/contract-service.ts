import { pinata } from "@/lib/config/pinataConfig";
import { UploadPinataResponse } from "@/lib/type";
import { ResponseError } from "@/lib/exception/ResponseError";
import { Address } from "viem";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
];

interface CreateContractRequest {
  name: string;
  symbol: string;
  description: string;
  artworkFile: File | null;
}

export class ContractService {
  private static removeSpaceAndUppercase(str = "") {
    return String(str)
      .replace(/\s+/g, "")
      .toUpperCase()
      .replace(/[^A-Z0-9-_]/g, "");
  }

  static async create(request: CreateContractRequest) {
    const { name, symbol, description, artworkFile } = request;

    // Validate required fields
    if (!name) throw new ResponseError(400, "Missing required field: name");
    if (!symbol) throw new ResponseError(400, "Missing required field: symbol");
    if (!artworkFile) throw new ResponseError(400, "No artwork file provided");

    // File validations
    if (artworkFile.size > MAX_FILE_SIZE) {
      throw new ResponseError(400, "Artwork file size must be less than 10 MB");
    }
    if (!ALLOWED_IMAGE_TYPES.includes(artworkFile.type)) {
      throw new ResponseError(400, "Unsupported artwork file type");
    }

    // Prepare metadata
    const metadata = {
      name,
      description,
      image: "",
      attributes: [{ trait_type: "Art Type" }],
    };

    // Sanitize folder/name
    const baseName = this.removeSpaceAndUppercase(name || "NFT");

    try {
      // Upload artwork
      const renamedArtwork = new File([artworkFile], "0.png", {
        type: artworkFile.type,
      });
      const NAME_FOLDER_IMAGE = `${baseName}-IMAGE`;

      const imageResult: UploadPinataResponse = await pinata.upload.public
        .fileArray([renamedArtwork])
        .name(NAME_FOLDER_IMAGE);

      if (!imageResult || !imageResult.cid) {
        throw new ResponseError(500, "Failed to upload image to Pinata");
      }

      // Upload metadata
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
        throw new ResponseError(500, "Failed to upload metadata to Pinata");
      }

      return {
        metadataCID: `ipfs://${metaResult.cid}`,
      };
    } catch (error: any) {
      console.error("Pinata upload error:", error);
      if (error instanceof ResponseError) throw error;
      throw new ResponseError(500, "Failed to upload to Pinata");
    }
  }

  static async createGroup(address: Address) {
    if (!address) {
      throw new ResponseError(400, "Wallet not connected!");
    }
    let groupId = "";

    return {
      groupId,
    };
  }
}
