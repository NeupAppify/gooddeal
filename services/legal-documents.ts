export type LegalDocumentId = "pan-certificate" | "registeration-certificate";

export type LegalDocument = {
  id: LegalDocumentId;
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  issuedBy: string;
  documentType: string;
  staticPath: string;
};

export const legalDocuments: LegalDocument[] = [
  {
    id: "pan-certificate",
    title: "PAN Certificate",
    description: "Permanent Account Number registration certificate for Good Deal Advisory.",
    image: {
      src: "/legal/pan-certificate.jpg",
      width: 878,
      height: 1280,
      alt: "Good Deal Advisory PAN certificate",
    },
    issuedBy: "Inland Revenue Department",
    documentType: "Tax Registration",
    staticPath: "/legal/documents/pan-certificate",
  },
  {
    id: "registeration-certificate",
    title: "Registration Certificate",
    description: "Company registration certificate for Good Deal Advisory.",
    image: {
      src: "/legal/company-registration.jpg",
      width: 2479,
      height: 3509,
      alt: "Good Deal Advisory company registration certificate",
    },
    issuedBy: "Office of the Company Registrar",
    documentType: "Company Registration",
    staticPath: "/legal/documents/registeration-certificate",
  },
];

export function getLegalDocument(id: string): LegalDocument | undefined {
  return legalDocuments.find((document) => document.id === id);
}
