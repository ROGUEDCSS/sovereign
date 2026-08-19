"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOMAINS, domainScore } from "@/lib/domains";
import { codexLinksForDomain, codexHref } from "@/lib/taxonomy-map";

type Tier = "red" | "amber" | "green";

function tierFor(score: number): Tier {
  if (score <= 3) return "red";
  if (score <= 6) return "amber";
  return "green";
}

const TIER_COLOR: Record<Tier, string> = {
  red: "var(--danger)",
  amber: "var(--amber)",
  green: "var(--good)",
};

function sovereigntyStatus(greenCount: number): { label: string; color: string } {
  if (greenCount <= 2) return { label: "Grossly Dependent", color: "var(--danger)" };
  if (greenCount <= 4) return { label: "Dangerously Exposed", color: "var(--danger)" };
  if (greenCount <= 6) return { label: "Partially Prepared", color: "var(--amber)" };
  if (greenCount <= 8) return { label: "Building Sovereignty", color: "var(--amber)" };
  if (greenCount <= 10) return { label: "Largely Sovereign", color: "var(--good)" };
  return { label: "Totally Sovereign", color: "var(--good)" };
}

export default function ResultsPage() {
  const [answers, setAnswers] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("sovereign-answers");
    if (raw) setAnswers(JSON.parse(raw));
  }, []);

  if (!answers) {
    return (
      <main className="container" style={{ paddingTop: "4rem" }}>
        <p style={{ color: "var(--text-2)" }}>
          You haven&apos;t been scored yet.{" "}
          <Link href="/assessment" style={{ color: "var(--amber-strong)" }}>
            Get your Sovereign Score
          </Link>{" "}
          first.
        </p>
      </main>
    );
  }

  const scored = DOMAINS.map((d) => ({ domain: d, score: domainScore(d, answers), tier: tierFor(domainScore(d, answers)) })).sort(
    (a, b) => a.score - b.score
  );
  const greenCount = scored.filter((s) => s.tier === "green").length;
  const weakest = scored.slice(0, 3);
  const firstFive = scored.slice(0, 5);
  const status = sovereigntyStatus(greenCount);

  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 700, color: "#fff", textAlign: "left", marginBottom: "0.5rem" }}>
          Your Sovereign Score
        </h1>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.85rem", margin: "0.5rem 0 0.25rem" }}>
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              border: `3px solid ${status.color}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg-raised)",
            }}
          >
            <span style={{ fontSize: "var(--size-h1)", fontWeight: 700, color: "var(--amber-strong)", lineHeight: 1 }}>
              {greenCount}
            </span>
            <span style={{ fontSize: "var(--size-label)", color: "var(--text-3)" }}>/ 12 Domains</span>
          </div>
          <span style={{ fontSize: "var(--size-h3)", fontWeight: 700, color: status.color, textAlign: "right" }}>
            {status.label}
          </span>
        </div>
        <p style={{ color: "var(--text-2)", marginBottom: "2.5rem" }}>
          Sovereignty is a continuum, not a binary state — this is where you start, not a verdict.
        </p>

        <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
          How &quot;Sovereign&quot; are you?
        </h2>
        <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2.5rem", background: "#fff" }}>
          {scored.map(({ domain, tier }, i) => (
            <div
              key={domain.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.85rem",
                padding: "0.9rem 0",
                borderTop: i === 0 ? "none" : "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: TIER_COLOR[tier],
                  flexShrink: 0,
                  marginTop: "0.3rem",
                }}
              />
              <div>
                <strong style={{ color: "var(--ink)" }}>{domain.name}</strong>
                <p style={{ color: "var(--ink-2)", fontSize: "var(--size-sm)", marginTop: "0.2rem" }}>
                  {domain.tierAdvice[tier]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
          Your biggest vulnerabilities
        </h2>
        <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2.5rem", background: "#fff" }}>
          <ol style={{ paddingLeft: "1.25rem" }}>
            {weakest.map(({ domain }) => (
              <li key={domain.id} style={{ marginBottom: "0.5rem" }}>
                <strong style={{ color: "var(--ink)" }}>{domain.name}</strong>
                {codexLinksForDomain(domain.id).map((link) => (
                  <Link
                    key={link.path.join("/")}
                    href={codexHref(link.path)}
                    style={{ marginLeft: "0.6rem", fontSize: "var(--size-sm)", color: "var(--amber-on-light)" }}
                  >
                    Read: {link.label} →
                  </Link>
                ))}
              </li>
            ))}
          </ol>
        </div>

        <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
          Do these 5 things first
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "3rem" }}>
          {firstFive.map(({ domain }) => (
            <div key={domain.id} className="card" style={{ padding: "1.1rem 1.4rem", background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.35rem" }}>
                <strong style={{ color: "var(--ink)" }}>{domain.quickAction.title}</strong>
                <span style={{ color: "var(--danger)", fontSize: "var(--size-sm)", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {domain.quickAction.cost} · {domain.quickAction.time}
                </span>
              </div>
              <p style={{ color: "var(--text-2)", fontSize: "var(--size-sm)" }}>{domain.quickAction.why}</p>
            </div>
          ))}
        </div>

        <Link href="/build-my-system" className="btn btn-primary">
          Build my system →
        </Link>
      </div>
    </main>
  );
}
