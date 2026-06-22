'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import StarterKitModal from './StarterKitModal'

interface StarterKitCTAProps {
  label?: string
  className?: string
}

export default function StarterKitCTA({
  label = 'Get the Free Starter Kit',
  className = '',
}: StarterKitCTAProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`font-body inline-flex items-center gap-2.5 cursor-pointer transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#272625] ${className}`}
        style={{
          padding: '13px 28px',
          borderRadius: '999px',
          fontSize: '15.5px',
          fontWeight: 600,
          color: '#ffffff',
          background: '#272625',
        }}
      >
        {label}
        <ArrowRight size={16} />
      </button>

      <StarterKitModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
