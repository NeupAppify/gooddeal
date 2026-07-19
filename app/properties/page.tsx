import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import PropertyCard from "@/src/components/PropertyCard";
import { listEstateProperties } from "@/logica/estate/properties/list";
import { Filter } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties, Good Deal",
  description: "Browse our curated list of legally verified properties in Kathmandu and Lalitpur.",
};

interface PropertiesPageProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

const GOODDEAL_AGENCY_ID = "e432db37-4d83-452e-bd89-d269fd9314e4";
const FALLBACK_IMAGE = "/hero.png";

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const { query } = await searchParams;
  const response = await listEstateProperties({
    agencyId: GOODDEAL_AGENCY_ID,
    limit: 15,
    offset: 0,
    fields: [
      "id",
      "slug",
      "title",
      "price",
      "location",
      "purpose",
      "category",
      "type",
      "images",
      "agency",
      "listingAgent",
      "status",
    ],
  });
  const properties = response.ok && Array.isArray(response.body.properties)
    ? response.body.properties.map((entry) => {
      const property = entry && typeof entry === "object" && !Array.isArray(entry) ? entry as Record<string, unknown> : {};
      const agency = property.agency && typeof property.agency === "object" && !Array.isArray(property.agency) ? property.agency as Record<string, unknown> : {};
      const listedBy = property.listedBy && typeof property.listedBy === "object" && !Array.isArray(property.listedBy) ? property.listedBy as Record<string, unknown> : {};
      const images = Array.isArray(property.images)
        ? property.images.flatMap((image) => {
          if (typeof image === "string" && image.trim()) return [image];
          if (image && typeof image === "object" && !Array.isArray(image)) {
            const url = (image as Record<string, unknown>).url;
            return typeof url === "string" && url.trim() ? [url] : [];
          }

          return [];
        })
        : [];
      const rawPrice = typeof property.price === "number" && Number.isFinite(property.price) ? property.price : 0;
      const firstImage = images[0] ?? FALLBACK_IMAGE;
      const listingAgent = typeof property.listingAgent === "string" && property.listingAgent.trim()
        ? property.listingAgent
        : typeof listedBy.id === "string" ? listedBy.id : "";
      const agentName = typeof listedBy.displayName === "string" && listedBy.displayName.trim()
        ? listedBy.displayName
        : listingAgent || (typeof agency.name === "string" && agency.name.trim() ? agency.name : "Good Deal Advisory");

      return {
        id: typeof property.id === "string" && property.id.trim() ? property.id : "",
        slug: typeof property.slug === "string" && property.slug.trim()
          ? property.slug
          : typeof property.id === "string" ? property.id : "",
        title: typeof property.title === "string" && property.title.trim() ? property.title : "Untitled Property",
        price: rawPrice >= 10000000
          ? `Rs. ${(rawPrice / 10000000).toLocaleString("en-US", { maximumFractionDigits: 2 })} Cr`
          : rawPrice >= 100000
            ? `Rs. ${(rawPrice / 100000).toLocaleString("en-US", { maximumFractionDigits: 2 })} Lakh`
            : `Rs. ${rawPrice.toLocaleString("en-US")}`,
        rawPrice,
        location: typeof property.location === "string" && property.location.trim()
          ? property.location
          : property.location && typeof property.location === "object" && !Array.isArray(property.location) && typeof (property.location as Record<string, unknown>).text === "string"
            ? (property.location as Record<string, unknown>).text as string
            : "",
        purpose: (typeof property.purpose === "string" ? property.purpose : Array.isArray(property.purpose) && typeof property.purpose[0] === "string" ? property.purpose[0] : "Property")
          .toLowerCase()
          .split(/[\s_-]+/)
          .filter(Boolean)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
        category: (typeof property.category === "string" ? property.category : Array.isArray(property.category) && typeof property.category[0] === "string" ? property.category[0] : "Listing")
          .toLowerCase()
          .split(/[\s_-]+/)
          .filter(Boolean)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
        type: (typeof property.type === "string" ? property.type : Array.isArray(property.type) && typeof property.type[0] === "string" ? property.type[0] : "Real Estate")
          .toLowerCase()
          .split(/[\s_-]+/)
          .filter(Boolean)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
        image: firstImage,
        status: typeof property.status === "string" && property.status.trim() ? property.status : "ACTIVE",
        listingAgent,
        agencyName: typeof agency.name === "string" && agency.name.trim() ? agency.name : "Good Deal Advisory",
        verified: (typeof property.status === "string" && property.status.trim() ? property.status : "ACTIVE").toUpperCase() === "ACTIVE",
        agent: {
          name: agentName,
          image: typeof listedBy.displayImage === "string" && listedBy.displayImage.trim() ? listedBy.displayImage : FALLBACK_IMAGE,
        },
      };
    })
    : [];
  const normalizedQuery = query?.trim().toLowerCase();
  const filteredProperties = normalizedQuery
    ? properties.filter((property) =>
      [
        property.title,
        property.slug,
        property.price,
        property.rawPrice.toString(),
        property.location,
        property.purpose,
        property.category,
        property.type,
        property.status,
        property.listingAgent,
        property.agent.name,
        property.agencyName,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    )
    : properties;

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow">
        <section className="pt-36 pb-12 bg-platinum/30 border-b border-platinum">
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

        <section className="py-16 bg-white">
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
