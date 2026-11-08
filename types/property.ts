
// Search listing model used by HomiFi
export type Property = {
  id: string;
  listingId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  propertyType: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  listingUrl: string | null;
  description: string | null;
};

// Property details API types
