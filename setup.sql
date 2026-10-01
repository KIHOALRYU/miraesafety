-- Supabase SQL Editor에서 한 번 실행하세요.
create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('notice','resource')),
  title text not null,
  content text default '',
  file_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.posts enable row level security;

drop policy if exists "public can read published posts" on public.posts;
create policy "public can read published posts" on public.posts for select using (published = true or auth.role() = 'authenticated');

drop policy if exists "authenticated can insert posts" on public.posts;
create policy "authenticated can insert posts" on public.posts for insert to authenticated with check (true);

drop policy if exists "authenticated can update posts" on public.posts;
create policy "authenticated can update posts" on public.posts for update to authenticated using (true) with check (true);

drop policy if exists "authenticated can delete posts" on public.posts;
create policy "authenticated can delete posts" on public.posts for delete to authenticated using (true);

insert into storage.buckets (id,name,public) values ('attachments','attachments',true) on conflict (id) do update set public=true;

drop policy if exists "public can read attachments" on storage.objects;
create policy "public can read attachments" on storage.objects for select using (bucket_id='attachments');

drop policy if exists "authenticated can upload attachments" on storage.objects;
create policy "authenticated can upload attachments" on storage.objects for insert to authenticated with check (bucket_id='attachments');

drop policy if exists "authenticated can update attachments" on storage.objects;
create policy "authenticated can update attachments" on storage.objects for update to authenticated using (bucket_id='attachments') with check (bucket_id='attachments');

drop policy if exists "authenticated can delete attachments" on storage.objects;
create policy "authenticated can delete attachments" on storage.objects for delete to authenticated using (bucket_id='attachments');
