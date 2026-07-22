import type { LegalDocument } from "@/core/legal-documents";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { ArrowLeft, BadgeCheck, Building2, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type LegalDocumentViewerProps = {
  document: LegalDocument;
};

export default function LegalDocumentViewer({ document }: LegalDocumentViewerProps) {
  const imageMaxWidth = Math.min(document.image.width, 920);
  const imageAspectRatio = `${document.image.width} / ${document.image.height}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white">
        <section className="pt-32 pb-12 md:pt-44 md:pb-16 bg-platinum/30">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <Link
              href="/legal/documents"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-russian-purple transition-colors hover:text-charcoal"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to documents
            </Link>

            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sage px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                <BadgeCheck className="h-3.5 w-3.5" />
                Legal Document
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-5">
                {document.title}
              </h1>
              <p className="max-w-2xl text-base md:text-lg text-warm-gray leading-relaxed">
                {document.description}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto max-w-[1240px] px-6 md:px-12">
            <div className="rounded-lg border border-platinum bg-platinum/30 p-3 shadow-sm sm:p-5 md:p-8">
              <div
                className="mx-auto overflow-hidden rounded-[6px] border border-black/10 bg-white shadow-md"
                style={{
                  aspectRatio: imageAspectRatio,
                  maxWidth: `${imageMaxWidth}px`,
                }}
              >
                <Image
                  src={document.image.src}
                  alt={document.image.alt}
                  width={document.image.width}
                  height={document.image.height}
                  className="block h-auto w-full"
                  sizes={`(max-width: ${imageMaxWidth}px) 100vw, ${imageMaxWidth}px`}
                  priority
                />
              </div>
            </div>

            <div
              className="mx-auto mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2"
              style={{
                maxWidth: `${imageMaxWidth}px`,
              }}
            >
              <div className="rounded-lg border border-platinum bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[6px] bg-russian-purple/10 text-russian-purple">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-warm-gray">
                  Issued By
                </div>
                <div className="mt-2 text-sm font-semibold text-charcoal">
                  {document.issuedBy}
                </div>
              </div>

              <div className="rounded-lg border border-platinum bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[6px] bg-russian-purple/10 text-russian-purple">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-warm-gray">
                  Type
                </div>
                <div className="mt-2 text-sm font-semibold text-charcoal">
                  {document.documentType}
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
