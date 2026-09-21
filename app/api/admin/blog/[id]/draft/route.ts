import { NextRequest, NextResponse } from 'next/server'
import { requireAdminUser } from '@/lib/admin/auth'
import { createClient } from '@/lib/supabase/server'
import { sanitizeBody } from '@/lib/blog/sanitize'
import { slugify } from '@/lib/blog/slugify'
import type { Locale } from '@/lib/blog/types'

const OR_URL = 'https://openrouter.ai/api/v1/chat/completions'
const OR_MODEL = process.env.OPENROUTER_MODEL ?? 'openai/gpt-4o-mini'

type DraftLocale = 'en' | 'fa'

type DraftPayload = {
  title: string
  slug: string
  excerpt: string
  body: string
  seo_title: string
  meta_description: string
}

type AiGenerationResponse = {
  draft?: Partial<DraftPayload>
  english?: Partial<DraftPayload>
  persian?: Partial<DraftPayload>
  en?: Partial<DraftPayload>
  fa?: Partial<DraftPayload>
}

function normalizeTopicKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function getTranslationStatus(row: { status?: string } | null | undefined): string {
  return row?.status ?? 'draft'
}

function ensureNonEmptyText(value: unknown, fallback = ''): string {
  const text = typeof value === 'string' ? value.trim() : fallback
  return text || fallback
}

function extractJson(text: string): any {
  const cleaned = text.trim()
  const jsonMatch = cleaned.match(/```json\s*([\s\S]*?)\s*```/i) ?? cleaned.match(/```\s*([\s\S]*?)\s*```/i)
  if (jsonMatch) return JSON.parse(jsonMatch[1])
  return JSON.parse(cleaned)
}

function validateDraftBlock(data: Partial<DraftPayload> | null | undefined, locale: DraftLocale): DraftPayload {
  if (!data || typeof data !== 'object') {
    throw new Error(`Invalid ${locale} draft payload.`)
  }

  const title = ensureNonEmptyText(data.title)
  const excerpt = ensureNonEmptyText(data.excerpt)
  const body = ensureNonEmptyText(data.body)
  const seoTitle = ensureNonEmptyText(data.seo_title)
  const metaDescription = ensureNonEmptyText(data.meta_description)

  if (!title || !excerpt || !body || !seoTitle || !metaDescription) {
    throw new Error(`Incomplete ${locale} draft payload.`)
  }

  const rawSlug = ensureNonEmptyText(data.slug)
  const slug = locale === 'en' ? slugify(rawSlug || title, 'en') : slugify(rawSlug || title, 'fa')
  if (!slug) {
    throw new Error(`Invalid ${locale} slug.`)
  }

  return {
    title,
    slug,
    excerpt,
    body,
    seo_title: seoTitle,
    meta_description: metaDescription,
  }
}

