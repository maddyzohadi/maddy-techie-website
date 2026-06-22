'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

// ── Types ──────────────────────────────────────────────────────────────────
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

// ── Design tokens ──────────────────────────────────────────────────────────
const C = {
  panelBg:   '#FFFFFF',
  headerBg:  '#f4f3ef',
  deepBg:    '#f4f3ef',
  surface:   '#f4f3ef',
  pillBg:    '#f4f3ef',
  pillHover: '#f4f3ef',
  coral:     '#272625',
  navy:      '#272625',
  text:      '#272625',
  muted:     '#6d6c6b',
  hint:      '#6d6c6b',
  online:    '#34D399',
  border:    '#ecebea',
} as const

// ── API call ───────────────────────────────────────────────────────────────
async function sendMessageToApi(
  text: string,
  history: { role: 'user' | 'assistant'; content: string }[],
): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text, history }),
  })
  if (res.status === 429) throw Object.assign(new Error('rate_limit'), { code: 'rate_limit' })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  const data = await res.json()
  return data.reply as string
}

// ── Quick-pill sub-component ───────────────────────────────────────────────
function QuickPill({ label, onSelect }: { label: string; onSelect: (t: string) => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      onClick={() => onSelect(label)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-left font-body text-xs rounded-xl px-3 py-2 transition-all duration-150 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#272625]"
      style={{
        background: hovered ? C.pillHover : C.pillBg,
        border: `1px solid ${hovered ? 'rgba(177,177,175,0.30)' : C.border}`,
        color: hovered ? C.text : C.muted,
      }}
    >
      {label}
    </button>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function AIAssistant() {
  const t = useTranslations('aiAssistant')

  const starters = [
    t('starter0'),
    t('starter1'),
    t('starter2'),
    t('starter3'),
    t('starter4'),
  ]

  const [isOpen, setIsOpen]       = useState(false)
  const [messages, setMessages]   = useState<Message[]>([
    { id: 'welcome', role: 'assistant', content: t('welcome') },
  ])
  const [input, setInput]         = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasNew, setHasNew]       = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100)
      setHasNew(false)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const history = messages
      .filter((m) => m.id !== 'welcome')
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content }))

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const reply = await sendMessageToApi(text.trim(), history)
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: reply },
      ])
    } catch (err) {
      const isRate = err instanceof Error && err.message === 'rate_limit'
      setMessages((prev) => [
        ...prev,
        { id: `e-${Date.now()}`, role: 'assistant', content: isRate ? t('rateLimitError') : t('techError') },
      ])
    } finally {
      setIsLoading(false)
      if (!isOpen) setHasNew(true)
    }
  }

  const toggle = () => setIsOpen((o) => !o)
  const close  = () => setIsOpen(false)

  return (
    <>
      {/* ── Chat panel ──────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-label={t('ariaLabel')}
        aria-modal="true"
        aria-hidden={!isOpen}
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div
          className="flex flex-col rounded-2xl overflow-hidden"
          style={{
            background: C.panelBg,
            border: `1px solid ${C.border}`,
            maxHeight: 'min(600px, 82vh)',
            boxShadow: '0 12px 40px rgba(177,177,175,0.12), 0 2px 8px rgba(177,177,175,0.06)',
          }}
        >

          {/* Header */}
          <div
            className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
            style={{ background: C.headerBg, borderBottom: `1px solid ${C.border}` }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: '#f4f3ef',
                border: '1px solid rgba(177,177,175,0.28)',
              }}
            >
              <Bot size={17} style={{ color: C.coral }} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-heading font-semibold text-sm leading-tight" style={{ color: C.text }}>
                Maddy AI Assistant
              </p>
              <p className="font-body text-xs flex items-center gap-1.5 mt-0.5" style={{ color: C.muted }}>
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: C.online, boxShadow: `0 0 6px ${C.online}80` }}
                />
                {t('online')}
              </p>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label={t('ariaClose')}
              className="p-1.5 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#272625] focus-visible:outline-offset-2"
              style={{ color: C.hint }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = C.muted)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = C.hint)}
            >
              <X size={16} />
            </button>
          </div>

          {/* Disclaimer strip */}
          <div
            className="px-4 py-2.5 flex-shrink-0"
            style={{ background: C.deepBg, borderBottom: `1px solid ${C.border}` }}
          >
            <p className="font-body text-xs text-center" style={{ color: C.hint }}>
              {t('disclaimer')}{' '}
              <span style={{ color: `${C.coral}90` }}>{t('disclaimerNote')}</span>
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto chat-scroll p-4 space-y-4" style={{ minHeight: 0, background: '#FFFFFF' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                  style={
                    msg.role === 'assistant'
                      ? { background: '#f4f3ef', border: '1px solid rgba(177,177,175,0.26)' }
                      : { background: '#f4f3ef', border: '1px solid #ecebea' }
                  }
                >
                  {msg.role === 'assistant'
                    ? <Bot  size={13} style={{ color: C.coral }} />
                    : <User size={13} style={{ color: C.navy }} />}
                </div>

                {/* Bubble */}
                <div
                  className="max-w-[80%] font-body text-sm leading-relaxed whitespace-pre-line"
                  style={{
                    padding: '10px 14px',
                    color: C.text,
                    background: msg.role === 'assistant'
                      ? '#f4f3ef'
                      : '#f4f3ef',
                    border: `1px solid ${
                      msg.role === 'assistant' ? C.border : 'rgba(177,177,175,0.22)'
                    }`,
                    borderRadius: msg.role === 'assistant'
                      ? '18px 18px 18px 4px'
                      : '18px 18px 4px 18px',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2.5 animate-fade-in">
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: '#f4f3ef', border: '1px solid rgba(177,177,175,0.26)' }}
                >
                  <Bot size={13} style={{ color: C.coral }} />
                </div>
                <div
                  className="flex items-center gap-1.5"
                  style={{
                    padding: '12px 16px',
                    background: '#f4f3ef',
                    border: `1px solid ${C.border}`,
                    borderRadius: '18px 18px 18px 4px',
                  }}
                >
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 rounded-full motion-safe:animate-bounce"
                      style={{ background: C.muted, opacity: 0.7, animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick question pills */}
          {messages.length === 1 && !isLoading && (
            <div
              className="px-4 pb-3 pt-2.5 flex-shrink-0"
              style={{ borderTop: `1px solid ${C.border}`, background: '#FFFFFF' }}
            >
              <p className="font-body text-xs mb-2.5 px-0.5" style={{ color: C.hint }}>
                {t('quickStart')}
              </p>
              <div className="flex flex-col gap-1.5">
                {starters.map((q) => (
                  <QuickPill key={q} label={q} onSelect={sendMessage} />
                ))}
              </div>
            </div>
          )}

          {/* Input bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
            className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
            style={{ background: C.deepBg, borderTop: `1px solid ${C.border}` }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('placeholder')}
              disabled={isLoading}
              aria-label={t('placeholder')}
              className="flex-1 font-body text-sm rounded-xl px-4 py-2.5 transition-all disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#272625] focus-visible:outline-offset-1 placeholder:opacity-60"
              style={{
                background: '#FFFFFF',
                border: `1px solid ${C.border}`,
                color: C.text,
                caretColor: C.coral,
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#272625] focus-visible:outline-offset-2"
              style={{ background: C.coral }}
            >
              {isLoading
                ? <Loader2 size={16} className="text-white animate-spin" />
                : <Send    size={16} className="text-white" />}
            </button>
          </form>

        </div>
      </div>

      {/* ── Launcher button ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? t('ariaClose') : t('ariaOpen')}
        aria-expanded={isOpen}
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#272625] focus-visible:outline-offset-2"
        style={{
          background: isOpen ? '#f4f3ef' : C.coral,
          border: `1px solid ${isOpen ? C.border : 'transparent'}`,
          boxShadow: isOpen
            ? '0 4px 16px rgba(177,177,175,0.10)'
            : '0 8px 28px rgba(177,177,175,0.40), 0 2px 8px rgba(177,177,175,0.10)',
        }}
      >
        {/* Unread badge */}
        {hasNew && !isOpen && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 motion-safe:animate-bounce"
            style={{ background: C.coral, borderColor: '#f4f3ef' }}
          />
        )}
        {isOpen
          ? <X size={22} style={{ color: C.muted }} />
          : <MessageCircle size={24} className="text-white" />}
      </button>

      {/* Label pill */}
      {!isOpen && (
        <div className="fixed bottom-7 right-20 sm:right-24 z-50 pointer-events-none">
          <div
            className="rounded-full px-3 py-1.5"
            style={{
              background: '#FFFFFF',
              border: `1px solid ${C.border}`,
              boxShadow: '0 4px 16px rgba(177,177,175,0.08)',
            }}
          >
            <span className="font-body text-xs whitespace-nowrap" style={{ color: C.muted }}>
              {t('askMaddy')}
            </span>
          </div>
        </div>
      )}
    </>
  )
}
