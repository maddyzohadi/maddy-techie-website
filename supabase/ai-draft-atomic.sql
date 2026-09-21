-- Atomic AI translation writes and bilingual publication.
-- Execute this in Supabase SQL before using the editorial workflow.

drop function if exists public.admin_upsert_ai_draft(uuid, text, jsonb, jsonb);

create or replace function public.admin_upsert_ai_translation(
  p_post_id uuid,
  p_locale text,
  p_topic_key text,
  p_translation jsonb
)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_current_status text;
  v_english_status text;
  v_translation jsonb;
begin
  if not public.is_admin() then
    raise exception 'Admin access required.' using errcode = '42501';
  end if;

  if p_locale not in ('en', 'fa') then
    raise exception 'Invalid locale.' using errcode = 'P0002';
  end if;

  select coalesce(status, 'draft')
  into v_current_status
  from public.post_translations
  where post_id = p_post_id and locale = p_locale;

  if v_current_status is not null and v_current_status <> 'draft' then
    raise exception 'AI generation is only available for draft translations.' using errcode = 'P0002';
  end if;

  if p_locale = 'fa' then
    select status into v_english_status
    from public.post_translations
    where post_id = p_post_id and locale = 'en';

    if coalesce(v_english_status, '') <> 'approved' then
      raise exception 'Persian localization requires an approved English translation.' using errcode = 'P0002';
    end if;
  end if;

  if p_translation is null
     or p_translation->>'title' is null
     or p_translation->>'slug' is null
     or p_translation->>'excerpt' is null
     or p_translation->>'body' is null
     or p_translation->>'seo_title' is null
     or p_translation->>'meta_description' is null then
    raise exception 'Incomplete translation payload.' using errcode = 'P0002';
  end if;

  insert into public.post_translations (
    post_id, locale, title, slug, excerpt, body, seo_title,
    meta_description, status, submitted_for_review_at, approved_at,
    approved_by, published_at
  )
  values (
    p_post_id,
    p_locale,
    p_translation->>'title',
    p_translation->>'slug',
    p_translation->>'excerpt',
    p_translation->>'body',
    p_translation->>'seo_title',
    p_translation->>'meta_description',
    'draft', null, null, null, null
  )
  on conflict (post_id, locale)
  do update set
    title = excluded.title,
    slug = excluded.slug,
    excerpt = excluded.excerpt,
    body = excluded.body,
    seo_title = excluded.seo_title,
    meta_description = excluded.meta_description,
    status = 'draft',
    submitted_for_review_at = null,
    approved_at = null,
    approved_by = null,
    published_at = null;

  update public.posts
  set topic_key = coalesce(p_topic_key, topic_key)
  where id = p_post_id;

  select to_jsonb(pt) into v_translation
  from public.post_translations pt
  where pt.post_id = p_post_id and pt.locale = p_locale;

  return jsonb_build_object('translation', v_translation, 'topic_key', p_topic_key);
end;
$$;

revoke all on function public.admin_upsert_ai_translation(uuid, text, text, jsonb) from public;
revoke all on function public.admin_upsert_ai_translation(uuid, text, text, jsonb) from anon;
grant execute on function public.admin_upsert_ai_translation(uuid, text, text, jsonb) to authenticated;

create or replace function public.admin_publish_bilingual_post(p_post_id uuid)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_english public.post_translations%rowtype;
  v_persian public.post_translations%rowtype;
begin
  if not public.is_admin() then
    raise exception 'Admin access required.' using errcode = '42501';
  end if;

  select * into v_english
  from public.post_translations
  where post_id = p_post_id and locale = 'en'
  for update;

  select * into v_persian
  from public.post_translations
  where post_id = p_post_id and locale = 'fa'
  for update;

  if v_english.id is null or v_persian.id is null
     or v_english.status <> 'approved'
     or v_persian.status <> 'approved' then
    raise exception 'Both translations must be approved before publication.' using errcode = 'P0002';
  end if;

  if btrim(v_english.title) = '' or btrim(v_english.slug) = ''
     or btrim(v_english.body) = '' or btrim(v_english.seo_title) = ''
     or btrim(v_english.meta_description) = ''
     or btrim(v_persian.title) = '' or btrim(v_persian.slug) = ''
     or btrim(v_persian.body) = '' or btrim(v_persian.seo_title) = ''
     or btrim(v_persian.meta_description) = '' then
    raise exception 'Both translations must contain all publishable fields.' using errcode = 'P0002';
  end if;

  update public.post_translations
  set status = 'published', published_at = coalesce(published_at, now())
  where post_id = p_post_id and locale in ('en', 'fa');

  return jsonb_build_object('post_id', p_post_id, 'status', 'published');
end;
$$;

revoke all on function public.admin_publish_bilingual_post(uuid) from public;
revoke all on function public.admin_publish_bilingual_post(uuid) from anon;
grant execute on function public.admin_publish_bilingual_post(uuid) to authenticated;