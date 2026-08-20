"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";

interface NavChild {
  href: string;
  label: string;
}

interface NavItem {
  href: string;
  label: string;
  children?: NavChild[];
}

const NAV: NavItem[] = [
  {
    href: "/profile",
    label: "Profile",
    children: [
      { href: "/assessment", label: "Sovereign Assessment" },
      { href: "/assessment/results", label: "Your Sovereign Score" },
      { href: "/build-my-system", label: "Build my system" },
      { href: "/checklist", label: "Free Checklist" },
      { href: "/consultation", label: "Consultation" },
    ],
  },
  {
    href: "/codex",
    label: "Codex",
  },
  {
    href: "/world",
    label: "World",
    children: [
      { href: "/threat-map", label: "Threat map" },
      { href: "/scenario-room", label: "Disaster scenarios" },
    ],
  },
  {
    href: "/style-guide",
    label: "Style guide",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <header style={{ borderBottom: "1px solid var(--border)", position: "sticky", top: 0, background: "var(--bg)", zIndex: 50 }}>
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: "1.5rem" }}
      >
        <Link href="/" style={{ fontWeight: 500, fontSize: "var(--size-body)", textDecoration: "none", whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.03em" }}>
          Sovereign
        </Link>
        <SearchBar />
        <nav style={{ display: "flex", gap: "1.5rem", height: "100%" }}>
          {NAV.map((item, i) => {
            const childActive = item.children?.some((c) => pathname === c.href) ?? false;
            const active = pathname === item.href || childActive;
            return (
              <div
                key={item.href}
                onMouseEnter={() => setOpenIdx(i)}
                onMouseLeave={() => setOpenIdx(null)}
                style={{ position: "relative", display: "flex", alignItems: "center", height: "100%" }}
              >
                <Link
                  href={item.href}
                  onFocus={() => setOpenIdx(i)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "var(--size-sm)",
                    color: active ? "var(--amber-strong)" : "var(--text-2)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                  {item.children && <span style={{ fontSize: "var(--size-xs)", opacity: 0.7 }}>▾</span>}
                </Link>

                {item.children && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      ...(i >= NAV.length - 2 ? { right: 0 } : { left: 0 }),
                      minWidth: 190,
                      background: "var(--bg-raised)",
                      border: "1px solid var(--border-strong)",
                      borderRadius: "8px",
                      padding: "0.4rem",
                      boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                      opacity: openIdx === i ? 1 : 0,
                      pointerEvents: openIdx === i ? "auto" : "none",
                      transform: openIdx === i ? "translateY(0)" : "translateY(-4px)",
                      transition: "opacity 0.15s ease, transform 0.15s ease",
                    }}
                  >
                    {item.children.map((child) => {
                      const childCurrent = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onFocus={() => setOpenIdx(i)}
                          onBlur={() => setOpenIdx(null)}
                          style={{
                            display: "block",
                            padding: "0.5rem 0.65rem",
                            borderRadius: "6px",
                            fontSize: "var(--size-sm)",
                            color: childCurrent ? "var(--amber-strong)" : "var(--text-1)",
                            textDecoration: "none",
                            background: childCurrent ? "var(--card)" : "transparent",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
