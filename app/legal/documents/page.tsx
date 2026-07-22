import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { legalDocuments } from "@/core/legal-documents";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export default function DocumentsPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow">
        <section className="pt-44 pb-20 bg-platinum/30">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 text-center">
            <h1 className="text-5xl font-serif text-charcoal mb-6">Document Center</h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Essential resources and templates to help you navigate the property market.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {legalDocuments.map((doc) => (
                <Link key={doc.id} href={`/legal/document/${doc.id}`} className="flex items-start gap-4 p-6 border border-platinum rounded-lg hover:border-russian-purple transition-colors bg-white group">
                  <div className="w-12 h-12 bg-platinum rounded flex items-center justify-center text-russian-purple flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-charcoal group-hover:text-russian-purple transition-colors">{doc.title}</h3>
                    <p className="text-warm-gray text-sm mt-1 mb-3">{doc.description}</p>
                    <div className="flex items-center gap-3 text-xs font-semibold text-charcoal/60">
                      <span className="bg-platinum px-2 py-1 rounded">{doc.documentType}</span>
                      <span className="flex items-center gap-1 text-russian-purple ml-auto group-hover:underline">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
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
