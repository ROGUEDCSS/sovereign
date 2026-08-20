"use client";

import { usePeek } from "./PeekProvider";
import { getEntity } from "@/lib/knowledge-graph";
import { CodexItem } from "@/lib/codex";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function TopicItem({ item }: { item: CodexItem }) {
  const { open } = usePeek();
  const entity = getEntity(slugify(item.name));

  return (
    <div className="card" style={{ padding: "0.9rem 1.25rem" }}>
      <strong style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)" }}>{item.name}</strong>
      {item.description && (
        <p style={{ color: "var(--text-2)", fontSize: "var(--size-body)", marginTop: "0.2rem" }}>
          {item.description}
        </p>
      )}
      {entity && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.75rem" }}>
          <button
            onClick={() => open({ kind: "world", slug: entity.slug })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.5rem 1rem",
              fontSize: "var(--size-sm)",
              fontWeight: 600,
              borderRadius: "8px",
              background: "var(--ink)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Learn more →
          </button>
        </div>
      )}
    </div>
  );
}
