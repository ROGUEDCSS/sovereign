import { CODEX_BRANCHES, CodexNode } from "./codex";
import { KG_ENTITIES, ENTITY_TYPES, ENTITY_TYPE_LABELS, WORLD_SUBSECTIONS, slugifySubsection } from "./knowledge-graph";

export interface SearchResult {
  title: string;
  subtitle: string;
  href: string;
  kind: "codex" | "world" | "category" | "subsection" | "page";
}

function collectCodexResults(nodes: CodexNode[], parentPath: string[] = []): SearchResult[] {
  let results: SearchResult[] = [];
  for (const node of nodes) {
    const path = [...parentPath, node.slug];
    results.push({
      title: node.name,
      subtitle: node.tagline,
      href: `/codex/${path.join("/")}`,
      kind: "codex",
    });
    if (node.branches) {
      results = results.concat(collectCodexResults(node.branches, path));
    }
  }
  return results;
}

const STATIC_PAGES: SearchResult[] = [
  { title: "Build my system", subtitle: "Your personal sovereignty plan", href: "/build-my-system", kind: "page" },
  { title: "Sovereign Assessment", subtitle: "Take the assessment", href: "/assessment", kind: "page" },
  { title: "Your Sovereign Score", subtitle: "See your results", href: "/assessment/results", kind: "page" },
  { title: "Free Checklist", subtitle: "Download the checklist", href: "/checklist", kind: "page" },
  { title: "Consultation", subtitle: "Book a consultation", href: "/consultation", kind: "page" },
  { title: "The Codex", subtitle: "The full sovereignty framework", href: "/codex", kind: "page" },
  { title: "The World", subtitle: "Entities, institutions, and how they connect", href: "/world", kind: "page" },
  { title: "Threat map", subtitle: "Explore risks", href: "/threat-map", kind: "page" },
  { title: "Disaster scenarios", subtitle: "Scenario planning", href: "/scenario-room", kind: "page" },
  { title: "Style guide", subtitle: "Design system reference", href: "/style-guide", kind: "page" },
];

let cachedIndex: SearchResult[] | null = null;

export function buildSearchIndex(): SearchResult[] {
  if (cachedIndex) return cachedIndex;

  const codexResults = collectCodexResults(CODEX_BRANCHES);

  const worldResults: SearchResult[] = KG_ENTITIES.map((e) => ({
    title: e.name,
    subtitle: e.summary,
    href: `/world/${e.slug}`,
    kind: "world",
  }));

  const categoryResults: SearchResult[] = ENTITY_TYPES.map((type) => ({
    title: ENTITY_TYPE_LABELS[type],
    subtitle: "World category",
    href: `/world/category/${type}`,
    kind: "category",
  }));

  const subsectionResults: SearchResult[] = [];
  for (const type of ENTITY_TYPES) {
    const subs = WORLD_SUBSECTIONS[type];
    if (!subs) continue;
    for (const name of subs) {
      subsectionResults.push({
        title: name,
        subtitle: `${ENTITY_TYPE_LABELS[type]} subsection`,
        href: `/world/category/${type}/${slugifySubsection(name)}`,
        kind: "subsection",
      });
    }
  }

  cachedIndex = [...STATIC_PAGES, ...codexResults, ...worldResults, ...categoryResults, ...subsectionResults];
  return cachedIndex;
}

export function search(query: string, limit = 8): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const index = buildSearchIndex();
  const scored = index
    .map((item) => {
      const title = item.title.toLowerCase();
      const subtitle = item.subtitle.toLowerCase();
      let score = -1;
      if (title === q) score = 100;
      else if (title.startsWith(q)) score = 80;
      else if (title.includes(q)) score = 60;
      else if (subtitle.includes(q)) score = 20;
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((r) => r.item);
}
