import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import SpaceAccessCards from "@/components/SpaceAccessCards";
import type { SpaceAccessCard, SpaceAccessCardKind } from "@/components/SpaceAccessCards";
import { getPropertyBySlug } from "@/lib/properties";
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
  const property = await getPropertyBySlug(slug);

  return {
    title: property ? `${property.title}, Good Deal` : "Property, Good Deal",
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

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

        <section className="relative pt-10 pb-12 md:pt-14 md:pb-20">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
              
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-serif text-charcoal mb-2">{property.title}</h1>
                    <div className="flex items-center text-warm-gray">
                      <MapPin className="w-4 h-4 mr-1 text-russian-purple" />
                      {property.location}
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-3xl font-serif text-russian-purple mb-1">{property.price}</div>
                    <div className="inline-flex items-center gap-1 bg-sage/10 text-sage px-2 py-1 rounded text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" /> Verified Property
                    </div>
                  </div>
                </div>

                <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg border border-platinum bg-platinum/20 p-5">
                    <div className="text-xs font-medium uppercase tracking-wider text-warm-gray">Purpose</div>
                    <div className="mt-2 flex items-center gap-2 font-semibold text-charcoal">
                      <Tag className="h-4 w-4 text-russian-purple" />
                      {property.purpose}
                    </div>
                  </div>
                  <div className="rounded-lg border border-platinum bg-platinum/20 p-5">
                    <div className="text-xs font-medium uppercase tracking-wider text-warm-gray">Category</div>
                    <div className="mt-2 flex items-center gap-2 font-semibold text-charcoal">
                      <Home className="h-4 w-4 text-russian-purple" />
                      {property.category}
                    </div>
                  </div>
                  <div className="rounded-lg border border-platinum bg-platinum/20 p-5">
                    <div className="text-xs font-medium uppercase tracking-wider text-warm-gray">Type</div>
                    <div className="mt-2 flex items-center gap-2 font-semibold text-charcoal">
                      <Building2 className="h-4 w-4 text-russian-purple" />
                      {property.type}
                    </div>
                  </div>
                </div>

                <section className="property-detail-section property-detail-section--odd mb-12">
                  <div className="property-detail-section__content">
                    <h3 className="text-2xl font-serif mb-6">Description</h3>
                    <p className="text-warm-gray leading-relaxed text-lg">
                      {description}
                    </p>
                  </div>
                </section>

                <section className="property-detail-section property-detail-section--even mb-12">
                  <div className="property-detail-section__content">
                    <h3 className="text-2xl font-serif mb-5">Space & Access</h3>
                    <SpaceAccessCards cards={spaceAccessCards} />
                  </div>
                </section>

                <section className="property-detail-section property-detail-section--odd mb-12">
                  <div className="property-detail-section__content">
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
              <div className="relative lg:col-span-1">
                <div className="sticky top-28 rounded-2xl border border-white/80 bg-white/95 p-6 shadow-[0_24px_70px_rgba(50,23,77,0.16)] backdrop-blur-xl md:p-8">
                  <h3 className="text-xl font-serif mb-6">Interested in this property?</h3>
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
                  <p className="text-sm text-warm-gray mb-8">
                    Schedule a viewing with our advisory team. We will accompany you and provide a full briefing.
                  </p>
                  
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
                    
                    <button className="w-full btn-primary mt-2">
                      Request Viewing
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
