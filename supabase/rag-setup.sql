-- RAG setup for maddythetechie.com chatbot
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query)

-- 1. Enable pgvector extension
create extension if not exists vector;

-- 2. Documents table (text-embedding-004 = 768 dimensions)
create table if not exists documents (
  id          bigserial primary key,
  content     text        not null,
  metadata    jsonb       not null default '{}',
  locale      text        not null default 'en',
  embedding   vector(768),
  created_at  timestamptz not null default now()
);

-- 3. Vector similarity index
create index if not exists documents_embedding_idx
  on documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- 4. Full-text search index
create index if not exists documents_locale_idx on documents (locale);

-- 5. match_documents function used by the chatbot RAG
create or replace function match_documents(
  query_embedding vector(768),
  match_threshold float    default 0.50,
  match_count     int      default 5,
  filter_locale   text     default null
)
returns table (
  id         bigint,
  content    text,
  metadata   jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    d.id,
    d.content,
    d.metadata,
    1 - (d.embedding <=> query_embedding) as similarity
  from documents d
  where
    (filter_locale is null or d.locale = filter_locale)
    and d.embedding is not null
    and 1 - (d.embedding <=> query_embedding) > match_threshold
  order by d.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- 6. RLS — allow the service role to do everything, anon to read
alter table documents enable row level security;

create policy "service role full access" on documents
  for all using (auth.role() = 'service_role');

create policy "anon read" on documents
  for select using (true);
