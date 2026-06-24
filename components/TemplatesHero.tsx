'use client'

import { useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4'

export default function TemplatesHero() {
  const locale = useLocale()
  const isFa = locale === 'fa'

  const videoRef      = useRef<HTMLVideoElement>(null)
  const rafRef        = useRef<number | null>(null)
  const fadingOutRef  = useRef(false)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    function cancelRaf() {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    function fadeIn(video: HTMLVideoElement) {
      cancelRaf()
      const start = parseFloat(video.style.opacity || '0')
      const t0    = performance.now()
      const tick  = (now: number) => {
        const p = Math.min((now - t0) / 500, 1)
        video.style.opacity = String(start + (1 - start) * p)
        if (p < 1) rafRef.current = requestAnimationFrame(tick)
        else rafRef.current = null
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    function fadeOut(video: HTMLVideoElement) {
      cancelRaf()
      const start = parseFloat(video.style.opacity || '1')
      const t0    = performance.now()
      const tick  = (now: number) => {
        const p = Math.min((now - t0) / 500, 1)
        video.style.opacity = String(start * (1 - p))
        if (p < 1) rafRef.current = requestAnimationFrame(tick)
        else rafRef.current = null
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const onPlaying = () => {
      if (!hasStartedRef.current) {
        hasStartedRef.current = true
        fadeIn(v)
      }
    }

    const onTimeUpdate = () => {
      if (!v.duration) return
      const remaining = v.duration - v.currentTime
      if (remaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true
        fadeOut(v)
      }
    }

    const onEnded = () => {
      v.style.opacity = '0'
      setTimeout(() => {
        v.currentTime        = 0
        fadingOutRef.current = false
        v.play().then(() => fadeIn(v)).catch(() => {})
      }, 100)
    }

    v.addEventListener('playing',    onPlaying)
    v.addEventListener('timeupdate', onTimeUpdate)
    v.addEventListener('ended',      onEnded)

    return () => {
      cancelRaf()
      v.removeEventListener('playing',    onPlaying)
      v.removeEventListener('timeupdate', onTimeUpdate)
      v.removeEventListener('ended',      onEnded)
    }
  }, [])

  return (
    <section
      className="relative overflow-hidden bg-black"
      style={{ minHeight: 'clamp(420px, 60vh, 560px)' }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0 }}
      />

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.44)' }}
      />

      {/* Bottom gradient fades into the cream section below */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, #F7F3EC)',
        }}
      />

      {/* Content — pt-[68px] clears the fixed nav */}
      <div
        className="relative z-10 flex items-center justify-center px-6 pt-[68px]"
        style={{ minHeight: 'clamp(420px, 60vh, 560px)' }}
      >
        <div
          className="text-center w-full max-w-2xl mx-auto pb-14"
          dir={isFa ? 'rtl' : 'ltr'}
        >
          {/* Eyebrow */}
          <div className="flex justify-center mb-7">
            <span className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#FF6A32',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.75)',
                  fontWeight: 500,
                  letterSpacing: isFa ? undefined : '0.07em',
                }}
              >
                {isFa ? 'سیستم‌های آماده' : 'Ready-to-use systems'}
              </span>
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontFamily: isFa ? "'Noto Naskh Arabic', serif" : "'DM Serif Display', serif",
              fontSize: 'clamp(30px, 4.8vw, 54px)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.15,
              letterSpacing: isFa ? undefined : '-0.025em',
              marginBottom: '20px',
              textShadow: '0 2px 24px rgba(0,0,0,0.45)',
            }}
          >
            {isFa ? (
              <>
                با یک سیستم شروع کن،{' '}
                <span style={{ color: 'rgba(255,255,255,0.50)' }}>نه یک صفحه‌ی خالی</span>
              </>
            ) : (
              <>
                Ready-to-use AI systems{' '}
                <span style={{ color: 'rgba(255,255,255,0.50)' }}>for everyday work</span>
              </>
            )}
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif',
              fontSize: '16px',
              color: 'rgba(255,255,255,0.60)',
              lineHeight: 1.72,
              maxWidth: '520px',
              margin: '0 auto',
              textShadow: '0 1px 10px rgba(0,0,0,0.4)',
            }}
          >
            {isFa
              ? 'گردش‌کارهای هوش مصنوعی آماده که می‌توانی همین امروز بگیری، تنظیم کنی و اجرا کنی.'
              : 'Grab practical AI templates for emails, reports, content planning, and client workflows — built to save time without starting from scratch.'}
          </p>
        </div>
      </div>
    </section>
  )
}
