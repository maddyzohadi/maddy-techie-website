-- Bilingual blog setup for maddythetechie.com
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query)
--
-- Data model: one `posts` row holds language-agnostic fields (cover image,
-- author, category per language, timestamps). Each post has up to two
-- `post_translations` rows (locale = 'en' | 'fa'), each with its own
-- status/published_at — so English and Persian versions publish independently.
--
-- Admin access is granted via a custom JWT claim (app_metadata.is_admin),
-- set once on your Supabase Auth user by scripts/create-admin-user.mjs.
-- No service-role key is used by the running app — RLS below is the only
-- write gate, checked against the signed-in user's own session.
--
-- SAFE TO RE-RUN: every statement below is written to be idempotent
-- (CREATE ... IF NOT EXISTS, CREATE OR REPLACE, DROP POLICY IF EXISTS before
-- CREATE POLICY, INSERT ... ON CONFLICT DO NOTHING). Re-running this script
-- will not duplicate objects, drop existing blog data, or touch any table,
-- function, policy, or storage bucket outside the ones defined here
-- (`posts`, `post_translations`, `is_admin`, `set_updated_at`, the
-- `blog-images` bucket, and their own policies).
--
-- PRE-FLIGHT CHECK (recommended, one-time): `CREATE OR REPLACE FUNCTION`
-- below will silently overwrite any pre-existing function with the same
-- name and signature. This repo has no other SQL defining `is_admin()` or
-- `set_updated_at()` (only supabase/rag-setup.sql exists alongside this,
-- and it defines neither), but if you've ever created either name manually
-- in the Supabase dashboard outside this repo, check first:
--   select proname from pg_proc where proname in ('is_admin', 'set_updated_at');

-- 1. Helper: is the current request from the admin user?
--    Reads app_metadata.is_admin directly off the JWT — no extra table
--    lookup, and no unqualified references (search_path locked to empty
--    for defense in depth — auth.jwt() is already schema-qualified).
create or replace function is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean,
    false
  );
$$;

