'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

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

export default function AIAssistant() {
  const t = useTranslations('aiAssistant')

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
            background: '#F7F3EC',
            border: '0.5px solid #E7DED2',
            maxHeight: 'min(500px, 82vh)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{
              background: '#171717',
              borderBottom: '0.5px solid rgba(0,0,0,0.10)',
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'rgba(255,106,50,0.15)',
                border: '0.5px solid rgba(255,106,50,0.35)',
              }}
            >
              <Bot size={15} style={{ color: '#FFFFFF' }} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-en font-semibold text-xs leading-tight" style={{ color: '#FFFFFF' }}>
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
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#FFFFFF')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.60)')}
            >
              <X size={16} />
            </button>
          </div>

          {/* Disclaimer strip */}
          <div
            className="px-4 py-2.5 flex-shrink-0"
            style={{
              background: 'rgba(0,0,0,0.03)',
              borderBottom: '0.5px solid #E7DED2',
            }}
          >
            <p className="font-ui text-xs text-center" style={{ color: 'rgba(17,17,17,0.45)' }}>
              {t('disclaimer')}{' '}
              <span style={{ color: 'rgba(17,17,17,0.35)' }}>{t('disclaimerNote')}</span>
            </p>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto chat-scroll p-3 space-y-3"
            style={{ minHeight: 0, background: '#F7F3EC' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={
                    msg.role === 'assistant'
                      ? { background: 'rgba(255,106,50,0.12)', border: '0.5px solid rgba(255,106,50,0.30)' }
                      : { background: 'rgba(255,106,50,0.10)', border: '0.5px solid rgba(255,106,50,0.25)' }
                  }
                >
                  {msg.role === 'assistant'
                    ? <Bot  size={11} style={{ color: '#FF6A32' }} />
                    : <User size={11} style={{ color: '#FF6A32' }} />}
                </div>

                <div
                  className="max-w-[80%] font-ui text-xs leading-relaxed whitespace-pre-line"
                  style={{
                    padding: '8px 12px',
                    color: msg.role === 'assistant' ? '#111111' : '#FFFFFF',
                    background: msg.role === 'assistant' ? '#FFF8F1' : '#FF6A32',
                    border: `0.5px solid ${msg.role === 'assistant' ? '#E7DED2' : '#FF6A32'}`,
                    borderRadius: msg.role === 'assistant'
                      ? '18px 18px 18px 4px'
                      : '18px 18px 4px 18px',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 animate-fade-in">
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(255,106,50,0.12)', border: '0.5px solid rgba(255,106,50,0.30)' }}
                >
                  <Bot size={12} style={{ color: '#FF6A32' }} />
                </div>
                <div
                  className="flex items-center gap-1.5"
                  style={{
                    padding: '8px 12px',
                    background: '#FFF8F1',
                    border: '0.5px solid #E7DED2',
                    borderRadius: '18px 18px 18px 4px',
                  }}
                >
                  {[0, 150, 300].map((delay) => (
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
            onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
            className="flex items-center gap-2 px-2 py-2 flex-shrink-0"
            style={{
              background: 'rgba(0,0,0,0.03)',
              borderTop: '0.5px solid #E7DED2',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('placeholder')}
              disabled={isLoading}
              aria-label={t('placeholder')}
              className="flex-1 font-ui text-xs rounded-xl px-3 py-2 transition-all disabled:opacity-50 placeholder:opacity-40"
              style={{
                background: '#FFFFFF',
                border: '0.5px solid #E7DED2',
                color: '#111111',
                caretColor: '#111111',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: '#FF6A32' }}
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
          background: isOpen ? 'rgba(255,106,50,0.10)' : '#FF6A32',
          border: isOpen ? '0.5px solid rgba(255,106,50,0.40)' : 'none',
        }}
      >
        {hasNew && !isOpen && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 motion-safe:animate-bounce"
            style={{ background: '#FF6A32', borderColor: '#F7F3EC' }}
          />
        )}
        {isOpen
          ? <X size={22} style={{ color: 'rgba(255,106,50,0.80)' }} />
          : <MessageCircle size={24} className="text-white" />}
      </button>

      {/* Label pill */}
      {!isOpen && (
        <div className="fixed bottom-7 right-20 sm:right-24 z-50 pointer-events-none">
          <div
            className="rounded-full px-3 py-1.5"
            style={{
              background: '#171717',
              border: '0.5px solid rgba(0,0,0,0.10)',
            }}
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
