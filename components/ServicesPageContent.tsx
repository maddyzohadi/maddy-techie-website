import { getLocale } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import ServiceInquiryForm from '@/components/ServiceInquiryForm'
import ServicesPageContentFa from '@/components/ServicesPageContentFa'
import ServicesHero from '@/components/ServicesHero'
import MotionFadeIn from '@/components/MotionFadeIn'

// ── Static EN copy ─────────────────────────────────────────────────────────
const EN_SERVICES = [
  {
    num: '01',
    label: 'AI SETUP',
    title: 'Set up AI for your daily work',
    body: 'I help you organize ChatGPT, Claude, and your everyday tools so AI becomes easier to use, not another thing to manage.',
    bestFor: [
      'Professionals who want a simple AI setup',
      'Creators who need repeatable workflows',
      'Small business owners who want less manual work',
    ],
  },
  {
    num: '02',
    label: 'WORKFLOW DESIGN',
    title: 'Turn repeated tasks into clear workflows',
    body: 'We map the task, simplify the steps, and design a practical AI-assisted workflow you can actually use.',
    bestFor: [
      'Email and message workflows',
      'Content planning',
      'Research and reporting',
      'Client follow-up systems',
    ],
  },
  {
    num: '03',
    label: 'TEMPLATES & TRAINING',
    title: 'Learn the system, not just the tool',
    body: 'You get simple templates, clear instructions, and hands-on guidance so you understand how the workflow works.',
    bestFor: [
      'Non-technical teams',
      'Solo business owners',
      'Creators and freelancers',
      'Anyone tired of vague AI advice',
    ],
  },
] as const

const EN_STEPS = [
  { label: 'Step 1', title: 'Understand your work',  desc: 'We identify the repeated tasks, messy steps, and places where AI can actually help.' },
  { label: 'Step 2', title: 'Design the workflow',   desc: 'We turn the task into a simple, practical system using the tools you already use.' },
  { label: 'Step 3', title: 'Build and test',        desc: 'We create the workflow, prompts, templates, or setup and test it with real examples.' },
  { label: 'Step 4', title: 'Teach and hand off',    desc: 'You learn how it works, how to use it, and how to keep improving it.' },
] as const

const EN_WHO = [
  'You want to save time on repeated work',
  'You want better prompts and templates',
  'You want simple systems, not complicated tools',
  'You want guidance that feels clear and human',
] as const

// ── Shared typography constants ────────────────────────────────────────────
const SERIF = "'DM Serif Display', serif"
const SANS  = 'system-ui, -apple-system, sans-serif'
const SECTION_PAD = 'clamp(96px, 12vw, 140px) clamp(24px, 8vw, 80px)'
const BORDER = '0.5px solid rgba(17,17,17,0.07)'

// ── Section label (left column) ────────────────────────────────────────────
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ paddingTop: '6px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '16px' }}>
        <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(52px, 6vw, 80px)', color: '#E34E2E', lineHeight: 1, letterSpacing: '-0.02em' }}>
          {num}
        </span>
        <span style={{ fontFamily: SANS, fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#8C7E74' }}>
          {label}
        </span>
      </div>
      <div style={{ height: '0.5px', background: 'rgba(17,17,17,0.14)' }} />
    </div>
  )
}

// ── "Explore service →" link ───────────────────────────────────────────────
function ServiceLink() {
  return (
    <a
      href="#contact-form"
      style={{
        display: 'inline-block',
        fontFamily: SANS,
        fontSize: '16px',
        fontWeight: 700,
        color: '#111111',
        textDecoration: 'none',
        paddingBottom: '6px',
        borderBottom: '1.5px solid rgba(17,17,17,0.22)',
      }}
    >
      Explore service →
    </a>
  )
}

