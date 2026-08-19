import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, BlockType } from "@/lib/articles";

const LABELS: Record<BlockType, string> = {
  fact: "Fact",
  scenario: "Scenario",
  opinion: "Opinion",
};

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
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
      </div>
    </main>
  );
}
