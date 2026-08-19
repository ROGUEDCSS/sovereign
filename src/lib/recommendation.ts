import { DomainId } from "./domains";

export interface PlanItem {
  title: string;
  category: DomainId;
  note: string;
}

export type BudgetTier = "1000" | "10000" | "50000";

export const BUDGET_LABELS: Record<BudgetTier, string> = {
  "1000": "$1,000",
  "10000": "$10,000",
  "50000": "$50,000+",
};

const BUDGET_PLANS: Record<BudgetTier, PlanItem[]> = {
  "1000": [
    { title: "Water storage", category: "water", note: "72-hour reserve for the household" },
    { title: "Emergency food", category: "food", note: "30 days of shelf-stable essentials" },
    { title: "Battery backup", category: "energy", note: "Covers phones, lighting, small devices" },
    { title: "Lighting", category: "energy", note: "Non-mains lighting for every room in use" },
    { title: "Communications", category: "communications", note: "Battery or hand-crank radio" },
    { title: "First aid", category: "health", note: "A real kit, not a token one" },
    { title: "Document backup", category: "identity", note: "Certified copies, stored offline" },
  ],
  "10000": [
    { title: "Solar / battery system", category: "energy", note: "Covers essential loads for 48+ hours" },
    { title: "Water system", category: "water", note: "Tank, rainwater collection, or filtration" },
    { title: "Food production setup", category: "food", note: "Garden beds, preservation equipment" },
    { title: "Generator", category: "energy", note: "Backup for higher-draw needs" },
    { title: "Workshop basics", category: "skills", note: "Core hand and power tools" },
    { title: "Communications", category: "communications", note: "Radio plus redundant charging" },
    { title: "Storage", category: "food", note: "Proper shelving, rotation system" },
  ],
  "50000": [
    { title: "Integrated solar and battery power system", category: "energy", note: "Whole-property backup, tested" },
    { title: "Independent water system", category: "water", note: "Bore or tank plus filtration" },
    { title: "Food production infrastructure", category: "food", note: "Garden, greenhouse, preservation chain" },
    { title: "Workshop and fabrication capability", category: "skills", note: "Full repair and build capability" },
    { title: "Redundant communications", category: "communications", note: "Multiple independent channels" },
    { title: "Financial and property diversification", category: "money", note: "Reduce single-institution exposure" },
    { title: "Community and mutual-aid network building", category: "community", note: "The domain that compounds slowest" },
  ],
};

export function buildPlan(tier: BudgetTier, weakDomains: DomainId[]): PlanItem[] {
  const items = [...BUDGET_PLANS[tier]];
  const weakIndex = (d: DomainId) => {
    const i = weakDomains.indexOf(d);
    return i === -1 ? weakDomains.length : i;
  };
  return items
    .map((item, originalIndex) => ({ item, originalIndex }))
    .sort((a, b) => {
      const wa = weakIndex(a.item.category);
      const wb = weakIndex(b.item.category);
      if (wa !== wb) return wa - wb;
      return a.originalIndex - b.originalIndex;
    })
    .map(({ item }) => item);
}
