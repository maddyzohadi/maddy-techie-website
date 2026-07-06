'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface Message {
  id:            string
  role:          'user' | 'assistant'
  content:       string
  leadCaptured?: boolean
}

// ── Session ID ─────────────────────────────────────────────────────────────

function getSessionId(): string {
  const KEY = 'mdt_chat_session'
  try {
    const stored = localStorage.getItem(KEY)
    if (stored) return stored
    const id = crypto.randomUUID()
    localStorage.setItem(KEY, id)
    return id
  } catch {
    return crypto.randomUUID()
  }
}

// ── API call ───────────────────────────────────────────────────────────────

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

// ── Voice helpers ──────────────────────────────────────────────────────────

type VoiceStatus = 'idle' | 'listening' | 'speaking' | 'denied'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSpeechRecognition(): (new () => any) | null {
  if (typeof window === 'undefined') return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition ?? null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pickFemaleVoice(langPrefix: string): any | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null

  const femaleKeys = ['samantha', 'karen', 'victoria', 'tessa', 'zira', 'hazel', 'susan', 'female', 'woman']
  const matchFemale = voices.find((v: SpeechSynthesisVoice) =>
    v.lang.toLowerCase().startsWith(langPrefix) &&
    femaleKeys.some(k => v.name.toLowerCase().includes(k))
  )
  if (matchFemale) return matchFemale
  return voices.find((v: SpeechSynthesisVoice) => v.lang.toLowerCase().startsWith(langPrefix)) ?? voices[0] ?? null
}

// ── Component ──────────────────────────────────────────────────────────────

