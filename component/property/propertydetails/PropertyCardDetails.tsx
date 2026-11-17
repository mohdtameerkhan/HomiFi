
import { PropertyDetailsResponse } from "@/types/propertydetails";
import PropertyGallery from "./PropertyGallery";

type PropertyCardDetailsProps = {
  property: PropertyDetailsResponse;
};

export default function PropertyCardDetails({
  property,
}: PropertyCardDetailsProps) {
  const detail = property.detail;
  const details = detail.details;
  const address = detail.address;

  const formatMoney = (value: number | null | undefined) =>
    value != null
      ? `$${value.toLocaleString("en-US")}`
      : "Not available";

  const formatPriceRange = (
    min: number | null | undefined,
    max: number | null | undefined
  ) => {
    if (min == null && max == null) return "Price unavailable";

    if (min != null && max != null) {
      return min === max
        ? formatMoney(min)
        : `${formatMoney(min)} – ${formatMoney(max)}`;
    }

    return formatMoney(min ?? max);
  };

  const formatDate = (date?: string | null) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatValue = (
    value: string | number | null | undefined
  ) => {
    if (value == null || value === "") return "Not available";
    return String(value);
  };

  const formatLabel = (value: string) =>
    value
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const formatStatus = (status?: string | null) =>
    status
      ? status.replaceAll("_", " ").toLowerCase()
      : "Unavailable";

  const fullAddress = [
    address.line,
    address.city,
    address.state_code,
    address.postal_code,
  ]
    .filter(Boolean)
    .join(", ");

  const price = formatPriceRange(
    detail.list_price_min,
    detail.list_price_max
  );

  const bedrooms = formatValue(
    details.beds ?? details.beds_max
  );

  const bathrooms = formatValue(
    details.baths ?? details.baths_max
  );

  const squareFeet = formatValue(
    details.sqft ?? details.sqft_max
  );

  const stats = [
    { label: "Bedrooms", value: bedrooms },
    { label: "Bathrooms", value: bathrooms },
    {
      label: "Square feet",
      value:
        squareFeet !== "Not available"
          ? Number(squareFeet).toLocaleString("en-US")
          : squareFeet,
    },
    {
      label: "Price per sqft",
      value:
        detail.price_per_sqft != null
          ? `$${detail.price_per_sqft.toLocaleString("en-US")}`
          : "Not available",
    },
  ];

  const featureSections = detail.details_sections.filter(
    (section) => section.text.length > 0
  );

  // Display only the first four schools
  const schools = (detail.schools ?? []).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F4F6F9] text-[#0B1F3A]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* PROPERTY HEADER */}
        <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold capitalize text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {formatStatus(detail.status)}
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {price}
              <span className="ml-2 text-base font-medium text-gray-500">
                / month
              </span>
            </h1>

            <p className="mt-2 text-base text-gray-600">
              {fullAddress}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold hover:bg-gray-50"
            >
              ♡ Save
            </button>

            <button
              type="button"
              className="rounded-lg bg-[#0B1F3A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#17385e]"
            >
              Share
            </button>
          </div>
        </section>

        {/* PROPERTY GALLERY */}
        <section className="mt-8">
          <PropertyGallery photos={detail.photos ?? []} />
        </section>

        {/* CONTENT BELOW GALLERY */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_350px]">

          {/* LEFT CONTENT */}
          <div className="min-w-0">

            {/* PROPERTY OVERVIEW */}
            <section className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-bold">
                Property overview
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-[#0B1F3A]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              
            </section>

            {/* PROPERTY FEATURES */}
            <section className="border-b border-gray-200 py-9">
              <h2 className="text-2xl font-bold">
                Property features
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Explore the features and details of this property.
              </p>

              {featureSections.length > 0 ? (
                <div className="mt-7 space-y-7">
                  {featureSections.map((section, index) => (
                    <div
                      key={`${section.category}-${index}`}
                      className="border-b border-gray-100 pb-6 last:border-0"
                    >
                      <h3 className="text-base font-semibold">
                        {formatLabel(section.category)}
                      </h3>

                      <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                        {section.text.map((item, itemIndex) => (
                          <li
                            key={`${item}-${itemIndex}`}
                            className="flex items-start gap-3 text-sm leading-6 text-gray-600"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm text-gray-500">
                  Property feature information is not available.
                </p>
              )}
            </section>

            {/* NEARBY SCHOOLS - ONLY FOUR */}
            <section className="py-9">
              <h2 className="text-2xl font-bold">
                Nearby schools
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Schools associated with this property&apos; area.
              </p>

              {schools.length > 0 ? (
                <div className="mt-6 divide-y divide-gray-100">
                  {schools.map((school) => (
                    <div
                      key={school.id}
                      className="flex flex-col justify-between gap-3 py-5 sm:flex-row sm:items-center"
                    >
                      <div>
                        <h3 className="font-semibold">
                          {school.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {school.district ?? "District not available"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {school.grades.map((grade) => (
                          <span
                            key={grade}
                            className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-600 ring-1 ring-gray-200"
                          >
                            {grade}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm text-gray-500">
                  School information is not available.
                </p>
              )}
            </section>
          </div>

          {/* STICKY SIDEBAR */}
          <aside className="h-fit lg:sticky lg:top-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <p className="text-sm font-medium text-gray-500">
                Monthly rent
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                {price}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Interested in this property?
              </p>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  className="w-full rounded-xl bg-[#0B1F3A] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#17385e]"
                >
                  Request a tour
                </button>

                <button
                  type="button"
                  className="w-full rounded-xl border border-[#0B1F3A] px-5 py-3.5 text-sm font-semibold text-[#0B1F3A] transition hover:bg-gray-50"
                >
                  Contact an agent
                </button>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <h3 className="font-semibold">
                  Property summary
                </h3>

                <div className="mt-4 space-y-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Bedrooms</span>
                    <span className="font-medium">{bedrooms}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Bathrooms</span>
                    <span className="font-medium">{bathrooms}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Square feet</span>
                    <span className="font-medium">{squareFeet}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Neighborhood</span>
                    <span className="text-right font-medium">
                      {detail.neighborhoods?.[0] ?? "Not available"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-6 border-t border-gray-100 pt-4 text-center text-xs leading-5 text-gray-400">
                Property information is subject to verification.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