async function fetchOpenRouterDraft(
  locale: DraftLocale,
  topic: string,
  editorialInstructions: string,
  editorialDirection: string,
  evidence: string,
  englishDraft?: DraftPayload,
): Promise<AiGenerationResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error('OpenRouter is not configured on the server.')
  }

  const system = [
    'You are an editor helping produce a source-grounded article draft.',
    'Only use the verified research sources provided below.',
    'Do not invent facts, statistics, quotes, URLs, names, dates, or claims.',
    'If the evidence is insufficient, return a clear insufficiency error instead of guessing.',
    `Write a realistic ${locale === 'en' ? 'English' : 'Persian localization'} draft in JSON with the key: draft.`,
    'The draft must include title, slug, excerpt, body, seo_title, meta_description.',
    'Body content must be HTML-safe rich text, not plain text only.',
    'Keep factual content aligned to the evidence and avoid unsupported interpretation.',
    'The user-supplied topic is only editorial direction; it is not factual evidence.',
  ].join(' ')

  const user = JSON.stringify({
    topic,
    editorial_instructions: editorialInstructions,
    editorial_direction: editorialDirection,
    evidence,
    approved_english_draft: englishDraft ?? null,
    output_contract: {
      draft: {
        title: 'string',
        slug: 'string',
        excerpt: 'string',
        body: 'string',
        seo_title: 'string',
        meta_description: 'string',
      },
      locale,
    },
    constraints: [
      'Never claim facts not present in evidence.',
      'Do not fabricate statistics, quotations, names, URLs, or dates.',
      'If you cannot support a claim with the supplied evidence, omit it.',
      'If the evidence is too thin, return { insufficiency: "..." } instead of hallucinating.',
    ],
  })

  const response = await fetch(OR_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://www.maddythetechie.com',
      'X-Title': 'Maddy the Techie',
    },
    body: JSON.stringify({
      model: OR_MODEL,
      temperature: 0.4,
      max_tokens: 2000,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  })

  if (!response.ok) {
    const errText = await response.text().catch(() => '')
    throw new Error(`OpenRouter failed: ${response.status}${errText ? ` - ${errText.slice(0, 220)}` : ''}`)
  }

  const data = await response.json()
  const content = data?.choices?.[0]?.message?.content
  if (!content || typeof content !== 'string') {
    throw new Error('OpenRouter returned an empty response.')
  }

  return extractJson(content)
}

function buildEvidenceContext(sources: Array<Record<string, unknown>>): string {
  if (!sources.length) return 'No verified sources available.'

  return sources
    .map((source) => {
      const title = String(source.title ?? '').trim() || 'Untitled source'
      const sourceName = String(source.source_name ?? '').trim() || 'Unknown source'
      const url = String(source.url ?? '').trim() || 'No URL provided'
      const publishedAt = source.published_at ? new Date(String(source.published_at)).toISOString().slice(0, 10) : 'Unknown publication date'
      const evidence = String(source.evidence_summary ?? '').trim() || 'No evidence summary provided.'
      const claims = String(source.supported_claims ?? '').trim() || 'No supported claims provided.'
      return `- Title: ${title}\n  Source: ${sourceName}\n  URL: ${url}\n  Published: ${publishedAt}\n  Evidence summary: ${evidence}\n  Supported claims: ${claims}`
    })
    .join('\n\n')
}

function isNonEmptyDraftContent(row: { [key: string]: unknown } | null | undefined): boolean {
  if (!row) return false
  return ['title', 'slug', 'excerpt', 'body', 'seo_title', 'meta_description'].some((field) => {
    const value = row[field]
    return typeof value === 'string' && value.trim().length > 0
  })
}

