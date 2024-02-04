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

  async getDistance(origin: { latitude: number; longitude: number }, destination: { latitude: number; longitude: number }): Promise<number> {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&units=metric&key=${this.apiKey}`);
    const distance = response.data.rows[0].elements[0].distance.value;
    return distance / 1000;
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

      const userLocation = { latitude, longitude };
      const distancePromises = response.data.places.map(async (place: GoogleMarket) => {
        const distance = await this.getDistance(userLocation, place.location);
        return {
          ...place,
          location: {
            lat: place.location.latitude,
            lng: place.location.longitude
          },
          distance: distance 
        };
      });
      const placesWithDistances = await Promise.all(distancePromises);

      return { places: placesWithDistances };
  }
}


interface GoogleMarket {
  types: string[];
  location: {
    latitude: number;
    longitude: number;
  },
  formattedAddress: string;
  distance: number;
  displayName: {
    text: string;
    languageCode: string;
  }

}
