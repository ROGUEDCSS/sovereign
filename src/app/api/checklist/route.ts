import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const { email } = await req.json();

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server is not configured yet." }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const { error: dbError } = await supabase.from("checklist_leads").insert({ email });
  if (dbError) {
    return NextResponse.json({ error: "Could not save your email. Try again." }, { status: 500 });
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Sovereign <onboarding@resend.dev>",
      to: email,
      subject: "Your Sovereign Resilience Checklist",
      html: `<p>Here's your copy of the Resilience Checklist.</p><p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/sovereign-resilience-checklist.pdf">Download the PDF</a></p>`,
    });
  }

  return NextResponse.json({ ok: true });
}
