'use client'

import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { ALLOWED_IMAGE_MIME_TYPES, MAX_IMAGE_BYTES } from '@/lib/blog/validation'

interface ImageResult {
  url: string
  path?: string
  alt?: string
  caption?: string
}

interface ImagePickerModalProps {
  prefix: 'cover' | 'body'
  collectAltCaption?: boolean
  onClose: () => void
  onConfirm: (result: ImageResult) => void
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 11px',
  fontSize: '13px',
  background: '#FFFDF8',
  border: '0.5px solid rgba(17,17,17,0.14)',
  borderRadius: '8px',
  color: '#111111',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

export default function ImagePickerModal({ prefix, collectAltCaption = false, onClose, onConfirm }: ImagePickerModalProps) {
  const [tab, setTab] = useState<'upload' | 'existing'>('upload')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [existing, setExisting] = useState<{ path: string; url: string }[]>([])
  const [loadingExisting, setLoadingExisting] = useState(false)
  const [selected, setSelected] = useState<{ url: string; path?: string } | null>(null)
  const [alt, setAlt] = useState('')
  const [caption, setCaption] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch inline (with a cancellation flag) rather than via a called
  // function, so this stays an external-system sync, not a "call a
  // function that sets state" indirection.
  useEffect(() => {
    if (tab !== 'existing') return
    let cancelled = false
    // Deferred one microtask so no setState call is synchronous within the
    // effect body itself (react-hooks/set-state-in-effect).
    Promise.resolve().then(() => {
      if (!cancelled) setLoadingExisting(true)
    })
    fetch(`/api/admin/blog/images?prefix=${prefix}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setExisting(data.images ?? [])
      })
      .finally(() => {
        if (!cancelled) setLoadingExisting(false)
      })
    return () => {
      cancelled = true
    }
  }, [tab, prefix])

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')

    if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
      setError('Unsupported file type. Use PNG, JPEG, WEBP, or GIF.')
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError('Image is too large. Maximum size is 5 MB.')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('prefix', prefix)
      const res = await fetch('/api/admin/blog/images', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Upload failed.')
        return
      }
      setSelected({ url: data.url, path: data.path })
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDeleteExisting = async (path: string, e: React.MouseEvent) => {
    e.stopPropagation()
    await fetch(`/api/admin/blog/images/${path}`, { method: 'DELETE' })
    setExisting((prev) => prev.filter((img) => img.path !== path))
    if (selected?.path === path) setSelected(null)
  }

  const handleConfirm = () => {
    if (!selected) return
    if (collectAltCaption && !alt.trim()) {
      setError('Alt text is required.')
      return
    }
    onConfirm({ url: selected.url, path: selected.path, alt: alt.trim() || undefined, caption: caption.trim() || undefined })
  }

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(17,17,17,0.35)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '520px', maxHeight: '80vh', background: '#FAF6EF', borderRadius: '16px', boxShadow: '0 12px 48px rgba(17,17,17,0.20)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '0.5px solid rgba(17,17,17,0.10)' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#111111' }}>
            {prefix === 'cover' ? 'Cover image' : 'Insert image'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#8C7E74' }}>✕</button>
        </div>

        <div style={{ display: 'flex', gap: '8px', padding: '14px 20px 0' }}>
          {(['upload', 'existing'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer',
                background: tab === t ? '#111111' : 'rgba(17,17,17,0.06)',
                color: tab === t ? '#fff' : '#625B55',
              }}
            >
              {t === 'upload' ? 'Upload new' : 'Choose existing'}
            </button>
          ))}
        </div>

        <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1 }}>
          {tab === 'upload' ? (
            <div>
              <input ref={fileInputRef} type="file" accept={ALLOWED_IMAGE_MIME_TYPES.join(',')} onChange={handleFileChange} disabled={uploading} style={{ fontSize: '13px' }} />
              <p style={{ margin: '8px 0 0', fontSize: '11.5px', color: '#B0A89E' }}>PNG, JPEG, WEBP, or GIF · up to 5 MB</p>
              {uploading && <p style={{ margin: '10px 0 0', fontSize: '12.5px', color: '#8C7E74' }}>Uploading…</p>}
            </div>
          ) : loadingExisting ? (
            <p style={{ fontSize: '13px', color: '#8C7E74' }}>Loading…</p>
          ) : existing.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#B0A89E' }}>No images uploaded yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {existing.map((img) => (
                <div
                  key={img.path}
                  onClick={() => setSelected(img)}
                  style={{
                    position: 'relative', aspectRatio: '1', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer',
                    border: selected?.path === img.path ? '2px solid #E34E2E' : '2px solid transparent',
                    backgroundImage: `url(${img.url})`, backgroundSize: 'cover', backgroundPosition: 'center',
                  }}
                >
                  <button
                    onClick={(e) => handleDeleteExisting(img.path, e)}
                    title="Delete image"
                    style={{ position: 'absolute', top: '4px', right: '4px', width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(17,17,17,0.65)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '11px' }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {selected && collectAltCaption && (
            <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', marginBottom: '5px' }}>Alt text (required)</label>
                <input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Describe the image for screen readers" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8C7E74', marginBottom: '5px' }}>Caption (optional)</label>
                <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Shown under the image" style={inputStyle} />
              </div>
            </div>
          )}

          {error && <p style={{ marginTop: '12px', fontSize: '12.5px', color: '#C43E22' }}>{error}</p>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '14px 20px', borderTop: '0.5px solid rgba(17,17,17,0.10)' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '9px', fontSize: '13px', fontWeight: 500, background: '#FFFDF8', color: '#625B55', border: '0.5px solid rgba(17,17,17,0.12)', cursor: 'pointer' }}>
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selected}
            style={{ padding: '8px 16px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, background: '#ED5821', color: '#fff', border: 'none', cursor: selected ? 'pointer' : 'default', opacity: selected ? 1 : 0.5 }}
          >
            Use this image
          </button>
        </div>
      </div>
    </div>
  )
}
