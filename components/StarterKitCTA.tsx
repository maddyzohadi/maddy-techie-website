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
        className={`font-ui inline-flex items-center gap-2.5 cursor-pointer bg-brand-orange hover:bg-brand-coral transition-colors duration-150 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6A32] ${className}`}
        style={{
          padding: '10px 22px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#ffffff',
          border: 'none',
        }}
      >
        {label}
        <ArrowRight size={15} />
      </button>

      <StarterKitModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
