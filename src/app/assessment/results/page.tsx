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

const TIER_LABEL: Record<Tier, string> = {
  red: "Vulnerability — urgent action needed",
  amber: "Action over time",
  green: "Totally Sovereign",
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
        <p style={{ fontSize: "var(--size-body)", color: "#fff" }}>
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
  const redDomains = scored.filter((s) => s.tier === "red");
  const amberDomains = scored.filter((s) => s.tier === "amber");
  const greenDomains = scored.filter((s) => s.tier === "green");
  const status = sovereigntyStatus(greenCount);

  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.5rem" }}>Your Sovereign Score</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, color: "var(--amber-strong)" }}>
            Results
          </h1>
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
            <span style={{ fontSize: "var(--size-label)", color: "var(--text-3)" }}>OK</span>
          </div>
        </div>
        <p style={{ fontSize: "var(--size-body)", color: "#fff", marginBottom: "1.5rem" }}>
          Sovereignty is a goal, not a binary state — this tells you where to go, what to fix.
        </p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem", marginBottom: "2.5rem" }}>
          {(["red", "amber", "green"] as Tier[]).map((tier) => (
            <div key={tier} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "var(--size-sm)", color: "#fff" }}>{TIER_LABEL[tier]}</span>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: TIER_COLOR[tier], flexShrink: 0 }} />
            </div>
          ))}
        </div>

        <h2 style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--danger)", flexShrink: 0 }} />
          Urgent Action Needed
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginBottom: "2.5rem" }}>
          {redDomains.map(({ domain, tier }) => {
            const actionLink = codexLinksForDomain(domain.id)[0];
            return (
              <div key={domain.id}>
                <div className="card" style={{ padding: "1.5rem", background: "var(--amber)", marginBottom: "0.9rem" }}>
                  <strong style={{ fontSize: "var(--size-h4)", fontWeight: 700, color: "#1a1005" }}>{domain.name}</strong>
                  <p style={{ fontSize: "var(--size-body)", fontWeight: 700, color: "#1a1005", marginTop: "0.2rem" }}>
                    {domain.tierAdvice[tier]}
                  </p>
                </div>

                <div className="card" style={{ padding: "1.1rem 1.4rem" }}>
                  <strong style={{ display: "block", textAlign: "center", fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)" }}>{domain.quickAction.title}</strong>
                  <p style={{ fontSize: "var(--size-body)", color: "var(--ink)", marginTop: "0.2rem" }}>{domain.quickAction.why}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginTop: "0.9rem" }}>
                    <div>
                      <p style={{ fontSize: "var(--size-sm)", color: "var(--danger)", fontWeight: 600 }}>Time: {domain.quickAction.time}</p>
                      <p style={{ fontSize: "var(--size-sm)", color: "var(--danger)", fontWeight: 600 }}>Cost: {domain.quickAction.cost}</p>
                    </div>
                    {actionLink && (
                      <Link href={codexHref(actionLink.path)} className="btn btn-primary" style={{ flexShrink: 0, padding: "0.65rem 1.25rem", fontSize: "var(--size-sm)" }}>
                        Action →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {amberDomains.length > 0 && (
          <>
            <h2 style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--amber)", flexShrink: 0 }} />
              Action Over Time
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginBottom: "2.5rem" }}>
              {amberDomains.map(({ domain, tier }) => {
                const actionLink = codexLinksForDomain(domain.id)[0];
                return (
                  <div key={domain.id}>
                    <div className="card" style={{ padding: "1.5rem", background: "var(--amber)", marginBottom: "0.9rem" }}>
                      <strong style={{ fontSize: "var(--size-h4)", fontWeight: 700, color: "#1a1005" }}>{domain.name}</strong>
                      <p style={{ fontSize: "var(--size-body)", fontWeight: 700, color: "#1a1005", marginTop: "0.2rem" }}>
                        {domain.tierAdvice[tier]}
                      </p>
                    </div>

                    <div className="card" style={{ padding: "1.1rem 1.4rem" }}>
                      <strong style={{ display: "block", textAlign: "center", fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)" }}>{domain.quickAction.title}</strong>
                      <p style={{ fontSize: "var(--size-body)", color: "var(--ink)", marginTop: "0.2rem" }}>{domain.quickAction.why}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginTop: "0.9rem" }}>
                        <div>
                          <p style={{ fontSize: "var(--size-sm)", color: "var(--danger)", fontWeight: 600 }}>Time: {domain.quickAction.time}</p>
                          <p style={{ fontSize: "var(--size-sm)", color: "var(--danger)", fontWeight: 600 }}>Cost: {domain.quickAction.cost}</p>
                        </div>
                        {actionLink && (
                          <Link href={codexHref(actionLink.path)} className="btn btn-primary" style={{ flexShrink: 0, padding: "0.65rem 1.25rem", fontSize: "var(--size-sm)" }}>
                            Action →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {greenDomains.length > 0 && (
          <>
            <h2 style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--good)", flexShrink: 0 }} />
              Totally Sovereign
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "3rem" }}>
              {greenDomains.map(({ domain, tier }) => (
                <div key={domain.id} className="card" style={{ padding: "1.1rem 1.4rem", background: "var(--amber)" }}>
                  <strong style={{ fontSize: "var(--size-h4)", fontWeight: 700, color: "#1a1005" }}>{domain.name}</strong>
                  <p style={{ fontSize: "var(--size-body)", fontWeight: 700, color: "#1a1005", marginTop: "0.2rem" }}>
                    {domain.tierAdvice[tier]}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        <Link href="/build-my-system" className="btn btn-primary">
          Build my system →
        </Link>
      </div>
    </main>
  );
}
