export type SearchMode = "buy" | "rent";

export type PropertyListingFilters = {
  location?: string;
  mode?:SearchMode;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
};