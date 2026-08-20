import Link from "next/link";
import { notFound } from "next/navigation";
import { allCodexPaths, resolveCodexPath } from "@/lib/codex";
import { domainIdsForCodexPath } from "@/lib/taxonomy-map";
import { DOMAINS } from "@/lib/domains";
import { PeekProvider } from "@/components/PeekProvider";
import { PeekList, PeekItem } from "@/components/PeekList";
import { CommunityPanel } from "@/components/CommunityPanel";
import { TopicItem } from "@/components/TopicItem";
import { ArticleSectionsBlock } from "@/components/ArticleSections";

export function generateStaticParams() {
  return allCodexPaths().map((path) => ({ path }));
}

export default async function CodexNodePage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;

  const resolved = resolveCodexPath(path);
  if (!resolved) notFound();
  const { node, trail } = resolved;
  const relatedDomains = domainIdsForCodexPath(path);

  const connectionItems: PeekItem[] = (node.connections ?? []).map((c) => {
    const target = resolveCodexPath(c.path);
    const label = target ? target.node.name : c.path.join(" → ");
    const note =
      target && target.trail.length > 1
        ? "via " + target.trail.slice(0, -1).map((n) => n.name).join(" → ")
        : undefined;
    return { label, note, target: { kind: "codex", path: c.path } };
  });

  return (
    <PeekProvider>
      <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", fontSize: "var(--size-sm)", color: "var(--text-3)", marginBottom: "1.25rem" }}>
            <Link href="/codex" style={{ color: "var(--text-3)" }}>
              Codex
            </Link>
            {trail.map((t, i) => {
              const href = "/codex/" + trail.slice(0, i + 1).map((n) => n.slug).join("/");
              const isLast = i === trail.length - 1;
              return (
                <span key={t.slug} style={{ display: "flex", gap: "0.4rem" }}>
                  <span>/</span>
                  {isLast ? <span style={{ color: "var(--text-2)" }}>{t.name}</span> : <Link href={href} style={{ color: "var(--text-3)" }}>{t.name}</Link>}
                </span>
              );
            })}
          </div>

          <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.5rem" }}>{node.name}</h1>
          {!node.definition && !node.branches && (
            <p style={{ fontSize: "var(--size-body)", color: "var(--text-2)", marginBottom: "2rem", maxWidth: 620 }}>{node.tagline}</p>
          )}

          <CommunityPanel communitySignal={node.communitySignal} sovereignAlignment={node.sovereignAlignment} fixed />

          {!node.detailed && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
              <p style={{ color: "var(--text-2)" }}>
                This branch of the Codex hasn&apos;t been mapped yet. It&apos;ll follow the same
                pattern as the rest of the Codex once it&apos;s built out.
              </p>
            </div>
          )}

          {node.sections && node.sections.length > 0 && <ArticleSectionsBlock sections={node.sections} />}

          {(!node.sections || node.sections.length === 0) && node.definition && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2rem", background: "var(--amber)" }}>
              <div style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "#1a1005", marginBottom: "0.4rem" }}>
                Definition
              </div>
              <p style={{ fontSize: "var(--size-body)", fontWeight: 400, color: "#1a1005" }}>{node.definition}</p>
              {node.definitionPoints && node.definitionPoints.length > 0 && (
                <ul style={{ listStyleType: "disc", paddingLeft: "1.1rem", margin: "0.6rem 0", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {node.definitionPoints.map((point) => (
                    <li key={point} style={{ fontSize: "var(--size-body)", fontWeight: 400, color: "#1a1005" }}>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
              {node.definitionOutro && (
                <p style={{ fontSize: "var(--size-body)", fontWeight: 400, color: "#1a1005", marginTop: "0.6rem" }}>
                  {node.definitionOutro}
                </p>
              )}
            </div>
          )}

          {(!node.sections || node.sections.length === 0) && node.facts && node.facts.length > 0 && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)", marginBottom: "0.4rem" }}>
                Situation
              </div>
              <ul style={{ listStyleType: "disc", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {node.facts.map((fact) => {
                  const labeled = typeof fact !== "string";
                  return (
                    <li key={labeled ? fact.label : fact} style={{ fontSize: "var(--size-body)", fontWeight: 400 }}>
                      {labeled ? (
                        <>
                          <strong style={{ color: "var(--ink)" }}>{fact.label}:</strong> {fact.text}
                        </>
                      ) : (
                        fact
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {(!node.sections || node.sections.length === 0) && node.practicalQuestion && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2rem", background: "var(--amber)" }}>
              <div style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "#1a1005", marginBottom: "0.4rem" }}>
                The practical question
              </div>
              <p style={{ fontSize: "var(--size-body)", fontWeight: 400, color: "#1a1005" }}>{node.practicalQuestion}</p>
            </div>
          )}

          {node.branches && node.branches.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1.5rem" }}>Branches</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                {node.branches.map((b) => (
                  <div key={b.slug} style={{ border: "1px solid var(--border-strong)", borderRadius: "12px", padding: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", marginBottom: "1.25rem" }}>
                      <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, color: "var(--amber-strong)" }}>{b.name}</h2>
                      {!b.detailed && (
                        <span className="pill pill-opinion" style={{ fontSize: "var(--size-xs)", flexShrink: 0 }}>
                          Stub
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "var(--size-body)", color: "#fff", marginBottom: "0.75rem" }}>{b.tagline}</p>
                    {b.elaboration && (
                      <p style={{ fontSize: "var(--size-body)", color: "#fff", marginBottom: "1rem" }}>{b.elaboration}</p>
                    )}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Link href={`/codex/${[...path, b.slug].join("/")}`} className="btn btn-primary" style={{ padding: "0.65rem 1.25rem", fontSize: "var(--size-sm)" }}>
                        Explore {b.name} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {node.items && node.items.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
                {node.slug === "family-capability" ? "Examples" : node.slug === "water" ? "Sources" : "Topics"}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2.5rem" }}>
                {node.items.map((item) => (
                  <TopicItem key={item.name} item={item} />
                ))}
              </div>
            </>
          )}

          {node.pathways && node.pathways.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "0.5rem" }}>
                Multiple ways to the same outcome
              </h2>
              <p style={{ color: "var(--text-2)", fontSize: "var(--size-body)", marginBottom: "1rem" }}>
                The same category can be reached through different materials — the Codex is meant
                to show the alternatives, not just the conventional default.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2.5rem" }}>
                {node.pathways.map((p) => (
                  <div key={p.label} className="card" style={{ padding: "0.9rem 1.25rem" }}>
                    <strong style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)" }}>{p.label}</strong>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.5rem" }}>
                      {p.options.map((o) => (
                        <span key={o} className="pill" style={{ background: "var(--card-hover)", border: "1px solid var(--border-strong)", color: "var(--text-1)" }}>
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {connectionItems.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>Connections</h2>
              <div style={{ marginBottom: node.futureRefs && node.futureRefs.length > 0 ? "0.75rem" : "2.5rem" }}>
                <PeekList items={connectionItems} />
              </div>
            </>
          )}

          {node.futureRefs && node.futureRefs.length > 0 && (
            <p style={{ color: "var(--text-3)", fontSize: "var(--size-sm)", marginBottom: "2.5rem" }}>
              Also connects to: {node.futureRefs.join(", ")} — not built yet.
            </p>
          )}

          {(!node.sections || node.sections.length === 0) && node.sovereignFramework && !node.sovereignPrinciple && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
              <p style={{ color: "var(--text-2)" }}>
                This node touches rights or permissions and follows the Sovereign framework, but
                the research hasn&apos;t been done yet — not guessed, not filled in until it has.
              </p>
            </div>
          )}

          {(!node.sections || node.sections.length === 0) && node.sovereignPrinciple && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2rem", background: "var(--amber)" }}>
              <div style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "#1a1005", marginBottom: "0.4rem" }}>
                The Sovereign principle
              </div>
              <p style={{ fontSize: "var(--size-body)", fontWeight: 400, color: "#1a1005" }}>{node.sovereignPrinciple}</p>
            </div>
          )}

          {(!node.sections || node.sections.length === 0) && node.legalReality && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)", marginBottom: "0.4rem" }}>
                The legal reality — {node.legalJurisdiction ?? "researched per jurisdiction"}
              </div>
              <p style={{ fontSize: "var(--size-body)", color: "var(--text-2)" }}>{node.legalReality}</p>
              {node.legalSources && node.legalSources.length > 0 && (
                <ul style={{ listStyleType: "disc", paddingLeft: "1.1rem", marginTop: "0.9rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {node.legalSources.map((s) => (
                    <li key={s} style={{ fontSize: "var(--size-sm)", color: "var(--text-3)" }}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {(!node.sections || node.sections.length === 0) && node.rationale && (
            <>
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
                The private individual vs. the public institution
              </h2>
              <p style={{ color: "var(--text-2)", marginBottom: "1.25rem" }}>{node.rationale}</p>

              {node.evidenceFor && node.evidenceFor.length > 0 && (
                <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)", marginBottom: "0.4rem" }}>
                    The individual&apos;s case
                  </div>
                  <ul style={{ listStyleType: "disc", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {node.evidenceFor.map((e) => (
                      <li key={e} style={{ fontSize: "var(--size-body)", color: "var(--text-2)" }}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              {node.counterarguments && node.counterarguments.length > 0 && (
                <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)", marginBottom: "0.4rem" }}>
                    The government&apos;s case
                  </div>
                  <ul style={{ listStyleType: "disc", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {node.counterarguments.map((c) => (
                      <li key={c} style={{ fontSize: "var(--size-body)", color: "var(--text-2)" }}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {node.options && node.options.length > 0 && (
                <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
                  <div style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)", marginBottom: "0.4rem" }}>
                    Your real options
                  </div>
                  <ul style={{ listStyleType: "disc", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {node.options.map((o) => (
                      <li key={o} style={{ fontSize: "var(--size-body)", color: "var(--text-2)" }}>{o}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {relatedDomains.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
                Related Sovereign Score domains
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {relatedDomains.map((id) => (
                  <Link
                    key={id}
                    href="/assessment"
                    className="pill"
                    style={{ background: "var(--white-block)", color: "var(--ink-2)", textDecoration: "none" }}
                  >
                    {DOMAINS.find((d) => d.id === id)?.name}
                  </Link>
                ))}
              </div>
            </>
          )}

          {node.relatedTools && node.relatedTools.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>Related tools</h2>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {node.relatedTools.map((t) => (
                  <Link key={t.href} href={t.href} className="btn btn-primary">
                    {t.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </PeekProvider>
  );
}
