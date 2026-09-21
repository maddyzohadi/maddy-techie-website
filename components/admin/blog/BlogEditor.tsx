'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import RichTextEditor from './RichTextEditor'
import CoverImagePicker from './CoverImagePicker'
import BlogPreview from './BlogPreview'
import { slugify } from '@/lib/blog/slugify'
import type { AdminPost, ArticleSource, Locale, Post, PostStatus, PostTranslation } from '@/lib/blog/types'

interface TranslationForm {
  title: string
  slug: string
  excerpt: string
  body: string
  seo_title: string
  meta_description: string
  status: PostStatus
  submitted_for_review_at: string | null
  approved_at: string | null
  approved_by: string | null
  published_at: string | null
}

interface PostForm {
  cover_image_url: string
  cover_alt_en: string
  cover_alt_fa: string
  category_en: string
  category_fa: string
  author: string
}

interface SourceForm {
  title: string
  source_name: string
  url: string
  published_at: string
  date_accessed: string
  evidence_summary: string
  supported_claims: string
  is_verified: boolean
}

function emptyTranslation(): TranslationForm {
  return {
    title: '', slug: '', excerpt: '', body: '', seo_title: '', meta_description: '',
    status: 'draft', submitted_for_review_at: null, approved_at: null, approved_by: null, published_at: null,
  }
}

function toForm(t?: PostTranslation): TranslationForm {
  if (!t) return emptyTranslation()
  return {
    title: t.title, slug: t.slug, excerpt: t.excerpt, body: t.body,
    seo_title: t.seo_title, meta_description: t.meta_description,
    status: t.status,
    submitted_for_review_at: t.submitted_for_review_at,
    approved_at: t.approved_at,
    approved_by: t.approved_by,
    published_at: t.published_at,
  }
}

function toPostForm(p?: Post): PostForm {
  return {
    cover_image_url: p?.cover_image_url ?? '',
    cover_alt_en: p?.cover_alt_en ?? '',
    cover_alt_fa: p?.cover_alt_fa ?? '',
    category_en: p?.category_en ?? '',
    category_fa: p?.category_fa ?? '',
    author: p?.author ?? '',
  }
}

function emptySourceForm(): SourceForm {
  return {
    title: '',
    source_name: '',
    url: '',
    published_at: '',
    date_accessed: new Date().toISOString().slice(0, 10),
    evidence_summary: '',
    supported_claims: '',
    is_verified: false,
  }
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', fontSize: '13.5px', background: '#FFFDF8',
  border: '0.5px solid rgba(17,17,17,0.14)', borderRadius: '8px', color: '#111111',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
}

const btnPrimary: React.CSSProperties = {
  padding: '9px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: 600,
  background: '#ED5821', color: '#fff', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
}

const btnSecondary: React.CSSProperties = {
  padding: '9px 16px', borderRadius: '9px', fontSize: '13px', fontWeight: 500,
  background: '#FFFDF8', color: '#625B55', border: '0.5px solid rgba(17,17,17,0.12)', cursor: 'pointer', whiteSpace: 'nowrap',
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#B0A89E' }}>{hint}</p>}
    </div>
  )
}

