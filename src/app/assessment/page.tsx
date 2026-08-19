"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DOMAINS } from "@/lib/domains";

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const domain = DOMAINS[step];
  const isLast = step === DOMAINS.length - 1;
  const domainAnswered = domain.questions.every((q) => answers[q.id] !== undefined);

  function select(questionId: string, score: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  }

  function next() {
    if (isLast) {
      localStorage.setItem("sovereign-answers", JSON.stringify(answers));
      router.push("/assessment/results");
      return;
    }
    setStep((s) => s + 1);
  }

  return (
    <main className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div className="label" style={{ marginBottom: "0.75rem" }}>
          Domain {step + 1} of {DOMAINS.length}
        </div>

        <div
          style={{
            height: 4,
            background: "var(--border)",
            borderRadius: 2,
            marginBottom: "2rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${((step + 1) / DOMAINS.length) * 100}%`,
              background: "var(--amber)",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.5rem" }}>
          {domain.name}
        </h1>
        <p style={{ color: "var(--text-2)", marginBottom: "2.5rem" }}>{domain.tagline}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {domain.questions.map((q) => (
            <div key={q.id}>
              <p style={{ marginBottom: "0.9rem", fontWeight: 500 }}>{q.text}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {q.options.map((opt) => {
                  const selected = answers[q.id] === opt.score;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => select(q.id, opt.score)}
                      className="card"
                      style={{
                        textAlign: "left",
                        padding: "0.85rem 1.1rem",
                        cursor: "pointer",
                        borderColor: selected ? "var(--amber)" : "var(--border)",
                        background: selected ? "var(--amber-dim)" : "var(--card)",
                        color: selected ? "var(--amber-strong)" : "var(--text-1)",
                        fontSize: "0.95rem",
                        width: "100%",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem", display: "flex", justifyContent: "space-between" }}>
          <button
            className="btn btn-outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{ visibility: step === 0 ? "hidden" : "visible" }}
          >
            Back
          </button>
          <button className="btn btn-primary" onClick={next} disabled={!domainAnswered}>
            {isLast ? "See your results" : "Next domain"}
          </button>
        </div>
      </div>
    </main>
  );
}
