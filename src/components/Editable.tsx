"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { useEditMode } from "./EditModeProvider";

export type EditableFileKey = "knowledge-graph" | "codex" | "domains" | "home";

/**
 * Click-to-edit wrapper for local dev. `value` must be the exact string
 * as it appears in the source file (the API matches on decoded literal
 * value, not rendered HTML) — `children` is however it should actually
 * display (e.g. with role-word highlighting applied).
 */
export function Editable({ file, value, children }: { file: EditableFileKey; value: string; children: ReactNode }) {
  const { editMode } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!editing || !ref.current) return;
    ref.current.focus();
    const range = document.createRange();
    range.selectNodeContents(ref.current);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }, [editing]);

  if (process.env.NODE_ENV !== "development" || !editMode) {
    return <>{children}</>;
  }

  async function save() {
    const newText = ref.current?.textContent ?? "";
    setEditing(false);
    if (newText === value) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/edit-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileKey: file, oldText: value, newText }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Save failed.");
        return;
      }
      setStatus("saved");
    } catch {
      setStatus("error");
      setErrorMsg("Network error.");
    }
  }

  if (editing) {
    return (
      <span
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            if (ref.current) ref.current.textContent = value;
            (e.target as HTMLElement).blur();
          }
        }}
        style={{
          outline: "2px solid var(--amber-strong)",
          outlineOffset: 2,
          borderRadius: 4,
          background: "rgba(224,192,112,0.15)",
        }}
      >
        {value}
      </span>
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      title="Click to edit"
      style={{
        cursor: "text",
        outline: status === "error" ? "2px solid var(--danger)" : "1px dashed rgba(224,192,112,0.5)",
        outlineOffset: 2,
        borderRadius: 4,
        position: "relative",
      }}
    >
      {children}
      {status === "saving" && <StatusBadge text="Saving…" />}
      {status === "saved" && <StatusBadge text="Saved" />}
      {status === "error" && <StatusBadge text={errorMsg} tone="error" />}
    </span>
  );
}

function StatusBadge({ text, tone = "info" }: { text: string; tone?: "info" | "error" }) {
  return (
    <span
      style={{
        position: "absolute",
        top: "-1.5rem",
        left: 0,
        fontSize: "0.7rem",
        fontWeight: 600,
        padding: "0.15rem 0.5rem",
        borderRadius: "999px",
        whiteSpace: "nowrap",
        background: tone === "error" ? "var(--danger)" : "var(--ink)",
        color: "#fff",
        zIndex: 50,
      }}
    >
      {text}
    </span>
  );
}
