import { propertyDetails } from "@/services/propertyDetails";




type PropertyDetailsPageProps = {
    params: Promise<{
    id:     string;
    }>;
    searchParams: Promise<{
    listingId?:   string;
  }>;
};

export default async function PropertyDetailsPage({
  params,
  searchParams,
}: PropertyDetailsPageProps) {
  const { id } = await params;
  const { listingId } = await searchParams;

  console.log("Page property ID:", id);
  console.log("Page listing ID:", listingId);

  if (!listingId) {
    return <div>Listing ID is missing.</div>;
  }

  const property = await propertyDetails(id, listingId);

  console.log("Property details:", property);

  return (
    <main>
      <h1>Property Details</h1>
    </main>
  );
}
