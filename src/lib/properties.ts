/*
::neup.documentation::gooddeal-property-data
::function getProperties()
::title Good Deal Property Data

::public

Fetches and formats Good Deal property listings from the estate SDK.

::public end

::end
*/

import { listEstateProperties } from "@/logica/estate/properties/list";

export interface Property {
  id: string;
  slug: string;
  title: string;
  price: string;
  rawPrice: number;
  location: string;
  purpose: string;
  category: string;
  type: string;
  image: string;
  images: string[];
  status: string;
  listingAgent: string;
  agency: {
    id: string;
    name: string;
    logoUrl: string;
  };
  agent: {
    name: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
  verified: boolean;
}

type SdkProperty = Record<string, unknown>;

const GOODDEAL_AGENCY_ID = "e432db37-4d83-452e-bd89-d269fd9314e4";
const FALLBACK_IMAGE = "/hero.png";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function asNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry) => {
    if (typeof entry === "string" && entry.trim()) return [entry];

    const url = asString(asRecord(entry).url);
    return url ? [url] : [];
  });
}

function asLabel(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && typeof value[0] === "string") return value[0];

  return fallback;
}

function formatLabel(value: string): string {
  return value
    .toLowerCase()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatPropertyPrice(price: number): string {
  if (price >= 10000000) {
    return `Rs. ${(price / 10000000).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })} Cr`;
  }

  if (price >= 100000) {
    return `Rs. ${(price / 100000).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })} Lakh`;
  }

  return `Rs. ${price.toLocaleString("en-US")}`;
}

function toProperty(property: SdkProperty): Property {
  const agency = asRecord(property.agency);
  const listedBy = asRecord(property.listedBy);
  const images = asStringList(property.images);
  const firstImage = images[0] ?? FALLBACK_IMAGE;
  const price = asNumber(property.price);
  const listingAgent = asString(property.listingAgent, asString(listedBy.id));
  const agentName = asString(listedBy.displayName, listingAgent || asString(agency.name, "Good Deal Advisory"));

  return {
    id: asString(property.id),
    slug: asString(property.slug, asString(property.id)),
    title: asString(property.title, "Untitled Property"),
    price: formatPropertyPrice(price),
    rawPrice: price,
    location: asString(property.location, asString(asRecord(property.location).text)),
    purpose: formatLabel(asLabel(property.purpose, "Property")),
    category: formatLabel(asLabel(property.category, "Listing")),
    type: formatLabel(asLabel(property.type, "Real Estate")),
    image: firstImage,
    images: images.length > 0 ? images : [firstImage],
    status: asString(property.status, "ACTIVE"),
    listingAgent,
    agency: {
      id: asString(agency.id, GOODDEAL_AGENCY_ID),
      name: asString(agency.name, "Good Deal Advisory"),
      logoUrl: asString(agency.logoUrl, FALLBACK_IMAGE),
    },
    agent: {
      name: agentName,
      image: asString(listedBy.displayImage, FALLBACK_IMAGE),
    },
    createdAt: asString(property.createdAt, new Date(0).toISOString()),
    updatedAt: asString(property.updatedAt, asString(property.createdAt, new Date(0).toISOString())),
    verified: asString(property.status, "ACTIVE").toUpperCase() === "ACTIVE",
  };
}

  console.log("hello 2");

export async function getProperties(): Promise<Property[]> {
  console.log("hello 2");
  const response = await listEstateProperties({
    agencyId: GOODDEAL_AGENCY_ID,
  });
  
  console.log(response);

  const properties = response.ok && Array.isArray(response.body.properties) ? response.body.properties : [];

  return properties.map((property) => toProperty(asRecord(property)));
}

export async function getFeaturedProperties(limit = 3): Promise<Property[]> {
  const properties = await getProperties();

  return properties.slice(0, limit);
}

export function filterProperties(properties: Property[], query?: string): Property[] {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return properties;
  }

  return properties.filter((property) =>
    [
      property.title,
      property.slug,
      property.price,
      property.rawPrice.toString(),
      property.location,
      property.purpose,
      property.category,
      property.type,
      property.status,
      property.listingAgent,
      property.agent.name,
      property.agency.name,
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  );
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const properties = await getProperties();

  return properties.find((property) => property.slug === slug || property.id === slug) ?? null;
}
