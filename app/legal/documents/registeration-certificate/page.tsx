import { getLegalDocument } from "@/services/legal-documents";
import LegalDocumentViewer from "@/components/LegalDocumentViewer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Registration Certificate, Good Deal",
};

export default function RegisterationCertificatePage() {
  const document = getLegalDocument("registeration-certificate");

  if (!document) {
    notFound();
  }

  return <LegalDocumentViewer document={document} />;
}
