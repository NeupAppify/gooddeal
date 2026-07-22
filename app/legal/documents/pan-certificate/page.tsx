import { getLegalDocument } from "@/services/legal-documents";
import LegalDocumentViewer from "@/src/components/LegalDocumentViewer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "PAN Certificate, Good Deal",
};

export default function PanCertificatePage() {
  const document = getLegalDocument("pan-certificate");

  if (!document) {
    notFound();
  }

  return <LegalDocumentViewer document={document} />;
}
