import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, BlockType, ArticleContentBlock } from "@/lib/articles";

const LABELS: Record<BlockType, string> = {
  fact: "Fact",
  scenario: "Scenario",
  opinion: "Opinion",
};

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

function SectionContent({ block, index }: { block: ArticleContentBlock; index: number }) {
  switch (block.kind) {
    case "p":
      return (
        <p style={{ color: "var(--text-1)", lineHeight: 1.65 }}>{block.text}</p>
      );
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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Link href="/knowledge-base" style={{ color: "var(--text-3)", fontSize: "var(--size-sm)" }}>
          ← Knowledge base
        </Link>

        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, margin: "1rem 0 0.5rem" }}>
          {article.title}
        </h1>
        <p style={{ color: "var(--text-2)", marginBottom: "1.25rem" }}>{article.dek}</p>

        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem", fontSize: "var(--size-sm)", color: "var(--text-3)" }}>
          <span>Evidence: {"★".repeat(article.evidenceRating)}{"☆".repeat(5 - article.evidenceRating)}</span>
          <span>Source: {article.independenceSource}</span>
        </div>

        {article.sections && article.sections.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginBottom: "3rem" }}>
            {article.sections.map((section, i) => (
              <div key={section.heading}>
                <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
                  {i + 1}. {section.heading}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                  {section.content.map((block, j) => (
                    <SectionContent key={j} block={block} index={j} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {article.blocks.length > 0 && (
          <>
            {article.sections && article.sections.length > 0 && (
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1.25rem", borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
                Grounding facts
              </h2>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {article.blocks.map((block, i) => (
                <div key={i}>
                  <span className={`pill pill-${block.type}`} style={{ marginBottom: "0.5rem" }}>
                    {LABELS[block.type]}
                  </span>
                  <p style={{ color: "var(--text-1)" }}>{block.text}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
