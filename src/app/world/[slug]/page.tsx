import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveCodexPath } from "@/lib/codex";
import { KG_ENTITIES, getEntity, ENTITY_TYPE_LABELS } from "@/lib/knowledge-graph";
import { PeekProvider } from "@/components/PeekProvider";
import { PeekList, PeekItem } from "@/components/PeekList";
import { CommunityPanel } from "@/components/CommunityPanel";

export function generateStaticParams() {
  return KG_ENTITIES.map((e) => ({ slug: e.slug }));
}

export default async function WorldEntityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entity = getEntity(slug);
  if (!entity) notFound();

  const relationshipItems: PeekItem[] = entity.relationships.map((r) => {
    const target = getEntity(r.targetSlug);
    return {
      label: r.type + " " + (target ? target.name : r.targetSlug),
      note: r.note,
      target: { kind: "world", slug: r.targetSlug },
    };
  });

  const codexLinkItems: PeekItem[] = (entity.codexLinks ?? []).map((link) => {
    const resolved = resolveCodexPath(link.path);
    const label = resolved ? resolved.trail.map((n) => n.name).join(" → ") : link.path.join(" → ");
    return { label, note: link.note, target: { kind: "codex", path: link.path } };
  });

  return (
    <PeekProvider>
      <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", fontSize: "0.82rem", color: "var(--text-3)", marginBottom: "1.25rem" }}>
            <Link href="/world" style={{ color: "var(--text-3)" }}>
              The World
            </Link>
            <span>/</span>
            <span style={{ color: "var(--text-2)" }}>{entity.name}</span>
          </div>

          <div className="label" style={{ marginBottom: "0.4rem" }}>
            {ENTITY_TYPE_LABELS[entity.type]}
          </div>
          <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.5rem" }}>
            {entity.name}
          </h1>
          <p style={{ color: "var(--text-2)", marginBottom: "1.25rem" }}>{entity.summary}</p>

          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem", fontSize: "0.85rem", color: "var(--text-3)" }}>
            <span>Evidence: {"★".repeat(entity.evidenceRating)}{"☆".repeat(5 - entity.evidenceRating)}</span>
            <span>Source: {entity.independenceSource}</span>
          </div>

          {entity.whyItMatters && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
              <div className="label" style={{ marginBottom: "0.4rem" }}>Why it matters</div>
              <p style={{ color: "var(--text-2)", lineHeight: 1.6 }}>{entity.whyItMatters}</p>
            </div>
          )}

          <h2 style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "1rem" }}>Facts</h2>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--text-2)", marginBottom: "2.5rem" }}>
            {entity.facts.map((f) => (
              <li key={f} style={{ marginBottom: "0.5rem" }}>
                {f}
              </li>
            ))}
          </ul>

          {entity.pros && entity.pros.length > 0 && (
            <>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "1rem", color: "var(--good)" }}>Pros</h2>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-2)", marginBottom: "2.5rem" }}>
                {entity.pros.map((p) => (
                  <li key={p} style={{ marginBottom: "0.6rem", lineHeight: 1.6 }}>{p}</li>
                ))}
              </ul>
            </>
          )}

          {entity.cons && entity.cons.length > 0 && (
            <>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "1rem", color: "var(--danger)" }}>Cons</h2>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-2)", marginBottom: "2.5rem" }}>
                {entity.cons.map((c) => (
                  <li key={c} style={{ marginBottom: "0.6rem", lineHeight: 1.6 }}>{c}</li>
                ))}
              </ul>
            </>
          )}

          {entity.furtherReading && entity.furtherReading.length > 0 && (
            <>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "1rem" }}>Further reading</h2>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-2)", marginBottom: "2.5rem", fontSize: "0.92rem" }}>
                {entity.furtherReading.map((r) => (
                  <li key={r} style={{ marginBottom: "0.4rem" }}>{r}</li>
                ))}
              </ul>
            </>
          )}

          {(entity.pros || entity.cons) && (
            <CommunityPanel communitySignal={entity.communitySignal} sovereignAlignment={entity.sovereignAlignment} fixed />
          )}

          {relationshipItems.length > 0 && (
            <>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "1rem" }}>Relationships</h2>
              <div style={{ marginBottom: "2.5rem" }}>
                <PeekList items={relationshipItems} />
              </div>
            </>
          )}

          {codexLinkItems.length > 0 && (
            <>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "1rem" }}>Connects to the Codex</h2>
              <div style={{ marginBottom: "2.5rem" }}>
                <PeekList items={codexLinkItems} />
              </div>
            </>
          )}

          {entity.knowledgeBaseSlug && (
            <Link href={`/knowledge-base/${entity.knowledgeBaseSlug}`} className="btn btn-outline">
              Read the full article →
            </Link>
          )}
        </div>
      </main>
    </PeekProvider>
  );
}