// ── Main export ────────────────────────────────────────────────────────────
export default async function ServicesPageContent() {
  const locale = await getLocale()
  if (locale === 'fa') return <ServicesPageContentFa />

  return (
    <>

      {/* ── Hero (animated client component) ─────────────────────────────── */}
      <ServicesHero />

      {/* ── Services 01 / 02 / 03 ─────────────────────────────────────────── */}
      {EN_SERVICES.map((svc, i) => (
        <section
          key={svc.num}
          dir="ltr"
          style={{
            background: i % 2 === 0 ? '#FFFDF8' : '#FAF6EF',
            padding: SECTION_PAD,
            borderTop: BORDER,
          }}
        >
          <MotionFadeIn>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="grid grid-cols-1 md:grid-cols-[196px_1fr] gap-10 md:gap-[72px]" style={{ alignItems: 'start' }}>

                <SectionLabel num={svc.num} label={svc.label} />

                <div>
                  <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, color: '#111111', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '20px' }}>
                    {svc.title}
                  </h2>
                  <p style={{ fontFamily: SANS, fontSize: 'clamp(16px, 1.4vw, 18px)', color: '#625B55', lineHeight: 1.72, marginBottom: '36px', maxWidth: '520px' }}>
                    {svc.body}
                  </p>

                  <p style={{ fontFamily: SANS, fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8C7E74', marginBottom: '14px' }}>
                    Best for
                  </p>
                  <ul style={{ margin: '0 0 40px', padding: 0, listStyle: 'none' }}>
                    {svc.bestFor.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '9px 0',
                          borderTop: idx > 0 ? '0.5px solid rgba(17,17,17,0.06)' : 'none',
                          fontFamily: SANS,
                          fontSize: 'clamp(14px, 1.2vw, 16px)',
                          color: '#625B55',
                          lineHeight: 1.65,
                        }}
                      >
                        <span aria-hidden="true" style={{ flexShrink: 0, marginTop: '7px', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(227,78,46,0.40)', display: 'block' }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <ServiceLink />
                </div>

              </div>
            </div>
          </MotionFadeIn>
        </section>
      ))}

      {/* ── 04 / Process ──────────────────────────────────────────────────── */}
      <section
        dir="ltr"
        style={{ background: '#FAF6EF', padding: SECTION_PAD, borderTop: BORDER }}
      >
        <MotionFadeIn>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-[196px_1fr] gap-10 md:gap-[72px]" style={{ alignItems: 'start' }}>

              <SectionLabel num="04" label="PROCESS" />

              <div>
                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, color: '#111111', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '16px' }}>
                  From first message to working system
                </h2>
                <p style={{ fontFamily: SANS, fontSize: 'clamp(16px, 1.4vw, 18px)', color: '#625B55', lineHeight: 1.72, marginBottom: '52px', maxWidth: '480px' }}>
                  Four focused steps. One clear workflow. Built around the way you actually work.
                </p>

                <div>
                  {EN_STEPS.map((step, i) => (
                    <div
                      key={step.label}
                      style={{
                        paddingTop: i === 0 ? 0 : '28px',
                        paddingBottom: i < EN_STEPS.length - 1 ? '28px' : 0,
                        borderTop: i === 0 ? 'none' : '0.5px solid rgba(17,17,17,0.09)',
                      }}
                    >
                      <p style={{ fontFamily: SANS, fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8C7E74', marginBottom: '8px' }}>
                        {step.label}
                      </p>
                      <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(19px, 2vw, 24px)', fontWeight: 400, color: '#111111', lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: '8px' }}>
                        {step.title}
                      </h3>
                      <p style={{ fontFamily: SANS, fontSize: 'clamp(14px, 1.2vw, 16px)', color: '#625B55', lineHeight: 1.70, margin: 0, maxWidth: '500px' }}>
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </MotionFadeIn>
      </section>

      {/* ── 05 / Who It's For ─────────────────────────────────────────────── */}
      <section
        dir="ltr"
        style={{ background: '#F1E8DD', padding: SECTION_PAD, borderTop: BORDER }}
      >
        <MotionFadeIn>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-[196px_1fr] gap-10 md:gap-[72px]" style={{ alignItems: 'start' }}>

              <SectionLabel num="05" label="WHO IT'S FOR" />

              <div>
                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, color: '#111111', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '20px' }}>
                  Built for people who want AI to feel practical
                </h2>
                <p style={{ fontFamily: SANS, fontSize: 'clamp(16px, 1.4vw, 18px)', color: '#625B55', lineHeight: 1.72, marginBottom: '44px', maxWidth: '520px' }}>
                  This is for non-technical professionals, creators, freelancers, and small business owners who want useful AI systems without learning to code.
                </p>

                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {EN_WHO.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '14px',
                        padding: '14px 0',
                        borderTop: '0.5px solid rgba(17,17,17,0.09)',
                        fontFamily: SANS,
                        fontSize: 'clamp(15px, 1.3vw, 17px)',
                        color: '#625B55',
                        lineHeight: 1.65,
                      }}
                    >
                      <span aria-hidden="true" style={{ flexShrink: 0, marginTop: '8px', width: '5px', height: '5px', borderRadius: '50%', background: '#E34E2E', display: 'block' }} />
                      {item}
                    </li>
                  ))}
                  <li style={{ height: '0.5px', background: 'rgba(17,17,17,0.09)', padding: 0, border: 'none', display: 'block' }} />
                </ul>
              </div>

            </div>
          </div>
        </MotionFadeIn>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section
        dir="ltr"
        style={{
          background: [
            'radial-gradient(ellipse 70% 90% at 85% 0%, rgba(227,78,46,0.14) 0%, rgba(244,160,130,0.09) 40%, transparent 68%)',
            '#FFFDF8',
          ].join(', '),
          padding: SECTION_PAD,
          borderTop: BORDER,
        }}
      >
        <MotionFadeIn>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: SANS, fontSize: '11px', fontWeight: 600, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#E34E2E', marginBottom: '28px' }}>
              Ready when you are
            </p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(34px, 5vw, 68px)', fontWeight: 400, color: '#111111', lineHeight: 1.06, letterSpacing: '-0.025em', marginBottom: '24px' }}>
              Let&apos;s build your first{' '}
              <em style={{ fontStyle: 'italic' }}>practical AI workflow.</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(16px, 1.4vw, 18px)', color: '#625B55', lineHeight: 1.72, maxWidth: '500px', margin: '0 auto 48px' }}>
              Start with one repeated task, one clear system, and a setup you can actually use.
            </p>
            <a
              href="#contact-form"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '17px 40px',
                background: '#E34E2E',
                color: '#FFFDF8',
                borderRadius: '100px',
                textDecoration: 'none',
                fontFamily: SANS,
                fontSize: '17px',
                fontWeight: 600,
                letterSpacing: '0.01em',
              }}
            >
              Start a Project
              <ArrowRight size={16} />
            </a>
          </div>
        </MotionFadeIn>
      </section>

      {/* ── Contact Form ──────────────────────────────────────────────────── */}
      <section
        id="contact-form"
        dir="ltr"
        style={{
          background: '#FAF6EF',
          padding: SECTION_PAD,
          borderTop: BORDER,
          scrollMarginTop: '88px',
        }}
      >
        <MotionFadeIn>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontFamily: SANS, fontSize: '11px', fontWeight: 600, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#E34E2E', marginBottom: '20px' }}>
                Work with me
              </p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 400, color: '#111111', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px' }}>
                Tell me about your project
              </h2>
              <p style={{ fontFamily: SANS, fontSize: '16px', color: '#625B55', lineHeight: 1.65 }}>
                Fill in a few details and I&apos;ll get back to you within 48 hours.
              </p>
            </div>
            <ServiceInquiryForm />
          </div>
        </MotionFadeIn>
      </section>

    </>
  )
}
