
import type { Property } from "@/types/property";
import type { PropertyListingFilters } from "@/types/search";


type RealityApiListing = {

  property_id?: string;
  list_price?: number;
  listing_id?:string;
  list_price_min?: number;
  list_price_max?: number;
  baths_max?:number;
  beds_max?:number;
  sqft_max?:number;
  beds?: number;
  baths?: number | string;
  sqft?: number;
  property_type?: string;
  description_text?: string;
  primary_photo?: string | null;
  href?: string | null;
  address?: {
    line?: string;
    city?: string;
    state_code?: string;
    postal_code?: string;
    latitude?: number;
  longitude?: number;
  };
};

type RealityApiResponse = {
  total?: number;
  resultCount?: number;
  nextPage?: boolean | null;
  searchResults?: RealityApiListing[];
};

function mapListing(listing: RealityApiListing): Property {
  const address = listing.address;


  return {
    id: listing.property_id ?? "",
   listingId: listing.listing_id ?? "",
    address: address?.line ?? "Address unavailable",
    city: address?.city ?? "Austin",
    state: address?.state_code ?? "TX",
    zipCode: address?.postal_code ?? "",
    price: listing.list_price ?? listing.list_price_min ?? 0,
    bedrooms:listing.beds_max ?? listing.beds ?? 0,
   bathrooms: Number(listing.baths_max ?? listing.baths ?? 0),
    squareFootage:listing.sqft_max ?? listing.sqft ?? 0,
    propertyType: listing.property_type ?? "Unknown",
    latitude: address?.latitude ?? 0,
    longitude: address?.longitude ?? 0,
    imageUrl: listing.primary_photo ?? null,
    listingUrl: listing.href ?? null,
    description: listing.description_text ?? null,
  };
}
// destructuring here
export async function getPropertyListings({
  location = "Austin, TX",
   mode = "buy",
  page = 1,
  minPrice,              
  maxPrice,
 
}: PropertyListingFilters = {}): Promise<Property[]> {
  const API_KEY = process.env.REALITY_API_KEY;

  if (!API_KEY) {
    throw new Error("REALITY_API_KEY is not configured");
  }

  const params = new URLSearchParams({
    location,
      searchType: mode === "rent" ? "For_Rent" : "For_Sale",
    page: String(page),
    resultCount: "10",
  });

  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceRange = [
      minPrice !== undefined ? `min:${minPrice}` : null,
      maxPrice !== undefined ? `max:${maxPrice}` : null,
    ]
      .filter((value) => value !== null)
      .join(",");

    params.set("priceRange", priceRange);
  }

  const response = await fetch(
    `https://realtor.realtyapi.io/search/bylocation?${params.toString()}`,
    {
      headers: {
        "x-realtyapi-key": API_KEY,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Reality API error: ${response.status} - ${errorText}`
    );
  }

  const data: RealityApiResponse = await response.json();

// console.log(data)
  
 return (data.searchResults ?? [])
  .filter(
    (listing) => listing.property_id && listing.listing_id
  )
  .map(mapListing);
}


