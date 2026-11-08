import { propertyDetails } from "@/services/propertyDetails";
import Image from "next/image";

type PropertyDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    listingId?: string;
  }>;
};

const formatMoney = (value: number) => `$${value.toLocaleString("en-US")}`;

const formatStatus = (status?: string | null) =>
  status ? status.replaceAll("_", " ") : "";

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
  const property = response.detail;

  const photos = property.photos ?? [];
  const extraPhotos = Math.max(photos.length - 5, 0);
  const schools = (property.schools ?? []).slice(0, 4);
  const history = (property.property_history ?? []).slice(0, 5);
  const sections = property.details_sections ?? [];

  const stats = [
    { label: "Bedrooms", value: property.details.beds ?? "N/A" },
    { label: "Bathrooms", value: property.details.baths ?? "N/A" },
    {
      label: "Square feet",
      value:
        property.details.sqft != null
          ? property.details.sqft.toLocaleString("en-US")
          : "N/A",
    },
    {
      label: "Price per sq ft",
      value:
        property.price_per_sqft != null ? `$${property.price_per_sqft}` : "N/A",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F4F6F9] text-[#0B1F3A]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* ───────── Header ───────── */}
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {property.status && (
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium capitalize text-green-800">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                {formatStatus(property.status)}
              </span>
            )}

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {formatMoney(property.list_price)}
            </h1>

            <p className="mt-2 text-base text-gray-600 sm:text-lg">
              {property.address.line}, {property.address.city},{" "}
              {property.address.state_code} {property.address.postal_code}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] focus-visible:ring-offset-2"
            >
              Save
            </button>
            <button
              type="button"
              className="rounded-lg bg-[#0B1F3A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#17385e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] focus-visible:ring-offset-2"
            >
              Share
            </button>
          </div>
        </header>

        {/* ───────── Photo gallery ───────── */}
        <section
          aria-label="Property photos"
          className="mt-6 overflow-hidden rounded-2xl bg-gray-200"
        >
          {photos.length > 0 ? (
            <div className="grid h-65 grid-cols-1 gap-2 sm:h-90 md:h-115 md:grid-cols-4 md:grid-rows-2">
              <div className="relative md:col-span-2 md:row-span-2">
                <Image
                  src={photos[0].href}
                 fill
                  alt="Main property view"
                  
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white md:hidden">
                  {photos.length} photos
                </span>
              </div>
             

              {photos.slice(1, 5).map((photo, index) => {
                const isLast = index === 3 && extraPhotos > 0;
                return (
                  <div
                    key={photo.href}
                    className="relative hidden overflow-hidden md:block"
                  >
                    <Image
                      src={photo.href}
                      fill
                      alt={`Property view ${index + 2}`}
                      className="h-full w-full object-cover"
                    />
                    {isLast && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-lg font-semibold text-white">
                        +{extraPhotos} more
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-65 items-center justify-center text-gray-500 sm:h-90">
              No property images available
            </div>
          )}
        </section>

        {/* ───────── Key stats ───────── */}
        <dl className="mt-6 grid grid-cols-2 divide-gray-200 overflow-hidden rounded-2xl bg-white shadow-sm sm:grid-cols-4 sm:divide-x">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-5 py-5 sm:px-6 ${
                index < 2 ? "border-b border-gray-200 sm:border-b-0" : ""
              } ${index % 2 === 0 ? "border-r border-gray-200 sm:border-r-0" : ""}`}
            >
              <dt className="text-sm text-gray-500">{stat.label}</dt>
              <dd className="mt-1 text-2xl font-bold">{stat.value}</dd> 
            </div>
          ))}
        </dl>

        {/* ───────── Content + sidebar ───────── */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Features */}
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold">Property features</h2>
              <p className="mt-1 text-sm text-gray-500">
                Details and specifications for this home.
              </p>

              {sections.length > 0 ? (
                <div className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
                  {sections.map((section, sectionIndex) => (
                    <details
                      key={section.category}
                      open={sectionIndex === 0}
                      className="group py-4"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between rounded-md text-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] [&::-webkit-details-marker]:hidden">
                        {section.category}
                        <svg
                          className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </summary>

                      <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                        {section.text.map((item, index) => (
                          <li
                            key={`${section.category}-${index}`}
                            className="flex items-start gap-3 text-sm text-gray-700"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B1F3A]"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-sm text-gray-500">
                  No feature details available.
                </p>
              )}
            </section>

            {/* Schools */}
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold">Nearby schools</h2>

              {schools.length > 0 ? (
                <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {schools.map((school) => (
                    <li
                      key={school.id}
                      className="flex items-start gap-4 rounded-xl bg-[#F4F6F9] p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0B1F3A] text-white">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 9l9-5 9 5-9 5-9-5z" />
                          <path d="M7 11.5V16c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5v-4.5" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-semibold leading-snug">
                          {school.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {school.district ?? "District unavailable"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-gray-500">
                  No nearby schools listed.
                </p>
              )}
            </section>

            {/* History */}
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold">Property history</h2>

              {history.length > 0 ? (
                <ol className="mt-6">
                  {history.map((event, index) => (
                    <li
                      key={`${event.date}-${event.event_name}-${index}`}
                      className="relative flex gap-4 pb-6 last:pb-0"
                    >
                      {/* timeline line */}
                      {index !== history.length - 1 && (
                        <span
                          className="absolute left-1.25 top-4 h-full w-px bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className="relative mt-1.5 h-2.75 w-2.75 shrink-0 rounded-full border-2 border-[#0B1F3A] bg-white"
                        aria-hidden="true"
                      />
                      <div className="flex flex-1 items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold">{event.event_name}</h3>
                          <p className="mt-0.5 text-sm text-gray-500">
                            {event.date}
                          </p>
                        </div>
                        <p className="font-semibold">
                          {event.price != null ? formatMoney(event.price) : "N/A"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-4 text-sm text-gray-500">
                  No property history available.
                </p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <p className="text-sm text-gray-500">Listed price</p>
              <p className="mt-1 text-3xl font-bold">
                {formatMoney(property.list_price)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {property.address.city}, {property.address.state_code}
              </p>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  className="w-full rounded-lg bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#17385e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] focus-visible:ring-offset-2"
                >
                  Request a tour
                </button>
                <button
                  type="button"
                  className="w-full rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] focus-visible:ring-offset-2"
                >
                  Contact agent
                </button>
              </div>

              <dl className="mt-6 space-y-3 border-t border-gray-200 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Beds / baths</dt>
                  <dd className="font-medium">
                    {property.details.beds ?? "N/A"} /{" "}
                    {property.details.baths ?? "N/A"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Size</dt>
                  <dd className="font-medium">
                    {property.details.sqft != null
                      ? `${property.details.sqft.toLocaleString("en-US")} sq ft`
                      : "N/A"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Price per sq ft</dt>
                  <dd className="font-medium">
                    {property.price_per_sqft != null
                      ? `$${property.price_per_sqft}`
                      : "N/A"}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
