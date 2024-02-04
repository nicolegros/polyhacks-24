import { NextRequest, NextResponse } from "next/server";
import { Repository } from "../repository";

export async function POST(request: NextRequest) {
  const repo = new Repository();
  const body = await request.json();
  const response = repo.create(body)
  return NextResponse.json(response)
}

export async function GET(request: NextRequest) {
    const response = await new Repository().getAll();

    return NextResponse.json(response)

}
