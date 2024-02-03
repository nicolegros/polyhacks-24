import axios from "axios";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const response = await axios.post('https://places.googleapis.com/v1/places:searchNearby',
    {
      includedTypes: [
        "market"
      ],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: 45.5049006,
            longitude: -73.6146601
          },
          radius: 5000.0
        }
      }
    },
    {
      headers: {
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.types'
      },
    })


  const searchParams = request.nextUrl.searchParams
  return NextResponse.json(response.data)
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({
    message: body
  })
}
