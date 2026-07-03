import Image from "next/image";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import PropertyCard from "@/src/components/PropertyCard";
import { getFeaturedProperties } from "@/src/lib/properties";
import { ArrowRight, ShieldCheck, Scale, FileText, Search, Home as HomeIcon, Building } from "lucide-react";

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden">
           {/* Background Image with Opacity */}
           <div className="absolute inset-x-0 bottom-0 h-[65%] z-0 pointer-events-none">
             <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/80 to-white z-10" />
             <Image
               src="/hero.png"
               alt="Background"
               fill
               className="object-cover object-bottom opacity-100"
               priority
             />
           </div>

          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 relative z-10">
            <div className="max-w-4xl mr-auto text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <span className="inline-block px-3 py-1 bg-platinum rounded-full text-xs font-sans font-semibold tracking-wider text-russian-purple mb-6 border border-black/5 uppercase">
                Premium Real Estate Advisory
              </span>
              <h1 className="text-5xl md:text-7xl leading-[1.1] mb-8 text-charcoal font-serif">
                Real Estate, Handled With <br/> Clarity and Care.
              </h1>
              
              {/* Search Box */}
              <form action="/properties" method="GET" className="bg-white p-2 rounded-full shadow-lg border border-platinum max-w-2xl mb-12 flex items-center">
                 <div className="flex-grow px-6 py-2">
                    <input 
                      type="text" 
                      name="query"
                      required
                      placeholder="Search by location, property type, or price..." 
                      className="w-full outline-none text-charcoal placeholder:text-warm-gray text-lg"
                    />
                 </div>
                 <button type="submit" aria-label="Search properties" className="bg-russian-purple text-white p-3 rounded-full hover:bg-[#251138] transition-colors">
                    <Search className="w-6 h-6" />
                 </button>
              </form>

              {/* Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mb-12">
                <Link href="/services/selling" className="group bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-platinum hover:border-russian-purple/30 transition-all text-left flex items-center gap-4 shadow-sm hover:shadow-md">
                  <div className="w-10 h-10 bg-platinum rounded-full flex items-center justify-center text-russian-purple shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                    <HomeIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium text-charcoal group-hover:text-russian-purple transition-colors">Sell Your Property</h3>
                </Link>

                <Link href="/properties" className="group bg-russian-purple p-6 rounded-2xl border border-russian-purple hover:bg-[#251138] transition-all text-left flex items-center gap-4 shadow-md hover:shadow-lg">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Buy a Property</h3>
                </Link>
              </div>

              <Link href="/contact" className="inline-flex items-center text-charcoal font-medium hover:text-russian-purple transition-colors group">
                Talk to an Agent <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-white py-16 border-y border-platinum">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Years of Experience", value: "15+" },
                { label: "Transactions Handled", value: "500+" },
                { label: "Properties Verified", value: "1200+" },
                { label: "Locations Covered", value: "12 Districts" },
              ].map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="font-serif text-3xl text-russian-purple mb-1">{stat.value}</div>
                  <div className="text-warm-gray text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-24 bg-platinum/30">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-xl">
                <span className="text-sage font-medium text-sm tracking-wider uppercase mb-2 block">Curated Selection</span>
                <h2 className="text-4xl md:text-5xl mb-4">Featured Properties</h2>
                <p className="text-warm-gray text-lg">
                  Handpicked properties that meet our strict verification standards.
                </p>
              </div>
              <Link href="/properties" className="text-russian-purple font-medium hover:underline flex items-center gap-2">
                View all listings <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((prop) => (
                <PropertyCard key={prop.id} {...prop} />
              ))}
            </div>
            {featuredProperties.length === 0 && (
              <div className="border border-platinum bg-white px-6 py-12 text-center text-warm-gray">
                No featured properties are available right now.
              </div>
            )}
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <span className="text-russian-purple font-medium text-sm tracking-wider uppercase mb-2 block">Our Expertise</span>
                <h2 className="text-4xl md:text-5xl mb-6">Expertise Built on Trust.</h2>
                <p className="text-warm-gray text-lg">Our services are designed to protect your interests and ensure a seamless property transaction.</p>
              </div>
              <Link href="/services" className="text-russian-purple font-medium hover:underline flex items-center gap-2">
                View all services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Buying Advisory",
                  desc: "Strategic guidance for first-time buyers and seasoned investors to find the perfect property.",
                  link: "/services/buying",
                  icon: <ShieldCheck className="w-8 h-8" />,
                },
                {
                  title: "Property Verification",
                  desc: "Meticulous document and field verification before you commit to any transaction.",
                  link: "/services/verification",
                  icon: <FileText className="w-8 h-8" />,
                },
                {
                  title: "Legal Support",
                  desc: "Expert navigation through regulatory and documentation hurdles for a smooth process.",
                  link: "/services/legal",
                  icon: <Scale className="w-8 h-8" />,
                },
              ].map((service, i) => (
                <div key={i} className="card-premium p-10 flex flex-col items-start gap-6 group hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-full bg-platinum flex items-center justify-center text-russian-purple group-hover:bg-russian-purple group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl">{service.title}</h3>
                  <p className="text-warm-gray leading-relaxed text-sm">{service.desc}</p>
                  <Link href={service.link} className="mt-auto text-sm font-semibold text-charcoal group-hover:text-russian-purple transition-colors flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insights Teaser */}
        <section className="py-24 bg-platinum/50">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl mb-6">Market Insights</h2>
              <p className="text-warm-gray text-lg">
                Stay informed with the latest trends, legal updates, and investment advice from our experts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "5 Legal Pitfalls to Avoid When Buying Land",
                  category: "Legal Guide",
                  date: "Oct 12, 2024",
                },
                {
                  title: "Understanding New Property Tax Regulations",
                  category: "Market Update",
                  date: "Sep 28, 2024",
                },
                {
                  title: "Is it the Right Time to Invest in Kathmandu?",
                  category: "Investment",
                  date: "Sep 15, 2024",
                },
              ].map((post, i) => (
                <Link key={i} href="/insights/1" className="group block">
                  <div className="aspect-[16/9] bg-white rounded-lg mb-4 overflow-hidden border border-black/5">
                    <div className="w-full h-full bg-platinum group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-warm-gray mb-2">
                    <span className="text-russian-purple font-medium">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-serif leading-tight group-hover:text-russian-purple transition-colors">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
             <div className="text-center mt-12">
                <Link href="/insights" className="btn-secondary">
                    Read All Insights
                </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="bg-russian-purple rounded-2xl p-12 md:p-20 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-white text-4xl md:text-5xl mb-8">Ready to make your next move with confidence?</h2>
                <p className="text-white/80 text-lg mb-12">Schedule a consultation with our advisors and experience real estate transparency.</p>
                <Link href="/contact" className="bg-platinum text-charcoal btn-primary hover:bg-white hover:text-russian-purple">
                  Request a Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