export default function BlogEditor({ initialPost }: { initialPost: AdminPost | null }) {
  const router = useRouter()
  const [postId, setPostId] = useState<string | null>(initialPost?.post.id ?? null)
  const [postForm, setPostForm] = useState<PostForm>(toPostForm(initialPost?.post))
  const [translations, setTranslations] = useState<Record<Locale, TranslationForm>>({
    en: toForm(initialPost?.translations.en),
    fa: toForm(initialPost?.translations.fa),
  })
  const [slugTouched, setSlugTouched] = useState<Record<Locale, boolean>>({
    en: !!initialPost?.translations.en?.slug,
    fa: !!initialPost?.translations.fa?.slug,
  })
  const [activeTab, setActiveTab] = useState<Locale>('en')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [previewing, setPreviewing] = useState(false)
  const [deleteArmed, setDeleteArmed] = useState<'post' | Locale | null>(null)
  const [sources, setSources] = useState<ArticleSource[]>([])
  const [sourceForm, setSourceForm] = useState<SourceForm>(emptySourceForm())
  const [editingSourceId, setEditingSourceId] = useState<string | null>(null)
  const [sourceError, setSourceError] = useState('')
  const [sourceNotice, setSourceNotice] = useState('')
  const [aiTopic, setAiTopic] = useState('')
  const [aiInstructions, setAiInstructions] = useState('')
  const [aiDirection, setAiDirection] = useState('')
  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiError, setAiError] = useState('')
  const [aiSuccess, setAiSuccess] = useState('')
  const [aiOverwriteRequired, setAiOverwriteRequired] = useState(false)

  useEffect(() => {
    if (!postId) return
    const loadSources = async () => {
      try {
        const res = await fetch(`/api/admin/blog/${postId}/sources`)
        const data = await res.json()
        if (!res.ok) {
          setSourceError(data.error ?? 'Failed to load sources.')
          return
        }
        setSources(data.sources ?? [])
      } catch {
        setSourceError('Failed to load sources.')
      }
    }
    loadSources()
  }, [postId])

  const activeForm = translations[activeTab]
  const isFa = activeTab === 'fa'

  const setActiveField = <K extends keyof TranslationForm>(key: K, value: TranslationForm[K]) => {
    setTranslations((prev) => ({ ...prev, [activeTab]: { ...prev[activeTab], [key]: value } }))
  }

  const handleTitleChange = (value: string) => {
    setActiveField('title', value)
    if (!slugTouched[activeTab]) setActiveField('slug', slugify(value, activeTab))
  }

  const handleSlugChange = (value: string) => {
    setSlugTouched((prev) => ({ ...prev, [activeTab]: true }))
    setActiveField('slug', value)
  }

  async function ensurePostId(): Promise<string | null> {
    if (postId) return postId
    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postForm),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Failed to create post.')
      return null
    }
    setPostId(data.post.id)
    router.replace(`/admin/blog/${data.post.id}`)
    return data.post.id
  }

  const handleSavePostFields = async () => {
    setSaving(true); setError(''); setNotice('')
    try {
      const id = await ensurePostId()
      if (!id) return
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postForm),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Failed to save.'); return }
      setNotice('Post details saved.')
    } finally {
      setSaving(false)
    }
  }

  const saveSource = async () => {
    if (!postId) {
      setSourceError('Save the post first before adding sources.')
      return
    }

    setSaving(true)
    setSourceError('')
    setSourceNotice('')

    try {
      const payload = {
        ...sourceForm,
        published_at: sourceForm.published_at || null,
        date_accessed: sourceForm.date_accessed || new Date().toISOString(),
      }

      const res = editingSourceId
        ? await fetch(`/api/admin/blog/${postId}/sources/${editingSourceId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch(`/api/admin/blog/${postId}/sources`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })

      const data = await res.json()
      if (!res.ok) {
        setSourceError(data.error ?? 'Failed to save source.')
        return
      }

      const nextSource = data.source as ArticleSource
      setSources((prev) => {
        if (editingSourceId) {
          return prev.map((source) => source.id === editingSourceId ? nextSource : source)
        }
        return [...prev, nextSource]
      })
      setSourceForm(emptySourceForm())
      setEditingSourceId(null)
      setSourceNotice(editingSourceId ? 'Source updated.' : 'Source added.')
    } finally {
      setSaving(false)
    }
  }

  const beginEditSource = (source: ArticleSource) => {
    setEditingSourceId(source.id)
    setSourceForm({
      title: source.title,
      source_name: source.source_name,
      url: source.url,
      published_at: source.published_at ? new Date(source.published_at).toISOString().slice(0, 10) : '',
      date_accessed: source.date_accessed ? new Date(source.date_accessed).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      evidence_summary: source.evidence_summary,
      supported_claims: source.supported_claims,
      is_verified: source.is_verified,
    })
  }

  const removeSource = async (sourceId: string) => {
    if (!postId) return
    setSaving(true)
    setSourceError('')
    setSourceNotice('')
    try {
      const res = await fetch(`/api/admin/blog/${postId}/sources/${sourceId}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setSourceError(data.error ?? 'Failed to delete source.')
        return
      }
      setSources((prev) => prev.filter((source) => source.id !== sourceId))
      if (editingSourceId === sourceId) {
        setEditingSourceId(null)
        setSourceForm(emptySourceForm())
      }
      setSourceNotice('Source removed.')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveTranslation = async (status: PostStatus) => {
    setSaving(true); setError(''); setNotice('')
    try {
      const id = await ensurePostId()
      if (!id) return
      const res = await fetch(`/api/admin/blog/${id}/translations/${activeTab}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...activeForm, status }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Failed to save.'); return }
      setTranslations((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          status: data.translation.status,
          submitted_for_review_at: data.translation.submitted_for_review_at ?? null,
          approved_at: data.translation.approved_at ?? null,
          approved_by: data.translation.approved_by ?? null,
          published_at: data.translation.published_at ?? null,
        },
      }))

      if (status === 'draft') setNotice('Draft saved.')
      else if (status === 'in_review') setNotice('Submitted for review.')
      else if (status === 'approved') setNotice('Approved.')
      else setNotice('Published.')
    } finally {
      setSaving(false)
    }
  }

  const handleGenerateDraft = async (mode: 'draft' | 'localize' = 'draft') => {
    if (!postId) {
      setAiError('Save the post first before generating an AI draft.')
      return
    }

    if (!aiTopic.trim()) {
      setAiError('Enter an article topic or editorial direction before generating a draft.')
      return
    }

    const targetTranslation = mode === 'localize' ? translations.fa : translations.en
    const hasExistingDraft = ['title', 'slug', 'excerpt', 'body', 'seo_title', 'meta_description'].some((field) => {
      const value = targetTranslation[field as keyof TranslationForm]
      return typeof value === 'string' && value.trim().length > 0
    })

    if (hasExistingDraft && !aiOverwriteRequired) {
      setAiOverwriteRequired(true)
      setAiError('Existing draft content is present. Confirm overwrite to regenerate.')
      return
    }

    setAiGenerating(true)
    setAiError('')
    setAiSuccess('')

    try {
      const res = await fetch(`/api/admin/blog/${postId}/draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          mode,
          editorial_instructions: aiInstructions,
          editorial_direction: aiDirection,
          overwrite_existing: aiOverwriteRequired,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setAiError(data.error ?? 'Draft generation failed.')
        return
      }

      if (data.translation) {
        setTranslations((prev) => ({
          ...prev,
          [data.locale]: {
            ...prev[data.locale as Locale],
            ...toForm(data.translation),
            status: 'draft',
            submitted_for_review_at: null,
            approved_at: null,
            approved_by: null,
            published_at: null,
          },
        }))
      }

      setAiSuccess(mode === 'localize' ? 'Persian localization generated and saved as a draft.' : 'English AI draft generated and saved as a draft.')
      setAiOverwriteRequired(false)
      setAiTopic('')
      setAiInstructions('')
      setAiDirection('')
    } catch {
      setAiError('Draft generation failed unexpectedly.')
    } finally {
      setAiGenerating(false)
    }
  }

  const handleDeleteTranslation = async () => {
    if (!postId) return
    if (deleteArmed !== activeTab) { setDeleteArmed(activeTab); return }
    setSaving(true)
    try {
      await fetch(`/api/admin/blog/${postId}/translations/${activeTab}`, { method: 'DELETE' })
      setTranslations((prev) => ({ ...prev, [activeTab]: emptyTranslation() }))
      setSlugTouched((prev) => ({ ...prev, [activeTab]: false }))
      setNotice(`${activeTab.toUpperCase()} version deleted.`)
    } finally {
      setSaving(false); setDeleteArmed(null)
    }
  }

  const handleDeletePost = async () => {
    if (deleteArmed !== 'post') { setDeleteArmed('post'); return }
    if (!postId) { router.push('/admin/blog'); return }
    setSaving(true)
    try {
      await fetch(`/api/admin/blog/${postId}`, { method: 'DELETE' })
      router.push('/admin/blog')
    } finally {
      setSaving(false)
    }
  }

  const previewPost: Post = {
    id: postId ?? 'preview',
    cover_image_url: postForm.cover_image_url || null,
    cover_alt_en: postForm.cover_alt_en || null,
    cover_alt_fa: postForm.cover_alt_fa || null,
    category_en: postForm.category_en || null,
    category_fa: postForm.category_fa || null,
    author: postForm.author || null,
    topic_key: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const previewTranslation: PostTranslation = {
    id: 'preview', post_id: postId ?? 'preview', locale: activeTab,
    title: activeForm.title, slug: activeForm.slug, excerpt: activeForm.excerpt, body: activeForm.body,
    seo_title: activeForm.seo_title, meta_description: activeForm.meta_description,
    status: activeForm.status,
    submitted_for_review_at: activeForm.submitted_for_review_at ?? null,
    approved_at: activeForm.approved_at ?? null,
    approved_by: activeForm.approved_by ?? null,
    published_at: activeForm.published_at ?? new Date().toISOString(),
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  }

  return (
    <div style={{ padding: '32px 40px', maxWidth: '1200px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#111111' }}>
          {initialPost ? 'Edit Post' : 'New Post'}
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={btnSecondary} onClick={() => setPreviewing(true)}>Preview {activeTab.toUpperCase()}</button>
          <button
            style={{ ...btnSecondary, color: deleteArmed === 'post' ? '#C43E22' : '#625B55' }}
            onClick={handleDeletePost}
            disabled={saving}
          >
            {deleteArmed === 'post' ? 'Confirm delete post?' : 'Delete post'}
          </button>
        </div>
      </div>

      {error && (
        <p style={{ margin: '0 0 16px', padding: '10px 14px', background: 'rgba(200,60,30,0.07)', color: '#C43E22', borderRadius: '8px', fontSize: '13px' }}>{error}</p>
      )}
      {notice && (
        <p style={{ margin: '0 0 16px', padding: '10px 14px', background: 'rgba(52,211,153,0.10)', color: '#0F8A5F', borderRadius: '8px', fontSize: '13px' }}>{notice}</p>
      )}

      <div style={{ background: '#FFFDF8', border: '0.5px solid rgba(17,17,17,0.09)', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C0B8B2' }}>AI Draft Generation</p>
            <h2 style={{ margin: '6px 0 0', fontSize: '18px', fontWeight: 700, color: '#111111' }}>Topic + Evidence</h2>
          </div>
        </div>

        {aiError && (
          <p style={{ margin: '0 0 14px', padding: '10px 14px', background: 'rgba(200,60,30,0.07)', color: '#C43E22', borderRadius: '8px', fontSize: '13px' }}>{aiError}</p>
        )}
        {aiSuccess && (
          <p style={{ margin: '0 0 14px', padding: '10px 14px', background: 'rgba(52,211,153,0.10)', color: '#0F8A5F', borderRadius: '8px', fontSize: '13px' }}>{aiSuccess}</p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>Article Topic / Editorial Direction</label>
            <input value={aiTopic} onChange={(e) => setAiTopic(e.target.value)} placeholder="e.g. AI adoption patterns for SMBs" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>Editorial instructions</label>
            <textarea value={aiInstructions} onChange={(e) => setAiInstructions(e.target.value)} rows={2} placeholder="Optional: tone, angle, audience, structure..." style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>Editorial direction</label>
            <textarea value={aiDirection} onChange={(e) => setAiDirection(e.target.value)} rows={2} placeholder="Optional: strategic emphasis or narrative focus..." style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button style={{ ...btnPrimary, opacity: aiGenerating ? 0.7 : 1 }} onClick={() => handleGenerateDraft('draft')} disabled={aiGenerating || !postId}>
            {aiGenerating ? 'Generating...' : 'Generate English Draft'}
          </button>
          {translations.en.status === 'approved' && (
            <button style={btnSecondary} onClick={() => handleGenerateDraft('localize')} disabled={aiGenerating || !postId}>
              Localize Persian
            </button>
          )}
          {aiOverwriteRequired && (
            <button style={btnSecondary} onClick={() => { setAiOverwriteRequired(false); setAiError(''); handleGenerateDraft(activeTab === 'fa' && translations.en.status === 'approved' ? 'localize' : 'draft') }} disabled={aiGenerating}>
              Confirm overwrite
            </button>
          )}
        </div>
      </div>

      <div style={{ background: '#FFFDF8', border: '0.5px solid rgba(17,17,17,0.09)', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C0B8B2' }}>Research Sources</p>
            <h2 style={{ margin: '6px 0 0', fontSize: '18px', fontWeight: 700, color: '#111111' }}>Source Evidence</h2>
          </div>
        </div>

        {sourceError && (
          <p style={{ margin: '0 0 14px', padding: '10px 14px', background: 'rgba(200,60,30,0.07)', color: '#C43E22', borderRadius: '8px', fontSize: '13px' }}>{sourceError}</p>
        )}
        {sourceNotice && (
          <p style={{ margin: '0 0 14px', padding: '10px 14px', background: 'rgba(52,211,153,0.10)', color: '#0F8A5F', borderRadius: '8px', fontSize: '13px' }}>{sourceNotice}</p>
        )}

        {!postId && (
          <p style={{ margin: 0, fontSize: '13px', color: '#8C7E74' }}>Save the article first to add source evidence.</p>
        )}

        {postId && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>Title</label>
                <input value={sourceForm.title} onChange={(e) => setSourceForm((prev) => ({ ...prev, title: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>Publisher</label>
                <input value={sourceForm.source_name} onChange={(e) => setSourceForm((prev) => ({ ...prev, source_name: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>URL</label>
                <input value={sourceForm.url} onChange={(e) => setSourceForm((prev) => ({ ...prev, url: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>Published</label>
                <input type="date" value={sourceForm.published_at} onChange={(e) => setSourceForm((prev) => ({ ...prev, published_at: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>Accessed</label>
                <input type="date" value={sourceForm.date_accessed} onChange={(e) => setSourceForm((prev) => ({ ...prev, date_accessed: e.target.value }))} style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>Evidence summary</label>
              <textarea value={sourceForm.evidence_summary} onChange={(e) => setSourceForm((prev) => ({ ...prev, evidence_summary: e.target.value }))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>Supported claims</label>
              <textarea value={sourceForm.supported_claims} onChange={(e) => setSourceForm((prev) => ({ ...prev, supported_claims: e.target.value }))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#625B55' }}>
                <input type="checkbox" checked={sourceForm.is_verified} onChange={(e) => setSourceForm((prev) => ({ ...prev, is_verified: e.target.checked }))} />
                Verified source
              </label>
              <button style={btnPrimary} onClick={saveSource} disabled={saving}>
                {editingSourceId ? 'Save Source' : 'Add Source'}
              </button>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {sources.length === 0 ? (
                <p style={{ margin: 0, padding: '16px', border: '0.5px dashed rgba(17,17,17,0.12)', borderRadius: '10px', color: '#8C7E74' }}>No sources added yet.</p>
              ) : (
                sources.map((source) => (
                  <div key={source.id} style={{ border: '0.5px solid rgba(17,17,17,0.09)', borderRadius: '12px', padding: '14px', background: '#FFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#111111' }}>{source.title || 'Untitled source'}</div>
                        <div style={{ fontSize: '12px', color: '#625B55' }}>{source.source_name || 'Unknown source'}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button style={btnSecondary} onClick={() => beginEditSource(source)} disabled={saving}>Edit</button>
                        <button style={{ ...btnSecondary, color: '#C43E22' }} onClick={() => removeSource(source.id)} disabled={saving}>Remove</button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '12px', color: '#625B55', marginBottom: '10px' }}>
                      <div><strong style={{ color: '#111111' }}>URL:</strong> {source.url || '—'}</div>
                      <div><strong style={{ color: '#111111' }}>Published:</strong> {source.published_at ? new Date(source.published_at).toISOString().slice(0, 10) : '—'}</div>
                      <div><strong style={{ color: '#111111' }}>Accessed:</strong> {source.date_accessed ? new Date(source.date_accessed).toISOString().slice(0, 10) : '—'}</div>
                      <div><strong style={{ color: '#111111' }}>Verified:</strong> {source.is_verified ? 'Yes' : 'No'}</div>
                    </div>

                    <div style={{ fontSize: '12px', color: '#625B55', marginBottom: '6px' }}><strong style={{ color: '#111111' }}>Evidence:</strong> {source.evidence_summary || '—'}</div>
                    <div style={{ fontSize: '12px', color: '#625B55' }}><strong style={{ color: '#111111' }}>Claims:</strong> {source.supported_claims || '—'}</div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Shared post fields */}
        <div style={{ background: '#FFFDF8', border: '0.5px solid rgba(17,17,17,0.09)', borderRadius: '14px', padding: '20px' }}>
          <p style={{ margin: '0 0 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C0B8B2' }}>Post details</p>

          <Field label="Cover image">
            <CoverImagePicker url={postForm.cover_image_url} onChange={(url) => setPostForm((p) => ({ ...p, cover_image_url: url }))} />
          </Field>
          <Field label="Cover alt text (English)">
            <input value={postForm.cover_alt_en} onChange={(e) => setPostForm((p) => ({ ...p, cover_alt_en: e.target.value }))} style={inputStyle} />
          </Field>
          <Field label="Cover alt text (Persian)">
            <input value={postForm.cover_alt_fa} onChange={(e) => setPostForm((p) => ({ ...p, cover_alt_fa: e.target.value }))} style={{ ...inputStyle, direction: 'rtl' }} />
          </Field>
          <Field label="Category (English)">
            <input value={postForm.category_en} onChange={(e) => setPostForm((p) => ({ ...p, category_en: e.target.value }))} style={inputStyle} />
          </Field>
          <Field label="Category (Persian)">
            <input value={postForm.category_fa} onChange={(e) => setPostForm((p) => ({ ...p, category_fa: e.target.value }))} style={{ ...inputStyle, direction: 'rtl' }} />
          </Field>
          <Field label="Author">
            <input value={postForm.author} onChange={(e) => setPostForm((p) => ({ ...p, author: e.target.value }))} style={inputStyle} />
          </Field>

          <button style={{ ...btnPrimary, width: '100%' }} onClick={handleSavePostFields} disabled={saving}>
            Save post details
          </button>
        </div>

        {/* Language tabs + translation content */}
        <div style={{ background: '#FFFDF8', border: '0.5px solid rgba(17,17,17,0.09)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
            {(['en', 'fa'] as const).map((locale) => (
              <button
                key={locale}
                onClick={() => setActiveTab(locale)}
                style={{
                  padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                  background: activeTab === locale ? '#111111' : 'rgba(17,17,17,0.06)',
                  color: activeTab === locale ? '#fff' : '#625B55',
                }}
              >
                {locale === 'en' ? 'English' : 'فارسی'}
                <span style={{ marginInlineStart: '8px', fontSize: '10px', fontWeight: 700, opacity: 0.75 }}>
                  {translations[locale].status === 'published' ? '● Published' : '○ Draft'}
                </span>
              </button>
            ))}
          </div>

          <div dir={isFa ? 'rtl' : 'ltr'}>
            <Field label="Title">
              <input value={activeForm.title} onChange={(e) => handleTitleChange(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Slug" hint={`Public URL: /${activeTab}/blog/${activeForm.slug || '…'}`}>
              <input value={activeForm.slug} onChange={(e) => handleSlugChange(e.target.value)} style={{ ...inputStyle, direction: 'ltr', textAlign: isFa ? 'right' : 'left' }} />
            </Field>
            <Field label="Excerpt">
              <textarea value={activeForm.excerpt} onChange={(e) => setActiveField('excerpt', e.target.value)} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
            </Field>
            <Field label="Body">
              <RichTextEditor key={activeTab} content={activeForm.body} locale={activeTab} onChange={(html) => setActiveField('body', html)} />
            </Field>
            <Field label="SEO title">
              <input value={activeForm.seo_title} onChange={(e) => setActiveField('seo_title', e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Meta description">
              <textarea value={activeForm.meta_description} onChange={(e) => setActiveField('meta_description', e.target.value)} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
            </Field>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px', paddingTop: '16px', borderTop: '0.5px solid rgba(17,17,17,0.09)' }}>
            <button style={btnSecondary} onClick={() => handleSaveTranslation('draft')} disabled={saving}>Save draft</button>
            <button style={btnSecondary} onClick={() => handleSaveTranslation('in_review')} disabled={saving}>Submit for Review</button>
            <button style={btnSecondary} onClick={() => handleSaveTranslation('approved')} disabled={saving}>Approve</button>
            {activeForm.status === 'published' ? (
              <button style={btnSecondary} onClick={() => handleSaveTranslation('draft')} disabled={saving}>Unpublish</button>
            ) : (
              <button style={btnPrimary} onClick={() => handleSaveTranslation('published')} disabled={saving}>Publish {activeTab.toUpperCase()}</button>
            )}
            <button
              style={{ ...btnSecondary, color: deleteArmed === activeTab ? '#C43E22' : '#625B55', marginInlineStart: 'auto' }}
              onClick={handleDeleteTranslation}
              disabled={saving || !postId}
            >
              {deleteArmed === activeTab ? 'Confirm delete?' : `Delete ${activeTab.toUpperCase()} version`}
            </button>
          </div>
        </div>
      </div>

      {previewing && (
        <BlogPreview post={previewPost} translation={previewTranslation} onClose={() => setPreviewing(false)} />
      )}
    </div>
  )
}
