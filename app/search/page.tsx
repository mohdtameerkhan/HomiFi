
import { getPropertyListings } from "@/services/realityApi";
import PropertyCard from "@/component/property/PropertyCard";
import PriceFilters from "./PriceFilter";
import { SearchMode } from "@/types/search";

type SearchPageProps = {
  searchParams: Promise<{
    location?: string;
    mode?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

export default async function SearchPage({ searchParams,}: SearchPageProps) {
  const params = await searchParams;

  const location = params.location?.trim() || "Austin, TX";
  // const mode = params.mode || "buy";
  const mode: SearchMode = params.mode === "rent" ? "rent" : "buy";

 const minPrice = params.minPrice
  ? Number(params.minPrice)
  : undefined;

const maxPrice = params.maxPrice
  ? Number(params.maxPrice)
  : undefined;

const properties = await getPropertyListings({
  location,
  minPrice,
  maxPrice,
  mode,
});

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium text-blue-600">
          {mode === "rent" ? "Homes for rent" : "Homes for sale"}
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Properties in {location}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {properties.length} properties found
        </p>
        <PriceFilters/> 

        {properties.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  listingId={property.listingId}
                  address={property.address}
                  price={property.price}
                  imageUrl={property.imageUrl}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  squareFootage={property.squareFootage}
                  
                />
              ))}
          </div>
        ) : (
          <p className="mt-8">No properties found.</p>
        )}
      </div>
    </main>
  );
}
