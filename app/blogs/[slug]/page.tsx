import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getEnvVariable } from "@neup/core/helpers/env";
import { logica } from "@neup/logica";
import { notFound } from "next/navigation";

interface BlogPostPageProps { params: Promise<{ slug: string }>; }

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const projectId = getEnvVariable("NEUP_SITES_PROJECT_ID", true);
  if (!projectId) throw new Error("NEUP_SITES_PROJECT_ID is required to load an article.");
  const response = await logica.articles(projectId).article(slug).get();
  if (!response.ok || !response.body.success || !response.body.data) notFound();
  const post = response.body.data as typeof response.body.data & { content?: string; body?: string; html?: string };
  const content = post.content ?? post.body ?? post.html ?? post.metaDescription ?? "";

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow bg-white">
        <article className="pt-44 pb-20">
          <div className="container mx-auto max-w-[800px] px-6">
            <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-warm-gray hover:text-russian-purple mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>
            
            <header className="mb-10">
              <div className="flex gap-4 text-sm text-warm-gray mb-4">
                <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> {post.tags[0] ?? "Insight"}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.writtenAt ? new Date(post.writtenAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight">
                {post.title}
              </h1>
            </header>

            <div 
              className="prose prose-lg max-w-none min-w-0 whitespace-pre-wrap break-words text-charcoal/80 [overflow-wrap:anywhere] prose-headings:font-serif prose-headings:text-charcoal prose-a:text-russian-purple"
              dangerouslySetInnerHTML={{ __html: content }}
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
