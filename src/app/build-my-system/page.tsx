"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOMAINS, domainScore, DomainId } from "@/lib/domains";

function tierFor(score: number): "red" | "amber" | "green" {
  if (score <= 3) return "red";
  if (score <= 6) return "amber";
  return "green";
}
import {
  buildPlan,
  BudgetTier,
  BUDGET_LABELS,
  BUDGET_EXPLAINERS,
  LandStatus,
  LAND_LABELS,
  TimeMoneyStatus,
} from "@/lib/recommendation";

function StepBadge({ n }: { n: number }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "var(--amber)",
        color: "#1a1005",
        fontSize: "var(--size-sm)",
        fontWeight: 700,
        flexShrink: 0,
        alignSelf: "center",
      }}
    >
      {n}
    </span>
  );
}

function DoneLabel() {
  return (
    <span style={{ fontSize: "var(--size-xs)", color: "var(--good)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
      Done
    </span>
  );
}

const blackLink: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "0.55rem 1.1rem",
  fontSize: "var(--size-sm)",
  fontWeight: 600,
  borderRadius: "8px",
  background: "var(--ink)",
  color: "#fff",
  textDecoration: "none",
};

export default function BuildMySystemPage() {
  const [tier, setTier] = useState<BudgetTier | null>(null);
  const [weakDomains, setWeakDomains] = useState<DomainId[]>([]);
  const [hasAssessment, setHasAssessment] = useState(false);
  const [greenCount, setGreenCount] = useState(0);
  const [land, setLand] = useState<LandStatus | null>(null);
  const [hasTime, setHasTime] = useState<boolean | null>(null);
  const [hasMoney, setHasMoney] = useState<boolean | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("sovereign-answers");
    if (raw) {
      const answers = JSON.parse(raw) as Record<string, number>;
      const scored = DOMAINS.map((d) => ({ id: d.id, score: domainScore(d, answers) })).sort(
        (a, b) => a.score - b.score
      );
      setWeakDomains(scored.map((s) => s.id));
      setGreenCount(scored.filter((s) => tierFor(s.score) === "green").length);
      setHasAssessment(true);
    }

    const savedLand = localStorage.getItem("sovereign-land") as LandStatus | null;
    if (savedLand) setLand(savedLand);
    const savedTime = localStorage.getItem("sovereign-has-time");
    if (savedTime !== null) setHasTime(savedTime === "true");
    const savedMoney = localStorage.getItem("sovereign-has-money");
    if (savedMoney !== null) setHasMoney(savedMoney === "true");
  }, []);

  function chooseLand(l: LandStatus) {
    setLand(l);
    localStorage.setItem("sovereign-land", l);
  }

  function chooseTime(v: boolean) {
    setHasTime(v);
    localStorage.setItem("sovereign-has-time", String(v));
  }

  function chooseMoney(v: boolean) {
    setHasMoney(v);
    localStorage.setItem("sovereign-has-money", String(v));
  }

  const timeMoney: TimeMoneyStatus | null =
    hasTime === null || hasMoney === null
      ? null
      : hasTime && hasMoney
      ? "both"
      : hasTime
      ? "time"
      : hasMoney
      ? "money"
      : "neither";

  const resources = land && timeMoney ? { land, timeMoney } : null;
  const plan = tier && resources ? buildPlan(tier, weakDomains, resources.land, resources.timeMoney) : null;

  const choiceBtn = (active: boolean): React.CSSProperties => ({
    padding: "0.85rem 1.25rem",
    cursor: "pointer",
    border: active ? "1px solid transparent" : "1px solid var(--border-strong)",
    background: active ? "var(--amber)" : "var(--white-block)",
    fontWeight: active ? 700 : 500,
  });

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

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", marginBottom: "0.6rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
              <StepBadge n={1} />
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, color: "var(--ink)" }}>Get your Sovereign Score</h2>
            </div>
            {hasAssessment && <DoneLabel />}
          </div>
          {hasAssessment ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <p style={{ color: "var(--ink-2)" }}>
                <strong style={{ color: "var(--ink)" }}>{greenCount} / 12 domains</strong> scored
                Sovereign — your plan below is prioritised by the rest.
              </p>
              <Link href="/assessment/results" style={blackLink}>
                View full score →
              </Link>
            </div>
          ) : (
            <>
              <p style={{ color: "var(--ink-2)", marginBottom: "1rem" }}>
                Everything below depends on this. No score yet, so the plan can&apos;t be
                prioritised — it&apos;ll just show budget tiers in a default order.
              </p>
              <Link href="/assessment" style={blackLink}>
                Get your Sovereign Score →
              </Link>
            </>
          )}
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", marginBottom: "0.6rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
              <StepBadge n={2} />
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, color: "var(--ink)" }}>Actual Key Resources</h2>
            </div>
            {resources && <DoneLabel />}
          </div>
          <p style={{ color: "var(--ink-2)", marginBottom: "1.5rem" }}>
            Land sets the ceiling on what&apos;s possible. Time and money decide how you get
            there. This changes what the plan below actually recommends.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)" }}>Land</span>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {(Object.keys(LAND_LABELS) as LandStatus[]).map((l) => (
                  <button key={l} onClick={() => chooseLand(l)} className="card" style={choiceBtn(land === l)}>
                    {LAND_LABELS[l]}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)" }}>Time</span>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button onClick={() => chooseTime(true)} className="card" style={choiceBtn(hasTime === true)}>
                  I have time
                </button>
                <button onClick={() => chooseTime(false)} className="card" style={choiceBtn(hasTime === false)}>
                  I don&apos;t have time
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)" }}>Money</span>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button onClick={() => chooseMoney(true)} className="card" style={choiceBtn(hasMoney === true)}>
                  I have money
                </button>
                <button onClick={() => chooseMoney(false)} className="card" style={choiceBtn(hasMoney === false)}>
                  I don&apos;t have money
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem" }}>
            <StepBadge n={3} />
            <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, color: "var(--ink)" }}>Choose a budget</h2>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {(Object.keys(BUDGET_LABELS) as BudgetTier[]).map((t) => (
              <div key={t} style={{ position: "relative" }}>
                <button onClick={() => setTier(t)} className="card" style={choiceBtn(tier === t)}>
                  {BUDGET_LABELS[t]}
                </button>
              </div>
            ))}
          </div>
          {tier && <p style={{ color: "var(--ink-2)", fontSize: "var(--size-sm)", marginTop: "1rem" }}>{BUDGET_EXPLAINERS[tier]}</p>}
        </div>

        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <StepBadge n={4} />
            <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, color: "var(--ink)" }}>Result: your action plan, prioritised</h2>
          </div>
          {plan ? (
            <>
              {timeMoney === "neither" && (
                <div style={{ padding: "1.25rem 1.5rem", marginBottom: "1.5rem", background: "var(--amber)", borderRadius: "8px" }}>
                  <p style={{ color: "#1a1005", fontWeight: 500 }}>
                    With neither time nor money right now, the honest first move isn&apos;t on
                    this list at all — it&apos;s Mindset &amp; Responsibility and Mutual Aid,
                    which cost neither. The items below are reordered to put what little you can
                    actually act on first.
                  </p>
                </div>
              )}
              <ol style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingLeft: "1.25rem" }}>
                {plan.map((item) => (
                  <li key={item.title} style={{ padding: "1rem 1.25rem", listStyle: "decimal", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.25rem" }}>
                      <strong style={{ color: "var(--ink)" }}>{item.title}</strong>
                      <span className="pill pill-scenario">
                        {DOMAINS.find((d) => d.id === item.category)?.name}
                      </span>
                    </div>
                    <p style={{ color: "var(--ink-2)", fontSize: "var(--size-sm)" }}>{item.note}</p>
                  </li>
                ))}
              </ol>
              <p style={{ color: "var(--ink-2)", fontSize: "var(--size-sm)", marginTop: "1.5rem" }}>
                This plan uses your budget, resources, and Sovereign Score. A fuller intake —
                property size, location, existing equipment, and skill level — is coming in a
                future version to refine it further.
              </p>
            </>
          ) : (
            <p style={{ color: "var(--ink-2)" }}>
              {resources ? "Pick a budget above to see your plan." : "Answer Land, Time, and Money above, then pick a budget, to see your plan."}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