export default function AIAssistant() {
  const t      = useTranslations('aiAssistant')
  const locale = useLocale()

  // Text chat state
  const [sessionId,  setSessionId]  = useState('')
  const [isOpen,     setIsOpen]     = useState(false)
  const [messages,   setMessages]   = useState<Message[]>([
    { id: 'welcome', role: 'assistant', content: t('welcome') },
  ])
  const [input,      setInput]      = useState('')
  const [isLoading,  setIsLoading]  = useState(false)
  const [hasNew,     setHasNew]     = useState(false)

  // Voice state
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [voiceStatus,    setVoiceStatus]    = useState<VoiceStatus>('idle')
  const [speakingMsgId,  setSpeakingMsgId]  = useState<string | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recogRef  = useRef<any>(null)

  // ── Initialisation ─────────────────────────────────────────────────────

  useEffect(() => { setSessionId(getSessionId()) }, [])

  // Detect voice support on mount (client-only)
  useEffect(() => {
    setVoiceSupported(!!getSpeechRecognition())
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recogRef.current?.abort()
      window.speechSynthesis?.cancel()
    }
  }, [])

  // Custom event: open chat from anywhere on the page
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

  // ── Text chat ─────────────────────────────────────────────────────────

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

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
        text.trim(), history, sessionId, locale,
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
  const close  = () => { setIsOpen(false); stopSpeaking() }

  // ── Voice input (Speech-to-Text) ───────────────────────────────────────

  const startListening = () => {
    const SR = getSpeechRecognition()
    if (!SR || isLoading) return

    // Stop any ongoing TTS before listening
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setSpeakingMsgId(null)
    }

    const rec = new SR()
    rec.lang             = locale === 'fa' ? 'fa-IR' : 'en-US'
    rec.interimResults   = false
    rec.maxAlternatives  = 1
    rec.continuous       = false

    rec.onstart = () => setVoiceStatus('listening')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      const transcript = (e.results[0][0].transcript as string).trim()
      setInput(transcript)
      setVoiceStatus('idle')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onerror = (e: any) => {
      if (e.error === 'not-allowed' || e.error === 'permission-denied') {
        setVoiceStatus('denied')
      } else {
        setVoiceStatus('idle')
      }
    }

    rec.onend = () => {
      setVoiceStatus(prev => prev === 'listening' ? 'idle' : prev)
    }

    recogRef.current = rec
    try { rec.start() } catch { setVoiceStatus('idle') }
  }

  const stopListening = () => {
    recogRef.current?.stop()
    setVoiceStatus('idle')
  }

  // ── Voice output (Text-to-Speech) ──────────────────────────────────────

  const speakMessage = (text: string, msgId: string) => {
    if (!window.speechSynthesis) return

    window.speechSynthesis.cancel()
    setSpeakingMsgId(null)

    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = locale === 'fa' ? 'fa-IR' : 'en-US'

    const langPrefix  = locale === 'fa' ? 'fa' : 'en'
    const femaleVoice = pickFemaleVoice(langPrefix)
    if (femaleVoice) utter.voice = femaleVoice

    utter.rate   = 0.95
    utter.pitch  = 1.05

    utter.onstart = () => { setSpeakingMsgId(msgId); setVoiceStatus('speaking') }
    utter.onend   = () => { setSpeakingMsgId(null);  setVoiceStatus('idle')     }
    utter.onerror = () => { setSpeakingMsgId(null);  setVoiceStatus('idle')     }

    // Voices may not be loaded yet on first call — retry once after load
    if (!window.speechSynthesis.getVoices().length) {
      window.speechSynthesis.onvoiceschanged = () => {
        const v = pickFemaleVoice(langPrefix)
        if (v) utter.voice = v
        window.speechSynthesis.onvoiceschanged = null
        window.speechSynthesis.speak(utter)
      }
    } else {
      window.speechSynthesis.speak(utter)
    }
  }

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel()
    setSpeakingMsgId(null)
    setVoiceStatus('idle')
  }

  // ── Voice status label ─────────────────────────────────────────────────

  const voiceLabel: string | null = (() => {
    if (voiceStatus === 'listening') return locale === 'fa' ? 'در حال گوش دادن…' : 'Listening…'
    if (voiceStatus === 'speaking')  return locale === 'fa' ? 'در حال خواندن…'  : 'Speaking…'
    if (voiceStatus === 'denied')    return locale === 'fa' ? 'دسترسی به میکروفون رد شد' : 'Mic permission denied'
    return null
  })()

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Chat panel ──────────────────────────────────────────────────── */}
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
            dir={locale === 'fa' ? 'rtl' : 'ltr'}
            style={{ background: '#171717', borderBottom: '0.5px solid rgba(0,0,0,0.10)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(237,88,33,0.14)', border: '0.5px solid rgba(237,88,33,0.28)' }}
            >
              <Bot size={15} style={{ color: '#FFFDF8' }} />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`${locale === 'fa' ? 'font-fa' : 'font-en'} font-semibold text-xs leading-tight`}
                style={{ color: '#FFFDF8' }}
              >
                {t('headerTitle')}
              </p>
              <p
                className={`${locale === 'fa' ? 'font-fa' : 'font-ui'} text-xs flex items-center gap-1.5 mt-0.5`}
                style={{ color: 'rgba(255,255,255,0.60)' }}
              >
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
            <p
              className={`${locale === 'fa' ? 'font-fa' : 'font-ui'} text-xs text-center`}
              dir={locale === 'fa' ? 'rtl' : 'ltr'}
              style={{ color: 'rgba(17,17,17,0.45)' }}
            >
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
                  {/* Avatar */}
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={
                      msg.role === 'assistant'
                        ? { background: 'rgba(237,88,33,0.10)', border: '0.5px solid rgba(237,88,33,0.24)' }
                        : { background: 'rgba(17,17,17,0.07)',  border: '0.5px solid rgba(17,17,17,0.16)'  }
                    }
                  >
                    {msg.role === 'assistant'
                      ? <Bot  size={11} style={{ color: '#ED5821' }} />
                      : <User size={11} style={{ color: '#5A504A' }} />}
                  </div>

                  {/* Bubble */}
                  <div
                    className="max-w-[80%] font-ui text-xs leading-relaxed whitespace-pre-line"
                    style={{
                      padding:      '8px 12px',
                      color:        msg.role === 'assistant' ? '#111111' : '#FFFDF8',
                      background:   msg.role === 'assistant' ? '#EFE7DC' : '#ED5821',
                      border:       `0.5px solid ${msg.role === 'assistant' ? 'rgba(17,17,17,0.12)' : '#ED5821'}`,
                      borderRadius: msg.role === 'assistant' ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>

                {/* TTS play button — only for assistant messages */}
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 pl-8">
                    <button
                      type="button"
                      onClick={() =>
                        speakingMsgId === msg.id ? stopSpeaking() : speakMessage(msg.content, msg.id)
                      }
                      aria-label={speakingMsgId === msg.id ? 'Stop reading' : 'Read aloud'}
                      className="flex items-center gap-1 rounded-md px-1.5 py-0.5 transition-colors"
                      style={{
                        background: speakingMsgId === msg.id ? 'rgba(237,88,33,0.10)' : 'transparent',
                        border:     'none',
                        cursor:     'pointer',
                        color:      speakingMsgId === msg.id ? '#ED5821' : 'rgba(17,17,17,0.30)',
                      }}
                      onMouseEnter={e => {
                        if (speakingMsgId !== msg.id)
                          (e.currentTarget as HTMLElement).style.color = '#8C7E74'
                      }}
                      onMouseLeave={e => {
                        if (speakingMsgId !== msg.id)
                          (e.currentTarget as HTMLElement).style.color = 'rgba(17,17,17,0.30)'
                      }}
                    >
                      {speakingMsgId === msg.id
                        ? <VolumeX size={10} />
                        : <Volume2 size={10} />}
                      {speakingMsgId === msg.id && (
                        <span style={{ fontSize: '10px', fontFamily: 'system-ui' }}>
                          {locale === 'fa' ? 'توقف' : 'Stop'}
                        </span>
                      )}
                    </button>
                  </div>
                )}

                {/* Lead captured badge */}
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

            {/* Loading dots */}
            {isLoading && (
              <div className="flex gap-2 animate-fade-in">
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(237,88,33,0.10)', border: '0.5px solid rgba(237,88,33,0.24)' }}
                >
                  <Bot size={12} style={{ color: '#ED5821' }} />
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
          <div
            className="flex-shrink-0"
            style={{ background: 'rgba(0,0,0,0.03)', borderTop: '0.5px solid rgba(17,17,17,0.12)' }}
          >
            <form
              onSubmit={e => { e.preventDefault(); sendMessage(input) }}
              className="flex items-center gap-1.5 px-2 py-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={t('placeholder')}
                disabled={isLoading}
                aria-label={t('placeholder')}
                dir={locale === 'fa' ? 'rtl' : 'ltr'}
                className={`flex-1 ${locale === 'fa' ? 'font-fa' : 'font-ui'} text-xs rounded-xl px-3 py-2 transition-all disabled:opacity-50 placeholder:opacity-40`}
                style={{
                  background: '#FFFDF8',
                  border:     '0.5px solid rgba(17,17,17,0.12)',
                  color:      '#111111',
                  caretColor: '#111111',
                  outline:    'none',
                }}
              />

              {/* Mic button — hidden if voice not supported */}
              {voiceSupported && (
                <button
                  type="button"
                  onClick={voiceStatus === 'listening' ? stopListening : startListening}
                  disabled={isLoading || voiceStatus === 'denied'}
                  aria-label={voiceStatus === 'listening' ? 'Stop listening' : 'Start voice input'}
                  className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                    voiceStatus === 'listening' ? 'animate-pulse' : ''
                  }`}
                  style={{
                    background: voiceStatus === 'listening'
                      ? 'rgba(237,88,33,0.15)'
                      : 'rgba(17,17,17,0.06)',
                    border: voiceStatus === 'listening'
                      ? '0.5px solid rgba(237,88,33,0.40)'
                      : '0.5px solid rgba(17,17,17,0.12)',
                  }}
                >
                  {voiceStatus === 'listening'
                    ? <MicOff size={14} style={{ color: '#ED5821' }} />
                    : <Mic    size={14} style={{ color: '#8C7E74' }} />}
                </button>
              )}

              {/* Send button */}
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: '#ED5821' }}
              >
                {isLoading
                  ? <Loader2 size={16} className="text-white animate-spin" />
                  : <Send    size={16} className="text-white" />}
              </button>
            </form>

            {/* Voice status strip */}
            {voiceLabel && (
              <div
                className={`font-ui px-3 pb-2 flex items-center gap-1.5 ${locale === 'fa' ? 'flex-row-reverse' : ''}`}
                style={{ color: voiceStatus === 'denied' ? '#C43E22' : '#ED5821' }}
              >
                {voiceStatus === 'listening' && (
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: '#ED5821' }} />
                )}
                {voiceStatus === 'speaking' && (
                  <Volume2 size={10} style={{ flexShrink: 0 }} />
                )}
                {voiceStatus === 'denied' && (
                  <span style={{ fontSize: '11px', flexShrink: 0 }}>⚠</span>
                )}
                <span style={{ fontSize: '11px' }}>{voiceLabel}</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Launcher button ──────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? t('ariaClose') : t('ariaOpen')}
        aria-expanded={isOpen}
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: isOpen ? 'rgba(237,88,33,0.10)' : '#ED5821',
          border:     isOpen ? '0.5px solid rgba(237,88,33,0.32)' : 'none',
        }}
      >
        {hasNew && !isOpen && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 motion-safe:animate-bounce"
            style={{ background: '#ED5821', borderColor: '#FAF6EF' }}
          />
        )}
        {isOpen
          ? <X             size={22} style={{ color: 'rgba(237,88,33,0.85)' }} />
          : <MessageCircle size={24} className="text-white" />}
      </button>

      {/* ── Label pill ───────────────────────────────────────────────────── */}
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
