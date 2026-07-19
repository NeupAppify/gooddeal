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
import { viewEstateProperty } from "@/logica/estate/properties/view";

export interface PropertyPricing {
  type: string;
  askingAmount: number;
  currency: string;
  basis: string;
  unit: string;
}

export interface PropertyLocation {
  text: string;
  geo: string;
  structured: Record<string, string>;
}

export interface PropertyRoadAccess {
  roadWidth: number;
  roadWidthUnit: string;
  roadType: string;
}

export interface Property {
  id: string;
  customId: string;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  tags: string[];
  price: string;
  rawPrice: number;
  location: string;
  locationDetails: PropertyLocation;
  purpose: string;
  category: string;
  type: string;
  image: string;
  images: string[];
  status: string;
  visibility: string;
  pricing: PropertyPricing[];
  roadAccess: PropertyRoadAccess;
  distance: Record<string, unknown>;
  amenities: string[];
  details: Record<string, unknown>;
  listingAgent: string;
  supportingAgents: {
    name: string;
    image: string;
  }[];
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
type AgentProfile = {
  displayName: string;
  displayImage: string;
};

const GOODDEAL_AGENCY_ID = "e432db37-4d83-452e-bd89-d269fd9314e4";
const ESTATE_ACCOUNT_LOOKUP_URL = "https://neupgroup.com/estate/bridge/api.v1/accounts/lookup";
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

function asNumberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
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

function asLabelList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => typeof entry === "string" && entry.trim() ? [formatLabel(entry)] : []);
  }

  const label = asString(value);
  return label ? [formatLabel(label)] : [];
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

function getPricingEntries(value: unknown): PropertyPricing[] {
  const entries = Array.isArray(value) ? value : [value];

  return entries.flatMap((entry) => {
    const pricing = asRecord(entry);
    const askingAmount = asNumberOrNull(pricing.askingAmount ?? pricing.listed);

    if (askingAmount === null && !asString(pricing.currency) && !asString(pricing.basis)) {
      return [];
    }

    return [{
      type: formatLabel(asLabel(pricing.type, "")),
      askingAmount: askingAmount ?? 0,
      currency: asString(pricing.currency, "NPR"),
      basis: formatLabel(asLabel(pricing.basis, "")),
      unit: formatLabel(asLabel(pricing.unit, "")),
    }];
  });
}

function getPropertyPrice(property: SdkProperty): number {
  const directPrice = asNumberOrNull(property.price);

  if (directPrice !== null) {
    return directPrice;
  }

  const pricing = property.pricing;

  if (Array.isArray(pricing)) {
    for (const entry of pricing) {
      const amount = asNumberOrNull(asRecord(entry).askingAmount);
      if (amount !== null) return amount;
    }
  }

  const pricingRecord = asRecord(pricing);
  return asNumber(pricingRecord.listed ?? pricingRecord.askingAmount);
}

function getLocationDetails(value: unknown): PropertyLocation {
  const location = asRecord(value);

  return {
    text: asString(value, asString(location.text)),
    geo: asString(location.geo),
    structured: Object.fromEntries(
      Object.entries(asRecord(location.structured))
        .flatMap(([key, entry]) => {
          const text = asString(entry);
          return text ? [[key, text]] : [];
        }),
    ),
  };
}

function getRoadAccess(value: unknown): PropertyRoadAccess {
  const roadAccess = asRecord(value);
  const directWidth = asNumberOrNull(value);

  return {
    roadWidth: directWidth ?? asNumber(roadAccess.roadWidth ?? roadAccess.width),
    roadWidthUnit: formatLabel(asLabel(roadAccess.roadWidthUnit ?? roadAccess.widthUnit, "")),
    roadType: formatLabel(asLabel(roadAccess.roadType, "")),
  };
}

function getSupportingAgents(value: unknown): Property["supportingAgents"] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry) => {
    const agent = asRecord(entry);
    const name = asString(agent.displayName ?? agent.name);

    if (!name) return [];

    return [{
      name,
      image: asString(agent.displayImage ?? agent.image, FALLBACK_IMAGE),
    }];
  });
}

async function lookupAgentProfile(
  accountId: string,
  cache: Map<string, Promise<AgentProfile | null>>,
) {
  if (!accountId) {
    return null;
  }

  const cachedProfile = cache.get(accountId);

  if (cachedProfile) {
    return cachedProfile;
  }

  const profilePromise = fetch(`${ESTATE_ACCOUNT_LOOKUP_URL}?accountId=${encodeURIComponent(accountId)}`, {
    cache: "no-store",
  })
    .then(async (response) => {
      if (!response.ok) {
        return null;
      }

      const body = asRecord(await response.json().catch(() => null));
      const account = asRecord(body.account);
      const displayName = asString(account.displayName);
      const displayImage = asString(account.displayImage);

      if (!displayName && !displayImage) {
        return null;
      }

      return {
        displayName,
        displayImage,
      };
    })
    .catch(() => null);

  cache.set(accountId, profilePromise);

  return profilePromise;
}

