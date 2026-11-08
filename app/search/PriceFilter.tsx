"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PriceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

 

  const containerRef = useRef<HTMLDivElement>(null);

  // Count active filters from the URL (add new filter keys here later)
  const FILTER_KEYS = ["minPrice", "maxPrice"];
  const activeCount = FILTER_KEYS.filter((key) => searchParams.get(key)).length;

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    function handleClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const min = minPrice.trim() ? Number(minPrice) : undefined;
    const max = maxPrice.trim() ? Number(maxPrice) : undefined;

    if (
      (min !== undefined && (!Number.isFinite(min) || min < 0)) ||
      (max !== undefined && (!Number.isFinite(max) || max < 0))
    ) {
      alert("Prices must be valid non-negative numbers.");
      return;
    }

    if (min !== undefined && max !== undefined && min > max) {
      alert("Minimum price cannot exceed maximum price.");
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (min !== undefined) params.set("minPrice", String(min));
    else params.delete("minPrice");

    if (max !== undefined) params.set("maxPrice", String(max));
    else params.delete("maxPrice");

    router.push(`/search?${params.toString()}`);
    setOpen(false);
  }

  function handleClear() {
    setMinPrice("");
    setMaxPrice("");

    const params = new URLSearchParams(searchParams.toString());
    FILTER_KEYS.forEach((key) => params.delete(key));

    router.push(`/search?${params.toString()}`);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative mb-6 inline-block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />
        </svg>
        Filters
        {activeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          role="dialog"
          aria-label="Filters"
          className="absolute left-0 z-20 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-4 shadow-lg"
        >
          {/* Price section */}
          <fieldset className="space-y-3">
            <legend className="mb-2 text-sm font-semibold text-slate-900">
              Price
            </legend>

            <div className="flex gap-3">
              <div className="flex-1">
                <label
                  htmlFor="minPrice"
                  className="mb-1 block text-xs font-medium text-slate-600"
                >
                  Min ($)
                </label>
                <input
                  id="minPrice"
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  placeholder="No min"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="maxPrice"
                  className="mb-1 block text-xs font-medium text-slate-600"
                >
                  Max ($)
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder="No max"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </fieldset>

          {/* Future filters go here as more <fieldset> sections, e.g.
              <fieldset className="mt-4 ...">...</fieldset> */}

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={handleClear}
              className="text-sm font-medium text-slate-500 hover:text-slate-800"
            >
              Clear all
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </form>
      )}
    </div>
  );
}