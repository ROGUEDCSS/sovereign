"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOMAINS, domainScore, DomainId } from "@/lib/domains";
import { buildPlan, BudgetTier, BUDGET_LABELS, BUDGET_EXPLAINERS } from "@/lib/recommendation";

export default function BuildMySystemPage() {
  const [tier, setTier] = useState<BudgetTier | null>(null);
  const [weakDomains, setWeakDomains] = useState<DomainId[]>([]);
  const [hasAssessment, setHasAssessment] = useState(false);
  const [hoveredTier, setHoveredTier] = useState<BudgetTier | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("sovereign-answers");
    if (!raw) return;
    const answers = JSON.parse(raw) as Record<string, number>;
    const scored = DOMAINS.map((d) => ({ id: d.id, score: domainScore(d, answers) })).sort(
      (a, b) => a.score - b.score
    );
    setWeakDomains(scored.map((s) => s.id));
    setHasAssessment(true);
  }, []);

  const plan = tier ? buildPlan(tier, weakDomains) : null;

  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.5rem" }}>
          Build my system
        </h1>
        <p style={{ color: "var(--text-2)", marginBottom: "2.5rem" }}>
          Three steps: score, budget, plan. Your plan is prioritised by what&apos;s actually
          weakest, not what&apos;s loudest.
        </p>

        <div className="label" style={{ color: hasAssessment ? "var(--good)" : "var(--amber-strong)", marginBottom: "0.5rem" }}>
          Step 1 {hasAssessment ? "— done" : "of 3"}
        </div>
        <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "0.75rem" }}>
          Get your Sovereign Score
        </h2>
        {hasAssessment ? (
          <p style={{ color: "var(--text-2)", marginBottom: "2.5rem" }}>
            Score on file — your plan below is prioritised by your weakest domains.
          </p>
        ) : (
          <>
            <p style={{ color: "var(--text-2)", marginBottom: "1rem" }}>
              Everything below depends on this. No score yet, so the plan can&apos;t be
              prioritised — it&apos;ll just show budget tiers in a default order.
            </p>
            <Link href="/assessment" className="btn btn-primary" style={{ marginBottom: "2.5rem" }}>
              Get your Sovereign Score →
            </Link>
          </>
        )}

        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.5rem" }}>
          Step 2 of 3
        </div>
        <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem" }}>
          Choose a budget
        </h2>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {(Object.keys(BUDGET_LABELS) as BudgetTier[]).map((t) => (
            <div key={t} style={{ position: "relative" }}>
              <button
                onClick={() => setTier(t)}
                onMouseEnter={() => setHoveredTier(t)}
                onMouseLeave={() => setHoveredTier(null)}
                onFocus={() => setHoveredTier(t)}
                onBlur={() => setHoveredTier(null)}
                className="card"
                style={{
                  padding: "1rem 1.5rem",
                  cursor: "pointer",
                  border: tier === t ? "2px solid var(--amber)" : "1px solid transparent",
                  fontWeight: tier === t ? 700 : 500,
                }}
              >
                {BUDGET_LABELS[t]}
              </button>
              {hoveredTier === t && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    marginTop: "0.5rem",
                    zIndex: 20,
                    width: 260,
                    background: "var(--bg-raised)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: "8px",
                    padding: "0.85rem 1rem",
                    fontSize: "var(--size-label)",
                    color: "var(--text-2)",
                    lineHeight: 1.5,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  {BUDGET_EXPLAINERS[t]}
                </div>
              )}
            </div>
          ))}
        </div>

        {plan && (
          <>
            <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.5rem" }}>
              Step 3 of 3
            </div>
            <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem" }}>
              Result: your action plan, prioritised
            </h2>
            <ol style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingLeft: "1.25rem" }}>
              {plan.map((item) => (
                <li key={item.title} className="card" style={{ padding: "1rem 1.25rem", listStyle: "decimal" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.25rem" }}>
                    <strong>{item.title}</strong>
                    <span className="pill pill-scenario">
                      {DOMAINS.find((d) => d.id === item.category)?.name}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-2)", fontSize: "var(--size-sm)" }}>{item.note}</p>
                </li>
              ))}
            </ol>
            <p style={{ color: "var(--text-3)", fontSize: "var(--size-sm)", marginTop: "1.5rem" }}>
              This plan uses your budget and Sovereign Score. A fuller intake — property
              size, location, existing equipment, and skill level — is coming in a future version
              to refine it further.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
