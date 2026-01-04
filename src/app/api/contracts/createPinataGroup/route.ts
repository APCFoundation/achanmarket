import { NextResponse } from "next/server";
import { ContractService } from "@/services/contract-service";
import { rateLimit } from "@/utils/rateLimit";

export async function POST(req: Request) {
  try {
    await rateLimit(req);

    const { address } = await req.json();
    const result = await ContractService.createGroup(address);

    return NextResponse.json({
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      error: "hi",
    });
  }
}
