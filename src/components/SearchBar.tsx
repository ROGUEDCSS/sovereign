"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { search, SearchResult } from "@/lib/search";

const KIND_LABEL: Record<SearchResult["kind"], string> = {
  codex: "Codex",
  world: "World",
  category: "World category",
  subsection: "World subsection",
  page: "Page",
};

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setResults(search(query));
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <div ref={containerRef} style={{ position: "relative", flex: "1 1 auto", maxWidth: 320 }}>
      <input
        type="text"
        value={query}
        placeholder="Search Sovereign..."
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "Enter" && results[0]) go(results[0].href);
        }}
        style={{
          width: "100%",
          background: "var(--bg-raised)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "0.45rem 0.75rem",
          fontSize: "var(--size-sm)",
          color: "var(--text-1)",
          outline: "none",
        }}
      />

      {open && query.trim() && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "var(--bg-raised)",
            border: "1px solid var(--border-strong)",
            borderRadius: "8px",
            padding: "0.4rem",
            boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
            maxHeight: 360,
            overflowY: "auto",
            zIndex: 60,
          }}
        >
          {results.length === 0 ? (
            <div style={{ padding: "0.6rem 0.65rem", fontSize: "var(--size-sm)", color: "var(--text-3)" }}>
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((r) => (
              <Link
                key={r.kind + r.href}
                href={r.href}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                style={{
                  display: "block",
                  padding: "0.5rem 0.65rem",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
                className="search-result-row"
              >
                <div style={{ fontSize: "var(--size-sm)", color: "var(--text-1)", fontWeight: 500 }}>{r.title}</div>
                <div style={{ fontSize: "var(--size-xs)", color: "var(--text-3)", marginTop: "0.1rem" }}>
                  {KIND_LABEL[r.kind]}
                  {r.subtitle ? ` · ${r.subtitle}` : ""}
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
