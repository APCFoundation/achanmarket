import { pinata } from "@/lib/config/pinataConfig";
import { UploadPinataResponse } from "@/lib/type";
import { ResponseError } from "@/lib/exception/ResponseError";
import NFTValidation from "@/lib/validation/nft-validation";
import { validation } from "@/lib/validation";
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

function removeSpaceAndUppercase(str = "") {
  return String(str)
    .replace(/\s+/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9-_]/g, "");
}

async function create(request: CreateContractRequest) {
  const { artworkFile, description, name, symbol } = (await validation(
    NFTValidation.create,
    request,
  )) as CreateContractRequest;

  if (artworkFile?.size! > MAX_FILE_SIZE) {
    throw new ResponseError(400, "Artwork file size must be less than 10 MB");
  }
  if (!ALLOWED_IMAGE_TYPES.includes(artworkFile?.type!)) {
    throw new ResponseError(400, "Unsupported artwork file type");
  }
}
