"use client"


import { useRouter } from "next/navigation";
import { useState } from "react";


type SearchMode = "buy" | "rent" | "sell";

export default function HeroLayout (){
    const router = useRouter()

    const [mode, setMode] = useState<SearchMode>("buy")


    const placeholder:Record<SearchMode,string> = {
         buy: "Enter a city, neighborhood, or ZIP code",
         rent: "Where do you want to rent?",
         sell: "Enter the address of your property",
    }

    function handleSubmit (event: React.FormEvent<HTMLFormElement>){

        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const location = String(formData.get("location") ?? "").trim();

            if (!location) return;

            const params = new URLSearchParams({address:location})
            
            if(mode === "sell")
            {
                //window.location.href = `/sell?${params.toString()}`;
                router.push(`/sell?${params.toString()}`)
               return;
            }
             params.set("mode", mode);
    //window.location.href = `/?${params.toString()}`;
             router.push(`/search?${params.toString()}`)

    }


    


    return (
          <section className="relative isolate overflow-hidden bg-[#0B1F3A] bg-cover bg-center px-5 py-20 text-white sm:py-28"
  style={{ backgroundImage: "url('/images/pexels-yana-oleksiuk-2161225765-37732265.jpg')" }}
>
    <div
    aria-hidden="true"
    className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07172D]/90 via-[#0B1F3A]/70 to-[#0B1F3A]/40"
  />
      <div className="relative mx-auto max-w-5xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
          Find your place with HomiFi
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Find a home that
          <span className="block text-blue-300">feels like yours.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
          Explore homes for sale and rent in the neighborhoods you love.
        </p>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-3 text-[#0B1F3A] shadow-2xl sm:p-5">
          <div
            className="mb-4 flex gap-2"
            role="group"
            aria-label="Choose a property search mode"
          >
            {(["buy", "rent", "sell"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={mode === item}
                onClick={() => setMode(item)}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold capitalize transition-colors ${
                  mode === item
                    ? "bg-[#0B1F3A] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item === "sell" ? "Sell a home" : item}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="property-location" className="sr-only">
              Property location
            </label>

            <input
              id="property-location"
              name="location"
              type="text"
              required
              placeholder={placeholder[mode]}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {mode === "sell" ? "Get started" : "Search homes"}
            </button>
          </form>

          <p className="mt-3 text-left text-xs text-slate-500">
            {mode === "buy" && "Find homes available to buy."}
            {mode === "rent" && "Discover homes available to rent."}
            {mode === "sell" && "Start exploring your home-selling options."}
          </p>
        </div>
      </div>
    </section>

    )
}