async function ensureUniqueSlug(supabase: Awaited<ReturnType<typeof createClient>>, locale: Locale, baseSlug: string, postId: string): Promise<string> {
  const normalized = (baseSlug || 'draft').trim() || 'draft'
  const slug = locale === 'en' ? slugify(normalized, 'en') : slugify(normalized, 'fa')
  const candidate = slug || 'draft'

  const { data: match } = await supabase
    .from('post_translations')
    .select('id, slug, locale')
    .eq('locale', locale)
    .neq('post_id', postId)
    .eq('slug', candidate)
    .maybeSingle()

  if (!match) return candidate

  return `${candidate}-draft`
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminUser()
  if (auth.error) return auth.error

  const { id } = await params
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const topic = String(body.topic ?? '').trim()
  const editorialInstructions = String(body.editorial_instructions ?? '').trim()
  const editorialDirection = String(body.editorial_direction ?? '').trim()
  const overwriteExisting = body.overwrite_existing === true
  const mode = body.mode === 'localize' ? 'localize' : 'draft'

  if (!topic) {
    return NextResponse.json({ error: 'Article topic is required before generating content.' }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (postError || !post) {
    return NextResponse.json({ error: 'Post not found.' }, { status: 404 })
  }

  const { data: existingTranslations, error: translationError } = await supabase
    .from('post_translations')
    .select('*')
    .eq('post_id', id)

  if (translationError) {
    return NextResponse.json({ error: 'Failed to read translation state.' }, { status: 500 })
  }

  const englishTranslation = existingTranslations?.find((translation) => translation.locale === 'en') ?? null
  const persianTranslation = existingTranslations?.find((translation) => translation.locale === 'fa') ?? null

  if (mode === 'draft' && englishTranslation && getTranslationStatus(englishTranslation) !== 'draft') {
    return NextResponse.json({ error: 'English draft generation is blocked because the English translation is no longer in draft state.' }, { status: 409 })
  }

  if (mode === 'localize' && getTranslationStatus(englishTranslation) !== 'approved') {
    return NextResponse.json({ error: 'Persian localization requires an approved English translation.' }, { status: 409 })
  }

  const targetTranslation = mode === 'localize' ? persianTranslation : englishTranslation
  if (targetTranslation && getTranslationStatus(targetTranslation) !== 'draft') {
    return NextResponse.json({ error: 'The target translation is no longer in draft state.' }, { status: 409 })
  }

  if (!overwriteExisting && isNonEmptyDraftContent(targetTranslation)) {
    return NextResponse.json({ error: 'Existing draft content already exists. Confirm overwrite before regenerating.' }, { status: 409 })
  }

  const { data: sources, error: sourcesError } = await supabase
    .from('article_sources')
    .select('*')
    .eq('post_id', id)
    .eq('is_verified', true)
    .order('created_at', { ascending: false })

  if (sourcesError) {
    return NextResponse.json({ error: 'Failed to load verified sources.' }, { status: 500 })
  }

  if (!sources || sources.length === 0) {
    return NextResponse.json({ error: 'AI draft generation requires at least one verified source for this article.' }, { status: 409 })
  }

  let modelOutput: AiGenerationResponse
  try {
    modelOutput = await fetchOpenRouterDraft(
      mode === 'localize' ? 'fa' : 'en',
      topic,
      editorialInstructions,
      editorialDirection,
      buildEvidenceContext(sources),
      mode === 'localize' ? englishTranslation as DraftPayload : undefined,
    )
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'AI generation failed.' }, { status: 500 })
  }

  if ('insufficiency' in (modelOutput as Record<string, unknown>)) {
    return NextResponse.json({ error: String((modelOutput as Record<string, unknown>).insufficiency ?? 'Verified sources are insufficient to support this topic.') }, { status: 422 })
  }

  const locale = mode === 'localize' ? 'fa' : 'en'
  const draftCandidate = validateDraftBlock(
    modelOutput.draft ?? (locale === 'en' ? modelOutput.english ?? modelOutput.en : modelOutput.persian ?? modelOutput.fa) ?? null,
    locale,
  )

  const nextTopicKey = normalizeTopicKey(topic)

  const slug = await ensureUniqueSlug(supabase, locale, draftCandidate.slug, id)
  const translationRow = {
    post_id: id,
    locale,
    title: draftCandidate.title,
    slug,
    excerpt: draftCandidate.excerpt,
    body: sanitizeBody(draftCandidate.body),
    seo_title: draftCandidate.seo_title,
    meta_description: draftCandidate.meta_description,
    status: 'draft',
    submitted_for_review_at: null,
    approved_at: null,
    approved_by: null,
    published_at: null,
  }

  try {
    const { data, error } = await supabase.rpc('admin_upsert_ai_translation', {
      p_post_id: id,
      p_locale: locale,
      p_topic_key: nextTopicKey || null,
      p_translation: translationRow,
    })

    if (error) {
      throw new Error(error.message)
    }

    if (!data) {
      throw new Error('AI draft transaction returned no data.')
    }

    return NextResponse.json({
      ok: true,
      locale,
      translation: data.translation,
      topic_key: data.topic_key ?? nextTopicKey,
    })
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'AI generation failed and no draft was saved.',
    }, { status: 500 })
  }
}
