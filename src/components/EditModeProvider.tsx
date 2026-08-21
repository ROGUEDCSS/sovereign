"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface EditModeContextValue {
  editMode: boolean;
  toggle: () => void;
}

const EditModeContext = createContext<EditModeContextValue>({ editMode: false, toggle: () => {} });

export function useEditMode() {
  return useContext(EditModeContext);
}

/**
 * Local-dev-only. Renders as a plain pass-through in production builds —
 * the NODE_ENV check is statically true/false at build time, so Next
 * tree-shakes the toggle button and all editing logic out of the prod
 * bundle entirely.
 */
export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);

  if (process.env.NODE_ENV !== "development") {
    return <>{children}</>;
  }

  return (
    <EditModeContext.Provider value={{ editMode, toggle: () => setEditMode((v) => !v) }}>
      {children}
      <button
        onClick={() => setEditMode((v) => !v)}
        style={{
          position: "fixed",
          bottom: "1.25rem",
          left: "1.25rem",
          zIndex: 200,
          padding: "0.6rem 1.1rem",
          borderRadius: "999px",
          border: "none",
          fontSize: "var(--size-sm)",
          fontWeight: 600,
          cursor: "pointer",
          background: editMode ? "var(--amber)" : "var(--ink)",
          color: editMode ? "#1a1005" : "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        {editMode ? "✎ Edit mode: ON" : "✎ Edit mode: OFF"}
      </button>
    </EditModeContext.Provider>
  );
}
