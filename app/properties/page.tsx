import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import PropertyCard from "@/src/components/PropertyCard";
import { filterProperties, getProperties } from "@/src/lib/properties";
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

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const { query } = await searchParams;
  const properties = await getProperties();
  const filteredProperties = filterProperties(properties, query);

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
