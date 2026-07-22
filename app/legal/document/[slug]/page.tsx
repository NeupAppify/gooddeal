import { getLegalDocument, legalDocuments } from "@/core/legal-documents";
import LegalDocumentViewer from "@/src/components/LegalDocumentViewer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type LegalDocumentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return legalDocuments.map((document) => ({
    slug: document.id,
  }));
}

export async function generateMetadata({ params }: LegalDocumentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getLegalDocument(slug);

  return {
    title: document ? `${document.title}, Good Deal` : "Legal Document, Good Deal",
  };
}

export default async function LegalDocumentPage({ params }: LegalDocumentPageProps) {
  const { slug } = await params;
  const document = getLegalDocument(slug);

  if (!document) {
    notFound();
  }

  return <LegalDocumentViewer document={document} />;
}
