import Link from "next/link";
import SellConsultationForm from "@/component/sellForm/SellConsultationForm";

type SellPageProps = {
  searchParams: Promise<{
    address?: string;
  }>;
};

export default async function SellPage({
  searchParams,
}: SellPageProps) {
  const params = await searchParams;
  const address = params.address?.trim() ?? "";

  if (!address) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#0B1F3A]">
          Property address required
        </h1>

        <p className="mt-4 text-slate-600">
          Please enter your property address to request a selling
          consultation.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Back to homepage
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            HomiFi Seller Services
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
            Sell your home with HomiFi
          </h1>

          <p className="mt-3 text-slate-600">
            Tell us about your property. Submit a consultation
            request and we can help you explore your selling options.
          </p>
        </div>

        <SellConsultationForm initialAddress={address} />
      </div>
    </main>
  );
}