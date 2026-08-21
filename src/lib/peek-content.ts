import { resolveCodexPath } from "./codex";
import { getEntity, ENTITY_TYPE_LABELS, CommunitySignal, SovereignAlignment } from "./knowledge-graph";

export type PeekTarget = { kind: "codex"; path: string[] } | { kind: "world"; slug: string };

export interface PeekContent {
  title: string;
  breadcrumb: string;
  tagline: string;
  whyItMatters?: string;
  items?: { name: string; description?: string }[];
  facts?: string[];
  pros?: string[];
  cons?: string[];
  furtherReading?: string[];
  meta?: string;
  communitySignal?: CommunitySignal;
  sovereignAlignment?: SovereignAlignment;
  related?: { label: string; note?: string; target: PeekTarget }[];
  href: string;
}

export function resolvePeek(target: PeekTarget): PeekContent | null {
  if (target.kind === "codex") {
    const resolved = resolveCodexPath(target.path);
    if (!resolved) return null;
    const { node, trail } = resolved;
    return {
      title: node.name,
      breadcrumb: trail.slice(0, -1).map((n) => n.name).join(" → ") || "Codex",
      tagline: node.tagline,
      items: node.items,
      communitySignal: node.communitySignal,
      sovereignAlignment: node.sovereignAlignment,
      href: "/codex/" + target.path.join("/"),
    };
  }

  const entity = getEntity(target.slug);
  if (!entity) return null;
  return {
    title: entity.name,
    breadcrumb: "The World → " + ENTITY_TYPE_LABELS[entity.type],
    tagline: entity.summary,
    whyItMatters: entity.whyItMatters,
    facts: entity.facts.map((f) =>
      typeof f === "string" ? f : f.items.map((item) => `${item.label}: ${item.text}`).join(" ")
    ),
    pros: entity.pros,
    cons: entity.cons,
    furtherReading: entity.furtherReading,
    meta: entity.independenceSource,
    communitySignal: entity.communitySignal,
    sovereignAlignment: entity.sovereignAlignment,
    related: entity.relationships.map((r) => {
      const target = getEntity(r.targetSlug);
      return {
        label: (target ? target.name : r.targetSlug) + (r.type ? ` (${r.type})` : ""),
        note: r.note,
        target: { kind: "world" as const, slug: r.targetSlug },
      };
    }),
    href: "/world/" + target.slug,
  };
}
