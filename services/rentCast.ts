export async function getSaleListings() {
  const API_KEY = process.env.RENTCAST_API_KEY;

  if (!API_KEY) {
    throw new Error("RENTCAST_API_KEY is not configured");
  }

  const response = await fetch(
    "https://api.rentcast.io/v1/listings/sale?city=Austin&state=TX",
    {
      headers: {
        "X-Api-Key": API_KEY,
        Accept: "application/json",
      },
    }
  );

if (!response.ok) {
  const errorText = await response.text();

  console.log("RentCast status:", response.status);
  console.log("RentCast error:", errorText);

  throw new Error(
    `RentCast API error: ${response.status} - ${errorText}`
  );
}

  return response.json();
}