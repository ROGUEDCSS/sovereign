"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STEPS = [
  {
    name: "Sovereign Assessment",
    description: "Twelve domains, three questions each — where you actually stand right now.",
    href: "/assessment",
    cta: "Take the assessment →",
  },
  {
    name: "Your Sovereign Score",
    description: "The result, broken down by domain, with what's urgent and what can wait.",
    href: "/assessment/results",
    cta: "View your score →",
  },
  {
    name: "Build my system",
    description: "A plan prioritised by your actual weakest domains, not a generic checklist.",
    href: "/build-my-system",
    cta: "Build my system →",
  },
];

export default function ProfilePage() {
  const [hasAssessment, setHasAssessment] = useState(false);

  useEffect(() => {
    setHasAssessment(!!localStorage.getItem("sovereign-answers"));
  }, []);

  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.5rem" }}>
          Start here
        </div>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem" }}>
          Know yourself, then build
        </h1>
        <p style={{ fontSize: "var(--size-body)", color: "var(--text-2)", marginBottom: "2.5rem", maxWidth: 620 }}>
          Everything here starts with one score. Building a system before knowing where you
          actually stand just produces a generic checklist — these three steps run in order.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {STEPS.map((step, i) => {
            const done = i < 2 && hasAssessment;
            return (
              <div key={step.href} className="card" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", marginBottom: "0.6rem" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
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
                      {i + 1}
                    </span>
                    <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, color: "var(--ink)" }}>{step.name}</h2>
                  </div>
                  {done && (
                    <span style={{ fontSize: "var(--size-xs)", color: "var(--good)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      Done
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "var(--size-body)", color: "var(--ink-2)", marginBottom: "1rem" }}>{step.description}</p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link href={step.href} style={{ display: "inline-flex", alignItems: "center", padding: "0.55rem 1.1rem", fontSize: "var(--size-sm)", fontWeight: 600, borderRadius: "8px", background: "var(--ink)", color: "#fff", textDecoration: "none" }}>
                    {step.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
