
export interface NearbyMarkets {
  places: Market[];
}

export interface Market {
  types: string[];
  location: {
    lat: number;
    lng: number;
  },
  formattedAddress: string;
  displayName: {
    text: string;
    languageCode: string;
  }
}
