'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

class RateLimitError extends Error {}

async function fetchReply(
  message: string,
  history: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  })

  if (res.status === 429) {
    throw new RateLimitError('rate_limit')
  }

  if (!res.ok) {
    throw new Error(`API error ${res.status}`)
  }

  const data = await res.json()
  return data.reply as string
}

// ---------------------------------------------------------------------------
// Starter questions
// ---------------------------------------------------------------------------
const starterQuestions = [
  "I'm not technical. Where should I start?",
  "What can I automate in my work?",
  "Which workflow should I learn first?",
  "What's the difference between automation and AI agents?",
  "Can AI help me with emails and reports?",
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AIAssistant() {
  const [isOpen, setIsOpen]       = useState(false)
  const [messages, setMessages]   = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm the Maddy AI Assistant. Ask me anything about AI, automation, or the training. I'll give you clear, practical answers — no tech jargon.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput]         = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasNewMsg, setHasNewMsg] = useState(false)

  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setHasNewMsg(false)
    }
  }, [isOpen])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    // Snapshot history before adding the new user message
    const history = messages
      .filter((m) => m.id !== 'welcome')
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content }))

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const reply = await fetchReply(text.trim(), history)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
        },
      ])
    } catch (err) {
      const content =
        err instanceof RateLimitError
          ? 'The AI assistant is temporarily busy. Please try again in a moment.'
          : "I'm having a moment of technical difficulty. Please try again, or explore the training sections on the page."
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
      if (!isOpen) setHasNewMsg(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleStarter = (question: string) => {
    sendMessage(question)
  }

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Chat panel                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div
        role="dialog"
        aria-label="Maddy AI Assistant"
        aria-modal="true"
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/8"
             style={{ background: '#0f1c2e', maxHeight: 'min(580px, 80vh)' }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5"
               style={{ background: 'linear-gradient(135deg, #0d1b2e 0%, #1B2433 100%)' }}>
            <div className="w-9 h-9 rounded-full bg-electric/20 border border-electric/30 flex items-center justify-center flex-shrink-0">
              <Bot size={17} className="text-electric" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-heading font-semibold text-soft-white text-sm">
                Maddy AI Assistant
              </div>
              <div className="font-body text-xs text-cool-gray flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-slow" />
                Online · Practical AI &amp; Automation help
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-cool-gray hover:text-soft-white hover:bg-white/5 transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Disclaimer */}
          <div className="px-4 py-2.5 bg-electric/5 border-b border-electric/10">
            <p className="font-body text-xs text-cool-gray/70 text-center">
              AI assistant · For guidance &amp; workflow suggestions only.{' '}
              <span className="text-electric/60">Not a substitute for professional advice.</span>
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto chat-scroll p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 animate-fade-in ${
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 ${
                    msg.role === 'assistant'
                      ? 'bg-electric/20 border border-electric/30'
                      : 'bg-coral/20 border border-coral/30'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <Bot size={13} className="text-electric" />
                  ) : (
                    <User size={13} className="text-coral" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 font-body text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-slate/80 border border-white/5 text-soft-white rounded-tl-sm'
                      : 'bg-electric/15 border border-electric/20 text-soft-white rounded-tr-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2.5 animate-fade-in">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-electric/20 border border-electric/30 flex items-center justify-center mt-0.5">
                  <Bot size={13} className="text-electric" />
                </div>
                <div className="bg-slate/80 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-cool-gray/60 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Starter questions — only shown when just the welcome message exists */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 pb-3">
              <p className="font-body text-xs text-cool-gray mb-2 px-0.5">
                Quick questions to get started:
              </p>
              <div className="flex flex-col gap-1.5">
                {starterQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleStarter(q)}
                    className="text-left font-body text-xs text-electric bg-electric/8 hover:bg-electric/15 border border-electric/15 hover:border-electric/30 rounded-xl px-3 py-2 transition-all duration-150"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 border-t border-white/5 bg-slate/30"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AI, automation, or the training…"
              disabled={isLoading}
              className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 font-body text-sm text-soft-white placeholder-cool-gray/50 focus:outline-none focus:ring-1 focus:ring-electric/40 focus:border-electric/40 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-electric hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 size={16} className="text-white animate-spin" />
              ) : (
                <Send size={16} className="text-white" />
              )}
            </button>
          </form>

        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Floating trigger button                                             */}
      {/* ------------------------------------------------------------------ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        aria-expanded={isOpen}
        className={`fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-xl shadow-black/30 flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-slate border border-white/15 hover:bg-white/10'
            : 'bg-electric hover:bg-blue-600 btn-glow'
        }`}
      >
        {/* New message indicator */}
        {hasNewMsg && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-coral border-2 border-navy animate-bounce" />
        )}

        <div
          className={`transition-all duration-300 ${
            isOpen ? 'rotate-0 opacity-100' : 'rotate-0 opacity-100'
          }`}
        >
          {isOpen ? (
            <X size={22} className="text-cool-gray" />
          ) : (
            <div className="relative">
              <MessageCircle size={24} className="text-white" />
              <Sparkles size={10} className="text-white/60 absolute -top-1 -right-1" />
            </div>
          )}
        </div>
      </button>

      {/* Label pill next to button — shown when closed */}
      {!isOpen && (
        <div className="fixed bottom-7 right-20 sm:right-24 z-50 pointer-events-none">
          <div className="bg-slate/90 border border-white/10 rounded-full px-3 py-1.5 shadow-lg backdrop-blur-sm">
            <span className="font-body text-xs text-cool-gray whitespace-nowrap">
              Ask Maddy AI
            </span>
          </div>
        </div>
      )}
    </>
  )
}
