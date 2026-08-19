"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOMAINS, domainScore, totalScore, statusForScore } from "@/lib/domains";
import { codexLinksForDomain, codexHref } from "@/lib/taxonomy-map";

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

  const scored = DOMAINS.map((d) => ({ domain: d, score: domainScore(d, answers) })).sort(
    (a, b) => a.score - b.score
  );
  const total = totalScore(answers);
  const status = statusForScore(total);
  const weakest = scored.slice(0, 3);
  const firstFive = scored.slice(0, 5);

  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="label">Your Sovereign Score</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", margin: "0.5rem 0 0.25rem" }}>
          <span style={{ fontSize: "var(--size-stat)", fontWeight: 500, color: "var(--amber-strong)" }}>
            {total}
          </span>
          <span style={{ fontSize: "var(--size-stat-suffix)", color: "var(--text-3)" }}>/ 120</span>
        </div>
        <p style={{ color: "var(--text-2)", marginBottom: "2.5rem" }}>
          Status: <strong>{status}</strong>. Sovereignty is a
          continuum, not a binary state — this is where you start, not a verdict.
        </p>

        <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
          Your 12 domains
        </h2>
        <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
          {scored.map(({ domain, score }, i) => (
            <div
              key={domain.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.6rem 0",
                borderTop: i === 0 ? "none" : "1px solid var(--border)",
              }}
            >
              <span style={{ width: 140, fontSize: "var(--size-sm)" }}>{domain.name}</span>
              <div style={{ flex: 1, height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${score * 10}%`,
                    background: score <= 3 ? "var(--danger)" : score <= 6 ? "var(--amber)" : "var(--good)",
                  }}
                />
              </div>
              <span style={{ width: 40, textAlign: "right", fontSize: "var(--size-sm)", color: "var(--text-2)" }}>
                {score}/10
              </span>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
          Your biggest vulnerabilities
        </h2>
        <ol style={{ marginBottom: "2.5rem", paddingLeft: "1.25rem", color: "var(--text-2)" }}>
          {weakest.map(({ domain, score }) => (
            <li key={domain.id} style={{ marginBottom: "0.5rem" }}>
              <strong>{domain.name}</strong> — {score}/10
              {codexLinksForDomain(domain.id).map((link) => (
                <Link
                  key={link.path.join("/")}
                  href={codexHref(link.path)}
                  style={{ marginLeft: "0.6rem", fontSize: "var(--size-sm)", color: "var(--amber-strong)" }}
                >
                  Read: {link.label} →
                </Link>
              ))}
            </li>
          ))}
        </ol>

        <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
          Do these five things first
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "3rem" }}>
          {firstFive.map(({ domain }) => (
            <div key={domain.id} className="card" style={{ padding: "1.1rem 1.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.35rem" }}>
                <strong>{domain.quickAction.title}</strong>
                <span style={{ color: "var(--text-3)", fontSize: "var(--size-sm)", whiteSpace: "nowrap" }}>
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
