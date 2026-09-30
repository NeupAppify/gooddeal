import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getEnvVariable } from "@neup/core/helpers/env";
import { logica } from "@neup/logica";

export const metadata: Metadata = {
  title: "Blogs, Good Deal",
};

export default async function BlogPage() {
  const projectId = getEnvVariable("NEUP_SITES_PROJECT_ID", true);
  if (!projectId) throw new Error("NEUP_SITES_PROJECT_ID is required to load articles.");
  const response = await logica.articles(projectId).get();
  const articles = response.ok && response.body.success && Array.isArray(response.body.data)
    ? response.body.data
    : [];

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow">
        <section className="pt-44 pb-20">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h1 className="text-5xl font-serif text-charcoal mb-6">Blogs and Market Insights</h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Expert analysis, legal guides, and market updates to help you make informed decisions.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link key={article.slug} href={`/blogs/${article.slug}`} className="group flex flex-col h-full">
                  <div className="aspect-[16/9] bg-platinum rounded-lg mb-6 overflow-hidden border border-black/5 relative">
                     <div className="absolute inset-0 bg-russian-purple/5 group-hover:bg-russian-purple/10 transition-colors" />
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-warm-gray mb-3">
                    <span className="text-russian-purple font-medium bg-russian-purple/5 px-2 py-1 rounded">{article.tags[0] ?? "Insight"}</span>
                    <span>•</span>
                    <span>{article.writtenAt ? new Date(article.writtenAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}</span>
                  </div>
                  
                  <h3 className="text-2xl font-serif leading-tight group-hover:text-russian-purple transition-colors mb-3">
                    {article.title}
                  </h3>
                  
                  <p className="text-warm-gray text-sm leading-relaxed mb-6 line-clamp-3">
                    {article.metaDescription ?? "Read the latest insights from Good Deal."}
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
