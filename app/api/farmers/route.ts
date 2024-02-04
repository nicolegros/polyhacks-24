import { NextRequest, NextResponse } from "next/server";
import { Repository } from "../repository";

export async function POST(request: NextRequest) {
  const repo = new Repository();
  const body = await request.json();

  // if (!isValidData(body)) {
  //   return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
  // }

    const revisedBody = {
        ...body, displayName: {
            text: body.name,
            languageCode: "en"
        }
    }
    const response = repo.create(revisedBody)
  return NextResponse.json(response)
}

export async function GET(request: NextRequest) {
    const response = await new Repository().getAll();

    return NextResponse.json(response)

}

function isValidData(data: any){
  if (!data.types || !Array.isArray(data.types) || data.types.some((type:any) => typeof type !== 'string') ||
  !data.name || typeof data.name !== 'string' ||
  !data.email || typeof data.email !== 'string' || 
  !data.product || !Array.isArray(data.product) || data.product.some((type:any) => typeof type !== 'string') ||
  !data.location.lat || typeof data.location.lat !== 'number' ||
  !data.location.lng || typeof data.location.lng !== 'number' ||
  !data.formattedAddress || typeof data.formattedAddress !== 'string' ||
  !data.displayName.text || typeof data.displayName.text !== 'string' ||
  !data.displayName.languageCode || typeof data.displayName.languageCode !== 'string'
  ) {
    return false
  }
  return true
}
