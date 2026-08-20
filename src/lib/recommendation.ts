import { DomainId } from "./domains";

export interface PlanItem {
  title: string;
  category: DomainId;
  note: string;
  /** True if this item fundamentally requires owning/controlling land to build (a garden, a bore, a tank). */
  requiresLand?: boolean;
  /** Swapped in for title/note when the household has no land — the renter/apartment-equivalent version, not just "skip this". */
  noLandAlternative?: { title: string; note: string };
  /** Note variant shown when the household has time but not money — the build-it-yourself framing. */
  timeNote?: string;
  /** Note variant shown when the household has money but not time — the buy-it-done framing. */
  moneyNote?: string;
}

export type LandStatus = "land" | "no-land";
export type TimeMoneyStatus = "both" | "money" | "time" | "neither";

export const LAND_LABELS: Record<LandStatus, string> = {
  land: "I have land",
  "no-land": "I don't have land",
};

export const TIME_MONEY_LABELS: Record<TimeMoneyStatus, string> = {
  both: "Time and money",
  money: "Money, not time",
  time: "Time, not money",
  neither: "Neither right now",
};

export const TIME_MONEY_EXPLAINERS: Record<TimeMoneyStatus, string> = {
  both: "The fastest path — buy what needs buying, and still have time to learn and oversee it.",
  money: "Capability gets bought, not built — real, but more fragile than a skill you hold yourself, since it depends on being able to keep paying.",
  time: "The sweat-equity path — slower, but what you build is genuinely yours, skill included.",
  neither: "The hardest starting position. The real first move isn't a purchase — it's Individual/Mindset & Responsibility and Community/Mutual Aid, which cost neither.",
};

export type BudgetTier = "1000" | "10000" | "50000";

export const BUDGET_LABELS: Record<BudgetTier, string> = {
  "1000": "$1,000",
  "10000": "$10,000",
  "50000": "$50,000+",
};

export const BUDGET_EXPLAINERS: Record<BudgetTier, string> = {
  "1000": "The essentials: water, food, light, backup power, comms, first aid, and document backup — a real 72-hour to 30-day buffer.",
  "10000": "Real capability: solar power, a proper water system, food production, a generator, and workshop basics — weeks of independence, not days.",
  "50000": "A fully integrated, tested system across power, water, food, workshop, comms, and finances — the closest thing to genuine household self-sufficiency.",
};

