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

-- "Automatically expose new tables" was left off at project creation, so new
-- tables get no default grants at all -- not even for service_role, which
-- otherwise bypasses RLS but still needs a table-level grant to touch the
-- table in the first place. Grant it explicitly here.
grant insert, select on public.checklist_leads to service_role;
grant insert, select on public.consultation_leads to service_role;

-- No grants to anon/authenticated, so the public key cannot read or write these tables.
