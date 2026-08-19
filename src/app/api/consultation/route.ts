import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const { name, email, propertyLocation, notes } = await req.json();

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (typeof propertyLocation !== "string" || !propertyLocation.trim()) {
    return NextResponse.json({ error: "Enter the property's location or a listing link." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server is not configured yet." }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const { error: dbError } = await supabase.from("consultation_leads").insert({
    name,
    email,
    property_location: propertyLocation,
    notes: typeof notes === "string" ? notes : null,
  });
  if (dbError) {
    return NextResponse.json({ error: "Could not submit your request. Try again." }, { status: 500 });
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM_EMAIL ?? "Sovereign <onboarding@resend.dev>";

    await resend.emails.send({
      from,
      to: email,
      subject: "Your Sovereign Property Consultation request",
      html: `<p>Thanks, ${name} — we've received your request for a Sovereign Property Consultation on:</p><p>${propertyLocation}</p><p>We'll be in touch to scope and quote it.</p>`,
    });

    if (process.env.CONSULTATION_NOTIFY_EMAIL) {
      await resend.emails.send({
        from,
        to: process.env.CONSULTATION_NOTIFY_EMAIL,
        subject: "New consultation request",
        html: `<p>${name} (${email}) requested a consultation.</p><p><strong>Property:</strong> ${propertyLocation}</p><p><strong>Notes:</strong> ${notes || "—"}</p>`,
      });
    }
  }

  return NextResponse.json({ ok: true });
}
