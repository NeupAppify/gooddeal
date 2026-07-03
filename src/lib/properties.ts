/*
::neup.documentation::gooddeal-property-data
::function getProperties()
::title Good Deal Property Data

::public

Fetches Good Deal property listings from the Neup Estate bridge API.

::param environment GOODDEAL_PROPERTY_API_URL
::datatype string
::required false

Optional override for the default agency-scoped bridge endpoint.

::returns
::datatype Promise<Property[]>

A promise that resolves to normalized property records for site rendering.

::error Error

Thrown when the bridge endpoint returns a non-success HTTP status or invalid payload.

::public end

::private

The default endpoint is scoped to agency `e432db37-4d83-452e-bd89-d269fd9314e4`.
The fetch uses `no-store` so the public site reflects the bridge source directly.

::private end

::end
*/

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

interface BridgeProperty {
  id: string;
  slug: string;
  title: string;
  price: number;
  location: string;
  purpose: string;
  category: string;
  type: string;
  images: string[];
  agency: {
    id: string;
    name: string;
    logoUrl: string;
  };
  listingAgent: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface BridgePropertyResponse {
  success: boolean;
  properties: BridgeProperty[];
  totalCount: number;
}

interface AccountLookup {
  accountId: string;
  displayName: string;
  displayImage: string;
}

interface AccountLookupResponse {
  success: boolean;
  hasDisplayName: boolean;
  account: AccountLookup;
}

const DEFAULT_PROPERTY_API_URL =
  "https://neupgroup.com/estate/bridge/api.v1/properties?agency_id=e432db37-4d83-452e-bd89-d269fd9314e4";

const DEFAULT_ACCOUNT_LOOKUP_API_URL =
  "https://neupgroup.com/estate/bridge/api.v1/accounts/lookup";

const FALLBACK_PROPERTY_IMAGE = "/hero.png";
const FALLBACK_AGENT_IMAGE = "/hero.png";

function isBridgeProperty(value: unknown): value is BridgeProperty {
  if (!value || typeof value !== "object") {
    return false;
  }

  const property = value as Record<string, unknown>;

  return (
    typeof property.id === "string" &&
    typeof property.slug === "string" &&
    typeof property.title === "string" &&
    typeof property.price === "number" &&
    typeof property.location === "string" &&
    typeof property.purpose === "string" &&
    typeof property.category === "string" &&
    typeof property.type === "string" &&
    Array.isArray(property.images) &&
    property.images.every((image) => typeof image === "string") &&
    typeof property.listingAgent === "string" &&
    typeof property.status === "string" &&
    typeof property.createdAt === "string" &&
    typeof property.updatedAt === "string" &&
    !!property.agency &&
    typeof property.agency === "object" &&
    typeof (property.agency as Record<string, unknown>).id === "string" &&
    typeof (property.agency as Record<string, unknown>).name === "string" &&
    typeof (property.agency as Record<string, unknown>).logoUrl === "string"
  );
}

function isBridgePropertyResponse(value: unknown): value is BridgePropertyResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as Record<string, unknown>;

  return (
    response.success === true &&
    Array.isArray(response.properties) &&
    response.properties.every(isBridgeProperty) &&
    typeof response.totalCount === "number"
  );
}

function isAccountLookupResponse(value: unknown): value is AccountLookupResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as Record<string, unknown>;
  const account = response.account as Record<string, unknown> | undefined;

  return (
    response.success === true &&
    !!account &&
    typeof account.accountId === "string" &&
    typeof account.displayName === "string" &&
    typeof account.displayImage === "string"
  );
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

function normalizeProperty(property: BridgeProperty, account?: AccountLookup | null): Property {
  const images = property.images.length > 0 ? property.images : [FALLBACK_PROPERTY_IMAGE];

  return {
    id: property.id,
    slug: property.slug,
    title: property.title,
    price: formatPropertyPrice(property.price),
    rawPrice: property.price,
    location: property.location,
    purpose: property.purpose,
    category: property.category,
    type: property.type,
    image: images[0],
    images,
    status: property.status,
    listingAgent: property.listingAgent,
    agency: property.agency,
    agent: {
      name: account?.displayName || property.listingAgent || property.agency.name,
      image: account?.displayImage || FALLBACK_AGENT_IMAGE,
    },
    createdAt: property.createdAt,
    updatedAt: property.updatedAt,
    verified: property.status === "ACTIVE",
  };
}

/*
::neup.documentation::lookup-account
::function lookupAccount(accountId)
::title Lookup Account

::public

Resolves a Neup account identifier to display information for listing agent UI.

::param external accountId
::datatype string
::required true

The account identifier from a property listing.

::returns
::datatype Promise<AccountLookup | null>

The display account data when the lookup succeeds, otherwise null.

::public end

::private

The lookup endpoint is treated as enrichment. A failed lookup does not fail the
property listing response because the property card can fall back to the raw ID.

::private end

::end
*/
async function lookupAccount(accountId: string): Promise<AccountLookup | null> {
  if (!accountId) {
    return null;
  }

  const url = new URL(DEFAULT_ACCOUNT_LOOKUP_API_URL);
  url.searchParams.set("accountId", accountId);

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload: unknown = await response.json();

    if (!isAccountLookupResponse(payload)) {
      return null;
    }

    return payload.account;
  } catch {
    return null;
  }
}

async function lookupAccounts(accountIds: string[]): Promise<Map<string, AccountLookup>> {
  const uniqueAccountIds = [...new Set(accountIds.filter(Boolean))];
  const entries = await Promise.all(
    uniqueAccountIds.map(async (accountId) => [accountId, await lookupAccount(accountId)] as const),
  );

  return new Map(
    entries.flatMap(([accountId, account]) => (account ? [[accountId, account] as const] : [])),
  );
}

export async function getProperties(): Promise<Property[]> {
  const response = await fetch(process.env.GOODDEAL_PROPERTY_API_URL ?? DEFAULT_PROPERTY_API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Property bridge request failed with HTTP ${response.status}.`);
  }

  const payload: unknown = await response.json();

  if (!isBridgePropertyResponse(payload)) {
    throw new Error("Property bridge response did not match the expected payload.");
  }

  const accountLookup = await lookupAccounts(
    payload.properties.map((property) => property.listingAgent || property.agency.id),
  );

  return payload.properties.map((property) =>
    normalizeProperty(property, accountLookup.get(property.listingAgent || property.agency.id)),
  );
}

export async function getFeaturedProperties(limit = 3): Promise<Property[]> {
  const properties = await getProperties();

  return properties.slice(0, limit);
}

/*
::neup.documentation::filter-properties
::function filterProperties(properties, query)
::title Filter Properties

::public

Filters normalized property records by a user search term.

::param external properties
::datatype Property[]
::required true

The normalized property records to search.

::param external query
::datatype string | undefined
::required false

The query string from `/properties?query=...`.

::returns
::datatype Property[]

The matching records, or the original records when no query is provided.

::public end

::end
*/
export function filterProperties(properties: Property[], query?: string): Property[] {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return properties;
  }

  return properties.filter((property) => {
    const searchableText = [
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
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const properties = await getProperties();

  return properties.find((property) => property.slug === slug) ?? null;
}
