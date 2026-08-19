"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DOMAINS, Domain, domainScore } from "@/lib/domains";
import { getEntity } from "@/lib/knowledge-graph";
import { PeekProvider, usePeek } from "@/components/PeekProvider";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function DomainTitle({ domain }: { domain: Domain }) {
  const { open } = usePeek();
  const entity = getEntity(domain.id);

  if (!entity) {
    return (
      <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.5rem" }}>
        {domain.name}
      </h1>
    );
  }

  return (
    <h1
      onClick={() => open({ kind: "world", slug: domain.id })}
      style={{
        fontSize: "var(--size-h2)",
        fontWeight: 500,
        marginBottom: "0.5rem",
        cursor: "pointer",
        textDecoration: "underline",
        textDecorationColor: "var(--border-strong)",
        textUnderlineOffset: "6px",
        width: "fit-content",
      }}
    >
      {domain.name}
    </h1>
  );
}

export default function AssessmentPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [step, setStep] = useState(0);
  const [hasExistingResults, setHasExistingResults] = useState(false);
  const [retaking, setRetaking] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sovereign-email");
    if (saved) {
      setEmail(saved);
      setEmailSaved(true);
    }
    if (localStorage.getItem("sovereign-answers")) {
      setHasExistingResults(true);
    }
  }, []);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [hoveredDomain, setHoveredDomain] = useState<number | null>(null);

  const domain = DOMAINS[step];
  const isLast = step === DOMAINS.length - 1;
  const domainAnswered = domain.questions.every((q) => answers[q.id] !== undefined);

  function select(questionId: string, score: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  }

  function startAssessment() {
    if (!isValidEmail(email)) return;
    localStorage.setItem("sovereign-email", email);
    setEmailSaved(true);
  }

  function next() {
    if (isLast) {
      localStorage.setItem("sovereign-answers", JSON.stringify(answers));
      router.push("/assessment/results");
      return;
    }
    setStep((s) => s + 1);
  }

  if (hasExistingResults && !retaking) {
    return (
      <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.75rem" }}>
            Your Sovereign Assessment
          </div>
          <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem" }}>
            You&apos;ve already got a score
          </h1>
          <p style={{ color: "var(--text-2)", marginBottom: "1.75rem" }}>
            You completed this assessment already — your result is saved. You don&apos;t need to
            do it again unless you want to.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/assessment/results")}
            style={{ width: "100%", marginBottom: "0.75rem" }}
          >
            View your results →
          </button>
          <button
            onClick={() => {
              setRetaking(true);
              setStep(0);
            }}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              color: "var(--text-3)",
              fontSize: "var(--size-sm)",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Retake the assessment
          </button>
        </div>
      </main>
    );
  }

  if (!emailSaved) {
    return (
      <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.75rem" }}>
            Before you start
          </div>
          <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem" }}>
            Where should your score go?
          </h1>
          <p style={{ color: "var(--text-2)", marginBottom: "1.75rem" }}>
            Twelve domains, three questions each. Give us your email so your result isn&apos;t
            just left in this browser tab.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && startAssessment()}
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              borderRadius: "8px",
              border: "1px solid var(--border-strong)",
              background: "var(--card)",
              color: "var(--text-1)",
              fontSize: "var(--size-body)",
              marginBottom: "0.75rem",
            }}
          />
          <button
            className="btn btn-primary"
            onClick={startAssessment}
            disabled={!isValidEmail(email)}
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            Start the assessment →
          </button>
          <p style={{ color: "var(--text-3)", fontSize: "var(--size-label)", lineHeight: 1.5 }}>
            Saved to this browser only — there&apos;s no account system yet, so nothing is sent
            anywhere or emailed to you. This just reserves the field until real accounts exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <PeekProvider>
    <main className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.75rem" }}>
          Your Sovereign Assessment
        </div>

        <DomainTitle domain={domain} />
        <p style={{ color: "var(--text-2)", marginBottom: "1.5rem" }}>{domain.tagline}</p>

        <div className="label" style={{ margin: "1rem 0 1.25rem", textAlign: "center" }}>
          12 Domains
        </div>

        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "2.5rem" }}>
          {DOMAINS.map((d, i) => {
            const done = d.questions.every((q) => answers[q.id] !== undefined);
            const isCurrent = i === step;
            let background = "var(--border)";
            if (done) {
              const score = domainScore(d, answers);
              background = score <= 3 ? "var(--danger)" : score <= 6 ? "var(--amber)" : "var(--good)";
            }
            return (
              <div
                key={d.id}
                onMouseEnter={() => setHoveredDomain(i)}
                onMouseLeave={() => setHoveredDomain(null)}
                style={{ flex: 1, position: "relative" }}
              >
                <div
                  style={{
                    height: 8,
                    borderRadius: 3,
                    background,
                    outline: isCurrent ? "2px solid var(--amber-strong)" : "none",
                    outlineOffset: 2,
                    transition: "background 0.2s ease",
                  }}
                />
                {hoveredDomain === i && (
                  <div
                    className="btn btn-white"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      marginTop: "0.6rem",
                      zIndex: 20,
                      padding: "0.4rem 0.9rem",
                      fontSize: "var(--size-label)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                      cursor: "default",
                    }}
                  >
                    {d.name}
                    {done && <span style={{ color: "var(--ink-2)" }}> — {domainScore(d, answers)}/10</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {domain.questions.map((q) => (
            <div key={q.id}>
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, color: "var(--amber-strong)", marginBottom: "0.9rem" }}>{q.text}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {q.options.map((opt) => {
                  const selected = answers[q.id] === opt.score;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => select(q.id, opt.score)}
                      style={{
                        textAlign: "left",
                        padding: "0.85rem 1.1rem",
                        cursor: "pointer",
                        borderRadius: "12px",
                        border: "1px solid transparent",
                        background: selected ? "var(--amber)" : "var(--white-block)",
                        color: "var(--ink)",
                        fontWeight: 500,
                        fontSize: "var(--size-sm)",
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
            className="btn btn-primary"
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
    </PeekProvider>
  );
}
