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
        navy:    '#04080F',
        slate:   '#0C1524',
        'slate-2': '#131F30',
        electric:'#5B9CF8',
        violet:  '#8B5CF6',
        coral:   '#FF7555',
        'soft-white': '#F1F5FA',
        'cool-gray':  '#8A97A8',
      },
      fontFamily: {
        heading: ['var(--font-sora)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'dot-pattern':  'radial-gradient(rgba(91,156,248,0.10) 1px, transparent 1px)',
        'grid-pattern': 'linear-gradient(rgba(91,156,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(91,156,248,0.04) 1px, transparent 1px)',
        'gradient-primary': 'linear-gradient(135deg, #5B9CF8 0%, #8B5CF6 100%)',
        'gradient-coral':   'linear-gradient(135deg, #FF7555 0%, #FF5A2E 100%)',
      },
      backgroundSize: {
        'dot':  '30px 30px',
        'grid': '60px 60px',
      },
      boxShadow: {
        'glow-blue':   '0 0 32px rgba(91,156,248,0.35), 0 4px 20px rgba(91,156,248,0.15)',
        'glow-violet': '0 0 32px rgba(139,92,246,0.35), 0 4px 20px rgba(139,92,246,0.15)',
        'glow-coral':  '0 0 24px rgba(255,117,85,0.30)',
        'card':        '0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'float':      'float 5s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer':    'shimmer 2s linear infinite',
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
