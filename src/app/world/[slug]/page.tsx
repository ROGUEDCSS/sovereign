import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveCodexPath } from "@/lib/codex";
import { KG_ENTITIES, getEntity, ENTITY_TYPE_LABELS, BlockType } from "@/lib/knowledge-graph";
import { PeekProvider } from "@/components/PeekProvider";
import { PeekList, PeekItem } from "@/components/PeekList";
import { CommunityPanel } from "@/components/CommunityPanel";
import { ArticleSectionsBlock } from "@/components/ArticleSections";

const BLOCK_LABELS: Record<BlockType, string> = {
  fact: "Fact",
  scenario: "Scenario",
  opinion: "Opinion",
};

const BLOCK_LABEL_COLOR: Record<BlockType, string> = {
  fact: "var(--fact-strong)",
  scenario: "var(--amber-strong)",
  opinion: "var(--opinion-strong)",
};

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
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", fontSize: "var(--size-sm)", color: "var(--text-3)", marginBottom: "1.25rem" }}>
            <Link href="/world" style={{ color: "var(--text-3)" }}>
              The World
            </Link>
            <span>/</span>
            <span style={{ color: "var(--text-2)" }}>{entity.name}</span>
          </div>

          <Link
            href={`/world/category/${entity.type}`}
            className="label"
            style={{ color: "var(--amber-strong)", marginBottom: "0.4rem", display: "inline-block", textDecoration: "none" }}
          >
            {ENTITY_TYPE_LABELS[entity.type]}
          </Link>
          <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.5rem" }}>
            {entity.name}
          </h1>
          <p style={{ color: "var(--text-2)", marginBottom: "1.25rem" }}>{entity.summary}</p>

          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem", fontSize: "var(--size-sm)", color: "var(--text-3)" }}>
            <span>Evidence: {"★".repeat(entity.evidenceRating)}{"☆".repeat(5 - entity.evidenceRating)}</span>
            <span>Source: {entity.independenceSource}</span>
          </div>

          {entity.tldr && entity.tldr.length > 0 && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2rem", background: "var(--amber)" }}>
              <div style={{ fontSize: "var(--size-h4)", fontWeight: 700, color: "#1a1005", marginBottom: "0.6rem" }}>TL;DR</div>
              <ul style={{ listStyleType: "disc", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {entity.tldr.map((t) => (
                  <li key={t} style={{ fontSize: "var(--size-body)", color: "#1a1005" }}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {entity.whyItMatters && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: "var(--size-h4)", fontWeight: 700, color: "var(--ink)", marginBottom: "0.4rem" }}>Why it matters</div>
              <p style={{ color: "var(--text-2)", lineHeight: 1.6 }}>{entity.whyItMatters}</p>
            </div>
          )}

          <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem" }}>Facts</h2>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--text-2)", marginBottom: "2.5rem" }}>
            {entity.facts.map((f) => (
              <li key={f} style={{ marginBottom: "0.5rem" }}>
                {f}
              </li>
            ))}
          </ul>

          {entity.pros && entity.pros.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem", color: "var(--good)" }}>Pros</h2>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-2)", marginBottom: "2.5rem" }}>
                {entity.pros.map((p) => (
                  <li key={p} style={{ marginBottom: "0.6rem", lineHeight: 1.6 }}>{p}</li>
                ))}
              </ul>
            </>
          )}

          {entity.cons && entity.cons.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem", color: "var(--danger)" }}>Cons</h2>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-2)", marginBottom: "2.5rem" }}>
                {entity.cons.map((c) => (
                  <li key={c} style={{ marginBottom: "0.6rem", lineHeight: 1.6 }}>{c}</li>
                ))}
              </ul>
            </>
          )}

          {entity.whoControls && entity.whoControls.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem" }}>Who controls it?</h2>
              <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem", color: "var(--text-2)", marginBottom: "2.5rem" }}>
                {entity.whoControls.map((w) => (
                  <li key={w} style={{ marginBottom: "0.6rem", lineHeight: 1.6 }}>{w}</li>
                ))}
              </ul>
            </>
          )}

          {entity.whatCouldGoWrong && entity.whatCouldGoWrong.length > 0 && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
              <div style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--danger)", marginBottom: "0.7rem" }}>What could go wrong?</div>
              <ul style={{ listStyleType: "disc", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {entity.whatCouldGoWrong.map((w) => (
                  <li key={w} style={{ fontSize: "var(--size-body)", color: "var(--text-2)", lineHeight: 1.6 }}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {entity.safeguards && entity.safeguards.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem" }}>Safeguards</h2>
              <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem", color: "var(--text-2)", marginBottom: "2.5rem" }}>
                {entity.safeguards.map((s) => (
                  <li key={s} style={{ marginBottom: "0.6rem", lineHeight: 1.6 }}>{s}</li>
                ))}
              </ul>
            </>
          )}

          {entity.unresolvedQuestions && entity.unresolvedQuestions.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem" }}>What's unresolved</h2>
              <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem", color: "var(--text-2)", marginBottom: "2.5rem" }}>
                {entity.unresolvedQuestions.map((u) => (
                  <li key={u} style={{ marginBottom: "0.6rem", lineHeight: 1.6 }}>{u}</li>
                ))}
              </ul>
            </>
          )}

          {entity.sovereignPosition && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
              <div style={{ fontSize: "var(--size-h4)", fontWeight: 700, color: "var(--ink)", marginBottom: "0.4rem" }}>The Sovereign position</div>
              <p style={{ color: "var(--text-2)", lineHeight: 1.6 }}>{entity.sovereignPosition}</p>
            </div>
          )}

          {entity.furtherReading && entity.furtherReading.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem" }}>Further reading</h2>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-2)", marginBottom: "2.5rem", fontSize: "var(--size-sm)" }}>
                {entity.furtherReading.map((r) => (
                  <li key={r} style={{ marginBottom: "0.4rem" }}>{r}</li>
                ))}
              </ul>
            </>
          )}

          <CommunityPanel communitySignal={entity.communitySignal} sovereignAlignment={entity.sovereignAlignment} fixed />

          {relationshipItems.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem" }}>Relationships</h2>
              <div style={{ marginBottom: "2.5rem" }}>
                <PeekList items={relationshipItems} />
              </div>
            </>
          )}

          {codexLinkItems.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem" }}>Connects to the Codex</h2>
              <div style={{ marginBottom: "2.5rem" }}>
                <PeekList items={codexLinkItems} />
              </div>
            </>
          )}

          {entity.sections && entity.sections.length > 0 && (
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
              <ArticleSectionsBlock sections={entity.sections} />
            </div>
          )}

          {entity.blocks && entity.blocks.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1.25rem" }}>Grounding facts</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
                {entity.blocks.map((block, i) => (
                  <p key={i} style={{ color: "var(--text-1)", lineHeight: 1.65 }}>
                    <strong style={{ color: BLOCK_LABEL_COLOR[block.type] }}>{BLOCK_LABELS[block.type]}:</strong> {block.text}
                  </p>
                ))}
              </div>
            </>
          )}

          {entity.practicalTest && entity.practicalTest.length > 0 && (
            <div className="card" style={{ padding: "1.5rem 1.75rem", background: "var(--amber)" }}>
              <div style={{ fontSize: "var(--size-h4)", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
                Before you accept this, ask:
              </div>
              <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {entity.practicalTest.map((q, i) => (
                  <li key={i} style={{ lineHeight: 1.6 }}>{q}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </main>
    </PeekProvider>
  );
}
