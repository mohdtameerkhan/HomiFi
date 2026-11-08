"use client";

import { useState, type FormEvent } from "react";

type SellConsultationFormProps = {
  initialAddress: string;
};

export default function SellConsultationForm({
  initialAddress,
}: SellConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); 

    const formData = new FormData(event.currentTarget);

    const consultationData = {
      address: formData.get("address"),
      propertyType: formData.get("propertyType"),
      bedrooms: formData.get("bedrooms"),
      bathrooms: formData.get("bathrooms"),
      squareFootage: formData.get("squareFootage"),
      expectedPrice: formData.get("expectedPrice"),
      timeline: formData.get("timeline"),
      currentlyListed: formData.get("currentlyListed"),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    // Temporary demo behavior: inspect the collected form data.
    console.log("Consultation request:", consultationData);

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
          ✓
        </div>

        <h2 className="mt-5 text-2xl font-bold text-[#0B1F3A]">
          Request received!
        </h2>

        <p className="mt-3 text-slate-600">
          Your consultation request has been completed in this demo.
          No information has been saved or sent to an agent yet.
        </p>

        <p className="mt-4 font-medium text-[#0B1F3A]">
          {initialAddress}
        </p>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      {/* Property information */}
      <section>
        <h2 className="text-xl font-bold text-[#0B1F3A]">
          1. Property information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Tell us about the home you want to sell.
        </p>

        <div className="mt-5 space-y-5">
          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Property address *
            </label>

            <input
              id="address"
              name="address"
              type="text"
              required
              defaultValue={initialAddress}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="propertyType"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Property type
            </label>

            <select
              id="propertyType"
              name="propertyType"
              defaultValue=""
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="">Select property type</option>
              <option value="single-family">Single-family home</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="multi-family">Multi-family</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <label
                htmlFor="bedrooms"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Bedrooms
              </label>

              <input
                id="bedrooms"
                name="bedrooms"
                type="number"
                min="0"
                placeholder="e.g. 3"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label
                htmlFor="bathrooms"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Bathrooms
              </label>

              <input
                id="bathrooms"
                name="bathrooms"
                type="number"
                min="0"
                step="0.5"
                placeholder="e.g. 2"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label
                htmlFor="squareFootage"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Square feet
              </label>

              <input
                id="squareFootage"
                name="squareFootage"
                type="number"
                min="0"
                placeholder="e.g. 1800"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200" />

      {/* Selling preferences */}
      <section>
        <h2 className="text-xl font-bold text-[#0B1F3A]">
          2. Selling preferences
        </h2>

        <div className="mt-5 space-y-5">
          <div>
            <label
              htmlFor="expectedPrice"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Expected selling price (USD)
            </label>

            <input
              id="expectedPrice"
              name="expectedPrice"
              type="number"
              min="0"
              placeholder="e.g. 350000"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="timeline"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              When are you planning to sell? *
            </label>

            <select
              id="timeline"
              name="timeline"
              required
              defaultValue=""
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="">Select your timeline</option>
              <option value="immediately">As soon as possible</option>
              <option value="1-3-months">Within 1–3 months</option>
              <option value="3-6-months">Within 3–6 months</option>
              <option value="6-plus-months">More than 6 months</option>
              <option value="exploring">Just exploring options</option>
            </select>
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-slate-700">
              Is your property currently listed?
            </legend>

            <div className="flex flex-wrap gap-5">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="radio"
                  name="currentlyListed"
                  value="yes"
                />
                Yes
              </label>

              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="radio"
                  name="currentlyListed"
                  value="no"
                  defaultChecked
                />
                No
              </label>
            </div>
          </fieldset>
        </div>
      </section>

      <div className="border-t border-slate-200" />

      {/* Contact information */}
      <section>
        <h2 className="text-xl font-bold text-[#0B1F3A]">
          3. Your contact information
        </h2>

        <div className="mt-5 space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Full name *
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email address *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Phone number *
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="Enter your phone number"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Additional message
            </label>

            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us anything else about your property..."
              className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200 pt-6">
        <p className="mb-5 text-xs text-slate-500">
          By submitting this form, you are requesting a selling
          consultation. This demo does not create a public property
          listing or contact an agent.
        </p>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Request a consultation
        </button>
      </div>
    </form>
  );
}