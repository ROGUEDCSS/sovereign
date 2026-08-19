"use client";

import { useState } from "react";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const SECTIONS = [
  "Water",
  "Food",
  "Energy",
  "Finance",
  "Health",
  "Identity & documents",
  "Communication",
  "Home & security",
  "Community",
];

export default function ChecklistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function submit() {
    if (!isValidEmail(email)) return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setErrorMsg("Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.75rem" }}>
          Free download
        </div>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem" }}>
          The Resilience Checklist
        </h1>
        <p style={{ color: "var(--text-2)", marginBottom: "1.5rem" }}>
          Nine areas, forty questions — the ordinary things that break first when a job, a bank, a
          network, or a body stops cooperating. No account needed, just an email.
        </p>

        <ul style={{ listStyleType: "disc", paddingLeft: "1.1rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {SECTIONS.map((s) => (
            <li key={s} style={{ color: "var(--text-1)", fontSize: "var(--size-body)" }}>
              {s}
            </li>
          ))}
        </ul>

        {status === "done" ? (
          <div className="card" style={{ padding: "1.25rem 1.5rem" }}>
            <p style={{ color: "var(--ink)", fontWeight: 500, marginBottom: "0.75rem" }}>
              Sent. Check your inbox — and grab it right now below.
            </p>
            <a href="/sovereign-resilience-checklist.pdf" className="btn btn-primary" download>
              Download the checklist →
            </a>
          </div>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
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
              onClick={submit}
              disabled={!isValidEmail(email) || status === "submitting"}
              style={{ width: "100%", marginBottom: "0.75rem" }}
            >
              {status === "submitting" ? "Sending…" : "Send me the checklist →"}
            </button>
            {status === "error" && (
              <p style={{ color: "var(--danger)", fontSize: "var(--size-sm)" }}>{errorMsg}</p>
            )}
            <p style={{ color: "var(--text-3)", fontSize: "var(--size-label)", lineHeight: 1.5 }}>
              We&apos;ll email you the PDF and nothing else you didn&apos;t ask for.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
