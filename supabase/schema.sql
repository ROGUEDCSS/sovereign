-- Run this in the Supabase SQL editor for the Sovereign project.

create table if not exists checklist_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists consultation_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  property_location text not null,
  notes text,
  created_at timestamptz not null default now()
);

alter table checklist_leads enable row level security;
alter table consultation_leads enable row level security;

-- Inserts happen only from the server (service role key), which bypasses RLS.
-- No public policies are defined, so the anon/public key cannot read or write these tables.
