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
        fontSize: "var(--size-label)",
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

/** A solid black block, same idea as Resonance's black CTA blocks on a light card. */
function SignalRow({
  icon,
  label,
  count,
  explainerKey,
  hovered,
  onHover,
}: {
  icon: string;
  label: string;
  count?: number;
  explainerKey: ExplainerKey;
  hovered: ExplainerKey | null;
  onHover: (key: ExplainerKey | null) => void;
}) {
  return (
    <div
      onMouseEnter={() => onHover(explainerKey)}
      onMouseLeave={() => onHover(null)}
      style={{ position: "relative", flex: 1 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.35rem",
          background: "var(--ink)",
          borderRadius: "8px",
          padding: "0.5rem 0.4rem",
          color: "#fff",
          fontSize: "var(--size-label)",
          fontWeight: 600,
        }}
      >
        <span style={{ color: "var(--amber-strong)", fontWeight: 700 }}>{icon}</span>
        <span>{label}</span>
        {count !== undefined && <span style={{ opacity: 0.65, fontWeight: 500 }}>{count}</span>}
      </div>
      {hovered === explainerKey && <Tooltip text={EXPLAINERS[explainerKey]} />}
    </div>
  );
}

/**
 * Solid tone block, no wash — the panel itself is now the light surface
 * doing the contrast work, so a fully saturated green/red block reads
 * cleanly on top of it (this is exactly the failure mode from before: a
 * saturated block only looks wrong sitting on a near-black background,
 * not on a genuinely light one).
 */
function ThumbButton({
  emoji,
  tone,
  count,
  explainerKey,
  hovered,
  onHover,
}: {
  emoji: string;
  tone: "positive" | "negative";
  count?: number;
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
          gap: "0.25rem",
          background: bg,
          borderRadius: "8px",
          padding: "0.7rem 0.4rem",
          color: "#fff",
        }}
      >
        <span style={{ fontSize: "2.1rem", lineHeight: 1 }}>{emoji}</span>
        {count !== undefined && (
          <span style={{ fontSize: "var(--size-xs)", fontWeight: 700 }}>{count.toLocaleString()}</span>
        )}
      </div>
      {hovered === explainerKey && <Tooltip text={EXPLAINERS[explainerKey]} />}
    </div>
  );
}

/**
 * A genuinely light panel — not a dark tint. On this dark site, a solid
 * white block is what actually reads as contrast, the same way Resonance's
 * white cards work against its black sections: real light-vs-dark, not a
 * subtler shade of the same dark tone. Solid colour blocks (thumbs, Q/+)
 * sit on top of it, mirroring Resonance's own pattern of alternating solid
 * white/black/gold panels rather than tinted washes.
 *
 * Three signals, not four: Endorse was dropped — it duplicated the editorial
 * evidenceRating/independenceSource signal shown elsewhere on the page.
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

  const container: React.CSSProperties = {
    ...(fixed
      ? { position: "fixed", top: "5.2rem", right: "1.4rem", zIndex: 40 }
      : { flexShrink: 0 }),
    width: 230,
    background: "var(--white-block)",
    borderRadius: "10px",
    padding: "0.75rem 0.85rem",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
  };

  return (
    <div style={container}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          paddingBottom: "0.6rem",
          marginBottom: "0.5rem",
          borderBottom: "1px solid rgba(11,14,17,0.12)",
        }}
      >
        <ThumbButton emoji="👍" tone="positive" count={sovereignAlignment?.positive} explainerKey="positive" hovered={hovered} onHover={setHovered} />
        <ThumbButton emoji="👎" tone="negative" count={sovereignAlignment?.negative} explainerKey="negative" hovered={hovered} onHover={setHovered} />
      </div>

      <div style={{ display: "flex", gap: "0.4rem" }}>
        <SignalRow icon="?" label="Question" count={communitySignal?.questioned} explainerKey="question" hovered={hovered} onHover={setHovered} />
        <SignalRow icon="+" label="Contribute" count={communitySignal?.contributed} explainerKey="contribute" hovered={hovered} onHover={setHovered} />
      </div>
    </div>
  );
}
