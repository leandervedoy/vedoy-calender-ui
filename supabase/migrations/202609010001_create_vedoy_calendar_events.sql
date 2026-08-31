create table public.vedoy_calendar_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  starts_at timestamptz not null,
  ends_at timestamptz,
  guests text[] not null default '{}',
  location text not null default '',
  meeting_url text,
  reminder_minutes smallint not null default 15 check (reminder_minutes in (0, 5, 10, 15, 30, 60, 120, 1440)),
  repeat_rule text not null default 'none' check (repeat_rule in ('none', 'weekly', 'monthly')),
  source text not null default 'manual' check (source in ('manual', 'google', 'microsoft', 'vedoy')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index vedoy_calendar_events_user_starts_at_idx on public.vedoy_calendar_events (user_id, starts_at);

alter table public.vedoy_calendar_events enable row level security;

revoke all on table public.vedoy_calendar_events from anon, authenticated;
grant select, insert, update, delete on table public.vedoy_calendar_events to authenticated;

create policy "Calendar users select own events"
  on public.vedoy_calendar_events for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Calendar users insert own events"
  on public.vedoy_calendar_events for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Calendar users update own events"
  on public.vedoy_calendar_events for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Calendar users delete own events"
  on public.vedoy_calendar_events for delete to authenticated
  using ((select auth.uid()) = user_id);
