import { PropertyDetailsResponse } from "@/types/propertydetails";



const API_BASE_URL = "https://realtor.realtyapi.io";

export async function propertyDetails(
  id: string,
  listingId?: string
): Promise<PropertyDetailsResponse> {
  const apiKey = process.env.REALITY_API_KEY;

  if (!apiKey) {
    throw new Error("Realty API key is missing");
  }

  const params = new URLSearchParams({
    property_id: id,
  });

  if (listingId) {
    params.append("listing_id", listingId);
  }

  const response = await fetch(
    `${API_BASE_URL}/details/byid?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "x-realtyapi-key": apiKey,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Property details request failed: ${response.status}`
    );
  }

  const data: PropertyDetailsResponse = await response.json();

  //console.log(data)

  return data;
}
