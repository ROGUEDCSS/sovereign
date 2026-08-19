"use client";

import { createContext, useCallback, useContext, useState } from "react";
import Link from "next/link";
import { PeekTarget, resolvePeek } from "@/lib/peek-content";
import { CommunityPanel } from "./CommunityPanel";

interface PeekContextValue {
  open: (target: PeekTarget) => void;
}

const PeekContext = createContext<PeekContextValue | null>(null);

export function usePeek() {
  const ctx = useContext(PeekContext);
  if (!ctx) throw new Error("usePeek must be used within PeekProvider");
  return ctx;
}

export function PeekProvider({ children }: { children: React.ReactNode }) {
  const [target, setTarget] = useState<PeekTarget | null>(null);
  const open = useCallback((t: PeekTarget) => setTarget(t), []);
  const close = useCallback(() => setTarget(null), []);
  const content = target ? resolvePeek(target) : null;

  return (
    <PeekContext.Provider value={{ open }}>
      {children}

      <div
        onClick={close}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 70,
          opacity: content ? 1 : 0,
          pointerEvents: content ? "auto" : "none",
          transition: "opacity 0.2s ease",
        }}
      />

      <aside
        aria-hidden={!content}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "min(440px, 92vw)",
          background: "var(--bg)",
          borderLeft: "1px solid var(--border-strong)",
          zIndex: 80,
          transform: content ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.26s cubic-bezier(.2,.8,.2,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-16px 0 40px rgba(0,0,0,0.3)",
        }}
      >
        {content && (
          <>
            <div style={{ padding: "1.2rem 1.4rem 0.9rem", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                <span className="label">{content.breadcrumb}</span>
                <button
                  onClick={close}
                  aria-label="Close"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--text-2)",
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontSize: "var(--size-sm)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  ✕
                </button>
              </div>
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, margin: "0 0 0.4rem" }}>{content.title}</h2>
              <p style={{ fontSize: "var(--size-sm)", color: "var(--text-2)", margin: 0, lineHeight: 1.5 }}>{content.tagline}</p>
            </div>

            <div style={{ padding: "1.2rem 1.4rem 1.6rem", overflowY: "auto", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.2rem" }}>
                <CommunityPanel communitySignal={content.communitySignal} sovereignAlignment={content.sovereignAlignment} />
              </div>

              {content.whyItMatters && (
                <div style={{ marginBottom: "1.2rem" }}>
                  <div className="label" style={{ marginBottom: "0.35rem" }}>Why it matters</div>
                  <p style={{ fontSize: "var(--size-sm)", color: "var(--text-2)", lineHeight: 1.55, margin: 0 }}>{content.whyItMatters}</p>
                </div>
              )}

              {content.pros && content.pros.length > 0 && (
                <div style={{ marginBottom: "1.2rem" }}>
                  <div className="label" style={{ marginBottom: "0.5rem", color: "var(--good)" }}>Pros</div>
                  <ul style={{ paddingLeft: "1.1rem", color: "var(--text-2)", fontSize: "var(--size-sm)" }}>
                    {content.pros.map((p) => (
                      <li key={p} style={{ marginBottom: "0.5rem", lineHeight: 1.5 }}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {content.cons && content.cons.length > 0 && (
                <div style={{ marginBottom: "1.2rem" }}>
                  <div className="label" style={{ marginBottom: "0.5rem", color: "var(--danger)" }}>Cons</div>
                  <ul style={{ paddingLeft: "1.1rem", color: "var(--text-2)", fontSize: "var(--size-sm)" }}>
                    {content.cons.map((c) => (
                      <li key={c} style={{ marginBottom: "0.5rem", lineHeight: 1.5 }}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {content.items && content.items.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.2rem" }}>
                  {content.items.map((it) => (
                    <div key={it.name} className="card" style={{ padding: "0.85rem 1rem" }}>
                      <strong style={{ fontSize: "var(--size-sm)" }}>{it.name}</strong>
                      {it.description && (
                        <p style={{ margin: "0.25rem 0 0", fontSize: "var(--size-sm)", color: "var(--text-2)", lineHeight: 1.5 }}>
                          {it.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {content.facts && content.facts.length > 0 && (
                <div style={{ marginBottom: "1.2rem" }}>
                  <div className="label" style={{ marginBottom: "0.5rem" }}>Evidence</div>
                  <ul style={{ paddingLeft: "1.1rem", color: "var(--text-2)", fontSize: "var(--size-sm)" }}>
                    {content.facts.map((f) => (
                      <li key={f} style={{ marginBottom: "0.5rem", lineHeight: 1.5 }}>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {content.meta && (
                <p style={{ fontSize: "var(--size-label)", color: "var(--text-3)", marginBottom: "1.2rem" }}>Source: {content.meta}</p>
              )}

              {content.furtherReading && content.furtherReading.length > 0 && (
                <div style={{ marginBottom: "1.2rem" }}>
                  <div className="label" style={{ marginBottom: "0.5rem" }}>Further reading</div>
                  <ul style={{ paddingLeft: "1.1rem", color: "var(--text-2)", fontSize: "var(--size-sm)" }}>
                    {content.furtherReading.map((r) => (
                      <li key={r} style={{ marginBottom: "0.4rem", lineHeight: 1.5 }}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                href={content.href}
                style={{
                  display: "block",
                  textAlign: "center",
                  color: "var(--amber-strong)",
                  textDecoration: "none",
                  fontSize: "var(--size-sm)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "0.7rem",
                }}
              >
                Open as its own page →
              </Link>
            </div>
          </>
        )}
      </aside>
    </PeekContext.Provider>
  );
}
