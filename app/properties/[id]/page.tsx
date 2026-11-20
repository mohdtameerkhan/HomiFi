import PropertyCardDetails from "@/component/property/propertydetails/PropertyCardDetails";
import { propertyDetails } from "@/services/propertyDetails";
// import Image from "next/image";

type PropertyDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    listingId?: string;
  }>;
};



export default async function PropertyDetailsPage({
  params,
  searchParams,
}: PropertyDetailsPageProps) {
  const { id } = await params;
  const { listingId } = await searchParams;

  if (!listingId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4F6F9] px-5">
        <div className="max-w-sm rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-[#0B1F3A]">
            Listing not found
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            This link is missing a listing ID. Go back to the search results and
            open the property again.
          </p>
        </div>
      </main>
    );
  }

  const response = await propertyDetails(id, listingId);
  console.log(response)
  return  <PropertyCardDetails property={response} />
}
