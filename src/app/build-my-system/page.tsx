"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOMAINS, domainScore, DomainId } from "@/lib/domains";
import { buildPlan, BudgetTier, BUDGET_LABELS } from "@/lib/recommendation";

export default function BuildMySystemPage() {
  const [tier, setTier] = useState<BudgetTier | null>(null);
  const [weakDomains, setWeakDomains] = useState<DomainId[]>([]);
  const [hasAssessment, setHasAssessment] = useState(false);

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
        <p style={{ color: "var(--text-2)", marginBottom: "2rem" }}>
          {hasAssessment
            ? "Your plan is prioritised by your Sovereign Score — weakest domains first."
            : "Pick a budget. Get your Sovereign Score first, and the plan builds itself around what's actually weakest."}
        </p>

        {!hasAssessment && (
          <Link href="/assessment" className="btn btn-outline" style={{ marginBottom: "2.5rem" }}>
            Get your Sovereign Score first →
          </Link>
        )}

        <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem", marginTop: hasAssessment ? 0 : "2.5rem" }}>
          Choose a budget
        </h2>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {(Object.keys(BUDGET_LABELS) as BudgetTier[]).map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
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
          ))}
        </div>

        {plan && (
          <>
            <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem" }}>
              Your prioritised plan
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
