'use client'

import { useState } from 'react'
import { ChevronDown, Zap, Brain, Bot, Layers } from 'lucide-react'

const parts = [
  {
    number: '01',
    title: 'Automation Foundations',
    icon: Zap,
    accent: 'electric',
    accentColor: 'text-electric',
    accentBg: 'bg-electric/10',
    accentBorder: 'border-electric/20',
    numberBg: 'bg-electric',
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
    accent: 'coral',
    accentColor: 'text-coral',
    accentBg: 'bg-coral/10',
    accentBorder: 'border-coral/20',
    numberBg: 'bg-coral',
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
    accent: 'electric',
    accentColor: 'text-electric',
    accentBg: 'bg-electric/10',
    accentBorder: 'border-electric/20',
    numberBg: 'bg-electric',
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
    accent: 'coral',
    accentColor: 'text-coral',
    accentBg: 'bg-coral/10',
    accentBorder: 'border-coral/20',
    numberBg: 'bg-coral',
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
    <section id="training" className="py-24 md:py-32 bg-navy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-xs text-electric font-semibold uppercase tracking-widest mb-4">
            The training
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-soft-white mb-5">
            What you'll learn
          </h2>
          <p className="font-body text-cool-gray text-lg max-w-2xl mx-auto leading-relaxed">
            Four structured parts that take you from "I don't know where to start"
            to building workflows you actually use every day.
          </p>
        </div>

        {/* Curriculum accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {parts.map((part, index) => {
            const Icon = part.icon
            const isOpen = openPart === index
            return (
              <div
                key={part.number}
                className={`card-gradient-border overflow-hidden transition-all duration-300 ${
                  isOpen ? 'ring-1 ring-electric/20' : ''
                }`}
              >
                {/* Accordion header */}
                <button
                  onClick={() => setOpenPart(isOpen ? null : index)}
                  className="w-full flex items-center gap-5 p-6 md:p-7 text-left group"
                  aria-expanded={isOpen}
                >
                  {/* Number badge */}
                  <span
                    className={`flex-shrink-0 w-10 h-10 rounded-full ${part.numberBg} flex items-center justify-center font-heading font-bold text-sm text-white`}
                  >
                    {part.number}
                  </span>

                  {/* Icon */}
                  <div className={`flex-shrink-0 p-2 rounded-lg ${part.accentBg} border ${part.accentBorder}`}>
                    <Icon size={18} className={part.accentColor} />
                  </div>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-semibold text-soft-white text-base md:text-lg leading-snug">
                      Part {part.number} · {part.title}
                    </div>
                    <div className="font-body text-cool-gray text-sm mt-0.5 hidden sm:block">
                      {part.tagline}
                    </div>
                  </div>

                  {/* Chevron */}
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-cool-gray transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Accordion body */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 md:px-7 pb-7 border-t border-white/5 pt-5">
                    <p className="font-body text-cool-gray text-sm mb-5 sm:hidden">
                      {part.tagline}
                    </p>
                    <ul className="space-y-3">
                      {part.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 font-body text-sm text-cool-gray"
                        >
                          <span
                            className={`mt-1 w-1.5 h-1.5 rounded-full ${
                              part.accent === 'electric' ? 'bg-electric' : 'bg-coral'
                            } flex-shrink-0`}
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
        <p className="text-center font-body text-cool-gray text-sm mt-10">
          Every part ends with something you can use immediately in your work.
          <span className="text-soft-white"> No fluff, no theory for its own sake.</span>
        </p>

      </div>
    </section>
  )
}
