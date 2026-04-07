import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Square, CheckCircle, ArrowLeft, Phone } from "lucide-react";

export default function PropertyDetailPage() {
  // Mock data - would normally fetch based on params.slug
  const property = {
    title: "Modern Villa in Budhanilkantha",
    price: "Rs. 5.2 Cr",
    location: "Budhanilkantha, Kathmandu",
    specs: { beds: 5, baths: 4, area: "2400 sqft", land: "12 Aana", parking: "2 Cars", facing: "South-East" },
    desc: "A stunning contemporary villa located in the serene heights of Budhanilkantha. Featuring floor-to-ceiling windows, a modular kitchen, and a landscaped garden. This property has passed our full 50-point legal verification.",
    images: ["/hero.png", "/hero.png", "/hero.png"],
    features: ["Modular Kitchen", "Parquet Flooring", "Solar Water", "Security System", "Garden", "Water Tank"]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-white">
        {/* Gallery Hero */}
        <section className="h-[60vh] relative bg-charcoal pt-24">
          <Image 
            src={property.images[0]} 
            alt={property.title} 
            fill 
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute top-28 left-0 right-0 z-10">
            <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
              <Link href="/properties" className="inline-flex items-center gap-2 text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/40 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Listings
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-serif text-charcoal mb-2">{property.title}</h1>
                    <div className="flex items-center text-warm-gray">
                      <MapPin className="w-4 h-4 mr-1 text-russian-purple" />
                      {property.location}
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-3xl font-serif text-russian-purple mb-1">{property.price}</div>
                    <div className="inline-flex items-center gap-1 bg-sage/10 text-sage px-2 py-1 rounded text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" /> Verified Property
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-platinum mb-10">
                  <div className="text-center p-4 bg-platinum/30 rounded">
                    <Bed className="w-6 h-6 text-warm-gray mx-auto mb-2" />
                    <div className="font-semibold text-charcoal">{property.specs.beds} Beds</div>
                  </div>
                  <div className="text-center p-4 bg-platinum/30 rounded">
                    <Bath className="w-6 h-6 text-warm-gray mx-auto mb-2" />
                    <div className="font-semibold text-charcoal">{property.specs.baths} Baths</div>
                  </div>
                  <div className="text-center p-4 bg-platinum/30 rounded">
                    <Square className="w-6 h-6 text-warm-gray mx-auto mb-2" />
                    <div className="font-semibold text-charcoal">{property.specs.area}</div>
                  </div>
                   <div className="text-center p-4 bg-platinum/30 rounded">
                    <Square className="w-6 h-6 text-warm-gray mx-auto mb-2" />
                    <div className="font-semibold text-charcoal">{property.specs.land}</div>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-serif mb-6">Description</h3>
                  <p className="text-warm-gray leading-relaxed text-lg">{property.desc}</p>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-serif mb-6">Key Features</h3>
                  <div className="grid grid-cols-2 gap-y-4">
                    {property.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-warm-gray">
                        <div className="w-2 h-2 rounded-full bg-russian-purple" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-platinum rounded-xl p-8 sticky top-32 shadow-lg">
                  <h3 className="text-xl font-serif mb-6">Interested in this property?</h3>
                  <p className="text-sm text-warm-gray mb-8">
                    Schedule a viewing with our advisory team. We will accompany you and provide a full briefing.
                  </p>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Full Name</label>
                      <input type="text" className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 text-sm focus:outline-none focus:border-russian-purple transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Phone Number</label>
                      <input type="tel" className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 text-sm focus:outline-none focus:border-russian-purple transition-colors" placeholder="+977 984 0518336" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Message</label>
                      <textarea className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 text-sm focus:outline-none focus:border-russian-purple transition-colors h-24 resize-none" placeholder="I would like to view this property..." />
                    </div>
                    
                    <button className="w-full btn-primary mt-2">
                      Request Viewing
                    </button>
                  </form>

                  <div className="mt-8 pt-8 border-t border-platinum flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-platinum flex items-center justify-center text-russian-purple">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-warm-gray">Call us directly</div>
                        <a href="tel:+9779840518336" className="font-medium text-charcoal hover:text-russian-purple transition-colors">+977 984 0518336</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
