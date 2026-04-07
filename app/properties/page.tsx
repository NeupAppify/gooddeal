import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import PropertyCard from "@/src/components/PropertyCard";
import { Filter } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verified Properties | Good Deal Advisory",
  description: "Browse our curated list of legally verified properties in Kathmandu and Lalitpur.",
};

const properties = [
  {
    id: "1",
    title: "Modern Villa in Budhanilkantha",
    price: "Rs. 5.2 Cr",
    location: "Budhanilkantha, Kathmandu",
    specs: { beds: 5, baths: 4, area: "2400 sqft" },
    image: "/hero.png",
    verified: true,
  },
  {
    id: "2",
    title: "Premium Apartment in Jhamsikhel",
    price: "Rs. 3.5 Cr",
    location: "Jhamsikhel, Lalitpur",
    specs: { beds: 3, baths: 3, area: "1600 sqft" },
    image: "/hero.png",
    verified: true,
  },
  {
    id: "3",
    title: "Commercial Land in Naxal",
    price: "Rs. 12 Cr",
    location: "Naxal, Kathmandu",
    specs: { beds: 0, baths: 0, area: "10 Aana" },
    image: "/hero.png",
    verified: true,
  },
  {
    id: "4",
    title: "Residential Plot in Bhaisepati",
    price: "Rs. 65 Lakh / Aana",
    location: "Bhaisepati, Lalitpur",
    specs: { beds: 0, baths: 0, area: "8 Aana" },
    image: "/hero.png",
    verified: true,
  },
  {
    id: "5",
    title: "Colonial House in Lazimpat",
    price: "Rs. 8.5 Cr",
    location: "Lazimpat, Kathmandu",
    specs: { beds: 6, baths: 5, area: "3200 sqft" },
    image: "/hero.png",
    verified: true,
  }
];

export default function PropertiesPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow">
        <section className="pt-36 pb-12 bg-platinum/30 border-b border-platinum">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h1 className="text-3xl font-serif text-charcoal">Verified Properties</h1>
                <p className="text-warm-gray text-sm mt-1">Showing {properties.length} Listings</p>
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
              {properties.map((prop) => (
                <PropertyCard key={prop.id} {...prop} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
