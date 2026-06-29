'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Bot, Zap, FileText, Brain, LayoutGrid, Sparkles, ArrowRight } from 'lucide-react'

const ROW1 = [
  { Icon: Bot,        color: '#B53389', delay: 0   },
  { Icon: Zap,        color: '#5A504A', delay: 0.5 },
  { Icon: FileText,   color: '#5A504A', delay: 1.0 },
]

const ROW2 = [
  { Icon: Brain,      color: '#5A504A', delay: 0.25 },
  { Icon: LayoutGrid, color: '#B53389', delay: 0.75 },
  { Icon: Sparkles,   color: '#5A504A', delay: 1.25 },
]

function IconBox({
  Icon,
  color,
  delay,
}: {
  Icon: React.ElementType
  color: string
  delay: number
}) {
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{
        duration: 4 + delay * 0.4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: '#FAFAF8',
        border: '0.5px solid #D8C7B8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon size={18} style={{ color }} />
    </motion.div>
  )
}

function Arrow() {
  return (
    <ArrowRight
      size={10}
      style={{ color: '#D8C7B8', flexShrink: 0 }}
    />
  )
}

export default function FooterIconStrip() {
  return (
    <div
      style={{
        position: 'relative',
        direction: 'ltr',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flexShrink: 0,
      }}
    >
      {/* Soft orange glow behind icons */}
      <div
        style={{
          position: 'absolute',
          inset: '-20px',
          background:
            'radial-gradient(ellipse at center, rgba(181,51,137,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
        }}
      />

      {/* Row 1: Bot → Zap → FileText */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
        {ROW1.map((item, i) => (
          <React.Fragment key={i}>
            <IconBox {...item} />
            {i < ROW1.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>

      {/* Row 2: Brain → LayoutGrid → Sparkles (offset right) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          paddingLeft: '26px',
          position: 'relative',
        }}
      >
        {ROW2.map((item, i) => (
          <React.Fragment key={i}>
            <IconBox {...item} />
            {i < ROW2.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
