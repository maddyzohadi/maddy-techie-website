'use client'

import { useState } from 'react'
import Image from 'next/image'
import ImagePickerModal from './ImagePickerModal'

const btnSecondary: React.CSSProperties = {
  padding: '7px 13px',
  borderRadius: '8px',
  fontSize: '12.5px',
  fontWeight: 500,
  background: '#FFFDF8',
  color: '#625B55',
  border: '0.5px solid rgba(17,17,17,0.12)',
  cursor: 'pointer',
}

export default function CoverImagePicker({ url, onChange }: { url: string; onChange: (url: string) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      {url ? (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px', background: '#FAF1E6' }}>
          <Image src={url} alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
        </div>
      ) : (
        <div style={{ width: '100%', aspectRatio: '16 / 9', borderRadius: '10px', background: 'rgba(17,17,17,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', color: '#B0A89E' }}>No cover image</span>
        </div>
      )}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="button" onClick={() => setOpen(true)} style={btnSecondary}>
          {url ? 'Change cover' : 'Add cover image'}
        </button>
        {url && (
          <button type="button" onClick={() => onChange('')} style={{ ...btnSecondary, color: '#C43E22' }}>
            Remove
          </button>
        )}
      </div>

      {open && (
        <ImagePickerModal
          prefix="cover"
          onClose={() => setOpen(false)}
          onConfirm={({ url: pickedUrl }) => {
            onChange(pickedUrl)
            setOpen(false)
          }}
        />
      )}
    </div>
  )
}
