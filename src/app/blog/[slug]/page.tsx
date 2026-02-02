import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

export default function BlogPostPage() {
  // Mock data - in a real app this would fetch based on params.slug
  const post = {
    title: "5 Legal Pitfalls to Avoid When Buying Land",
    category: "Legal Guide",
    date: "Oct 12, 2024",
    content: `
      <p>Buying land is one of the most significant investments you will make, but in Nepal's real estate market, it can also be one of the riskiest. Without proper due diligence, you could end up with a property that is legally disputed, has no road access, or is tied up in banking collateral.</p>
      
      <h3>1. Verify the 'Lalpurja' (Land Ownership Certificate)</h3>
      <p>The first step is always to verify the Lalpurja. Ensure the seller's name matches exactly. Check for any 'rokkha' (freeze) status which indicates the land might be collateral for a loan or under legal dispute.</p>
      
      <h3>2. Check the 'Naxa' (Blue Print) and Field Verification</h3>
      <p>What you see on the ground isn't always what's on the map. Always cross-reference the official trace map with the physical boundaries. Ensure the plot numbers match.</p>
      
      <h3>3. Right of Way (Baato)</h3>
      <p>Ensure the access road is legally registered (kitta kat) and not just a private agreement. Future road expansions could significantly reduce your land area.</p>
      
      <h3>4. Inheritance Issues</h3>
      <p>In Nepal, verify that all legal heirs have consented to the sale to avoid future family disputes (anshbanda issues).</p>
      
      <h3>5. Mohi (Tenant) Rights</h3>
      <p>Check if there are any registered tenants on the land. Mohi rights can be complicated to resolve and may prevent you from full ownership.</p>
    `
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow bg-white">
        <article className="pt-44 pb-20">
          <div className="container mx-auto max-w-[800px] px-6">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-warm-gray hover:text-russian-purple mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>
            
            <header className="mb-10">
              <div className="flex gap-4 text-sm text-warm-gray mb-4">
                <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> {post.category}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight">
                {post.title}
              </h1>
            </header>

            <div 
              className="prose prose-lg max-w-none text-charcoal/80 prose-headings:font-serif prose-headings:text-charcoal prose-a:text-russian-purple"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div className="mt-16 p-8 bg-platinum rounded-xl">
              <h3 className="font-serif text-xl mb-2">Need Professional Verification?</h3>
              <p className="text-warm-gray mb-6">Don&apos;t risk your capital. Let our legal team verify your potential property before you commit.</p>
              <Link href="/services/verification" className="btn-primary">
                Get Verified
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
