import Image from "next/image";
import Link from "next/link";

type PropertyCardProps = {
  id:string;
  address: string;
  listingId: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  imageUrl: string | null;
  priority?:boolean;
};

export default function PropertyCard({
  id,
  address,
  price,
  bedrooms,
  bathrooms,
  imageUrl,
  listingId,
  squareFootage,
  
}: PropertyCardProps) {

  if (!id || !listingId) {
  console.error("Property ID or Listing ID is missing");
}
  return (
    <Link
    href={{
    pathname: `/properties/${encodeURIComponent(id)}`,
    query: { listingId },
  }}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <article>
        <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-blue-100">
          {imageUrl ? (
            <Image  
              src={imageUrl}
              alt={`Property at ${address}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              quality={90}
              className="object-cover"

            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                🏡
              </div>
              <p className="text-sm font-medium text-slate-500">
                Property Preview
              </p>
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="line-clamp-2 min-h-12 text-lg font-semibold text-slate-900">
            {address}
          </h3>

          <p className="mt-3 text-2xl font-bold tracking-tight text-blue-700">
            ${price.toLocaleString("en-US")}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
            <span>{bedrooms} beds</span>
            <span>{bathrooms} baths</span>
            <span>{squareFootage.toLocaleString("en-US")} sq ft</span>
          </div>
        </div>
      </article>
    </Link>
  );
}