-- 2. updated_at trigger helper (same search_path hardening; now() resolves
--    via pg_catalog regardless, so this is safe with an empty search_path).
create or replace function set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 3. posts — shared, language-agnostic fields
create table if not exists posts (
  id                uuid primary key default gen_random_uuid(),
  cover_image_url   text,
  cover_alt_en      text,
  cover_alt_fa      text,
  category_en       text,
  category_fa       text,
  author            text,
  topic_key         text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists posts_topic_key_idx
  on posts (topic_key);

drop trigger if exists posts_set_updated_at on posts;
create trigger posts_set_updated_at
  before update on posts
  for each row execute function set_updated_at();

-- 4. post_translations — one row per (post, locale), independently publishable
create table if not exists post_translations (
  id                         uuid primary key default gen_random_uuid(),
  post_id                    uuid not null references posts(id) on delete cascade,
  locale                     text not null check (locale in ('en', 'fa')),
  title                      text not null default '',
  slug                       text not null default '',
  excerpt                    text not null default '',
  body                       text not null default '',
  seo_title                  text not null default '',
  meta_description           text not null default '',
  status                     text not null default 'draft' check (status in ('draft', 'in_review', 'approved', 'published')),
  submitted_for_review_at    timestamptz,
  approved_at                timestamptz,
  approved_by                text,
  published_at               timestamptz,
  created_at                 timestamptz not null default now(),
  updated_at                 timestamptz not null default now(),
  unique (post_id, locale),
  unique (locale, slug)
);

drop trigger if exists post_translations_set_updated_at on post_translations;
create trigger post_translations_set_updated_at
  before update on post_translations
  for each row execute function set_updated_at();

create index if not exists post_translations_status_idx
  on post_translations (locale, status, published_at desc);

-- 5. Minimal evidence table for source-backed editorial review.
create table if not exists article_sources (
  id                uuid primary key default gen_random_uuid(),
  post_id           uuid not null references posts(id) on delete cascade,
  title             text not null default '',
  source_name       text not null default '',
  url               text not null default '',
  published_at      timestamptz,
  date_accessed     timestamptz not null default now(),
  evidence_summary  text not null default '',
  supported_claims  text not null default '',
  is_verified       boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

drop trigger if exists article_sources_set_updated_at on article_sources;
create trigger article_sources_set_updated_at
  before update on article_sources
  for each row execute function set_updated_at();

create index if not exists article_sources_post_id_idx
  on article_sources (post_id, is_verified, published_at desc);

-- 6. RLS — posts (enabled unconditionally; safe to re-run, ALTER TABLE
--    ... ENABLE ROW LEVEL SECURITY is itself idempotent)
alter table posts enable row level security;

-- Public can read a post's shared fields only if at least one translation
-- of it is published (otherwise there's nothing publicly linked to it).
drop policy if exists "public read posts with a published translation" on posts;
create policy "public read posts with a published translation"
  on posts for select
  to anon, authenticated
  using (
    exists (
      select 1 from post_translations pt
      where pt.post_id = posts.id and pt.status = 'published'
    )
  );

drop policy if exists "admin full access to posts" on posts;
create policy "admin full access to posts"
  on posts for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- 7. RLS — post_translations
alter table post_translations enable row level security;

drop policy if exists "public read published translations" on post_translations;
create policy "public read published translations"
  on post_translations for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "admin full access to translations" on post_translations;
create policy "admin full access to translations"
  on post_translations for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- 8. RLS — article_sources
alter table article_sources enable row level security;

drop policy if exists "public read article sources for published posts" on article_sources;

drop policy if exists "admin full access to article sources" on article_sources;
create policy "admin full access to article sources"
  on article_sources for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- 9. Storage — blog-images bucket (covers/ and body/ prefixes)
-- ON CONFLICT DO NOTHING: never overwrites an existing bucket's config,
-- and never touches any other bucket in the project.
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- storage.objects already has RLS enabled by Supabase for every project —
-- these policies are scoped to bucket_id = 'blog-images' only and never
-- affect objects in any other bucket.
drop policy if exists "public read blog images" on storage.objects;
create policy "public read blog images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'blog-images');

drop policy if exists "admin write blog images" on storage.objects;
create policy "admin write blog images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images' and is_admin());

drop policy if exists "admin update blog images" on storage.objects;
create policy "admin update blog images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-images' and is_admin())
  with check (bucket_id = 'blog-images' and is_admin());

drop policy if exists "admin delete blog images" on storage.objects;
create policy "admin delete blog images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images' and is_admin());

-- ─────────────────────────────────────────────────────────────────────────
-- ROLLBACK (destructive — do not run unless you intend to permanently
-- remove the blog feature and all its content):
--
--   drop policy if exists "admin delete blog images" on storage.objects;
--   drop policy if exists "admin update blog images" on storage.objects;
--   drop policy if exists "admin write blog images" on storage.objects;
--   drop policy if exists "public read blog images" on storage.objects;
--   drop policy if exists "admin full access to article sources" on article_sources;
--   drop policy if exists "public read article sources for published posts" on article_sources;
--   delete from storage.objects where bucket_id = 'blog-images';   -- ⚠ deletes every uploaded cover/body image, irreversibly
--   delete from storage.buckets where id = 'blog-images';
--   drop table if exists article_sources;                          -- ⚠ deletes all research evidence, irreversibly
--   drop table if exists post_translations;                       -- ⚠ deletes every draft and published post's content, irreversibly
--   drop table if exists posts;                                   -- ⚠ deletes every post's cover/author/category, irreversibly
--   drop function if exists is_admin();
--   drop function if exists set_updated_at();
--
-- ⚠ WARNING: the two `delete from storage.objects` / `drop table` lines
-- permanently destroy all blog posts and uploaded images with no undo
-- short of a database backup restore. Do not run this block casually —
-- it is provided for reference only, in case you ever need to fully
-- decommission the blog feature.
-- ─────────────────────────────────────────────────────────────────────────
