'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { CheckCircle, AlertCircle, Send } from 'lucide-react'

// ─── Constants ────────────────────────────────────────────────────────────────

const TOOLS          = ['chatgpt', 'claude', 'sheets', 'notion', 'canva', 'other'] as const
const PROJECT_TYPES  = ['workflow', 'prompt', 'sheets_auto', 'content', 'unsure']  as const
const TIMELINES      = ['week', 'month', 'flexible']                                as const
const BUDGETS        = ['under300', 'mid', 'upper', 'unsure']                      as const

type ToolKey        = typeof TOOLS[number]
type ProjectTypeKey = typeof PROJECT_TYPES[number]
type TimelineKey    = typeof TIMELINES[number]
type BudgetKey      = typeof BUDGETS[number]

interface FormState {
  name:        string
  email:       string
  help:        string
  tools:       ToolKey[]
  projectType: ProjectTypeKey | ''
  timeline:    TimelineKey | ''
  budget:      BudgetKey | ''
  message:     string
}

interface FormErrors {
  name?:    string
  email?:   string
  message?: string
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputBase =
  'w-full font-body text-sm rounded-xl px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#3A4A5C]'
const inputStyle = {
  background:  'rgba(8,12,24,0.82)',
  border:      '1px solid rgba(107,159,255,0.16)',
  color:       '#EEF2F8',
}
const inputFocusStyle = { borderColor: 'rgba(107,159,255,0.45)' }
const inputErrorStyle = { borderColor: 'rgba(255,100,100,0.55)' }

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-body text-xs font-semibold uppercase tracking-[0.15em] mb-2"
      style={{ color: '#6B9FFF' }}
    >
      {children}
    </label>
  )
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="mt-1.5 font-body text-xs" style={{ color: '#F08080' }}>{msg}</p>
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ServiceInquiryForm() {
  const t = useTranslations('serviceForm')

  const [form, setForm] = useState<FormState>({
    name: '', email: '', help: '', tools: [],
    projectType: '', timeline: '', budget: '', message: '',
  })
  const [errors,  setErrors]  = useState<FormErrors>({})
  const [focused, setFocused] = useState<string | null>(null)
  const [status,  setStatus]  = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // ── Validation ─────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim())  e.name    = t('errorRequired')
    if (!form.email.trim()) {
      e.email = t('errorRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = t('errorEmail')
    }
    if (!form.message.trim()) e.message = t('errorRequired')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })

      if (!res.ok) throw new Error('non-2xx response')

      setForm({ name: '', email: '', help: '', tools: [], projectType: '', timeline: '', budget: '', message: '' })
      setErrors({})
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const toggleTool = (tool: ToolKey) =>
    setForm((prev) => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter((t) => t !== tool)
        : [...prev.tools, tool],
    }))

  const selectSingle =
    (key: 'projectType' | 'timeline' | 'budget') => (val: string) =>
      setForm((prev) => ({ ...prev, [key]: val }))

  const borderFor = (field: keyof FormErrors) =>
    errors[field]
      ? inputErrorStyle
      : focused === field
      ? inputFocusStyle
      : {}

  // ── Pill helpers ───────────────────────────────────────────────────────────

  const pillCls = (active: boolean) =>
    `cursor-pointer select-none font-body text-sm px-3.5 py-1.5 rounded-full transition-all duration-150 ${
      active
        ? 'text-[#C2D4F0]'
        : 'text-[#6A7A8C] hover:text-[#9DB0C8]'
    }`
  const pillStyle = (active: boolean): React.CSSProperties =>
    active
      ? { background: 'rgba(107,159,255,0.15)', border: '1px solid rgba(107,159,255,0.38)' }
      : { background: 'rgba(8,12,24,0.60)',     border: '1px solid rgba(255,255,255,0.09)' }

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

      {/* Success banner */}
      {status === 'success' && (
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-xl"
          role="alert"
          style={{ background: 'rgba(107,159,255,0.08)', border: '1px solid rgba(107,159,255,0.30)' }}
        >
          <CheckCircle size={18} className="flex-shrink-0" style={{ color: '#6B9FFF' }} />
          <p className="font-body text-sm font-medium" style={{ color: '#C2D4F0' }}>
            {t('successMessage')}
          </p>
        </div>
      )}

      {/* Error banner */}
      {status === 'error' && (
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-xl"
          role="alert"
          style={{ background: 'rgba(255,100,100,0.07)', border: '1px solid rgba(255,100,100,0.30)' }}
        >
          <AlertCircle size={18} className="flex-shrink-0" style={{ color: '#F08080' }} />
          <p className="font-body text-sm font-medium" style={{ color: '#F0A0A0' }}>
            {t('errorSubmit')}
          </p>
        </div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="inq-name">{t('nameLabel')}</FieldLabel>
          <input
            id="inq-name"
            type="text"
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            value={form.name}
            onChange={set('name')}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            aria-required
            aria-invalid={!!errors.name}
            className={inputBase}
            style={{ ...inputStyle, ...borderFor('name') }}
          />
          <FieldError msg={errors.name} />
        </div>
        <div>
          <FieldLabel htmlFor="inq-email">{t('emailLabel')}</FieldLabel>
          <input
            id="inq-email"
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            value={form.email}
            onChange={set('email')}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            aria-required
            aria-invalid={!!errors.email}
            className={inputBase}
            style={{ ...inputStyle, ...borderFor('email') }}
          />
          <FieldError msg={errors.email} />
        </div>
      </div>

      {/* What do you need help with */}
      <div>
        <FieldLabel htmlFor="inq-help">{t('helpLabel')}</FieldLabel>
        <textarea
          id="inq-help"
          rows={3}
          placeholder={t('helpPlaceholder')}
          value={form.help}
          onChange={set('help')}
          onFocus={() => setFocused('help')}
          onBlur={() => setFocused(null)}
          className={`${inputBase} resize-none`}
          style={{ ...inputStyle, ...(focused === 'help' ? inputFocusStyle : {}) }}
        />
      </div>

      {/* Tools */}
      <div>
        <FieldLabel htmlFor="inq-tools">{t('toolsLabel')}</FieldLabel>
        <div id="inq-tools" className="flex flex-wrap gap-2.5" role="group" aria-label={t('toolsLabel')}>
          {TOOLS.map((tool) => {
            const active = form.tools.includes(tool)
            return (
              <label key={tool} className={pillCls(active)} style={pillStyle(active)}>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={active}
                  onChange={() => toggleTool(tool)}
                />
                {t(`tool_${tool}` as const)}
              </label>
            )
          })}
        </div>
      </div>

      {/* Project type */}
      <div>
        <FieldLabel htmlFor="inq-project">{t('projectTypeLabel')}</FieldLabel>
        <div id="inq-project" className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={t('projectTypeLabel')}>
          {PROJECT_TYPES.map((pt) => {
            const active = form.projectType === pt
            return (
              <label key={pt} className={pillCls(active)} style={pillStyle(active)}>
                <input
                  type="radio"
                  name="projectType"
                  className="sr-only"
                  checked={active}
                  onChange={() => selectSingle('projectType')(pt)}
                />
                {t(`projectType_${pt}` as const)}
              </label>
            )
          })}
        </div>
      </div>

      {/* Timeline + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="inq-timeline">{t('timelineLabel')}</FieldLabel>
          <div id="inq-timeline" className="flex flex-wrap gap-2" role="radiogroup" aria-label={t('timelineLabel')}>
            {TIMELINES.map((tl) => {
              const active = form.timeline === tl
              return (
                <label key={tl} className={pillCls(active)} style={pillStyle(active)}>
                  <input
                    type="radio"
                    name="timeline"
                    className="sr-only"
                    checked={active}
                    onChange={() => selectSingle('timeline')(tl)}
                  />
                  {t(`timeline_${tl}` as const)}
                </label>
              )
            })}
          </div>
        </div>
        <div>
          <FieldLabel htmlFor="inq-budget">{t('budgetLabel')}</FieldLabel>
          <div id="inq-budget" className="flex flex-wrap gap-2" role="radiogroup" aria-label={t('budgetLabel')}>
            {BUDGETS.map((b) => {
              const active = form.budget === b
              return (
                <label key={b} className={pillCls(active)} style={pillStyle(active)}>
                  <input
                    type="radio"
                    name="budget"
                    className="sr-only"
                    checked={active}
                    onChange={() => selectSingle('budget')(b)}
                  />
                  {t(`budget_${b}` as const)}
                </label>
              )
            })}
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <FieldLabel htmlFor="inq-message">{t('messageLabel')}</FieldLabel>
        <textarea
          id="inq-message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          value={form.message}
          onChange={set('message')}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          aria-required
          aria-invalid={!!errors.message}
          className={`${inputBase} resize-none`}
          style={{ ...inputStyle, ...borderFor('message') }}
        />
        <FieldError msg={errors.message} />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary inline-flex items-center justify-center gap-2.5 font-body font-semibold text-base px-9 py-4 rounded-full transition-opacity duration-200 disabled:opacity-60 self-start"
      >
        {status === 'submitting' ? (
          t('submitting')
        ) : (
          <>
            {t('submitLabel')}
            <Send size={15} />
          </>
        )}
      </button>
    </form>
  )
}
