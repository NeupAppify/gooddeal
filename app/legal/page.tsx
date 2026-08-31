import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Scale, FileCheck, ShieldAlert, ArrowRight } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="min-h-screen flex flex-col pt-24">
      <Header />
      
      <main className="flex-grow">
        <section className="py-20 bg-platinum/30">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h1 className="text-5xl font-serif text-charcoal mb-6">Legal & Compliance</h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Transparency isn&apos;t just a buzzword. It&apos;s our operating system.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Privacy Policy",
                  desc: "How we collect, use, and protect your personal data.",
                  link: "/legal/privacy",
                  icon: <ShieldAlert className="w-8 h-8" />
                },
                {
                  title: "Terms of Service",
                  desc: "The rules and agreements governing the use of our platform.",
                  link: "/legal/terms",
                  icon: <Scale className="w-8 h-8" />
                },
                {
                  title: "Document Center",
                  desc: "Access standard forms, checklists, and compliance resources.",
                  link: "/legal/documents",
                  icon: <FileCheck className="w-8 h-8" />
                }
              ].map((item, i) => (
                <Link key={i} href={item.link} className="card-premium p-10 flex flex-col items-start gap-6 group hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-full bg-platinum flex items-center justify-center text-russian-purple group-hover:bg-russian-purple group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif">{item.title}</h3>
                  <p className="text-warm-gray leading-relaxed text-sm">{item.desc}</p>
                  <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-charcoal group-hover:text-russian-purple transition-colors">
                    View Page <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-24 max-w-3xl mx-auto text-center border-t border-platinum pt-16">
              <h3 className="text-2xl font-serif mb-4">Disclaimer</h3>
              <p className="text-warm-gray text-sm leading-relaxed">
                Good Deal Advisory provides real estate consultation and verification services. While we strive for 100% accuracy in our legal checks, final property registration is subject to government approval. We are not a law firm, but we work with certified legal professionals to ensure your safety.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
