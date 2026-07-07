'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────

type Platform    = 'Instagram' | 'TikTok' | 'LinkedIn'
type Language    = 'English' | 'Persian'
type Format      = 'Reel' | 'TikTok' | 'Carousel' | 'LinkedIn Post'
type AssetStatus = 'Not Started' | 'Asset Needed' | 'Asset Created'
type ReviewStatus = 'Draft Ready' | 'Needs Review' | 'Approved' | 'Needs Edit'
type YesNo       = 'Yes' | 'No'

interface ContentItem {
  id:               string
  date:             string
  platform:         Platform
  language:         Language
  pillar:           string
  topic:            string
  hook:             string
  format:           Format
  script:           string
  caption:          string
  cta:              string
  hashtags:         string
  visualDirection:  string
  assetStatus:      AssetStatus
  reviewStatus:     ReviewStatus
  finalApproved:    YesNo
  scheduled:        YesNo
  published:        YesNo
  publishLink:      string
  performanceNotes: string
}

// ── Constants ──────────────────────────────────────────────────────────────

const PLATFORMS:     Platform[]    = ['Instagram', 'TikTok', 'LinkedIn']
const LANGUAGES:     Language[]    = ['English', 'Persian']
const FORMATS:       Format[]      = ['Reel', 'TikTok', 'Carousel', 'LinkedIn Post']
const ASSET_OPTS:    AssetStatus[] = ['Not Started', 'Asset Needed', 'Asset Created']
const REVIEW_OPTS:   ReviewStatus[] = ['Draft Ready', 'Needs Review', 'Approved', 'Needs Edit']
const YESNO:         YesNo[]       = ['No', 'Yes']

const LS_KEY = 'mdt_content_v1'

// ── Helpers ────────────────────────────────────────────────────────────────

function emptyForm(): Partial<ContentItem> {
  return {
    date:             new Date().toISOString().slice(0, 10),
    platform:         'Instagram',
    language:         'English',
    pillar:           '',
    topic:            '',
    hook:             '',
    format:           'Reel',
    script:           '',
    caption:          '',
    cta:              '',
    hashtags:         '',
    visualDirection:  '',
    assetStatus:      'Not Started',
    reviewStatus:     'Draft Ready',
    finalApproved:    'No',
    scheduled:        'No',
    published:        'No',
    publishLink:      '',
    performanceNotes: '',
  }
}

function nextId(items: ContentItem[]): string {
  const max = items.reduce((m, item) => {
    const n = parseInt(item.id.replace(/\D/g, ''), 10)
    return isNaN(n) ? m : Math.max(m, n)
  }, 0)
  return `P${String(max + 1).padStart(3, '0')}`
}

function platformBadge(p: Platform): React.CSSProperties {
  const map: Record<Platform, React.CSSProperties> = {
    Instagram: { background: 'rgba(237,88,33,0.10)', color: '#B85520' },
    TikTok:    { background: 'rgba(17,17,17,0.10)',  color: '#111111' },
    LinkedIn:  { background: 'rgba(17,17,17,0.07)',  color: '#5A504A' },
  }
  return map[p]
}

function reviewBadge(r: ReviewStatus): React.CSSProperties {
  const map: Record<ReviewStatus, React.CSSProperties> = {
    'Draft Ready':  { background: 'rgba(17,17,17,0.05)', color: '#8C7E74' },
    'Needs Review': { background: 'rgba(237,88,33,0.10)', color: '#B85520' },
    'Approved':     { background: 'rgba(17,17,17,0.12)', color: '#111111', fontWeight: 600 },
    'Needs Edit':   { background: 'rgba(200,60,30,0.10)', color: '#C43E22' },
  }
  return map[r]
}

