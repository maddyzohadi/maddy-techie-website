'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { CheckCircle, AlertCircle, Send } from 'lucide-react'

interface FormState {
  name:  string
  email: string
  help:  string
}

interface FormErrors {
  name?:  string
  email?: string
}

const EMPTY: FormState = { name: '', email: '', help: '' }

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-ui text-xs font-semibold uppercase tracking-[0.15em] mb-2"
      style={{ color: '#625B55' }}
    >
      {children}
    </label>
  )
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="mt-1.5 font-ui text-xs" style={{ color: '#EF4444' }}>{msg}</p>
}

export default function ServiceInquiryForm() {
  const t = useTranslations('serviceForm')
  const locale = useLocale()
  const isFa = locale === 'fa'

  const [form,    setForm]    = useState<FormState>(EMPTY)
  const [errors,  setErrors]  = useState<FormErrors>({})
  const [focused, setFocused] = useState<string | null>(null)
  const [status,  setStatus]  = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const inputBase = `w-full ${isFa ? 'font-fa' : 'font-ui'} text-sm rounded-xl px-4 py-3 outline-none transition-colors duration-200 placeholder:opacity-40`
  const inputStyle: React.CSSProperties = {
    background: 'rgba(0,0,0,0.03)',
    border:     '0.5px solid rgba(0,0,0,0.12)',
    color:      '#111111',
  }
  const inputFocusStyle: React.CSSProperties = { borderColor: 'rgba(63,141,222,0.50)' }
  const inputErrorStyle: React.CSSProperties = { borderColor: 'rgba(239,68,68,0.55)' }

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = t('errorRequired')
    if (!form.email.trim()) {
      e.email = t('errorRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = t('errorEmail')
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

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

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const borderFor = (field: keyof FormErrors) =>
    errors[field] ? inputErrorStyle : focused === field ? inputFocusStyle : {}

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

      {status === 'success' && (
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-xl"
          role="alert"
          style={{ background: 'rgba(0,0,0,0.04)', border: '0.5px solid rgba(0,0,0,0.10)' }}
        >
          <CheckCircle size={18} className="flex-shrink-0" style={{ color: '#3F8DDE' }} />
          <p className={`${isFa ? 'font-fa' : 'font-ui'} text-sm font-medium`} style={{ color: '#111111' }}>
            {t('successMessage')}
          </p>
        </div>
      )}

      {status === 'error' && (
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-xl"
          role="alert"
          style={{ background: 'rgba(239,68,68,0.07)', border: '0.5px solid rgba(239,68,68,0.30)' }}
        >
          <AlertCircle size={18} className="flex-shrink-0" style={{ color: '#EF4444' }} />
          <p className={`${isFa ? 'font-fa' : 'font-ui'} text-sm font-medium`} style={{ color: '#EF4444' }}>
            {t('errorSubmit')}
          </p>
        </div>
      )}

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

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`${isFa ? 'font-fa' : 'font-ui'} inline-flex items-center justify-center gap-2.5 font-semibold text-base px-9 py-4 rounded-full text-white bg-brand-blue hover:bg-brand-blue-dark disabled:opacity-60 transition duration-150 self-start`}
        style={{ border: 'none' }}
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
