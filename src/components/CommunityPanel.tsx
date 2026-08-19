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

/** Neutral bordered pill, matching the site's own card/pill language — no black block. */
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
          background: "var(--card-hover)",
          border: "1px solid var(--border-strong)",
          borderRadius: "8px",
          padding: "0.5rem 0.4rem",
          color: "var(--text-1)",
          fontSize: "var(--size-label)",
          fontWeight: 600,
        }}
      >
        <span style={{ color: "var(--amber-strong)", fontWeight: 700 }}>{icon}</span>
        <span>{label}</span>
        {count !== undefined && <span style={{ opacity: 0.6, fontWeight: 500 }}>{count}</span>}
      </div>
      {hovered === explainerKey && <Tooltip text={EXPLAINERS[explainerKey]} />}
    </div>
  );
}

/**
 * A tinted, bordered pill in the tone colour — never a solid saturated fill.
 * Matches the site's own restrained semantic-colour pattern (pill-fact,
 * pill-scenario): colour is a light wash under saturated text/icon, not a
 * block. The emoji reads at 2x size so the tone is still unmistakable.
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
  const wash = tone === "positive" ? "rgba(111,160,114,0.14)" : "rgba(194,91,79,0.14)";
  const border = tone === "positive" ? "rgba(111,160,114,0.4)" : "rgba(194,91,79,0.4)";
  const ink = tone === "positive" ? "var(--good)" : "var(--danger)";
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
          background: wash,
          border: `1px solid ${border}`,
          borderRadius: "8px",
          padding: "0.7rem 0.4rem",
        }}
      >
        <span style={{ fontSize: "2.1rem", lineHeight: 1 }}>{emoji}</span>
        {count !== undefined && (
          <span style={{ fontSize: "var(--size-xs)", fontWeight: 700, color: ink }}>{count.toLocaleString()}</span>
        )}
      </div>
      {hovered === explainerKey && <Tooltip text={EXPLAINERS[explainerKey]} />}
    </div>
  );
}

/**
 * Always a dark, bordered panel — matches the site's own card language and
 * Resonance's restrained "tint, don't fill" discipline. Never inverts to a
 * light block: `fixed` only changes position (viewport-pinned top-right vs
 * inline top-of-drawer), not colour.
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

  const container: React.CSSProperties = {
    ...(fixed
      ? { position: "fixed", top: "5.2rem", right: "1.4rem", zIndex: 40 }
      : { flexShrink: 0 }),
    width: 230,
    background: "var(--card)",
    border: "1px solid var(--border-strong)",
    borderRadius: "10px",
    padding: "0.75rem 0.85rem",
    boxShadow: fixed ? "0 8px 24px rgba(0,0,0,0.4)" : "none",
  };

  return (
    <div style={container}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          paddingBottom: "0.6rem",
          marginBottom: "0.5rem",
          borderBottom: "1px solid var(--border)",
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
