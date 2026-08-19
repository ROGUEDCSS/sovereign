import { DomainId } from "./domains";

export interface CodexLink {
  path: string[];
  label: string;
}

/**
 * The assessment (a flat scoring rubric) and the Codex (a hierarchical
 * knowledge tree) are deliberately separate systems doing different jobs.
 * This is the single source of truth connecting them — every cross-link
 * on either side is derived from this table, not hand-written.
 */
export const DOMAIN_TO_CODEX: Record<DomainId, CodexLink[]> = {
  identity: [{ path: ["individual", "identity"], label: "Individual → Identity" }],
  money: [
    { path: ["individual", "finance"], label: "Individual → Finance" },
    { path: ["family", "family-finance"], label: "Family → Family finance" },
  ],
  property: [{ path: ["home", "building"], label: "Home & Land → Building" }],
  food: [
    { path: ["home", "food-production"], label: "Home & Land → Food production" },
    { path: ["home", "household-stores"], label: "Home & Land → Household stores" },
  ],
  water: [
    { path: ["home", "water"], label: "Home & Land → Water" },
    { path: ["home", "household-systems"], label: "Home & Land → Household systems" },
  ],
  energy: [
    { path: ["home", "energy"], label: "Home & Land → Energy" },
    { path: ["home", "household-systems"], label: "Home & Land → Household systems" },
  ],
  transport: [{ path: ["home", "mobility"], label: "Home & Land → Mobility" }],
  communications: [
    { path: ["home", "household-systems"], label: "Home & Land → Household systems" },
    { path: ["home", "household-maintenance"], label: "Home & Land → Household maintenance" },
  ],
  "digital-security": [{ path: ["individual", "identity"], label: "Individual → Identity" }],
  health: [{ path: ["individual", "health"], label: "Individual → Health" }],
  skills: [
    { path: ["family", "family-capability"], label: "Family → Family capability" },
    { path: ["home", "household-maintenance"], label: "Home & Land → Household maintenance" },
  ],
  community: [
    { path: ["community", "neighbours"], label: "Community → Neighbours" },
    { path: ["community", "mutual-aid"], label: "Community → Mutual aid" },
  ],
};

export function codexHref(path: string[]): string {
  return "/codex/" + path.join("/");
}

export function codexLinksForDomain(id: DomainId): CodexLink[] {
  return DOMAIN_TO_CODEX[id] ?? [];
}

export function domainIdsForCodexPath(path: string[]): DomainId[] {
  const key = path.join("/");
  return (Object.keys(DOMAIN_TO_CODEX) as DomainId[]).filter((id) =>
    DOMAIN_TO_CODEX[id].some((link) => link.path.join("/") === key)
  );
}
