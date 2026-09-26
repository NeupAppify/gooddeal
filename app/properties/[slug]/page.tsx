import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import SpaceAccessCards from "@/components/SpaceAccessCards";
import type { SpaceAccessCard, SpaceAccessCardKind } from "@/components/SpaceAccessCards";
import { listEstateProperties } from "@neup/logica/estate/property/list";
import { viewEstateProperty } from "@neup/logica/estate/property/view";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CheckCircle,
  Home,
  MapPin,
  Phone,
  Tag,
} from "lucide-react";

interface PropertyDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const GOODDEAL_AGENCY_ID = "e432db37-4d83-452e-bd89-d269fd9314e4";

function humanizeKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDetailValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "";

  if (typeof value === "boolean") {
    return value ? "Yes" : "";
  }

  if (typeof value === "number") {
    return value === 0 ? "" : value.toLocaleString("en-US");
  }

  if (typeof value === "string") {
    return value
      .toLowerCase()
      .split(/[\s_-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  if (Array.isArray(value)) {
    return value.map(formatDetailValue).filter(Boolean).join(", ");
  }

  return "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function getRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function getNestedRecord(record: Record<string, unknown>, key: string): Record<string, unknown> {
  return getRecord(record[key]);
}

function getFirstDetailRecord(details: Record<string, unknown>, keys: string[]): Record<string, unknown> {
  for (const key of keys) {
    const value = getNestedRecord(details, key);
    if (Object.keys(value).length > 0) return value;
  }

  return {};
}

function getDetailNumber(records: Record<string, unknown>[], key: string): number {
  for (const record of records) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  }

  return 0;
}

function getDetailText(records: Record<string, unknown>[], key: string): string {
  for (const record of records) {
    const value = formatDetailValue(record[key]);
    if (value) return value;
  }

  return "";
}

function numberCard(kind: SpaceAccessCardKind, label: string, value: number): SpaceAccessCard | null {
  if (value <= 0) return null;

  return {
    kind,
    label,
    value: value.toLocaleString("en-US"),
  };
}

function textCard(kind: SpaceAccessCardKind, label: string, value: string): SpaceAccessCard | null {
  if (!value) return null;

  return {
    kind,
    label,
    value,
  };
}

function measurementCard(
  kind: "roadWidth" | "area",
  label: string,
  value: number,
  unit: string,
): SpaceAccessCard | null {
  if (value <= 0) return null;

  return {
    kind,
    label,
    value: value.toLocaleString("en-US"),
    rawValue: value,
    unit,
  };
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await listEstateProperties({
    agencyId: GOODDEAL_AGENCY_ID,
    fields: ["id", "slug", "title"],
    limit: 15,
    offset: 0,
  });
  const property = response.ok && Array.isArray(response.body.properties)
    ? response.body.properties
        .map(getRecord)
        .find((item) => item.slug === slug || item.id === slug)
    : undefined;

  return {
    title: property && typeof property.title === "string" ? `${property.title}, Good Deal` : "Property, Good Deal",
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const listingResponse = await listEstateProperties({
    agencyId: GOODDEAL_AGENCY_ID,
    fields: ["id", "slug", "title", "description", "price", "pricing", "location", "purpose", "category", "type", "status", "images", "listingAgent", "agency"],
    limit: 15,
    offset: 0,
  });
  const listing = listingResponse.ok && Array.isArray(listingResponse.body.properties)
    ? listingResponse.body.properties
        .map(getRecord)
        .find((item) => item.slug === slug || item.id === slug)
    : undefined;

  if (!listing) notFound();

  const detailsResponse = await viewEstateProperty({
    propertyId: typeof listing.id === "string" ? listing.id : slug,
    fields: [
      "id", "customId", "slug", "title", "description", "keywords", "tags", "purpose", "category", "type",
      "status", "visibility", "images", "listedBy", "supportingAgents", "location", "pricing", "roadAccess",
      "distance", "amenities", "property.details", "details", "createdAt", "updatedAt",
    ],
  });
  const propertyData = {
    ...listing,
    ...(detailsResponse.ok && detailsResponse.body.success ? getRecord(detailsResponse.body.property) : {}),
  };
  const rawLocation = propertyData.location;
  const locationRecord = getRecord(rawLocation);
  const rawImages = Array.isArray(propertyData.images) ? propertyData.images : [];
  const images = rawImages.flatMap((item) => {
    if (typeof item === "string" && item) return [item];
    const imageUrl = getRecord(item).url;
    return typeof imageUrl === "string" && imageUrl ? [imageUrl] : [];
  });
  const pricing = Array.isArray(propertyData.pricing)
    ? getRecord(propertyData.pricing[0])
    : getRecord(propertyData.pricing);
  const rawPrice = typeof propertyData.price === "number"
    ? propertyData.price
    : typeof pricing.askingAmount === "number"
      ? pricing.askingAmount
      : typeof pricing.listed === "number"
        ? pricing.listed
        : 0;
  const price = rawPrice >= 10_000_000
    ? `Rs. ${(rawPrice / 10_000_000).toLocaleString("en-US", { maximumFractionDigits: 2 })} Cr`
    : rawPrice >= 100_000
      ? `Rs. ${(rawPrice / 100_000).toLocaleString("en-US", { maximumFractionDigits: 2 })} Lakh`
      : rawPrice > 0
        ? `Rs. ${rawPrice.toLocaleString("en-US")}`
        : "Price on request";
  const listedByEntries = Array.isArray(propertyData.listedBy)
    ? propertyData.listedBy
    : [propertyData.listedBy];
  const listedBy = listedByEntries.map(getRecord).find((item) => Object.keys(item).length > 0) ?? {};
  const agency = getRecord(propertyData.agency);
  const property = {
    title: typeof propertyData.title === "string" ? propertyData.title : "Property listing",
    description: typeof propertyData.description === "string" ? propertyData.description : "",
    type: formatDetailValue(propertyData.type) || "Real Estate",
    category: formatDetailValue(propertyData.category) || "Listing",
    purpose: formatDetailValue(propertyData.purpose) || "Property",
    location: typeof rawLocation === "string"
      ? rawLocation
      : typeof locationRecord.text === "string"
        ? locationRecord.text
        : "Location available on request",
    locationDetails: {
      geo: typeof locationRecord.geo === "string" ? locationRecord.geo : "",
      structured: Object.fromEntries(Object.entries(getRecord(locationRecord.structured)).filter((entry): entry is [string, string] => typeof entry[1] === "string")),
    },
    price,
    images: images.length > 0 ? images : ["/hero.png"],
    status: typeof propertyData.status === "string" ? propertyData.status : "ACTIVE",
    roadAccess: {
      roadWidth: typeof getRecord(propertyData.roadAccess).roadWidth === "number" ? getRecord(propertyData.roadAccess).roadWidth as number : 0,
      roadWidthUnit: typeof getRecord(propertyData.roadAccess).roadWidthUnit === "string" ? getRecord(propertyData.roadAccess).roadWidthUnit as string : "ft",
      roadType: typeof getRecord(propertyData.roadAccess).roadType === "string" ? getRecord(propertyData.roadAccess).roadType as string : "",
    },
    details: getRecord(propertyData.details),
    agent: {
      name: typeof listedBy.displayName === "string"
        ? listedBy.displayName
        : typeof agency.name === "string"
          ? agency.name
          : "Good Deal Advisory",
      image: typeof listedBy.displayImage === "string" ? listedBy.displayImage : "/hero.png",
    },
  };

  const description = property.description || `${property.title} is a ${property.type.toLowerCase()} ${property.category.toLowerCase()} listed for ${property.purpose.toLowerCase()} in ${property.location}. Contact Good Deal Advisory for viewing, verification, and transaction guidance.`;
  const activeDetails = getFirstDetailRecord(property.details, ["house", "apartment", "flat", "land", "space"]);
  const specifics = getNestedRecord(property.details, "specifics");
  const rooms = getNestedRecord(specifics, "rooms");
  const space = getNestedRecord(specifics, "space");
  const landDetails = getNestedRecord(property.details, "landDetails");
  const detailSources = [activeDetails, rooms, space, landDetails];
  const roadWidthUnit = property.roadAccess.roadWidthUnit || "ft";
  const areaUnit = getDetailText(detailSources, "areaUnit") || "sqft";
  const spaceAccessCards = [
    numberCard("bedrooms", "Bedrooms", getDetailNumber(detailSources, "bedrooms")),
    numberCard("bathrooms", "Bathrooms", getDetailNumber(detailSources, "bathrooms")),
    numberCard("livingRooms", "Living Rooms", getDetailNumber(detailSources, "livingRooms")),
    numberCard("kitchens", "Kitchens", getDetailNumber(detailSources, "kitchens")),
    numberCard("diningRooms", "Dining Rooms", getDetailNumber(detailSources, "diningRooms")),
    numberCard("floors", "Floors", getDetailNumber(detailSources, "floors")),
    numberCard("carParking", "Car Parking", getDetailNumber(detailSources, "carParkingSpots")),
    numberCard("bikeParking", "Bike Parking", getDetailNumber(detailSources, "bikeParkingSpots")),
    measurementCard("roadWidth", "Road Width", property.roadAccess.roadWidth, roadWidthUnit),
    textCard("roadType", "Road Type", property.roadAccess.roadType),
    measurementCard("area", "Area", getDetailNumber(detailSources, "area"), areaUnit),
    textCard("facing", "Facing", getDetailText(detailSources, "facing")),
  ].filter((card): card is SpaceAccessCard => Boolean(card));
  const locationParts = Object.entries(property.locationDetails.structured)
    .map(([key, value]) => ({ label: humanizeKey(key), value }))
    .filter((part) => part.value);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-white">
        <div className="absolute left-0 right-0 top-28 z-20">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <Link href="/properties" className="inline-flex items-center gap-2 rounded-md bg-black/30 px-4 py-2 text-sm text-white backdrop-blur-md transition-colors hover:bg-black/50">
              <ArrowLeft className="w-4 h-4" /> Back to Listings
            </Link>
          </div>
        </div>

        <PropertyGallery images={property.images} title={property.title} />

        <div className="border-t border-platinum" />

        <section className="relative bg-[#fbfafc] pt-8 pb-16 md:pt-12 md:pb-24">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,390px)] lg:gap-16">
              
              {/* Main Content */}
              <div className="min-w-0">
                <div className="mb-8 flex flex-col justify-between gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-end">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-russian-purple">
                      <span className="rounded-full bg-russian-purple/10 px-3 py-1">{property.purpose}</span>
                      <span className="text-slate-400">{property.type}</span>
                    </div>
                    <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-charcoal md:text-5xl">{property.title}</h1>
                    <div className="mt-3 flex items-center gap-2 text-sm text-warm-gray">
                      <MapPin className="h-4 w-4 text-russian-purple" />
                      {property.location}
                    </div>
                  </div>
                  <div className="shrink-0 md:text-right">
                    <div className="text-3xl font-semibold tracking-tight text-russian-purple">{property.price}</div>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-sage/10 px-3 py-1.5 text-xs font-semibold text-sage">
                      <CheckCircle className="h-3.5 w-3.5" /> Verified property
                    </div>
                  </div>
                </div>

                <div className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-xs font-medium uppercase tracking-wider text-warm-gray">Purpose</div>
                    <div className="mt-2 flex items-center gap-2 font-semibold text-charcoal">
                      <Tag className="h-4 w-4 text-russian-purple" />
                      {property.purpose}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-xs font-medium uppercase tracking-wider text-warm-gray">Category</div>
                    <div className="mt-2 flex items-center gap-2 font-semibold text-charcoal">
                      <Home className="h-4 w-4 text-russian-purple" />
                      {property.category}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-xs font-medium uppercase tracking-wider text-warm-gray">Type</div>
                    <div className="mt-2 flex items-center gap-2 font-semibold text-charcoal">
                      <Building2 className="h-4 w-4 text-russian-purple" />
                      {property.type}
                    </div>
                  </div>
                </div>

                <section className="mb-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <div>
                    <div className="mb-5 flex items-center gap-3"><span className="h-8 w-1 rounded-full bg-russian-purple" /><h3 className="text-2xl font-semibold">About this property</h3></div>
                    <p className="max-w-3xl leading-8 text-warm-gray">
                      {description}
                    </p>
                  </div>
                </section>

                <section className="mb-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <div>
                    <div className="mb-5 flex items-center gap-3"><span className="h-8 w-1 rounded-full bg-russian-purple" /><h3 className="text-2xl font-semibold">Space & access</h3></div>
                    <SpaceAccessCards cards={spaceAccessCards} />
                  </div>
                </section>

                <section className="mb-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <div>
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-serif">Location</h3>
                      {property.locationDetails.geo && (
                        <span className="text-sm text-warm-gray">{property.locationDetails.geo}</span>
                      )}
                    </div>
                    <div className="rounded-lg border border-platinum bg-white p-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-1 h-5 w-5 shrink-0 text-russian-purple" />
                        <div>
                          <div className="font-semibold text-charcoal">{property.location}</div>
                          {locationParts.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-2">
                              {locationParts.map((part) => (
                                <span key={part.label} className="rounded-md border border-platinum bg-white px-3 py-2 text-sm text-charcoal">
                                  <span className="text-warm-gray">{part.label}: </span>{part.value}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

              </div>

              {/* Sidebar */}
              <div className="relative">
                <div className="sticky top-28 overflow-hidden rounded-3xl border border-russian-purple/10 bg-white shadow-[0_24px_70px_rgba(50,23,77,0.14)]">
                  <div className="bg-russian-purple px-6 py-5 text-white md:px-7">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Good Deal Advisory</div>
                    <h3 className="text-xl font-semibold text-white">Make this your next move</h3>
                    <p className="mt-1 text-sm text-white/70">Get verified details and arrange a private viewing.</p>
                  </div>
                  <div className="p-6 md:p-7">
                  <div className="mb-6 flex items-center gap-4 rounded-lg bg-platinum/30 p-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full bg-platinum">
                      <Image
                        src={property.agent.image}
                        alt={property.agent.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-warm-gray">Listed by</div>
                      <div className="font-medium text-charcoal">{property.agent.name}</div>
                    </div>
                  </div>
                  <div className="mb-7 rounded-2xl bg-[#fbfafc] p-4 text-sm leading-6 text-warm-gray">Our advisory team will accompany you and provide a full briefing before you take the next step.</div>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Full Name</label>
                      <input type="text" className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 text-sm focus:outline-none focus:border-russian-purple transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Phone Number</label>
                      <input type="tel" className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 text-sm focus:outline-none focus:border-russian-purple transition-colors" placeholder="+977 984 0518336" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Message</label>
                      <textarea className="w-full bg-platinum/30 border border-platinum rounded px-4 py-3 text-sm focus:outline-none focus:border-russian-purple transition-colors h-24 resize-none" placeholder="I would like to view this property..." />
                    </div>
                    
                    <button className="mt-2 w-full rounded-xl bg-russian-purple px-6 py-3.5 font-semibold text-white shadow-lg shadow-russian-purple/20 transition hover:bg-[#251138]">
                      Request a viewing
                    </button>
                  </form>

                  <div className="mt-8 pt-8 border-t border-platinum flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-platinum flex items-center justify-center text-russian-purple">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-warm-gray">Call us directly</div>
                        <a href="tel:+9779840518336" className="font-medium text-charcoal hover:text-russian-purple transition-colors">+977 984 0518336</a>
                      </div>
                    </div>
                  </div>
                </div>
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
