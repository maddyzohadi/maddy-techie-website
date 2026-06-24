'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Mail, Bot, FileText, CheckCircle, Zap, LayoutGrid, ArrowRight, Loader2 } from 'lucide-react'

const DIM   = 'rgba(247,243,236,0.08)'
const MUTED = 'rgba(247,243,236,0.28)'
const TEXT  = '#F7F3EC'

const WORKFLOW = [
  { Icon: Mail,        title: 'Emails In',   sub: '24 new',    status: 'done'    },
  { Icon: Bot,         title: 'AI Analysis', sub: 'Processing', status: 'active'  },
  { Icon: FileText,    title: 'Draft',       sub: '3 replies', status: 'pending' },
  { Icon: CheckCircle, title: 'Delivered',   sub: '18 sent',   status: 'done'    },
] as const

const NAV = [
  { Icon: Zap,        label: 'Automations', active: true  },
  { Icon: Bot,        label: 'AI Agent',    active: false },
  { Icon: FileText,   label: 'Templates',   active: false },
  { Icon: LayoutGrid, label: 'Workflows',   active: false },
] as const

const RECENT = [
  { label: 'Email Report',  time: '2m ago',  running: false },
  { label: 'Lead Summary',  time: '8m ago',  running: false },
  { label: 'Content Brief', time: 'running', running: true  },
  { label: 'Sheet Update',  time: '22m ago', running: false },
] as const

const STATS = [
  { value: '2.4 hrs', label: 'Saved today' },
  { value: '94%',     label: 'Accuracy'    },
  { value: '18/24',   label: 'Completed'   },
  { value: '0',       label: 'Errors'      },
] as const

const TOOLS = ['ChatGPT', 'Claude', 'n8n', 'Sheets', 'Zapier'] as const

