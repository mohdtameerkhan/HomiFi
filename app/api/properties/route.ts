import { getSaleListings } from "@/services/rentCast";

export async function GET() {
  const properties = await getSaleListings();

  return Response.json(properties);
}