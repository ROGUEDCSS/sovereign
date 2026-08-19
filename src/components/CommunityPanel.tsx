"use client";

import { useState } from "react";
import { CommunitySignal, SovereignAlignment } from "@/lib/knowledge-graph";

const EXPLAINERS = {
  positive: "The community's view: this helps individual sovereignty.",
  negative: "The community's view: this hurts individual sovereignty.",
  question: "I question this, disagree, or want it scrutinised.",
  contribute: "I have something to add — a correction, source, alternative method, or experience.",
} as const;

type ExplainerKey = keyof typeof EXPLAINERS;

function Tooltip({ text }: { text: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 6px)",
        right: 0,
        width: 200,
        background: "var(--bg-raised)",
        border: "1px solid var(--border-strong)",
        borderRadius: "8px",
        padding: "0.6rem 0.75rem",
        fontSize: "0.74rem",
        color: "var(--text-2)",
        lineHeight: 1.4,
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        zIndex: 10,
        textAlign: "left",
      }}
    >
      {text}
    </div>
  );
}

function SignalRow({
  icon,
  label,
  count,
  explainerKey,
  hovered,
  onHover,
  ink,
}: {
  icon: string;
  label: string;
  count?: number;
  explainerKey: ExplainerKey;
  hovered: ExplainerKey | null;
  onHover: (key: ExplainerKey | null) => void;
  ink: string;
}) {
  return (
    <div
      onMouseEnter={() => onHover(explainerKey)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.3rem 0",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.72rem", color: ink }}>
        <span style={{ fontFamily: "var(--font-mono, monospace)", fontWeight: 700, width: 12, textAlign: "center", flexShrink: 0 }}>
          {icon}
        </span>
        {label}
      </span>
      {count !== undefined && <span style={{ fontSize: "0.7rem", opacity: 0.55, color: ink }}>{count}</span>}
      {hovered === explainerKey && <Tooltip text={EXPLAINERS[explainerKey]} />}
    </div>
  );
}

/**
 * The block itself carries the tone colour (green / red) — the emoji is an
 * overlay icon sitting on top of that coloured block, not a separately
 * coloured circle floating on a neutral card. Text inside is always white:
 * the block's own saturated background is the surface being contrasted
 * against, independent of whichever outer panel mode (fixed/inline) it's in.
 */
function ThumbButton({
  emoji,
  tone,
  count,
  label,
  explainerKey,
  hovered,
  onHover,
}: {
  emoji: string;
  tone: "positive" | "negative";
  count?: number;
  label: string;
  explainerKey: ExplainerKey;
  hovered: ExplainerKey | null;
  onHover: (key: ExplainerKey | null) => void;
}) {
  const bg = tone === "positive" ? "var(--good)" : "var(--danger)";
  return (
    <div
      onMouseEnter={() => onHover(explainerKey)}
      onMouseLeave={() => onHover(null)}
      style={{ position: "relative", flex: 1 }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.2rem",
          background: bg,
          borderRadius: "8px",
          padding: "0.55rem 0.4rem",
          color: "#fff",
        }}
      >
        <span style={{ fontSize: "1.05rem", lineHeight: 1 }}>{emoji}</span>
        <span style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.02em", opacity: 0.9 }}>{label}</span>
        {count !== undefined && (
          <span style={{ fontSize: "0.72rem", fontWeight: 700 }}>{count.toLocaleString()}</span>
        )}
      </div>
      {hovered === explainerKey && <Tooltip text={EXPLAINERS[explainerKey]} />}
    </div>
  );
}

/**
 * Two rendering modes: `fixed` pins a small inverse-colour badge to the
 * top-right of the viewport (used on full Codex/World pages, so it doesn't
 * compete with the actual content). Inline (default) renders compactly in
 * normal flow, for use inside the peek drawer where a fixed badge would
 * collide with the drawer's own corner.
 *
 * Three signals, not four: Endorse was dropped — it duplicated the editorial
 * evidenceRating/independenceSource signal shown elsewhere on the page.
 * Sovereign alignment (thumbs, counted) is the only approval-shaped signal;
 * Question and Contribute are distinct actions, not votes.
 */
export function CommunityPanel({
  communitySignal,
  sovereignAlignment,
  fixed = false,
}: {
  communitySignal?: CommunitySignal;
  sovereignAlignment?: SovereignAlignment;
  fixed?: boolean;
}) {
  const [hovered, setHovered] = useState<ExplainerKey | null>(null);

  const ink = fixed ? "var(--bg)" : "var(--text-2)";

  const container: React.CSSProperties = fixed
    ? {
        position: "fixed",
        top: "5.2rem",
        right: "1.4rem",
        zIndex: 40,
        width: 196,
        background: "var(--text-1)",
        borderRadius: "10px",
        padding: "0.75rem 0.85rem",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }
    : {
        width: 196,
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "0.75rem 0.85rem",
        flexShrink: 0,
      };

  return (
    <div style={container}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          paddingBottom: "0.6rem",
          marginBottom: "0.5rem",
          borderBottom: fixed ? "1px solid rgba(0,0,0,0.12)" : "1px solid var(--border)",
        }}
      >
        <ThumbButton emoji="👍" tone="positive" label="Aligned" count={sovereignAlignment?.positive} explainerKey="positive" hovered={hovered} onHover={setHovered} />
        <ThumbButton emoji="👎" tone="negative" label="Against" count={sovereignAlignment?.negative} explainerKey="negative" hovered={hovered} onHover={setHovered} />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <SignalRow icon="?" label="Question" count={communitySignal?.questioned} explainerKey="question" hovered={hovered} onHover={setHovered} ink={ink} />
        <SignalRow icon="+" label="Contribute" count={communitySignal?.contributed} explainerKey="contribute" hovered={hovered} onHover={setHovered} ink={ink} />
      </div>
    </div>
  );
}
