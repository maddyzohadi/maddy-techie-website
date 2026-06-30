'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface Message {
  id:            string
  role:          'user' | 'assistant'
  content:       string
  leadCaptured?: boolean
}

// Generate a stable session ID, persisted in localStorage
function getSessionId(): string {
  const KEY = 'mdt_chat_session'
  try {
    const stored = localStorage.getItem(KEY)
    if (stored) return stored
    const id = crypto.randomUUID()
    localStorage.setItem(KEY, id)
    return id
  } catch {
    return crypto.randomUUID()  // SSR / private-mode fallback
  }
}

async function sendMessageToApi(
  text:      string,
  history:   { role: 'user' | 'assistant'; content: string }[],
  sessionId: string,
  locale:    string,
): Promise<{ reply: string; leadCaptured?: boolean }> {
  const res = await fetch('/api/chat', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ message: text, history, sessionId, locale }),
  })

  if (res.status === 429) throw Object.assign(new Error('rate_limit'), { code: 'rate_limit' })
  if (!res.ok) throw new Error(`API error ${res.status}`)

  const data = await res.json()
  return { reply: data.reply as string, leadCaptured: data.leadCaptured as boolean }
}

export default function AIAssistant() {
  const t      = useTranslations('aiAssistant')
  const locale = useLocale()

  const [sessionId, setSessionId]   = useState('')
  const [isOpen,    setIsOpen]      = useState(false)
  const [messages,  setMessages]    = useState<Message[]>([
    { id: 'welcome', role: 'assistant', content: t('welcome') },
  ])
  const [input,     setInput]       = useState('')
  const [isLoading, setIsLoading]   = useState(false)
  const [hasNew,    setHasNew]      = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  // Initialise session ID on mount (client-only)
  useEffect(() => { setSessionId(getSessionId()) }, [])

  // Allow any page element to open the chat via a custom event
  useEffect(() => {
    const open = () => setIsOpen(true)
    document.addEventListener('open-ai-chat', open)
    return () => document.removeEventListener('open-ai-chat', open)
  }, [])

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

    // History for API context (exclude welcome message)
    const history = messages
      .filter(m => m.id !== 'welcome')
      .slice(-12)
      .map(m => ({ role: m.role, content: m.content }))

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const { reply, leadCaptured } = await sendMessageToApi(
        text.trim(),
        history,
        sessionId,
        locale,
      )
      setMessages(prev => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: reply, leadCaptured },
      ])
    } catch (err) {
      const isRate = err instanceof Error && err.message === 'rate_limit'
      setMessages(prev => [
        ...prev,
        {
          id:      `e-${Date.now()}`,
          role:    'assistant',
          content: isRate ? t('rateLimitError') : t('techError'),
        },
      ])
    } finally {
      setIsLoading(false)
      if (!isOpen) setHasNew(true)
    }
  }

  const toggle = () => setIsOpen(o => !o)
  const close  = () => setIsOpen(false)

  return (
    <>
      {/* Chat panel */}
      <div
        role="dialog"
        aria-label={t('ariaLabel')}
        aria-modal="true"
        aria-hidden={!isOpen}
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[384px] flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div
          className="flex flex-col rounded-2xl overflow-hidden"
          style={{
            background: '#FAF6EF',
            border:     '0.5px solid rgba(17,17,17,0.12)',
            maxHeight:  'min(500px, 82vh)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: '#171717', borderBottom: '0.5px solid rgba(0,0,0,0.10)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(63,141,222,0.15)', border: '0.5px solid rgba(63,141,222,0.35)' }}
            >
              <Bot size={15} style={{ color: '#FFFDF8' }} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-en font-semibold text-xs leading-tight" style={{ color: '#FFFDF8' }}>
                Maddy AI Assistant
              </p>
              <p className="font-ui text-xs flex items-center gap-1.5 mt-0.5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#34D399' }} />
                {t('online')}
              </p>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label={t('ariaClose')}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: 'rgba(255,255,255,0.60)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#FFFDF8')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.60)')}
            >
              <X size={16} />
            </button>
          </div>

          {/* Disclaimer strip */}
          <div
            className="px-4 py-2.5 flex-shrink-0"
            style={{ background: 'rgba(0,0,0,0.03)', borderBottom: '0.5px solid rgba(17,17,17,0.12)' }}
          >
            <p className="font-ui text-xs text-center" style={{ color: 'rgba(17,17,17,0.45)' }}>
              {t('disclaimer')}{' '}
              <span style={{ color: 'rgba(17,17,17,0.35)' }}>{t('disclaimerNote')}</span>
            </p>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto chat-scroll p-3 space-y-3"
            style={{ minHeight: 0, background: '#FAF6EF' }}
          >
            {messages.map(msg => (
              <div key={msg.id} className="flex flex-col gap-1">
                <div className={`flex gap-2 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={
                      msg.role === 'assistant'
                        ? { background: 'rgba(63,141,222,0.12)', border: '0.5px solid rgba(63,141,222,0.30)' }
                        : { background: 'rgba(63,141,222,0.10)', border: '0.5px solid rgba(63,141,222,0.25)' }
                    }
                  >
                    {msg.role === 'assistant'
                      ? <Bot  size={11} style={{ color: '#3F8DDE' }} />
                      : <User size={11} style={{ color: '#3F8DDE' }} />}
                  </div>

                  <div
                    className="max-w-[80%] font-ui text-xs leading-relaxed whitespace-pre-line"
                    style={{
                      padding:    '8px 12px',
                      color:      msg.role === 'assistant' ? '#111111' : '#FFFDF8',
                      background: msg.role === 'assistant' ? '#F1E8DD' : '#3F8DDE',
                      border:     `0.5px solid ${msg.role === 'assistant' ? 'rgba(17,17,17,0.12)' : '#3F8DDE'}`,
                      borderRadius: msg.role === 'assistant'
                        ? '18px 18px 18px 4px'
                        : '18px 18px 4px 18px',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>

                {/* Lead captured confirmation badge */}
                {msg.leadCaptured && (
                  <div className="flex items-center gap-1.5 pl-8">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-ui rounded-full px-2.5 py-1"
                      style={{
                        background: 'rgba(52,211,153,0.10)',
                        border:     '0.5px solid rgba(52,211,153,0.30)',
                        color:      '#059669',
                      }}
                    >
                      <span>✓</span>
                      <span>{locale === 'fa' ? 'اطلاعات ذخیره شد' : 'Details saved'}</span>
                    </span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 animate-fade-in">
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(63,141,222,0.12)', border: '0.5px solid rgba(63,141,222,0.30)' }}
                >
                  <Bot size={12} style={{ color: '#3F8DDE' }} />
                </div>
                <div
                  className="flex items-center gap-1.5"
                  style={{
                    padding:      '8px 12px',
                    background:   '#F1E8DD',
                    border:       '0.5px solid rgba(17,17,17,0.12)',
                    borderRadius: '18px 18px 18px 4px',
                  }}
                >
                  {[0, 150, 300].map(delay => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 rounded-full motion-safe:animate-bounce"
                      style={{ background: 'rgba(17,17,17,0.35)', animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <form
            onSubmit={e => { e.preventDefault(); sendMessage(input) }}
            className="flex items-center gap-2 px-2 py-2 flex-shrink-0"
            style={{ background: 'rgba(0,0,0,0.03)', borderTop: '0.5px solid rgba(17,17,17,0.12)' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t('placeholder')}
              disabled={isLoading}
              aria-label={t('placeholder')}
              className="flex-1 font-ui text-xs rounded-xl px-3 py-2 transition-all disabled:opacity-50 placeholder:opacity-40"
              style={{
                background: '#FFFDF8',
                border:     '0.5px solid rgba(17,17,17,0.12)',
                color:      '#111111',
                caretColor: '#111111',
                outline:    'none',
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: '#3F8DDE' }}
            >
              {isLoading
                ? <Loader2 size={16} className="text-white animate-spin" />
                : <Send    size={16} className="text-white" />}
            </button>
          </form>
        </div>
      </div>

      {/* Launcher button */}
      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? t('ariaClose') : t('ariaOpen')}
        aria-expanded={isOpen}
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: isOpen ? 'rgba(63,141,222,0.10)' : '#3F8DDE',
          border:     isOpen ? '0.5px solid rgba(63,141,222,0.40)' : 'none',
        }}
      >
        {hasNew && !isOpen && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 motion-safe:animate-bounce"
            style={{ background: '#3F8DDE', borderColor: '#FAF6EF' }}
          />
        )}
        {isOpen
          ? <X size={22} style={{ color: 'rgba(63,141,222,0.80)' }} />
          : <MessageCircle size={24} className="text-white" />}
      </button>

      {/* Label pill */}
      {!isOpen && (
        <div className="fixed bottom-7 right-20 sm:right-24 z-50 pointer-events-none">
          <div
            className="rounded-full px-3 py-1.5"
            style={{ background: '#171717', border: '0.5px solid rgba(0,0,0,0.10)' }}
          >
            <span className="font-ui text-xs whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.80)' }}>
              {t('askMaddy')}
            </span>
          </div>
        </div>
      )}
    </>
  )
}
