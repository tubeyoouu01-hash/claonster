export type SectorId =
  | "healthcare"
  | "finance"
  | "energy"
  | "manufacturing"
  | "consumerGoods"
  | "telecommunications"
  | "utilities"
  | "agriculture"
  | "transportation"
  | "importExport"
  | "maritime"
  | "construction"
  | "realEstate";

export type PersonalSectorId = "school" | "travel" | "medical" | "building" | "car";

export const businessSectors: { id: SectorId; icon: string; seed: string }[] = [
  { id: "healthcare", icon: "Stethoscope", seed: "healthcare-clinic" },
  { id: "finance", icon: "Landmark", seed: "finance-district" },
  { id: "energy", icon: "Zap", seed: "oil-gas-rig" },
  { id: "manufacturing", icon: "Factory", seed: "factory-floor" },
  { id: "consumerGoods", icon: "ShoppingBag", seed: "consumer-goods" },
  { id: "telecommunications", icon: "Radio", seed: "telecom-tower" },
  { id: "utilities", icon: "Droplet", seed: "utilities-grid" },
  { id: "agriculture", icon: "Wheat", seed: "agriculture-field" },
  { id: "transportation", icon: "Truck", seed: "transport-logistics" },
  { id: "importExport", icon: "Container", seed: "import-export-port" },
  { id: "maritime", icon: "Anchor", seed: "maritime-shipping" },
  { id: "construction", icon: "HardHat", seed: "construction-site" },
  { id: "realEstate", icon: "Building2", seed: "real-estate-skyline" },
];

export const personalSectors: { id: PersonalSectorId; icon: string; seed: string }[] = [
  { id: "school", icon: "GraduationCap", seed: "university-campus" },
  { id: "travel", icon: "Plane", seed: "travel-journey" },
  { id: "medical", icon: "HeartPulse", seed: "medical-care" },
  { id: "building", icon: "Home", seed: "home-mortgage" },
  { id: "car", icon: "Car", seed: "car-loan" },
];

export function seedImage(seed: string, w = 900, h = 600) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}
