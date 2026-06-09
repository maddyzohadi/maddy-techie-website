'use client'

import { useState } from 'react'
import { ChevronDown, Zap, Brain, Bot, Layers } from 'lucide-react'

const parts = [
  {
    number: '01',
    title: 'Automation Foundations',
    icon: Zap,
    accent: { text: '#5B9CF8', bg: 'rgba(91,156,248,0.12)', border: 'rgba(91,156,248,0.22)', badge: '#5B9CF8' },
    tagline: 'Understand how automation works — and build your first real workflow.',
    items: [
      'What automation is and when to use it',
      'Triggers, actions, and workflow logic',
      'APIs and webhooks explained in plain English',
      'Planning your first workflow step by step',
    ],
  },
  {
    number: '02',
    title: 'AI for Work',
    icon: Brain,
    accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.12)', border: 'rgba(255,117,85,0.22)', badge: '#FF7555' },
    tagline: 'Use AI for real work tasks — emails, reports, research, and planning.',
    items: [
      'AI for emails, reports, notes, research, and planning',
      'Prompting strategies for practical work tasks',
      'Limitations, hallucinations, and staying safe',
      'When to use AI — and when not to',
    ],
  },
  {
    number: '03',
    title: 'AI Agents & Smart Systems',
    icon: Bot,
    accent: { text: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.22)', badge: '#8B5CF6' },
    tagline: 'Go beyond basic chatting — build AI that actually does work for you.',
    items: [
      'The difference between an assistant and an agent',
      'Tools, files, context, and instructions',
      'Memory and knowledge base basics',
      'Multi-step AI-supported workflows',
    ],
  },
  {
    number: '04',
    title: 'Workflow Projects',
    icon: Layers,
    accent: { text: '#FF7555', bg: 'rgba(255,117,85,0.12)', border: 'rgba(255,117,85,0.22)', badge: '#FF7555' },
    tagline: 'Build four complete real-world workflows from start to finish.',
    items: [
      'Lead follow-up system',
      'Content planning system',
      'Email summary workflow',
      'Report generation workflow',
    ],
  },
]

export default function CurriculumSection() {
  const [openPart, setOpenPart] = useState<number | null>(0)

  return (
    <section id="training" className="py-24 md:py-32 relative" style={{ background: '#04080F' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(91,156,248,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block font-body text-[11px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#5B9CF8' }}
          >
            The training
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5 leading-tight">
            What you'll learn
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#8A97A8' }}>
            Four structured parts that take you from "I don't know where to start"
            to building workflows you actually use every day.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto space-y-3">
          {parts.map((part, index) => {
            const Icon = part.icon
            const isOpen = openPart === index
            const a = part.accent
            return (
              <div
                key={part.number}
                className="card-gradient-border overflow-hidden transition-all duration-300"
                style={isOpen ? {
                  border: `1px solid ${a.border}`,
                  boxShadow: `0 0 24px ${a.bg}, 0 4px 20px rgba(0,0,0,0.3)`,
                } : {}}
              >
                {/* Header */}
                <button
                  onClick={() => setOpenPart(isOpen ? null : index)}
                  className="w-full flex items-center gap-4 p-6 md:p-7 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  {/* Number badge */}
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white"
                    style={{ background: `linear-gradient(135deg, ${a.text}, ${a.badge}dd)` }}
                  >
                    {part.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="flex-shrink-0 p-2 rounded-xl"
                    style={{ background: a.bg, border: `1px solid ${a.border}` }}
                  >
                    <Icon size={18} style={{ color: a.text }} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-semibold text-soft-white text-base md:text-lg leading-snug">
                      Part {part.number} · {part.title}
                    </div>
                    <div
                      className="font-body text-sm mt-0.5 hidden sm:block"
                      style={{ color: '#8A97A8' }}
                    >
                      {part.tagline}
                    </div>
                  </div>

                  {/* Chevron */}
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: isOpen ? a.text : '#6A7A8E' }}
                  />
                </button>

                {/* Body */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="px-6 md:px-7 pb-7 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <p className="font-body text-sm mb-5 sm:hidden" style={{ color: '#8A97A8' }}>
                      {part.tagline}
                    </p>
                    <ul className="space-y-3">
                      {part.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 font-body text-sm"
                          style={{ color: '#8A97A8' }}
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: a.text }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center font-body text-sm mt-10" style={{ color: '#8A97A8' }}>
          Every part ends with something you can use immediately in your work.{' '}
          <span className="text-soft-white">No fluff, no theory for its own sake.</span>
        </p>

      </div>
    </section>
  )
}
