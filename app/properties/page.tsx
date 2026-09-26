import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { listEstateProperties } from "@neup/logica/estate/property/list";
import { Filter } from "lucide-react";
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
        <section className="pt-36 pb-12 border-b border-platinum">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h1 className="text-3xl font-serif text-charcoal">Verified Properties</h1>
                <p className="text-warm-gray text-sm mt-1">
                  Showing {filteredProperties.length} {query ? `results for "${query}"` : "Listings"}
                </p>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-platinum rounded text-sm hover:border-russian-purple transition-colors">
                  <Filter className="w-4 h-4" /> Filters
                </button>
                <select className="px-4 py-2 bg-white border border-platinum rounded text-sm hover:border-russian-purple transition-colors outline-none">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop.id} {...prop} />
              ))}
            </div>
            {filteredProperties.length === 0 && (
              <div className="border border-platinum bg-platinum/20 px-6 py-12 text-center text-warm-gray">
                {query ? `No properties matched "${query}".` : "No properties are available right now."}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
