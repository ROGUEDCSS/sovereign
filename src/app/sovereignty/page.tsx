import Link from "next/link";

export default function SovereigntyPage() {
  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "1rem" }}>
          Before you begin
        </div>
        <h1 style={{ fontSize: "var(--size-h1)", fontWeight: 500, lineHeight: 1.15, marginBottom: "1.5rem" }}>
          What does it mean to be Sovereign?
        </h1>
        <p style={{ fontSize: "var(--size-h4)", color: "var(--text-2)", marginBottom: "2.5rem" }}>
          Not a legal theory. Not a loophole. Not a flag you fly against the government. Sovereignty,
          here, means something much more practical: how much of your life keeps running when the
          systems you don&apos;t control stop running for you.
        </p>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 700, marginBottom: "0.75rem", color: "var(--amber-strong)" }}>
            Not what you&apos;ve heard elsewhere
          </h2>
          <p style={{ color: "var(--text-2)", lineHeight: 1.7 }}>
            The &quot;sovereign citizen&quot; movement — the idea that you can declare yourself
            outside the law, refuse to pay tax, or void a contract with the right words — is a
            different thing entirely, and it doesn&apos;t work. Courts reject it consistently, and
            it has hurt the people who&apos;ve tried it. Nothing on this site relies on that theory,
            and nothing here will tell you the law doesn&apos;t apply to you.
          </p>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 700, marginBottom: "0.75rem", color: "var(--amber-strong)" }}>
            What you build, and what you don&apos;t control
          </h2>
          <p style={{ color: "var(--text-2)", lineHeight: 1.7, marginBottom: "1rem" }}>
            Sovereignty here splits into two honest halves. One is{" "}
            <Link href="/codex" style={{ color: "var(--amber-strong)" }}>
              the Sovereign Codex
            </Link>{" "}
            — everything you can actually build and control: your identity, your finances, your
            home, your food and water and energy, your skills, your family, your community. Four
            circles, radiating outward from you.
          </p>
          <p style={{ color: "var(--text-2)", lineHeight: 1.7 }}>
            The other is{" "}
            <Link href="/world" style={{ color: "var(--amber-strong)" }}>
              the World
            </Link>{" "}
            — governments, institutions, policy, the systems everyone depends on and no individual
            controls. You don&apos;t get sovereignty by pretending the World doesn&apos;t apply to
            you. You get it by understanding the World clearly, and making sure your own life
            doesn&apos;t collapse the moment it fails you.
          </p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 700, marginBottom: "0.75rem", color: "var(--amber-strong)" }}>
            Why this, why now
          </h2>
          <p style={{ color: "var(--text-2)", lineHeight: 1.7 }}>
            Most households only discover how exposed they are after something breaks — a job, a
            bank, a supply chain, a grid. Sovereignty is the work of finding that out before it
            happens, and closing the gaps you actually have time to close. It&apos;s not
            about fear. It&apos;s about options.
          </p>
        </section>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/assessment" className="btn btn-primary" style={{ fontSize: "var(--size-body)" }}>
            Get your Sovereign Score →
          </Link>
          <Link href="/codex" className="btn btn-primary" style={{ fontSize: "var(--size-body)" }}>
            Explore the Codex
          </Link>
        </div>
      </div>
    </main>
  );
}
