"use client";

import { useState } from "react";
import { usePeek } from "./PeekProvider";
import { PeekTarget, resolvePeek } from "@/lib/peek-content";

export interface PeekItem {
  label: string;
  target: PeekTarget;
  note?: string;
}

export function PeekList({ items, variant = "list" }: { items: PeekItem[]; variant?: "list" | "grid" }) {
  const { open } = usePeek();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  if (variant === "grid") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {items.map((item, i) => {
          const preview = hoverIdx === i ? resolvePeek(item.target) : null;
          return (
            <div key={item.label} style={{ position: "relative" }}>
              <button
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                onFocus={() => setHoverIdx(i)}
                onBlur={() => setHoverIdx(null)}
                onClick={() => open(item.target)}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "999px",
                  padding: "0.45rem 0.9rem",
                  cursor: "pointer",
                  color: "var(--text-1)",
                  font: "inherit",
                  fontSize: "var(--size-sm)",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </button>

              {preview && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    marginTop: "0.4rem",
                    zIndex: 60,
                    width: 260,
                    background: "var(--bg-raised)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: "8px",
                    padding: "0.9rem 1rem",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
                  }}
                >
                  <div style={{ fontWeight: 500, fontSize: "var(--size-sm)", marginBottom: "0.3rem" }}>{preview.title}</div>
                  <p style={{ fontSize: "var(--size-label)", color: "var(--text-2)", lineHeight: 1.45, margin: 0 }}>{preview.tagline}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {items.map((item, i) => {
        const preview = hoverIdx === i ? resolvePeek(item.target) : null;
        return (
          <div key={item.label} style={{ position: "relative" }}>
            <button
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              onFocus={() => setHoverIdx(i)}
              onBlur={() => setHoverIdx(null)}
              onClick={() => open(item.target)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
                background: "var(--card)",
                border: "1px solid var(--border-strong)",
                borderRadius: "8px",
                padding: "0.8rem 1rem",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                color: "var(--text-1)",
                font: "inherit",
                fontSize: "var(--size-sm)",
              }}
            >
              <span>
                <span style={{ color: "var(--amber-strong)" }}>→</span> {item.label}
                {item.note && <span style={{ color: "var(--text-3)", fontSize: "var(--size-sm)" }}> {item.note}</span>}
              </span>
              <span style={{ color: "var(--text-3)", fontSize: "var(--size-label)" }}>peek</span>
            </button>

            {preview && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  marginTop: "0.4rem",
                  zIndex: 60,
                  width: 280,
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "8px",
                  padding: "0.95rem 1.1rem",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
                }}
              >
                <div style={{ fontWeight: 500, fontSize: "var(--size-sm)", marginBottom: "0.35rem" }}>{preview.title}</div>
                <p style={{ fontSize: "var(--size-sm)", color: "var(--text-2)", lineHeight: 1.45, margin: 0 }}>{preview.tagline}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