const BUDGET_PLANS: Record<BudgetTier, PlanItem[]> = {
  "1000": [
    { title: "Water storage", category: "water", note: "72-hour reserve for the household", timeNote: "Fill and rotate containers yourself — a weekend of labour, near-zero cost.", moneyNote: "Buy pre-filled, tested emergency water containers." },
    { title: "Emergency food", category: "food", note: "30 days of shelf-stable essentials", timeNote: "Buy bulk staples and portion/store them yourself.", moneyNote: "Buy a pre-packed 30-day emergency food kit." },
    { title: "Battery backup", category: "energy", note: "Covers phones, lighting, small devices", moneyNote: "Buy a name-brand power station outright." },
    { title: "Lighting", category: "energy", note: "Non-mains lighting for every room in use" },
    { title: "Communications", category: "communications", note: "Battery or hand-crank radio" },
    { title: "First aid", category: "health", note: "A real kit, not a token one" },
    { title: "Document backup", category: "identity", note: "Certified copies, stored offline" },
  ],
  "10000": [
    {
      title: "Solar / battery system",
      category: "energy",
      note: "Covers essential loads for 48+ hours",
      timeNote: "Portable panels and DIY wiring — cheaper, more of your own time in setup.",
      moneyNote: "A pre-built kit, professionally installed — faster, no learning curve.",
    },
    {
      title: "Water system",
      category: "water",
      note: "Tank, rainwater collection, or filtration",
      requiresLand: true,
      noLandAlternative: { title: "Expanded water storage + portable filtration", note: "The renter's version of a water system — bulk stored water plus a quality filter, no roof or tank required." },
      timeNote: "Self-installed tank and first-flush system — real labour, real savings.",
      moneyNote: "Professionally installed tank and filtration, done in a day.",
    },
    {
      title: "Food production setup",
      category: "food",
      note: "Garden beds, preservation equipment",
      requiresLand: true,
      noLandAlternative: { title: "Preservation skills + bulk staple rotation", note: "No land needed — deep pantry rotation and real preservation skill instead of growing your own." },
      timeNote: "Build the beds and learn preservation yourself — slow, but the skill stays with you.",
      moneyNote: "Buy pre-built garden beds and preservation equipment outright.",
    },
    { title: "Generator", category: "energy", note: "Backup for higher-draw needs" },
    {
      title: "Workshop basics",
      category: "skills",
      note: "Core hand and power tools",
      timeNote: "Buy tools secondhand and learn to use each one properly — slower, cheaper, more capable.",
      moneyNote: "Buy a complete new tool set outright.",
    },
    { title: "Communications", category: "communications", note: "Radio plus redundant charging" },
    { title: "Storage", category: "food", note: "Proper shelving, rotation system" },
  ],
  "50000": [
    {
      title: "Integrated solar and battery power system",
      category: "energy",
      note: "Whole-property backup, tested",
      requiresLand: true,
      noLandAlternative: { title: "Maximum-capacity portable power system", note: "The largest power station and panel setup that doesn't require owning the property it sits on." },
      moneyNote: "Fully engineered and installed by a licensed provider.",
    },
    {
      title: "Independent water system",
      category: "water",
      note: "Bore or tank plus filtration",
      requiresLand: true,
      noLandAlternative: { title: "Maximum water storage + purification redundancy", note: "The renter's ceiling on water independence — weeks of stored, purified water instead of a bore." },
      moneyNote: "Bore drilling and filtration installed end-to-end by contractors.",
    },
    {
      title: "Food production infrastructure",
      category: "food",
      note: "Garden, greenhouse, preservation chain",
      requiresLand: true,
      noLandAlternative: { title: "Deep food storage + community food-growing partnership", note: "Partner with a landed household or community garden instead of growing it yourself." },
      timeNote: "Build and run it yourself — the slowest path here, and the most genuinely self-sufficient.",
    },
    { title: "Workshop and fabrication capability", category: "skills", note: "Full repair and build capability" },
    { title: "Redundant communications", category: "communications", note: "Multiple independent channels" },
    { title: "Financial and property diversification", category: "money", note: "Reduce single-institution exposure" },
    { title: "Community and mutual-aid network building", category: "community", note: "The domain that compounds slowest — and the one that costs neither time nor money to start" },
  ],
};

export function buildPlan(
  tier: BudgetTier,
  weakDomains: DomainId[],
  land: LandStatus = "land",
  timeMoney: TimeMoneyStatus = "both"
): PlanItem[] {
  const items = BUDGET_PLANS[tier].map((item) => {
    const usingNoLandAlternative = land === "no-land" && item.requiresLand && item.noLandAlternative;
    if (usingNoLandAlternative) {
      // The alternative is written for a no-land context, so the original
      // item's time/money notes (written for the land-based version) don't
      // apply — use the alternative's own note as-is rather than mismatching.
      return { ...item, title: item.noLandAlternative!.title, note: item.noLandAlternative!.note };
    }
    let resolved = item;
    if (timeMoney === "time" && resolved.timeNote) {
      resolved = { ...resolved, note: resolved.timeNote };
    } else if (timeMoney === "money" && resolved.moneyNote) {
      resolved = { ...resolved, note: resolved.moneyNote };
    }
    return resolved;
  });

  const weakIndex = (d: DomainId) => {
    const i = weakDomains.indexOf(d);
    return i === -1 ? weakDomains.length : i;
  };
  // With neither time nor money, the free-leverage domains (community, skills,
  // identity/mindset) belong first, regardless of weakness order — they're the
  // only ones actually actionable from this starting position.
  const freeLeverage: DomainId[] = ["community", "skills", "identity"];
  const leverageRank = (d: DomainId) => (timeMoney === "neither" && freeLeverage.includes(d) ? -1 : 0);

  return items
    .map((item, originalIndex) => ({ item, originalIndex }))
    .sort((a, b) => {
      const la = leverageRank(a.item.category);
      const lb = leverageRank(b.item.category);
      if (la !== lb) return la - lb;
      const wa = weakIndex(a.item.category);
      const wb = weakIndex(b.item.category);
      if (wa !== wb) return wa - wb;
      return a.originalIndex - b.originalIndex;
    })
    .map(({ item }) => item);
}
