"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOMAINS, domainScore } from "@/lib/domains";
import { SCENARIOS, Scenario } from "@/lib/scenarios";

function verdictFor(score: number): { label: string; color: string } {
  if (score >= 7) return { label: "Your household could likely keep functioning", color: "var(--good)" };
  if (score >= 4) return { label: "You'd manage, but with real strain", color: "var(--amber)" };
  return { label: "This would seriously disrupt your household", color: "var(--danger)" };
}

export default function ScenarioRoomPage() {
  const [answers, setAnswers] = useState<Record<string, number> | null>(null);
  const [selected, setSelected] = useState<Scenario | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("sovereign-answers");
    if (raw) setAnswers(JSON.parse(raw));
  }, []);

  function scoreForScenario(scenario: Scenario): number | null {
    if (!answers) return null;
    const scores = scenario.domains.map((id) => {
      const domain = DOMAINS.find((d) => d.id === id)!;
      return domainScore(domain, answers);
    });
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.5rem" }}>
          Scenario room
        </h1>
        <p style={{ color: "var(--text-2)", marginBottom: "0.75rem" }}>
          Pick a scenario. Find out now — not when it happens.
        </p>
        {!answers && (
          <p style={{ marginBottom: "2.5rem" }}>
            <Link href="/assessment" style={{ color: "var(--amber-strong)" }}>
              Get your Sovereign Score
            </Link>{" "}
            <span style={{ color: "var(--text-3)" }}>to see a result based on your household, not a generic one.</span>
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              className="card"
              style={{
                textAlign: "left",
                padding: "1.1rem 1.25rem",
                cursor: "pointer",
                borderColor: selected?.id === s.id ? "var(--amber)" : "var(--border)",
                background: selected?.id === s.id ? "var(--amber-dim)" : "var(--card)",
              }}
            >
              <div className="label" style={{ marginBottom: "0.35rem" }}>
                Scenario {s.letter}
              </div>
              <div style={{ fontWeight: 500, color: selected?.id === s.id ? "var(--amber-strong)" : "var(--text-1)" }}>
                {s.title}
              </div>
            </button>
          ))}
        </div>

        {selected && (
          <div className="card" style={{ padding: "1.75rem" }}>
            <div className="label" style={{ marginBottom: "0.5rem" }}>
              Scenario {selected.letter}
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 500, marginBottom: "0.5rem" }}>
              {selected.title}
            </h2>
            <p style={{ color: "var(--text-2)", marginBottom: "1.25rem" }}>{selected.description}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {selected.domains.map((id) => (
                <span key={id} className="pill" style={{ background: "var(--card)", color: "var(--text-2)" }}>
                  {DOMAINS.find((d) => d.id === id)?.name}
                </span>
              ))}
            </div>

            {answers ? (
              (() => {
                const score = scoreForScenario(selected)!;
                const verdict = verdictFor(score);
                return (
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "2rem", fontWeight: 500, color: verdict.color }}>{score}/10</span>
                      <span style={{ color: verdict.color, fontWeight: 500 }}>{verdict.label}</span>
                    </div>
                    <p style={{ color: "var(--text-3)", fontSize: "0.85rem" }}>
                      Based on your scores in {selected.domains.map((id) => DOMAINS.find((d) => d.id === id)?.name).join(", ")}.
                    </p>
                  </div>
                );
              })()
            ) : (
              <p style={{ color: "var(--text-2)" }}>
                Take the assessment to see how your household specifically would handle this.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
