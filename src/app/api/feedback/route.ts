import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const { comment, pageUrl } = await req.json();

  if (typeof comment !== "string" || !comment.trim()) {
    return NextResponse.json({ error: "Enter a comment first." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server is not configured yet." }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const { error: dbError } = await supabase.from("site_feedback").insert({
    comment,
    page_url: typeof pageUrl === "string" ? pageUrl : null,
  });
  if (dbError) {
    console.error("site_feedback insert failed:", dbError);
    return NextResponse.json({ error: "Could not save your feedback. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