function assetBadge(a: AssetStatus): React.CSSProperties {
  const map: Record<AssetStatus, React.CSSProperties> = {
    'Not Started':   { background: 'rgba(17,17,17,0.04)', color: '#B0A89E' },
    'Asset Needed':  { background: 'rgba(237,88,33,0.09)', color: '#B85520' },
    'Asset Created': { background: 'rgba(17,17,17,0.09)', color: '#5A504A' },
  }
  return map[a]
}

function yesnoBadge(v: YesNo): React.CSSProperties {
  return v === 'Yes'
    ? { background: 'rgba(17,17,17,0.11)', color: '#111111', fontWeight: 600 }
    : { background: 'rgba(17,17,17,0.04)', color: '#B0A89E' }
}

function Badge({ label, style }: { label: string; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        display:      'inline-block',
        padding:      '2px 9px',
        borderRadius: '100px',
        fontSize:     '11px',
        fontWeight:   500,
        whiteSpace:   'nowrap',
        ...style,
      }}
    >
      {label}
    </span>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width:      '100%',
  padding:    '8px 11px',
  fontSize:   '13px',
  background: '#FFFDF8',
  border:     '0.5px solid rgba(17,17,17,0.14)',
  borderRadius: '8px',
  color:      '#111111',
  outline:    'none',
  boxSizing:  'border-box',
  fontFamily: 'inherit',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
}

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize:    'vertical',
  minHeight: '72px',
  lineHeight: '1.5',
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <p
        style={{
          margin:        '0 0 12px',
          fontSize:      '10px',
          fontWeight:    700,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color:         '#C0B8B2',
        }}
      >
        {title}
      </p>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label
        style={{
          display:       'block',
          fontSize:      '11px',
          fontWeight:    600,
          color:         '#8C7E74',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom:  '5px',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label:    string
  value:    string
  onChange: (v: string) => void
  options:  string[]
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding:      '7px 12px',
        fontSize:     '12.5px',
        background:   '#FFFDF8',
        border:       '0.5px solid rgba(17,17,17,0.12)',
        borderRadius: '8px',
        color:        value === 'All' ? '#8C7E74' : '#111111',
        cursor:       'pointer',
        fontFamily:   'inherit',
        outline:      'none',
        fontWeight:   value === 'All' ? 400 : 600,
      }}
    >
      <option value="All">{label}: All</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

interface Filters {
  platform:      string
  reviewStatus:  string
  finalApproved: string
  published:     string
}

