"use client";

/*
::neup.documentation::space-access-cards
::function SpaceAccessCards(props)
::title Space and Access Cards

::public

Renders compact property space and access cards with click-to-cycle unit display
for road width and area measurements.

::param external props.cards
::datatype SpaceAccessCard[]
::required true

The room, parking, road, area, and facing values to show in the card grid.

::returns
::datatype React.ReactElement | null

An interactive grid where measurement cards cycle through metric, imperial,
ropani-aana-paisa-dam, and kattha-dhur display modes.

::public end

::end
*/

import {
  Bath,
  BedDouble,
  Bike,
  Car,
  Compass,
  Home,
  Layers,
  MapPinned,
  Ruler,
  Sofa,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

export type SpaceAccessCardKind =
  | "bedrooms"
  | "bathrooms"
  | "livingRooms"
  | "kitchens"
  | "diningRooms"
  | "floors"
  | "carParking"
  | "bikeParking"
  | "roadWidth"
  | "roadType"
  | "area"
  | "facing";

export interface SpaceAccessCard {
  kind: SpaceAccessCardKind;
  label: string;
  value: string;
  rawValue?: number;
  unit?: string;
}

type UnitMode = "metric" | "imperial" | "ropani" | "kattha";

const AREA_UNIT_MODES: UnitMode[] = ["metric", "imperial", "ropani", "kattha"];
const LENGTH_UNIT_MODES: UnitMode[] = ["metric", "imperial"];
const DIRECTION_TRANSLATIONS: Record<string, string> = {
  east: "purba",
  west: "paschim",
  north: "uttar",
  south: "dakshin",
};

const icons: Record<SpaceAccessCardKind, LucideIcon> = {
  bedrooms: BedDouble,
  bathrooms: Bath,
  livingRooms: Sofa,
  kitchens: Utensils,
  diningRooms: Home,
  floors: Layers,
  carParking: Car,
  bikeParking: Bike,
  roadWidth: Ruler,
  roadType: MapPinned,
  area: Ruler,
  facing: Compass,
};

function formatNumber(value: number, maximumFractionDigits: number): string {
  return value.toLocaleString("en-US", {
    maximumFractionDigits,
  });
}

function titleCase(value: string): string {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function lengthToMeters(value: number, unit = "m"): number {
  const normalizedUnit = unit.toLowerCase();

  if (normalizedUnit === "ft" || normalizedUnit === "feet" || normalizedUnit === "foot") {
    return value * 0.3048;
  }

  return value;
}

function lengthToFeet(value: number, unit = "m"): number {
  const normalizedUnit = unit.toLowerCase();

  if (normalizedUnit === "m" || normalizedUnit === "meter" || normalizedUnit === "meters") {
    return value / 0.3048;
  }

  return value;
}

function areaToSquareMeters(value: number, unit = "m2"): number {
  const normalizedUnit = unit.toLowerCase();

  if (normalizedUnit === "sqft" || normalizedUnit === "sq ft" || normalizedUnit === "square feet" || normalizedUnit === "square foot") {
    return value * 0.09290304;
  }

  return value;
}

function areaToSquareFeet(value: number, unit = "m2"): number {
  const normalizedUnit = unit.toLowerCase();

  if (normalizedUnit === "m2" || normalizedUnit === "m²" || normalizedUnit === "sqm" || normalizedUnit === "sq m" || normalizedUnit === "square meter" || normalizedUnit === "square meters") {
    return value / 0.09290304;
  }

  return value;
}

function formatRopaniAanaPaisaDam(squareMeters: number): string {
  const damPerSquareMeter = 1 / 1.98885;
  let remainingDam = Math.round(squareMeters * damPerSquareMeter);
  const ropani = Math.floor(remainingDam / 256);
  remainingDam -= ropani * 256;
  const aana = Math.floor(remainingDam / 16);
  remainingDam -= aana * 16;
  const paisa = Math.floor(remainingDam / 4);
  const dam = remainingDam - paisa * 4;

  return [
    { value: ropani, unit: "Ropani" },
    { value: aana, unit: "Aana" },
    { value: paisa, unit: "Paisa" },
    { value: dam, unit: "Daam" },
  ]
    .filter((part) => part.value > 0)
    .map((part) => `${part.value} ${part.unit}`)
    .join(" ") || "0 Daam";
}

function formatKatthaDhur(squareMeters: number): string {
  const dhurPerSquareMeter = 1 / 16.9315;
  let remainingDhur = Math.round(squareMeters * dhurPerSquareMeter);
  const bigha = Math.floor(remainingDhur / 400);
  remainingDhur -= bigha * 400;
  const kattha = Math.floor(remainingDhur / 20);
  const dhur = remainingDhur - kattha * 20;

  return [
    { value: bigha, unit: "Bigha" },
    { value: kattha, unit: "Kattha" },
    { value: dhur, unit: "Dhur" },
  ]
    .filter((part) => part.value > 0)
    .map((part) => `${part.value} ${part.unit}`)
    .join(" ") || "0 Dhur";
}

function getMeasurementValue(card: SpaceAccessCard, mode: UnitMode): string {
  if (!card.rawValue || card.rawValue <= 0) return card.value;

  if (card.kind === "roadWidth") {
    if (mode === "metric") {
      return `${formatNumber(lengthToMeters(card.rawValue, card.unit), 2)} m`;
    }

    return `${formatNumber(lengthToFeet(card.rawValue, card.unit), 1)} ft`;
  }

  if (card.kind === "area") {
    const squareMeters = areaToSquareMeters(card.rawValue, card.unit);

    if (mode === "metric") {
      return `${formatNumber(squareMeters, 1)} m²`;
    }

    if (mode === "imperial") {
      return `${formatNumber(areaToSquareFeet(card.rawValue, card.unit), 1)} sqft`;
    }

    if (mode === "ropani") {
      return formatRopaniAanaPaisaDam(squareMeters);
    }

    return formatKatthaDhur(squareMeters);
  }

  return card.value;
}

function getUnitModes(card: SpaceAccessCard): UnitMode[] {
  return card.kind === "area" ? AREA_UNIT_MODES : LENGTH_UNIT_MODES;
}

function getNextUnitMode(card: SpaceAccessCard, mode: UnitMode): UnitMode {
  const unitModes = getUnitModes(card);
  const currentIndex = unitModes.indexOf(mode);
  return unitModes[(currentIndex + 1) % unitModes.length] ?? "metric";
}

function translateDirection(value: string): string {
  const translatedParts = value
    .toLowerCase()
    .split(/[\s/-]+/)
    .filter(Boolean)
    .map((part) => DIRECTION_TRANSLATIONS[part] ?? "");

  if (translatedParts.length === 0 || translatedParts.some((part) => !part)) {
    return value;
  }

  return titleCase(translatedParts.join(" "));
}

interface SpaceAccessCardsProps {
  cards: SpaceAccessCard[];
}

export default function SpaceAccessCards({ cards }: SpaceAccessCardsProps) {
  const [unitModes, setUnitModes] = useState<Record<string, UnitMode>>({});
  const [translatedDirections, setTranslatedDirections] = useState<Record<string, boolean>>({});

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {cards.map((card) => {
        const Icon = icons[card.kind];
        const isMeasurement = card.kind === "roadWidth" || card.kind === "area";
        const isDirection = card.kind === "facing";
        const cardKey = `${card.kind}-${card.label}`;
        const unitMode = unitModes[cardKey] ?? "metric";
        const value = isMeasurement
          ? getMeasurementValue(card, unitMode)
          : isDirection && translatedDirections[cardKey]
            ? translateDirection(card.value)
            : card.value;
        const cardContent = (
          <>
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded bg-platinum/50 text-russian-purple">
              <Icon className="h-4 w-4" />
            </div>
            <div className="text-lg font-serif leading-tight text-charcoal">{value}</div>
            <div className="mt-1 text-xs text-warm-gray">{card.label}</div>
          </>
        );

        if (isMeasurement) {
          return (
            <button
              key={cardKey}
              type="button"
              onClick={() => {
                setUnitModes((currentModes) => ({
                  ...currentModes,
                  [cardKey]: getNextUnitMode(card, unitMode),
                }));
              }}
              className="rounded-md border border-platinum bg-white p-3 text-left shadow-sm transition-colors hover:border-russian-purple/40 hover:bg-platinum/20"
              aria-label={`${card.label}: ${value}. Click to switch unit.`}
            >
              {cardContent}
            </button>
          );
        }

        if (isDirection) {
          return (
            <button
              key={cardKey}
              type="button"
              onClick={() => {
                setTranslatedDirections((currentDirections) => ({
                  ...currentDirections,
                  [cardKey]: !currentDirections[cardKey],
                }));
              }}
              className="rounded-md border border-platinum bg-white p-3 text-left shadow-sm transition-colors hover:border-russian-purple/40 hover:bg-platinum/20"
              aria-label={`${card.label}: ${value}. Click to switch language.`}
            >
              {cardContent}
            </button>
          );
        }

        return (
          <div key={cardKey} className="rounded-md border border-platinum bg-white p-3 shadow-sm">
            {cardContent}
          </div>
        );
      })}
    </div>
  );
}
