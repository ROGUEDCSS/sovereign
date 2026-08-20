import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveCodexPath } from "@/lib/codex";
import { KG_ENTITIES, getEntity, ENTITY_TYPE_LABELS, BlockType, ArticleContentBlock } from "@/lib/knowledge-graph";
import { PeekProvider } from "@/components/PeekProvider";
import { PeekList, PeekItem } from "@/components/PeekList";
import { CommunityPanel } from "@/components/CommunityPanel";

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

function SectionContent({ block }: { block: ArticleContentBlock }) {
  switch (block.kind) {
    case "p":
      return <p style={{ color: "var(--text-1)", lineHeight: 1.65 }}>{block.text}</p>;
    case "subheading":
      return (
        <p style={{ fontSize: "var(--size-sm)", fontWeight: 700, color: "var(--amber-strong)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {block.items.map((item) => (
            <li key={item} style={{ color: "var(--text-1)", lineHeight: 1.6 }}>
              {item}
            </li>
          ))}
        </ul>
      );
    case "diagram":
      return (
        <pre
          className="card"
          style={{
            padding: "1.25rem",
            overflowX: "auto",
            fontSize: "var(--size-sm)",
            lineHeight: 1.5,
            color: "var(--ink)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {block.text}
        </pre>
      );
    case "definitions":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {block.items.map((d) => (
            <div key={d.term} className="card" style={{ padding: "0.9rem 1.1rem" }}>
              <strong style={{ color: "var(--ink)", fontSize: "var(--size-body)" }}>{d.term}</strong>
              <p style={{ color: "var(--ink-2)", marginTop: "0.25rem" }}>{d.text}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

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
            <>
              <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem", color: "var(--danger)" }}>What could go wrong?</h2>
              <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem", color: "var(--text-2)", marginBottom: "2.5rem" }}>
                {entity.whatCouldGoWrong.map((w) => (
                  <li key={w} style={{ marginBottom: "0.6rem", lineHeight: 1.6 }}>{w}</li>
                ))}
              </ul>
            </>
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
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem", marginBottom: "3rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                {entity.sections.map((section, i) => (
                  <div key={section.heading}>
                    <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
                      {i + 1}. {section.heading}
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                      {section.content.map((block, j) => (
                        <SectionContent key={j} block={block} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
