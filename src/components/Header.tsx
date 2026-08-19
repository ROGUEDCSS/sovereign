"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/codex", label: "Codex" },
  { href: "/world", label: "World" },
  { href: "/assessment", label: "Assessment" },
  { href: "/knowledge-base", label: "Knowledge base" },
  { href: "/threat-map", label: "Threat map" },
  { href: "/scenario-room", label: "Scenario room" },
  { href: "/build-my-system", label: "Build my system" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{ borderBottom: "1px solid var(--border)", position: "sticky", top: 0, background: "var(--bg)", zIndex: 10 }}>
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: "1.5rem" }}
      >
        <Link href="/" style={{ fontWeight: 500, fontSize: "1rem", textDecoration: "none", whiteSpace: "nowrap" }}>
          Sovereign
        </Link>
        <nav style={{ display: "flex", gap: "1.5rem", overflowX: "auto" }}>
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: "0.9rem",
                  color: active ? "var(--amber-strong)" : "var(--text-2)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
