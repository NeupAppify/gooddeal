import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { listEstateProperties } from "@neup/logica/estate/property/list";
import { Building2, CheckCircle, Home, MapPin, Search, Tag } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties, Good Deal",
  description: "Browse our curated list of legally verified properties in Kathmandu and Lalitpur.",
};

const GOODDEAL_AGENCY_ID = "e432db37-4d83-452e-bd89-d269fd9314e4";

interface PropertiesPageProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const { query } = await searchParams;
  const response = await listEstateProperties({
    agencyId: GOODDEAL_AGENCY_ID,
    fields: ["id", "slug", "title", "price", "pricing", "location", "purpose", "category", "type", "status", "images", "listingAgent", "agency"],
    limit: 15,
    offset: 0,
  });
  const properties = response.ok && Array.isArray(response.body.properties)
    ? response.body.properties.flatMap((entry) => {
        if (!entry || typeof entry !== "object" || Array.isArray(entry)) return [];
        const property = entry as Record<string, unknown>;
        const pricing = Array.isArray(property.pricing)
          ? property.pricing[0] as Record<string, unknown> | undefined
          : property.pricing as Record<string, unknown> | undefined;
        const amount = typeof property.price === "number"
          ? property.price
          : typeof pricing?.askingAmount === "number"
            ? pricing.askingAmount
            : typeof pricing?.listed === "number"
              ? pricing.listed
              : null;
        const price = amount === null
          ? "Price on request"
          : amount >= 10_000_000
            ? `Rs. ${(amount / 10_000_000).toLocaleString("en-US", { maximumFractionDigits: 2 })} Cr`
            : amount >= 100_000
              ? `Rs. ${(amount / 100_000).toLocaleString("en-US", { maximumFractionDigits: 2 })} Lakh`
              : `Rs. ${amount.toLocaleString("en-US")}`;
        const location = property.location;
        const locationText = typeof location === "string"
          ? location
          : location && typeof location === "object" && "text" in location && typeof location.text === "string"
            ? location.text
            : "Location available on request";
        const images = Array.isArray(property.images) ? property.images : [];
        const firstImage = images[0];
        const image = typeof firstImage === "string"
          ? firstImage
          : firstImage && typeof firstImage === "object" && "url" in firstImage && typeof firstImage.url === "string"
            ? firstImage.url
            : "/hero.png";
        const id = typeof property.id === "string" ? property.id : "";
        const slug = typeof property.slug === "string" ? property.slug : id;
        if (!slug) return [];

        return [{
          id: id || slug,
          slug,
          title: typeof property.title === "string" && property.title.trim()
            ? property.title
            : "Property listing",
          price,
          location: locationText,
          purpose: typeof property.purpose === "string"
            ? property.purpose
            : Array.isArray(property.purpose) && typeof property.purpose[0] === "string"
              ? property.purpose[0]
              : "Property",
          category: typeof property.category === "string"
            ? property.category
            : Array.isArray(property.category) && typeof property.category[0] === "string"
              ? property.category[0]
              : "Listing",
          type: typeof property.type === "string"
            ? property.type
            : Array.isArray(property.type) && typeof property.type[0] === "string"
              ? property.type[0]
              : "Real Estate",
          image,
          verified: typeof property.status === "string" && property.status.toUpperCase() === "ACTIVE",
        }];
      })
    : [];
  const normalizedQuery = query?.trim().toLowerCase();
  const filteredProperties = normalizedQuery
    ? properties.filter((property) => [property.title, property.slug, property.price, property.location, property.purpose, property.category, property.type]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery))
    : properties;

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow">
        <section className="border-b border-slate-200/80 bg-slate-50/70 pt-32 pb-10 sm:pt-36">
          <div className="container mx-auto max-w-[1440px] px-6 lg:px-8">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-russian-purple">Good Deal verified listings</p>
                <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">Find a property that fits.</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Browse properties reviewed by our advisory team and get clear details before you take the next step.
                </p>
              </div>
              <form action="/properties" method="GET" className="flex w-full max-w-xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-russian-purple/40">
                <Search className="ml-2 h-5 w-5 shrink-0 text-slate-400" />
                <input
                  type="search"
                  name="query"
                  defaultValue={query}
                  placeholder="Search location, type, or price"
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
                <button type="submit" className="rounded-xl bg-russian-purple px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#251138]">
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="bg-white py-10 sm:py-14">
          <div className="container mx-auto max-w-[1440px] px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950 sm:text-2xl">Available properties</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {filteredProperties.length} {query ? `results for “${query}”` : "verified listings"}
                </p>
              </div>
              <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 sm:inline-flex">
                Recently listed
              </span>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProperties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/properties/${property.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-russian-purple/30 hover:shadow-lg hover:shadow-slate-900/5"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <Image src={property.image} alt={property.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      {property.verified && (
                        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-russian-purple shadow-sm backdrop-blur">
                          <CheckCircle className="h-3.5 w-3.5" /> Verified
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="text-lg font-semibold text-russian-purple">{property.price}</p>
                      <h3 className="mt-1 line-clamp-2 text-lg font-semibold leading-snug text-slate-950 transition-colors group-hover:text-russian-purple">{property.title}</h3>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin className="h-4 w-4 shrink-0 text-russian-purple" />
                        <span className="line-clamp-1">{property.location}</span>
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-100 pt-4 mt-5">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600"><Tag className="h-3.5 w-3.5 text-slate-400" />{property.purpose}</span>
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600"><Home className="h-3.5 w-3.5 text-slate-400" />{property.category}</span>
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600"><Building2 className="h-3.5 w-3.5 text-slate-400" />{property.type}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-russian-purple shadow-sm"><Search className="h-5 w-5" /></div>
                <h3 className="mt-4 text-lg font-semibold text-slate-950">No properties found</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {query ? `No properties matched “${query}”. Try another search.` : "There are no listings available right now."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