export default function HeroDarkPanel() {
  return (
    <div
      style={{
        background: '#0D0D0D',
        borderRadius: '20px',
        border: `0.5px solid ${DIM}`,
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.28), 0 0 0 0.5px rgba(255,255,255,0.03) inset',
      }}
    >

      {/* Window chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '13px 20px',
          borderBottom: `0.5px solid ${DIM}`,
          background: 'rgba(247,243,236,0.02)',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF6A32', opacity: 0.75 }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFD166', opacity: 0.45 }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#52C47A', opacity: 0.40 }} />
        </div>
        <span style={{ fontFamily: 'system-ui', fontSize: '11px', color: 'rgba(247,243,236,0.38)', letterSpacing: '0.07em' }}>
          Maddy AI · Workflow Center
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#52C47A' }} />
          <span style={{ fontFamily: 'system-ui', fontSize: '10px', color: 'rgba(247,243,236,0.30)' }}>3 active</span>
        </div>
      </div>

      {/* Body */}
      <div
        className="flex min-h-[300px] md:h-[360px]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(247,243,236,0.055) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >

        {/* Left: sidebar nav */}
        <div
          className="hidden md:flex flex-col flex-shrink-0"
          style={{
            width: '152px',
            borderRight: `0.5px solid ${DIM}`,
            padding: '14px 8px',
            gap: '2px',
          }}
        >
          <span style={{ fontFamily: 'system-ui', fontSize: '9px', color: 'rgba(247,243,236,0.20)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0 8px', marginBottom: '8px', display: 'block' }}>
            Workspace
          </span>
          {NAV.map(({ Icon, label, active }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 10px',
                borderRadius: '7px',
                background: active ? 'rgba(255,106,50,0.10)' : 'transparent',
                border: active ? '0.5px solid rgba(255,106,50,0.18)' : '0.5px solid transparent',
              }}
            >
              <Icon size={13} style={{ color: active ? '#FF6A32' : MUTED, flexShrink: 0 }} />
              <span style={{ fontFamily: 'system-ui', fontSize: '12px', color: active ? TEXT : MUTED }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Main: canvas */}
        <div
          style={{
            flex: 1,
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflow: 'hidden',
            minWidth: 0,
          }}
        >

          {/* Pipeline header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontFamily: 'system-ui', fontSize: '10px', color: 'rgba(247,243,236,0.28)', letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                Active Pipeline
              </span>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '17px', color: TEXT, letterSpacing: '-0.01em' }}>
                Email Intelligence
              </span>
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(82,196,122,0.10)',
              border: '0.5px solid rgba(82,196,122,0.22)',
              borderRadius: '100px',
              padding: '4px 10px',
              flexShrink: 0,
            }}>
              <motion.div
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: '#52C47A' }}
              />
              <span style={{ fontFamily: 'system-ui', fontSize: '10px', color: '#52C47A' }}>Running</span>
            </div>
          </div>

          {/* Workflow nodes */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: '6px' }}>
            {WORKFLOW.map((step, i) => {
              const Icon       = step.Icon
              const isActive   = step.status === 'active'
              const isDone     = step.status === 'done'
              const nodeColor  = isActive ? '#FF6A32' : isDone ? '#52C47A' : 'rgba(247,243,236,0.32)'
              const nodeBg     = isActive ? 'rgba(255,106,50,0.10)' : isDone ? 'rgba(82,196,122,0.07)' : 'rgba(247,243,236,0.03)'
              const nodeBorder = isActive ? 'rgba(255,106,50,0.22)' : isDone ? 'rgba(82,196,122,0.16)' : 'rgba(247,243,236,0.07)'
              const textColor  = isActive ? TEXT : isDone ? 'rgba(247,243,236,0.65)' : 'rgba(247,243,236,0.35)'
              const subColor   = isActive ? 'rgba(255,106,50,0.70)' : isDone ? 'rgba(82,196,122,0.60)' : 'rgba(247,243,236,0.20)'
              return (
                <React.Fragment key={i}>
                  <motion.div
                    animate={isActive ? {
                      boxShadow: ['0 0 0px rgba(255,106,50,0)', '0 0 18px rgba(255,106,50,0.18)', '0 0 0px rgba(255,106,50,0)'],
                    } : {}}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      flex: 1,
                      background: nodeBg,
                      border: `0.5px solid ${nodeBorder}`,
                      borderRadius: '12px',
                      padding: '12px 8px',
                      textAlign: 'center',
                      minWidth: 0,
                    }}
                  >
                    <Icon size={15} style={{ color: nodeColor, margin: '0 auto 6px', display: 'block' }} />
                    <div style={{ fontFamily: 'system-ui', fontSize: '11px', fontWeight: 500, color: textColor }}>{step.title}</div>
                    <div style={{ fontFamily: 'system-ui', fontSize: '10px', color: subColor, marginTop: '2px' }}>{step.sub}</div>
                  </motion.div>
                  {i < WORKFLOW.length - 1 && (
                    <ArrowRight size={10} style={{ color: 'rgba(247,243,236,0.14)', flexShrink: 0, alignSelf: 'center' }} />
                  )}
                </React.Fragment>
              )
            })}
          </div>

          {/* Stats bar */}
          <div style={{
            display: 'flex',
            padding: '10px 14px',
            background: 'rgba(247,243,236,0.025)',
            border: '0.5px solid rgba(247,243,236,0.06)',
            borderRadius: '10px',
            gap: '4px',
          }}>
            {STATS.map((stat, i) => (
              <React.Fragment key={stat.label}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'system-ui', fontSize: '14px', fontWeight: 700, color: '#FF6A32' }}>{stat.value}</div>
                  <div style={{ fontFamily: 'system-ui', fontSize: '9px', color: 'rgba(247,243,236,0.28)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>{stat.label}</div>
                </div>
                {i < STATS.length - 1 && (
                  <div style={{ width: '0.5px', background: 'rgba(247,243,236,0.08)', alignSelf: 'stretch' }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Tool tags */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {TOOLS.map((tool) => (
              <span key={tool} style={{
                fontFamily: 'system-ui',
                fontSize: '10px',
                padding: '3px 8px',
                borderRadius: '100px',
                background: 'rgba(247,243,236,0.04)',
                border: '0.5px solid rgba(247,243,236,0.09)',
                color: 'rgba(247,243,236,0.36)',
              }}>
                {tool}
              </span>
            ))}
          </div>

        </div>

        {/* Right: recent runs */}
        <div
          className="hidden lg:flex flex-col flex-shrink-0"
          style={{
            width: '164px',
            borderLeft: `0.5px solid ${DIM}`,
            padding: '14px 12px',
            gap: '4px',
          }}
        >
          <span style={{ fontFamily: 'system-ui', fontSize: '9px', color: 'rgba(247,243,236,0.20)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
            Recent Runs
          </span>
          {RECENT.map((run, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '7px 8px',
                borderRadius: '6px',
                background: 'rgba(247,243,236,0.025)',
                border: '0.5px solid rgba(247,243,236,0.06)',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0 }}>
                <span style={{ fontFamily: 'system-ui', fontSize: '11px', color: 'rgba(247,243,236,0.55)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {run.label}
                </span>
                <span style={{ fontFamily: 'system-ui', fontSize: '9px', color: 'rgba(247,243,236,0.22)' }}>
                  {run.time}
                </span>
              </div>
              {run.running ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  style={{ flexShrink: 0, display: 'flex' }}
                >
                  <Loader2 size={12} style={{ color: '#FF6A32', opacity: 0.7 }} />
                </motion.div>
              ) : (
                <CheckCircle size={12} style={{ color: '#52C47A', opacity: 0.6, flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
