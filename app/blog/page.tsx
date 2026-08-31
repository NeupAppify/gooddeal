import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blogs, Good Deal",
};

const articles = [
  {
    slug: "legal-pitfalls-buying-land",
    title: "5 Legal Pitfalls to Avoid When Buying Land",
    category: "Legal Guide",
    date: "Oct 12, 2024",
    excerpt: "From verifying land titles (Lalpurja) to understanding right-of-way issues, here is what every buyer must check."
  },
  {
    slug: "property-tax-regulations-2024",
    title: "Understanding New Property Tax Regulations",
    category: "Market Update",
    date: "Sep 28, 2024",
    excerpt: "A breakdown of the latest government policies on capital gains tax and property registration fees."
  },
  {
    slug: "investing-in-kathmandu",
    title: "Is it the Right Time to Invest in Kathmandu?",
    category: "Investment",
    date: "Sep 15, 2024",
    excerpt: "Analyzing market trends, infrastructure projects, and price corrections in the valley's real estate sector."
  },
  {
    slug: "nrn-property-buying-guide",
    title: "Complete Property Buying Guide for NRNs",
    category: "NRN Services",
    date: "Aug 30, 2024",
    excerpt: "Can Non-Resident Nepalis buy property? We explain the legal framework and limitations."
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow">
        <section className="pt-44 pb-20 bg-platinum/30">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h1 className="text-5xl font-serif text-charcoal mb-6">Blogs and Market Insights</h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Expert analysis, legal guides, and market updates to help you make informed decisions.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <Link key={i} href={`/blog/${article.slug}`} className="group flex flex-col h-full">
                  <div className="aspect-[16/9] bg-platinum rounded-lg mb-6 overflow-hidden border border-black/5 relative">
                     <div className="absolute inset-0 bg-russian-purple/5 group-hover:bg-russian-purple/10 transition-colors" />
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-warm-gray mb-3">
                    <span className="text-russian-purple font-medium bg-russian-purple/5 px-2 py-1 rounded">{article.category}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  
                  <h3 className="text-2xl font-serif leading-tight group-hover:text-russian-purple transition-colors mb-3">
                    {article.title}
                  </h3>
                  
                  <p className="text-warm-gray text-sm leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-charcoal group-hover:text-russian-purple transition-colors">
                    Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
