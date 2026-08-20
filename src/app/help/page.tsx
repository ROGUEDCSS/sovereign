import Link from "next/link";

const SERVICES = [
  {
    name: "Free Checklist",
    tagline: "Nine areas, forty items — a real resilience checklist, no account needed.",
    price: "Free",
    href: "/checklist",
    cta: "Get the checklist →",
  },
  {
    name: "Property Consultation",
    tagline: "A local agent physically checks a property against real sovereignty standards before you buy.",
    price: "Paid",
    href: "/consultation",
    cta: "Request a consultation →",
  },
];

export default function HelpPage() {
  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.5rem" }}>
          Done for you
        </div>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem" }}>
          Help
        </h1>
        <p style={{ fontSize: "var(--size-body)", color: "var(--text-2)", marginBottom: "2.5rem", maxWidth: 620 }}>
          The Codex is for building it yourself. This is for when you want something done —
          free resources and paid services, in one place.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {SERVICES.map((service) => (
            <div
              key={service.href}
              style={{ border: "1px solid var(--border-strong)", borderRadius: "12px", padding: "1.5rem" }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", marginBottom: "0.6rem" }}>
                <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, color: "var(--amber-strong)" }}>{service.name}</h2>
                <span style={{ fontSize: "var(--size-xs)", color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {service.price}
                </span>
              </div>
              <p style={{ fontSize: "var(--size-body)", color: "#fff", marginBottom: "1rem" }}>{service.tagline}</p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link href={service.href} className="btn btn-primary" style={{ padding: "0.65rem 1.25rem", fontSize: "var(--size-sm)" }}>
                  {service.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
