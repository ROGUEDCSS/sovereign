"use client";

import { useState } from "react";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ConsultationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit = name.trim() && isValidEmail(email) && propertyLocation.trim();

  async function submit() {
    if (!canSubmit) return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, propertyLocation, notes }),
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

  const inputStyle = {
    width: "100%",
    padding: "0.85rem 1rem",
    borderRadius: "8px",
    border: "1px solid var(--border-strong)",
    background: "var(--card)",
    color: "var(--text-1)",
    fontSize: "var(--size-body)",
    marginBottom: "0.75rem",
  };

  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.75rem" }}>
          Buying a property
        </div>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem" }}>
          Get it checked against sovereign standards
        </h1>
        <p style={{ color: "var(--text-2)", marginBottom: "1rem" }}>
          A local agent physically inspects the property against real resilience criteria —
          water, power, access, and structure — before you commit.
        </p>
        <p style={{ color: "var(--text-2)", marginBottom: "2rem" }}>
          What you find is often worth 10x the consultation fee at the negotiating table: a
          documented weak point is leverage, not just information.
        </p>

        {status === "done" ? (
          <div className="card" style={{ padding: "1.25rem 1.5rem" }}>
            <p style={{ color: "var(--ink)", fontWeight: 500 }}>
              Request received. We&apos;ll reply by email to scope and quote it.
            </p>
          </div>
        ) : (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={inputStyle}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={inputStyle}
            />
            <input
              type="text"
              value={propertyLocation}
              onChange={(e) => setPropertyLocation(e.target.value)}
              placeholder="Property address or listing link"
              style={inputStyle}
            />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything specific you want checked (optional)"
              rows={4}
              style={{ ...inputStyle, resize: "vertical" as const }}
            />
            <button
              className="btn btn-primary"
              onClick={submit}
              disabled={!canSubmit || status === "submitting"}
              style={{ width: "100%", marginBottom: "0.75rem" }}
            >
              {status === "submitting" ? "Sending…" : "Request a consultation →"}
            </button>
            {status === "error" && (
              <p style={{ color: "var(--danger)", fontSize: "var(--size-sm)" }}>{errorMsg}</p>
            )}
            <p style={{ color: "var(--text-3)", fontSize: "var(--size-label)", lineHeight: 1.5 }}>
              No payment yet — we&apos;ll follow up to confirm scope, location coverage, and price
              before anything is charged.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
