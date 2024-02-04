import { Market, NearbyMarkets } from "@/models/market";
import axios from "axios";

export class GoogleAdapter {

  private apiKey: string;

  constructor() {
    if (process.env.GOOGLE_API_KEY) {
      this.apiKey = process.env.GOOGLE_API_KEY;
    }
    else {
      throw new Error("Please setup 'GOOGLE_API_KEY' environment variable")
    }
  }

  async getNearbyMarkets(latitude: number, longitude: number, searchRadius: number): Promise<NearbyMarkets> {
    const response = await axios.post('https://places.googleapis.com/v1/places:searchNearby',
      {
        includedTypes: [
          "market",
          "farm"
        ],
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: {
              latitude: latitude,
              longitude: longitude
            },
            radius: searchRadius
          }
        }
      },
      {
        headers: {
          'X-Goog-Api-Key': this.apiKey,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.types,places.location'
        },
      })

    return {
      places: response.data.places.map((place: GoogleMarket) => {
        return {
          ...place, location: {
            lat: place.location.latitude,
            lng: place.location.longitude
          }
        }
      })
    }
  }
}


interface GoogleMarket {
  types: string[];
  location: {
    latitude: number;
    longitude: number;
  },
  formattedAddress: string;
  displayName: {
    text: string;
    languageCode: string;
  }

}
