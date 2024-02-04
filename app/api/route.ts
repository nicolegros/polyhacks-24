import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server"
import { GoogleAdapter } from "./google-adapter";
import { NearbyMarkets } from "@/models/market";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const latitude = searchParams.get("latitude") ?? "45.5049006";
  const longitude = searchParams.get("longitude") ?? "-73.6146601";
  const radius: string = searchParams.get("radius") ?? "5000.0";
  let response: NearbyMarkets;
  try {
    response = await new GoogleAdapter().getNearbyMarkets(
      parseFloat(latitude),
      parseFloat(longitude),
      parseFloat(radius))
  } catch (error: unknown) {
    console.log(`Call to Google's API failed with error: ${error}`);
    return NextResponse.json({ error: (error as AxiosError).message }, {
      status: 500
    })
  }

    return NextResponse.json(response)
}

  export async function POST(request: NextRequest) {
    const body = await request.json();
    return NextResponse.json({
      message: body
    })
  }
