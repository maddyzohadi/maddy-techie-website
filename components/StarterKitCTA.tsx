'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import StarterKitModal from './StarterKitModal'

interface StarterKitCTAProps {
  label?: string
  className?: string
  dark?: boolean
}

export default function StarterKitCTA({
  label = 'Get the Free Starter Kit',
  className = '',
  dark = false,
}: StarterKitCTAProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`font-ui inline-flex items-center gap-2.5 cursor-pointer transition-colors duration-150 active:scale-[0.98] ${
          dark
            ? ''
            : 'bg-brand-blue hover:bg-brand-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue'
        } ${className}`}
        style={{
          padding: dark ? '16px 36px' : '10px 22px',
          borderRadius: dark ? '100px' : '8px',
          fontSize: dark ? '16px' : '14px',
          fontWeight: dark ? 600 : 500,
          color: '#ffffff',
          border: 'none',
          background: dark ? '#111111' : undefined,
        }}
        onMouseEnter={dark ? (e) => { (e.currentTarget as HTMLButtonElement).style.background = '#2A2A2A' } : undefined}
        onMouseLeave={dark ? (e) => { (e.currentTarget as HTMLButtonElement).style.background = '#111111' } : undefined}
      >
        {label}
        <ArrowRight size={dark ? 16 : 15} />
      </button>

      <StarterKitModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