async function toProperty(
  property: SdkProperty,
  agentLookupCache: Map<string, Promise<AgentProfile | null>>,
): Promise<Property> {
  const agency = asRecord(property.agency);
  const listedBy = asRecord(property.listedBy);
  const images = asStringList(property.images);
  const firstImage = images[0] ?? FALLBACK_IMAGE;
  const price = getPropertyPrice(property);
  const listingAgent = asString(property.listingAgent, asString(listedBy.id));
  const agentProfile = await lookupAgentProfile(listingAgent, agentLookupCache);
  const agentName = asString(agentProfile?.displayName, asString(listedBy.displayName, listingAgent || asString(agency.name, "Good Deal Advisory")));
  const locationDetails = getLocationDetails(property.location);

  return {
    id: asString(property.id),
    customId: asString(property.customId),
    slug: asString(property.slug, asString(property.id)),
    title: asString(property.title, "Untitled Property"),
    description: asString(property.description),
    keywords: asStringList(property.keywords),
    tags: asLabelList(property.tags),
    price: formatPropertyPrice(price),
    rawPrice: price,
    location: locationDetails.text,
    locationDetails,
    purpose: formatLabel(asLabel(property.purpose, "Property")),
    category: formatLabel(asLabel(property.category, "Listing")),
    type: formatLabel(asLabel(property.type, "Real Estate")),
    image: firstImage,
    images: images.length > 0 ? images : [firstImage],
    status: asString(property.status, "ACTIVE"),
    visibility: formatLabel(asLabel(property.visibility, "")),
    pricing: getPricingEntries(property.pricing),
    roadAccess: getRoadAccess(property.roadAccess),
    distance: asRecord(property.distance),
    amenities: asLabelList(property.amenities),
    details: asRecord(property.details),
    listingAgent,
    supportingAgents: getSupportingAgents(property.supportingAgents),
    agency: {
      id: asString(agency.id, GOODDEAL_AGENCY_ID),
      name: asString(agency.name, "Good Deal Advisory"),
      logoUrl: asString(agency.logoUrl, FALLBACK_IMAGE),
    },
    agent: {
      name: agentName,
      image: asString(agentProfile?.displayImage, asString(listedBy.displayImage, FALLBACK_IMAGE)),
    },
    createdAt: asString(property.createdAt, new Date(0).toISOString()),
    updatedAt: asString(property.updatedAt, asString(property.createdAt, new Date(0).toISOString())),
    verified: asString(property.status, "ACTIVE").toUpperCase() === "ACTIVE",
  };
}

export async function getProperties(): Promise<Property[]> {
  const response = await listEstateProperties({
    agencyId: GOODDEAL_AGENCY_ID,
    fields: [
      "id",
      "slug",
      "title",
      "description",
      "pricing",
      "location",
      "purpose",
      "category",
      "type",
      "status",
      "images",
      "roadAccess",
      "distance",
      "amenities",
      "property.details",
      "details",
      "agency",
      "listingAgent",
      "isOwnerListing",
      "createdAt",
      "updatedAt",
    ],
    limit: 15,
    offset: 0,
  });

  const properties = response.ok && Array.isArray(response.body.properties) ? response.body.properties : [];
  const agentLookupCache = new Map<string, Promise<AgentProfile | null>>();

  return Promise.all(properties.map((property) => toProperty(asRecord(property), agentLookupCache)));
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

  const property = properties.find((entry) => entry.slug === slug || entry.id === slug);

  if (!property) {
    return null;
  }

  const response = await viewEstateProperty({
    propertyId: property.id,
    fields: [
      "id",
      "customId",
      "slug",
      "title",
      "description",
      "keywords",
      "tags",
      "purpose",
      "category",
      "type",
      "status",
      "visibility",
      "images",
      "listedBy",
      "supportingAgents",
      "location",
      "pricing",
      "roadAccess",
      "distance",
      "amenities",
      "property.details",
      "details",
      "createdAt",
      "updatedAt",
    ],
  });

  if (!response.ok || !response.body.property) {
    return property;
  }

  const detailProperty = await toProperty(asRecord(response.body.property), new Map());

  return {
    ...property,
    ...detailProperty,
    agency: property.agency,
    roadAccess: detailProperty.roadAccess.roadWidth > 0 ? detailProperty.roadAccess : property.roadAccess,
    details: {
      ...property.details,
      ...detailProperty.details,
    },
    createdAt: detailProperty.createdAt !== new Date(0).toISOString() ? detailProperty.createdAt : property.createdAt,
    updatedAt: detailProperty.updatedAt !== new Date(0).toISOString() ? detailProperty.updatedAt : property.updatedAt,
  };
}
