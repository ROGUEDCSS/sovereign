"use client";

import { useEffect, useState } from "react";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  useEffect(() => {
    if (sessionStorage.getItem("sovereign-exit-feedback-shown")) return;

    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        setVisible(true);
        sessionStorage.setItem("sovereign-exit-feedback-shown", "1");
        document.removeEventListener("mouseleave", onMouseLeave);
      }
    }

    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  async function submit() {
    if (!comment.trim()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, pageUrl: window.location.pathname }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(6,8,15,0.75)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
      onClick={() => setVisible(false)}
    >
      <div
        className="card"
        style={{ maxWidth: 440, width: "100%", padding: "1.75rem", position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setVisible(false)}
          style={{
            position: "absolute",
            top: "0.9rem",
            right: "0.9rem",
            background: "transparent",
            border: "none",
            color: "var(--ink-2)",
            fontSize: "var(--size-body)",
            cursor: "pointer",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {status === "done" ? (
          <>
            <p style={{ color: "var(--ink)", fontWeight: 500, marginBottom: "0.5rem" }}>Thank you.</p>
            <p style={{ color: "var(--ink-2)" }}>Your comment has been sent — the Sovereign community appreciates it.</p>
          </>
        ) : (
          <>
            <p style={{ color: "var(--ink)", fontWeight: 500, marginBottom: "0.5rem", fontSize: "var(--size-h4)" }}>
              Before you go
            </p>
            <p style={{ color: "var(--ink-2)", marginBottom: "1.25rem" }}>
              Please, help us make this site better. Add your comments on what is missing. The
              Sovereign community thanks you!
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What's missing, or what would make this more useful?"
              rows={4}
              style={{
                width: "100%",
                padding: "0.75rem 0.9rem",
                borderRadius: "8px",
                border: "1px solid var(--border-strong)",
                background: "#fff",
                color: "var(--ink)",
                fontSize: "var(--size-sm)",
                marginBottom: "1rem",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
            {status === "error" && (
              <p style={{ color: "var(--danger)", fontSize: "var(--size-sm)", marginBottom: "0.75rem" }}>
                Something went wrong. Try again.
              </p>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                onClick={() => setVisible(false)}
                style={{ background: "transparent", border: "none", color: "var(--ink-2)", fontSize: "var(--size-sm)", cursor: "pointer" }}
              >
                No thanks
              </button>
              <button
                onClick={submit}
                disabled={!comment.trim() || status === "submitting"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.55rem 1.1rem",
                  fontSize: "var(--size-sm)",
                  fontWeight: 600,
                  borderRadius: "8px",
                  background: "var(--ink)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  opacity: !comment.trim() ? 0.5 : 1,
                }}
              >
                {status === "submitting" ? "Sending…" : "Send feedback"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
