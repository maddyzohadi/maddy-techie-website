import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:        '#080C12',       // warmer dark base (was #04080F)
        slate:       '#0C1524',
        'slate-2':   '#131F30',
        surface:     '#0E1520',       // solid card surface (new)
        electric:    '#6B9FFF',       // softer periwinkle (was #5B9CF8)
        violet:      '#A78BFA',       // softer lavender (was #8B5CF6)
        coral:       '#FF7555',       // warm coral — unchanged
        warm:        '#F97B4B',       // amber-orange warm accent (new)
        mint:        '#6EE7B7',       // soft mint for success states (new)
        'soft-white': '#EEF2F8',      // slightly warmer (was #F1F5FA)
        'cool-gray':  '#8A9AB0',      // slightly warmer (was #8A97A8)
        muted:        '#6A7A8E',      // named token for muted text (was inline-only)
      },
      fontFamily: {
        heading: ['var(--font-sora)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
        farsi:   ['var(--font-vazirmatn)', 'sans-serif'],
      },
      backgroundImage: {
        'dot-pattern':      'radial-gradient(rgba(107,159,255,0.08) 1px, transparent 1px)',
        'grid-pattern':     'linear-gradient(rgba(107,159,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(107,159,255,0.03) 1px, transparent 1px)',
        'gradient-primary': 'linear-gradient(135deg, #6B9FFF 0%, #A78BFA 100%)',
        'gradient-warm':    'linear-gradient(135deg, #F97B4B 0%, #FF7555 100%)',
        'gradient-coral':   'linear-gradient(135deg, #FF7555 0%, #F97B4B 100%)',
      },
      backgroundSize: {
        'dot':  '30px 30px',
        'grid': '60px 60px',
      },
      boxShadow: {
        'glow-blue':   '0 0 28px rgba(107,159,255,0.30), 0 4px 16px rgba(107,159,255,0.12)',
        'glow-violet': '0 0 28px rgba(167,139,250,0.30), 0 4px 16px rgba(167,139,250,0.12)',
        'glow-coral':  '0 0 20px rgba(255,117,85,0.25)',
        'glow-warm':   '0 0 20px rgba(249,123,75,0.25)',
        'glow-mint':   '0 0 20px rgba(110,231,183,0.20)',
        'card':        '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'fade-in':      'fadeIn 0.5s ease-out',
        'slide-up':     'slideUp 0.5s ease-out',
        'scroll-entry': 'scrollEntry 0.5s ease-out forwards',
        'float':        'float 5s ease-in-out infinite',
        'float-slow':   'float 7s ease-in-out infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer':      'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollEntry: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
export default config
