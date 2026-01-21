import { z } from "zod";

const NFTValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  symbol: z.string().min(1, "Symbol is required"),
  description: z.string().min(1, "Description is required"),
  maxSupply: z.string().min(1, "Max Supply is required"),
  mintPrice: z.string().min(1, "Mint Price is required"),
  collectionFile: z.instanceof(File, {
    message: "Collection file is required",
  }),
  artworkFile: z.instanceof(File, { message: "Artwork file is required" }),
});

const create = z.object({
  name: z.string().min(1, "Name is required"),
  symbol: z.string().min(1, "Symbol is required"),
  description: z.string().min(1, "Description is required"),
  artworkFile: z.instanceof(File, { message: "Artwork file is required" }),
});

export default {
  create,
  NFTValidationSchema,
};
