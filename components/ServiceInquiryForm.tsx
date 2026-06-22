'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { CheckCircle, AlertCircle, Send } from 'lucide-react'

// ─── Constants ────────────────────────────────────────────────────────────────

const PROJECT_TYPES = ['workflow', 'prompt', 'sheets_auto', 'content', 'unsure'] as const
const TIMELINES     = ['week', 'month', 'flexible']                               as const

type ProjectTypeKey = typeof PROJECT_TYPES[number]
type TimelineKey    = typeof TIMELINES[number]

interface FormState {
  name:        string
  email:       string
  help:        string
  projectType: ProjectTypeKey | ''
  timeline:    TimelineKey | ''
  message:     string
}

interface FormErrors {
  name?:    string
  email?:   string
  message?: string
}

const EMPTY: FormState = {
  name: '', email: '', help: '', projectType: '', timeline: '', message: '',
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputBase =
  'w-full font-body text-sm rounded-xl px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#A8B0BF]'
const inputStyle = {
  background: '#FFFFFF',
  border:     '1px solid #ecebea',
  color:      '#272625',
}
const inputFocusStyle = { borderColor: 'rgba(177,177,175,0.55)' }
const inputErrorStyle = { borderColor: 'rgba(239,68,68,0.55)' }

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-body text-xs font-semibold uppercase tracking-[0.15em] mb-2"
      style={{ color: '#272625' }}
    >
      {children}
    </label>
  )
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="mt-1.5 font-body text-xs" style={{ color: '#EF4444' }}>{msg}</p>
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ServiceInquiryForm() {
  const t = useTranslations('serviceForm')

  const [form,    setForm]    = useState<FormState>(EMPTY)
  const [errors,  setErrors]  = useState<FormErrors>({})
  const [focused, setFocused] = useState<string | null>(null)
  const [status,  setStatus]  = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // ── Validation ─────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = t('errorRequired')
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

      setForm(EMPTY)
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

  const selectSingle = (key: 'projectType' | 'timeline') => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }))

  const borderFor = (field: keyof FormErrors) =>
    errors[field] ? inputErrorStyle : focused === field ? inputFocusStyle : {}

  // ── Pill helpers ───────────────────────────────────────────────────────────

  const pillCls = (active: boolean) =>
    `cursor-pointer select-none font-body text-sm px-3.5 py-1.5 rounded-full transition-all duration-150 ${
      active ? 'text-[#272625]' : 'text-[#6d6c6b] hover:text-[#6d6c6b]'
    }`
  const pillStyle = (active: boolean): React.CSSProperties =>
    active
      ? { background: '#f4f3ef', border: '1px solid rgba(177,177,175,0.38)' }
      : { background: '#f4f3ef', border: '1px solid #ecebea' }

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

      {/* Success banner */}
      {status === 'success' && (
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-xl"
          role="alert"
          style={{ background: '#f4f3ef', border: '1px solid rgba(177,177,175,0.30)' }}
        >
          <CheckCircle size={18} className="flex-shrink-0" style={{ color: '#272625' }} />
          <p className="font-body text-sm font-medium" style={{ color: '#272625' }}>
            {t('successMessage')}
          </p>
        </div>
      )}

      {/* Error banner */}
      {status === 'error' && (
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-xl"
          role="alert"
          style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.30)' }}
        >
          <AlertCircle size={18} className="flex-shrink-0" style={{ color: '#EF4444' }} />
          <p className="font-body text-sm font-medium" style={{ color: '#EF4444' }}>
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

      {/* Timeline */}
      <div>
        <FieldLabel htmlFor="inq-timeline">{t('timelineLabel')}</FieldLabel>
        <div id="inq-timeline" className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={t('timelineLabel')}>
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
