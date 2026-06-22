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
        navy:        '#272625',
        slate:       '#272625',
        'slate-2':   '#f4f3ef',
        surface:     '#FFFFFF',
        electric:    '#272625',   // coral accent
        violet:      '#272625',   // navy
        coral:       '#272625',
        warm:        '#272625',
        mint:        '#272625',
        'soft-white': '#f4f3ef',  // cream page bg
        'cool-gray':  '#6d6c6b',  // body text
        muted:        '#6d6c6b',
      },
      fontFamily: {
        heading: ['var(--font-sora)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
        farsi:   ['var(--font-vazirmatn)', 'sans-serif'],
      },
      backgroundImage: {
        'dot-pattern':      'radial-gradient(rgba(177,177,175,0.06) 1px, transparent 1px)',
        'grid-pattern':     'linear-gradient(rgba(177,177,175,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(177,177,175,0.03) 1px, transparent 1px)',
        'gradient-primary': 'linear-gradient(135deg, #272625 0%, #272625 100%)',
        'gradient-warm':    'linear-gradient(135deg, #272625 0%, #272625 100%)',
        'gradient-coral':   'linear-gradient(135deg, #272625 0%, #272625 100%)',
      },
      backgroundSize: {
        'dot':  '30px 30px',
        'grid': '60px 60px',
      },
      boxShadow: {
        'glow-blue':   '0 0 28px rgba(177,177,175,0.25), 0 4px 16px rgba(177,177,175,0.12)',
        'glow-violet': '0 0 28px rgba(177,177,175,0.20), 0 4px 16px rgba(177,177,175,0.10)',
        'glow-coral':  '0 0 20px rgba(177,177,175,0.25)',
        'glow-warm':   '0 0 20px rgba(177,177,175,0.25)',
        'glow-mint':   '0 0 20px rgba(177,177,175,0.20)',
        'card':        '0 4px 24px rgba(177,177,175,0.08), inset 0 1px 0 rgba(255,255,255,0.80)',
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
