export interface NearbyMarkets {
  places: Market[];
}

export interface Producer {
  types: string[];
  product: string[];
  location: {
    lat: number;
    lng: number;
  },
  formattedAddress: string;
  email: string;
  name: string;
  displayName: {
    text: string;
    languageCode: string;
  }
}