export default function ContentPage() {
  const [mounted,      setMounted]      = useState(false)
  const [items,        setItems]        = useState<ContentItem[]>([])
  const [filters,      setFilters]      = useState<Filters>({ platform: 'All', reviewStatus: 'All', finalApproved: 'All', published: 'All' })
  const [panelOpen,    setPanelOpen]    = useState(false)
  const [editingItem,  setEditingItem]  = useState<ContentItem | null>(null)
  const [form,         setForm]         = useState<Partial<ContentItem>>(emptyForm())
  const [deleteId,     setDeleteId]     = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true)
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        setItems(JSON.parse(raw) as ContentItem[])
      }
      // No seeding — start empty until the user adds real content
    } catch {
      // localStorage unavailable; items stay empty
    }
  }, [])

  const persist = useCallback((next: ContentItem[]) => {
    setItems(next)
    try { localStorage.setItem(LS_KEY, JSON.stringify(next)) } catch { /* quota */ }
  }, [])

  // Filtered view
  const filtered = items.filter(item => {
    if (filters.platform      !== 'All' && item.platform      !== filters.platform)      return false
    if (filters.reviewStatus  !== 'All' && item.reviewStatus  !== filters.reviewStatus)  return false
    if (filters.finalApproved !== 'All' && item.finalApproved !== filters.finalApproved) return false
    if (filters.published     !== 'All' && item.published     !== filters.published)     return false
    return true
  })

  const hasActiveFilter = Object.values(filters).some(v => v !== 'All')

  // CRUD
  const openNew = () => {
    setEditingItem(null)
    setForm(emptyForm())
    setPanelOpen(true)
  }

  const openEdit = (item: ContentItem) => {
    setEditingItem(item)
    setForm({ ...item })
    setPanelOpen(true)
  }

  const closePanel = () => {
    setPanelOpen(false)
    setDeleteId(null)
  }

  const setField = (key: keyof ContentItem, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const handleSave = () => {
    if (editingItem) {
      persist(items.map(i => i.id === editingItem.id ? { ...editingItem, ...form } as ContentItem : i))
    } else {
      const newItem: ContentItem = { ...emptyForm(), ...form, id: nextId(items) } as ContentItem
      persist([...items, newItem])
    }
    closePanel()
  }

  const handleDelete = (id: string) => {
    if (deleteId === id) {
      persist(items.filter(i => i.id !== id))
      if (editingItem?.id === id) closePanel()
      setDeleteId(null)
    } else {
      setDeleteId(id)
      setTimeout(() => setDeleteId(null), 3000)
    }
  }

  // CSV export
  const exportCSV = () => {
    const esc = (v: string) => `"${(v ?? '').replace(/"/g, '""')}"`
    const headers = ['ID','Date','Platform','Language','Pillar','Topic','Hook','Format',
      'Script','Caption','CTA','Hashtags','Visual Direction','Asset Status',
      'Review Status','Final Approved','Scheduled','Published','Publish Link','Performance Notes']
    const rows = items.map(i => [
      i.id, i.date, i.platform, i.language,
      esc(i.pillar), esc(i.topic), esc(i.hook), i.format,
      esc(i.script), esc(i.caption), esc(i.cta), esc(i.hashtags),
      esc(i.visualDirection), i.assetStatus, i.reviewStatus,
      i.finalApproved, i.scheduled, i.published, esc(i.publishLink), esc(i.performanceNotes),
    ].join(','))
    const csv  = [headers.join(','), ...rows].join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `content-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!mounted) return null

  const btnPrimary: React.CSSProperties = {
    padding:      '8px 16px',
    borderRadius: '9px',
    fontSize:     '13px',
    fontWeight:   600,
    background:   '#ED5821',
    color:        '#fff',
    border:       'none',
    cursor:       'pointer',
    whiteSpace:   'nowrap',
  }

  const btnSecondary: React.CSSProperties = {
    padding:      '8px 14px',
    borderRadius: '9px',
    fontSize:     '13px',
    fontWeight:   500,
    background:   '#FFFDF8',
    color:        '#625B55',
    border:       '0.5px solid rgba(17,17,17,0.12)',
    cursor:       'pointer',
    whiteSpace:   'nowrap',
  }

  // ── Render ────────────────────────────────────────────────────────

  return (
    <div style={{ padding: '32px 40px', maxWidth: '1440px', position: 'relative' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#111111', letterSpacing: '-0.02em' }}>
              Content Dashboard
            </h1>
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#8C7E74', background: 'rgba(17,17,17,0.06)', padding: '3px 8px', borderRadius: '100px' }}>
              localStorage · MVP
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#8C7E74' }}>
            {items.length} item{items.length !== 1 ? 's' : ''} total
            {hasActiveFilter && ` · ${filtered.length} shown after filter`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button style={btnSecondary} onClick={exportCSV}>↓ Export CSV</button>
          <button style={btnPrimary}   onClick={openNew}>+ New Content</button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
        <FilterSelect label="Platform"      value={filters.platform}      onChange={v => setFilters(f => ({ ...f, platform: v }))}      options={PLATFORMS} />
        <FilterSelect label="Review"        value={filters.reviewStatus}  onChange={v => setFilters(f => ({ ...f, reviewStatus: v }))}  options={REVIEW_OPTS} />
        <FilterSelect label="Approved"      value={filters.finalApproved} onChange={v => setFilters(f => ({ ...f, finalApproved: v }))} options={YESNO} />
        <FilterSelect label="Published"     value={filters.published}     onChange={v => setFilters(f => ({ ...f, published: v }))}     options={YESNO} />
        {hasActiveFilter && (
          <button
            onClick={() => setFilters({ platform: 'All', reviewStatus: 'All', finalApproved: 'All', published: 'All' })}
            style={{ ...btnSecondary, fontSize: '12px', padding: '7px 12px', color: '#C43E22', borderColor: 'rgba(200,60,30,0.20)' }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── Table ── */}
      <div
        style={{
          background:   '#FFFDF8',
          border:       '0.5px solid rgba(17,17,17,0.09)',
          borderRadius: '14px',
          overflow:     'hidden',
          marginBottom: '12px',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '980px' }}>
            <thead>
              <tr style={{ background: 'rgba(17,17,17,0.025)' }}>
                {['ID','Date','Platform','Language','Topic','Format','Asset','Review','Approved','Published',''].map(h => (
                  <th
                    key={h}
                    style={{
                      padding:       '10px 16px',
                      textAlign:     'left',
                      fontSize:      '11px',
                      fontWeight:    600,
                      color:         '#8C7E74',
                      letterSpacing: '0.06em',
                      whiteSpace:    'nowrap',
                      borderBottom:  '0.5px solid rgba(17,17,17,0.07)',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={11}>
                    <div style={{ padding: '56px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      {hasActiveFilter ? (
                        <p style={{ margin: 0, fontSize: '13px', color: '#B0A89E' }}>No items match the current filters.</p>
                      ) : (
                        <>
                          <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#625B55' }}>No content items yet.</p>
                          <p style={{ margin: 0, fontSize: '13px', color: '#B0A89E', maxWidth: '380px', lineHeight: 1.6 }}>
                            Click <strong style={{ color: '#C43E22' }}>+ New Content</strong> to add your first Instagram, TikTok, or LinkedIn post.
                          </p>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((item, i) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: i < filtered.length - 1 ? '0.5px solid rgba(17,17,17,0.05)' : 'none',
                      transition:   'background 0.12s',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(17,17,17,0.015)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                  >
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '12px', color: '#8C7E74', whiteSpace: 'nowrap' }}>
                      {item.id}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12.5px', color: '#625B55', whiteSpace: 'nowrap' }}>
                      {item.date}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Badge label={item.platform} style={platformBadge(item.platform)} />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Badge
                        label={item.language}
                        style={
                          item.language === 'Persian'
                            ? { background: 'rgba(237,88,33,0.07)', color: '#B85520' }
                            : { background: 'rgba(17,17,17,0.05)', color: '#8C7E74' }
                        }
                      />
                    </td>
                    <td style={{ padding: '12px 16px', maxWidth: '220px' }}>
                      <span
                        style={{
                          display:      'block',
                          fontSize:     '13px',
                          color:        '#111111',
                          overflow:     'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace:   'nowrap',
                        }}
                        title={item.topic}
                      >
                        {item.topic || <em style={{ color: '#B0A89E' }}>No topic</em>}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Badge label={item.format} style={{ background: 'rgba(17,17,17,0.06)', color: '#625B55' }} />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Badge label={item.assetStatus} style={assetBadge(item.assetStatus)} />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Badge label={item.reviewStatus} style={reviewBadge(item.reviewStatus)} />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Badge label={item.finalApproved} style={yesnoBadge(item.finalApproved)} />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Badge label={item.published} style={yesnoBadge(item.published)} />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => openEdit(item)}
                          style={{
                            padding:      '5px 12px',
                            borderRadius: '7px',
                            fontSize:     '12px',
                            fontWeight:   500,
                            background:   'rgba(237,88,33,0.08)',
                            color:        '#C43E22',
                            border:       'none',
                            cursor:       'pointer',
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          style={{
                            padding:      '5px 10px',
                            borderRadius: '7px',
                            fontSize:     '12px',
                            fontWeight:   500,
                            background:   deleteId === item.id ? 'rgba(200,60,30,0.14)' : 'rgba(17,17,17,0.05)',
                            color:        deleteId === item.id ? '#C43E22' : '#B0A89E',
                            border:       'none',
                            cursor:       'pointer',
                            transition:   'background 0.15s, color 0.15s',
                          }}
                          title={deleteId === item.id ? 'Click again to confirm delete' : 'Delete'}
                        >
                          {deleteId === item.id ? 'Confirm?' : '✕'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <p style={{ margin: '0 0 32px', fontSize: '12px', color: '#C0B8B2', fontStyle: 'italic' }}>
        This MVP uses localStorage. For real client use, upgrade to a database such as Supabase.
      </p>

      {/* ── Slide-out panel ── */}
      {panelOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closePanel}
            style={{
              position:       'fixed',
              inset:          0,
              background:     'rgba(17,17,17,0.28)',
              zIndex:         40,
              backdropFilter: 'blur(2px)',
            }}
          />

          {/* Panel */}
          <div
            style={{
              position:      'fixed',
              top:            0,
              right:          0,
              bottom:         0,
              width:          '500px',
              maxWidth:       '100vw',
              background:     '#FAF6EF',
              zIndex:         50,
              display:        'flex',
              flexDirection:  'column',
              boxShadow:      '-4px 0 32px rgba(17,17,17,0.14)',
              fontFamily:     'system-ui, -apple-system, sans-serif',
            }}
          >
            {/* Panel header */}
            <div
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                padding:        '20px 24px',
                borderBottom:   '0.5px solid rgba(17,17,17,0.10)',
                flexShrink:     0,
              }}
            >
              <div>
                <h2 style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: 700, color: '#111111' }}>
                  {editingItem ? `Edit ${editingItem.id}` : 'New Content Item'}
                </h2>
                <p style={{ margin: 0, fontSize: '12px', color: '#8C7E74' }}>
                  {editingItem ? 'Update the fields below' : 'Fill in the details for your new post'}
                </p>
              </div>
              <button
                onClick={closePanel}
                style={{
                  width:        '32px',
                  height:       '32px',
                  borderRadius: '8px',
                  background:   'rgba(17,17,17,0.06)',
                  border:       'none',
                  cursor:       'pointer',
                  fontSize:     '16px',
                  color:        '#8C7E74',
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent: 'center',
                  flexShrink:   0,
                }}
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

              <FormSection title="Basic Info">
                <Field label="Date">
                  <input type="date" value={form.date ?? ''} onChange={e => setField('date', e.target.value)} style={inputStyle} />
                </Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <Field label="Platform">
                    <select value={form.platform ?? 'Instagram'} onChange={e => setField('platform', e.target.value)} style={selectStyle}>
                      {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </Field>
                  <Field label="Language">
                    <select value={form.language ?? 'English'} onChange={e => setField('language', e.target.value)} style={selectStyle}>
                      {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Content Pillar">
                  <input type="text" value={form.pillar ?? ''} onChange={e => setField('pillar', e.target.value)} placeholder="e.g. AI Productivity" style={inputStyle} />
                </Field>
                <Field label="Topic">
                  <input type="text" value={form.topic ?? ''} onChange={e => setField('topic', e.target.value)} placeholder="e.g. How to use ChatGPT for emails" style={inputStyle} />
                </Field>
              </FormSection>

              <FormSection title="Content">
                <Field label="Hook">
                  <textarea value={form.hook ?? ''} onChange={e => setField('hook', e.target.value)} placeholder="Opening line that stops the scroll" style={textareaStyle} rows={2} />
                </Field>
                <Field label="Format">
                  <select value={form.format ?? 'Reel'} onChange={e => setField('format', e.target.value)} style={selectStyle}>
                    {FORMATS.map(f => <option key={f}>{f}</option>)}
                  </select>
                </Field>
                <Field label="Script / Draft">
                  <textarea value={form.script ?? ''} onChange={e => setField('script', e.target.value)} placeholder="Full script or talking points" style={textareaStyle} rows={4} />
                </Field>
                <Field label="Caption">
                  <textarea value={form.caption ?? ''} onChange={e => setField('caption', e.target.value)} placeholder="Post caption" style={textareaStyle} rows={4} />
                </Field>
                <Field label="CTA">
                  <input type="text" value={form.cta ?? ''} onChange={e => setField('cta', e.target.value)} placeholder="e.g. Save this for your next email" style={inputStyle} />
                </Field>
                <Field label="Hashtags">
                  <input type="text" value={form.hashtags ?? ''} onChange={e => setField('hashtags', e.target.value)} placeholder="#AI #ChatGPT #NoCode" style={inputStyle} />
                </Field>
              </FormSection>

              <FormSection title="Visual">
                <Field label="Visual Direction">
                  <textarea value={form.visualDirection ?? ''} onChange={e => setField('visualDirection', e.target.value)} placeholder="Describe the visual style, camera, lighting, etc." style={textareaStyle} rows={2} />
                </Field>
              </FormSection>

              <FormSection title="Status &amp; Publishing">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <Field label="Asset Status">
                    <select value={form.assetStatus ?? 'Not Started'} onChange={e => setField('assetStatus', e.target.value)} style={selectStyle}>
                      {ASSET_OPTS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Review Status">
                    <select value={form.reviewStatus ?? 'Draft Ready'} onChange={e => setField('reviewStatus', e.target.value)} style={selectStyle}>
                      {REVIEW_OPTS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Final Approved">
                    <select value={form.finalApproved ?? 'No'} onChange={e => setField('finalApproved', e.target.value)} style={selectStyle}>
                      {YESNO.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Scheduled">
                    <select value={form.scheduled ?? 'No'} onChange={e => setField('scheduled', e.target.value)} style={selectStyle}>
                      {YESNO.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Published">
                    <select value={form.published ?? 'No'} onChange={e => setField('published', e.target.value)} style={selectStyle}>
                      {YESNO.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Publish Link">
                  <input type="url" value={form.publishLink ?? ''} onChange={e => setField('publishLink', e.target.value)} placeholder="https://instagram.com/p/..." style={inputStyle} />
                </Field>
              </FormSection>

              <FormSection title="Notes">
                <Field label="Performance Notes">
                  <textarea value={form.performanceNotes ?? ''} onChange={e => setField('performanceNotes', e.target.value)} placeholder="Reach, saves, comments, lessons learned…" style={textareaStyle} rows={3} />
                </Field>
              </FormSection>

            </div>

            {/* Panel footer */}
            <div
              style={{
                display:        'flex',
                justifyContent: 'space-between',
                alignItems:     'center',
                padding:        '16px 24px',
                borderTop:      '0.5px solid rgba(17,17,17,0.10)',
                flexShrink:     0,
                background:     '#FAF6EF',
                gap:            '12px',
              }}
            >
              {editingItem ? (
                <button
                  onClick={() => handleDelete(editingItem.id)}
                  style={{
                    padding:      '9px 16px',
                    borderRadius: '9px',
                    fontSize:     '13px',
                    fontWeight:   500,
                    background:   deleteId === editingItem.id ? 'rgba(200,60,30,0.12)' : 'rgba(17,17,17,0.05)',
                    color:        deleteId === editingItem.id ? '#C43E22' : '#B0A89E',
                    border:       'none',
                    cursor:       'pointer',
                    transition:   'background 0.15s, color 0.15s',
                  }}
                >
                  {deleteId === editingItem.id ? 'Confirm delete?' : 'Delete'}
                </button>
              ) : (
                <span />
              )}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={closePanel} style={btnSecondary}>Cancel</button>
                <button onClick={handleSave} style={btnPrimary}>
                  {editingItem ? 'Save Changes' : 'Create Item'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}
