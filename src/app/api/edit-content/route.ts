import { NextResponse } from "next/server";
import path from "path";
import { Project, SyntaxKind } from "ts-morph";

/**
 * Local-dev-only inline editing. Never runs in production — the route
 * refuses outside NODE_ENV=development, and the file a client can target
 * is always resolved through this allowlist, never a raw path from the
 * request body, so there's no path-traversal surface.
 */
const EDITABLE_FILES: Record<string, string> = {
  "knowledge-graph": "src/lib/knowledge-graph.ts",
  codex: "src/lib/codex.ts",
  domains: "src/lib/domains.ts",
  home: "src/app/page.tsx",
};

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Inline editing only runs in local dev." }, { status: 403 });
  }

  const { fileKey, oldText, newText } = await req.json();

  if (typeof fileKey !== "string" || !(fileKey in EDITABLE_FILES)) {
    return NextResponse.json({ error: "Unknown file." }, { status: 400 });
  }
  if (typeof oldText !== "string" || typeof newText !== "string") {
    return NextResponse.json({ error: "Missing text." }, { status: 400 });
  }
  if (oldText === newText) {
    return NextResponse.json({ ok: true, unchanged: true });
  }

  const relativePath = EDITABLE_FILES[fileKey];
  const absolutePath = path.join(process.cwd(), relativePath);

  const project = new Project({ tsConfigFilePath: path.join(process.cwd(), "tsconfig.json") });
  const sourceFile = project.addSourceFileAtPath(absolutePath);

  const literals = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.StringLiteral),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.NoSubstitutionTemplateLiteral),
  ];
  const matches = literals.filter((node) => node.getLiteralValue() === oldText);

  if (matches.length === 0) {
    return NextResponse.json(
      { error: "Couldn't find that exact text in the source file — it may have already changed. Reload and try again." },
      { status: 404 }
    );
  }
  if (matches.length > 1) {
    return NextResponse.json(
      { error: `That text appears ${matches.length} times in the file — too ambiguous to edit safely. Make the surrounding text more unique first.` },
      { status: 409 }
    );
  }

  matches[0].setLiteralValue(newText);
  await sourceFile.save();

  return NextResponse.json({ ok: true });
}
