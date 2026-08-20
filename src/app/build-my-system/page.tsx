"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOMAINS, domainScore, DomainId } from "@/lib/domains";
import {
  buildPlan,
  BudgetTier,
  BUDGET_LABELS,
  BUDGET_EXPLAINERS,
  LandStatus,
  LAND_LABELS,
  TimeMoneyStatus,
  TIME_MONEY_LABELS,
  TIME_MONEY_EXPLAINERS,
} from "@/lib/recommendation";

export default function BuildMySystemPage() {
  const [tier, setTier] = useState<BudgetTier | null>(null);
  const [weakDomains, setWeakDomains] = useState<DomainId[]>([]);
  const [hasAssessment, setHasAssessment] = useState(false);
  const [hoveredTier, setHoveredTier] = useState<BudgetTier | null>(null);
  const [land, setLand] = useState<LandStatus | null>(null);
  const [timeMoney, setTimeMoney] = useState<TimeMoneyStatus | null>(null);
  const [hoveredTimeMoney, setHoveredTimeMoney] = useState<TimeMoneyStatus | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("sovereign-answers");
    if (!raw) return;
    const answers = JSON.parse(raw) as Record<string, number>;
    const scored = DOMAINS.map((d) => ({ id: d.id, score: domainScore(d, answers) })).sort(
      (a, b) => a.score - b.score
    );
    setWeakDomains(scored.map((s) => s.id));
    setHasAssessment(true);

    const savedLand = localStorage.getItem("sovereign-land") as LandStatus | null;
    if (savedLand) setLand(savedLand);
    const savedTimeMoney = localStorage.getItem("sovereign-time-money") as TimeMoneyStatus | null;
    if (savedTimeMoney) setTimeMoney(savedTimeMoney);
  }, []);

  function chooseLand(l: LandStatus) {
    setLand(l);
    localStorage.setItem("sovereign-land", l);
  }

  function chooseTimeMoney(t: TimeMoneyStatus) {
    setTimeMoney(t);
    localStorage.setItem("sovereign-time-money", t);
  }

  const resources = land && timeMoney ? { land, timeMoney } : null;
  const plan = tier && resources ? buildPlan(tier, weakDomains, resources.land, resources.timeMoney) : null;

  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.5rem" }}>
          Build my system
        </h1>
        <p style={{ color: "var(--text-2)", marginBottom: "2.5rem" }}>
          Four steps: score, resources, budget, plan. Two people with the same score but
          different land, time, and money get genuinely different plans — not the same
          generic checklist.
        </p>

        <div className="label" style={{ color: hasAssessment ? "var(--good)" : "var(--amber-strong)", marginBottom: "0.5rem" }}>
          Step 1{hasAssessment ? " — done" : ""}
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

        <div className="label" style={{ color: resources ? "var(--good)" : "var(--amber-strong)", marginBottom: "0.5rem" }}>
          Step 2{resources ? " — done" : ""}
        </div>
        <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "0.75rem" }}>
          Your actual resources
        </h2>
        <p style={{ color: "var(--text-2)", marginBottom: "1.25rem" }}>
          Land sets the ceiling on what&apos;s possible. Time and money decide how you get
          there. This changes what the plan below actually recommends.
        </p>

        <p style={{ color: "var(--text-3)", fontSize: "var(--size-sm)", marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>
          Land
        </p>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {(Object.keys(LAND_LABELS) as LandStatus[]).map((l) => (
            <button
              key={l}
              onClick={() => chooseLand(l)}
              className="card"
              style={{
                padding: "0.85rem 1.25rem",
                cursor: "pointer",
                border: "1px solid transparent",
                background: land === l ? "var(--amber)" : undefined,
                fontWeight: land === l ? 700 : 500,
              }}
            >
              {LAND_LABELS[l]}
            </button>
          ))}
        </div>

        <p style={{ color: "var(--text-3)", fontSize: "var(--size-sm)", marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>
          Time & money
        </p>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {(Object.keys(TIME_MONEY_LABELS) as TimeMoneyStatus[]).map((t) => (
            <div key={t} style={{ position: "relative" }}>
              <button
                onClick={() => chooseTimeMoney(t)}
                onMouseEnter={() => setHoveredTimeMoney(t)}
                onMouseLeave={() => setHoveredTimeMoney(null)}
                onFocus={() => setHoveredTimeMoney(t)}
                onBlur={() => setHoveredTimeMoney(null)}
                className="card"
                style={{
                  padding: "0.85rem 1.25rem",
                  cursor: "pointer",
                  border: "1px solid transparent",
                  background: timeMoney === t ? "var(--amber)" : undefined,
                  fontWeight: timeMoney === t ? 700 : 500,
                }}
              >
                {TIME_MONEY_LABELS[t]}
              </button>
              {hoveredTimeMoney === t && (
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
                  {TIME_MONEY_EXPLAINERS[t]}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.5rem" }}>
          Step 3
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
                  border: "1px solid transparent",
                  background: tier === t ? "var(--amber)" : undefined,
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

        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.5rem" }}>
          Step 4
        </div>
        <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem" }}>
          Result: your action plan, prioritised
        </h2>
        {plan ? (
          <>
            {timeMoney === "neither" && (
              <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "1.5rem", background: "var(--amber)" }}>
                <p style={{ color: "#1a1005", fontWeight: 500 }}>
                  With neither time nor money right now, the honest first move isn&apos;t on this
                  list at all — it&apos;s Mindset & Responsibility and Mutual Aid, which cost
                  neither. The items below are reordered to put what little you can actually act
                  on first.
                </p>
              </div>
            )}
            <ol style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingLeft: "1.25rem" }}>
              {plan.map((item) => (
                <li key={item.title} className="card" style={{ padding: "1rem 1.25rem", listStyle: "decimal" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.25rem" }}>
                    <strong style={{ color: "var(--ink)" }}>{item.title}</strong>
                    <span className="pill pill-scenario">
                      {DOMAINS.find((d) => d.id === item.category)?.name}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-2)", fontSize: "var(--size-sm)" }}>{item.note}</p>
                </li>
              ))}
            </ol>
            <p style={{ color: "var(--text-3)", fontSize: "var(--size-sm)", marginTop: "1.5rem" }}>
              This plan uses your budget, resources, and Sovereign Score. A fuller intake —
              property size, location, existing equipment, and skill level — is coming in a
              future version to refine it further.
            </p>
          </>
        ) : (
          <p style={{ color: "var(--text-3)" }}>
            {resources ? "Pick a budget above to see your plan." : "Answer Land and Time & money above, then pick a budget, to see your plan."}
          </p>
        )}
      </div>
    </main>
  );
}
