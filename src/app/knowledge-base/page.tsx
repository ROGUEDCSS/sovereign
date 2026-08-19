import Link from "next/link";
import { ARTICLES } from "@/lib/articles";

export default function KnowledgeBasePage() {
  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.5rem" }}>
          Knowledge base
        </h1>
        <p style={{ color: "var(--text-2)", marginBottom: "2.5rem" }}>
          Every claim is labelled fact, scenario, or opinion. Evidence outranks ideology.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/knowledge-base/${a.slug}`}
              className="card"
              style={{ display: "block", padding: "1.5rem", textDecoration: "none" }}
            >
              <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "0.4rem" }}>{a.title}</h2>
              <p style={{ color: "var(--text-2)", fontSize: "var(--size-sm)" }}>{a.dek}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
