import { NextResponse } from "next/server";
import { ContractService } from "@/services/contract-service";
import { ResponseError } from "@/lib/exception/ResponseError";

const rateLimitStore = new Map(); // key: IP, value: { count, timestamp }

const WINDOW = 60 * 10000; // 1 minute
const LIMIT = 5; // 10 requests per minute

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    const now = Date.now();
    const record = rateLimitStore.get(ip) || { count: 0, timestamp: now };

    // Reset window
    if (now - record.timestamp > WINDOW) {
      record.count = 0;
      record.timestamp = now;
    }

    record.count++;
    rateLimitStore.set(ip, record);

    if (record.count > LIMIT) {
      return new Response("Rate limit exceeded", { status: 429 });
    }
    const formData = await req.formData();
    const name = String(formData.get("name") ?? "").trim();
    const symbol = String(formData.get("symbol") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();

    const artworkFileRaw = formData.get("artworkFile");
    const artworkFile = artworkFileRaw instanceof File ? artworkFileRaw : null;
    const mockArtworkFile = new File(["hi"], "message.png", {
      type: "image/png",
    });

    const result = await ContractService.create({
      name,
      symbol,
      description,
      artworkFile: mockArtworkFile,
    });

    return NextResponse.json(
      {
        status: "success",
        message: "NFT uploaded to Pinata",
        data: result,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Upload error:", err);

    if (err instanceof ResponseError) {
      return NextResponse.json(
        { status: "error", message: err.message },
        { status: err.status }
      );
    }

    return NextResponse.json(
      { status: "error", message: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
