-- Create flows table
create table public.flows (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  name text not null,
  nodes jsonb not null default '[]'::jsonb,
  edges jsonb not null default '[]'::jsonb,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table public.flows enable row level security;

-- Policies
create policy "Users can view their own flows"
  on public.flows for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own flows"
  on public.flows for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own flows"
  on public.flows for update
  using ( auth.uid() = user_id );

create policy "Public can view published flows for API execution"
  on public.flows for select
  using ( is_published = true or auth.uid() = user_id );
