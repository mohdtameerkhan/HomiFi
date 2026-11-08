
const cities = [
  { name: "Austin", slug: "austin" },
  { name: "Round Rock", slug: "round-rock" },
  { name: "Cedar Park", slug: "cedar-park" },
];

const createCityLinks = (mode: "buy" | "rent") =>
  cities.map((city) => ({
    label: `Homes for ${mode === "buy" ? "sale" : "rent"} in ${city.name}`,
    href: `/search?location=${encodeURIComponent(city.name)}&mode=${mode}`,
  }));

export const navigation = [
  {
    label: "Buy",
    href: "/buy",
    children: createCityLinks("buy"),
  },
  {
    label: "Rent",
    href: "/rent",
    children: createCityLinks("rent"),
  },
];
