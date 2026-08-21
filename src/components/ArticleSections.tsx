import type { ReactNode } from "react";
import { ArticleContentBlock, ArticleSection } from "@/lib/knowledge-graph";

function SectionContent({ block }: { block: ArticleContentBlock }) {
  switch (block.kind) {
    case "p":
      return <p style={{ color: "var(--text-1)", lineHeight: 1.65 }}>{block.text}</p>;
    case "subheading":
      return (
        <p style={{ fontSize: "var(--size-sm)", fontWeight: 700, color: "var(--amber-strong)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {block.items.map((item) => (
            <li key={item} style={{ color: "var(--text-1)", lineHeight: 1.6 }}>
              {item}
            </li>
          ))}
        </ul>
      );
    case "diagram":
      return (
        <pre
          className="card"
          style={{
            padding: "1.25rem",
            overflowX: "auto",
            fontSize: "var(--size-sm)",
            lineHeight: 1.5,
            color: "var(--ink)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {block.text}
        </pre>
      );
    case "definitions":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {block.items.map((d) => (
            <div key={d.term} className="card" style={{ padding: "0.9rem 1.1rem" }}>
              <strong style={{ color: "var(--ink)", fontSize: "var(--size-body)" }}>{d.term}</strong>
              <p style={{ color: "var(--ink-2)", marginTop: "0.25rem" }}>{d.text}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function ArticleSectionsBlock({ sections }: { sections: ArticleSection[] }) {
  if (!sections || sections.length === 0) return null;

  const elements: ReactNode[] = [];
  let number = 0;
  let i = 0;

  while (i < sections.length) {
    const section = sections[i];

    if (section.group) {
      const groupName = section.group;
      const groupSections: ArticleSection[] = [];
      while (i < sections.length && sections[i].group === groupName) {
        groupSections.push(sections[i]);
        i++;
      }
      elements.push(
        <div key={`group-${groupName}`}>
          <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1.5rem", color: "var(--danger)" }}>
            {groupName}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {groupSections.map((gs) => (
              <div key={gs.heading} className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)", marginBottom: "0.9rem" }}>
                  {gs.heading}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                  {gs.content.map((block, j) => (
                    <SectionContent key={j} block={block} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      continue;
    }

    number++;
    elements.push(
      <div key={section.heading}>
        <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1rem" }}>
          {number}. {section.heading}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {section.content.map((block, j) => (
            <SectionContent key={j} block={block} />
          ))}
        </div>
      </div>
    );
    i++;
  }

  return <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginBottom: "3rem" }}>{elements}</div>;
}
