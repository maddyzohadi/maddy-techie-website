// tailwind.config.js — Maddy the Techie Design System

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight:   '#1A1A2E',
        violet:     '#7B2FBE',
        champagne:  '#E8B86D',
        ivory:      '#F5F0E8',
        brand: {
          bg:       '#F7F3EC',
          card:     '#FFF8F1',
          text:     '#111111',
          muted:    '#5F5A54',
          orange:   '#FF6A32',
          coral:    '#F46A2E',
          charcoal: '#171717',
          border:   '#E7DED2',
          peach:    '#F6D2BF',
        },
      },
      fontFamily: {
        fa:      ['Noto Naskh Arabic', 'serif'],
        en:      ['DM Serif Display', 'serif'],
        ui:      ['system-ui', '-apple-system', 'sans-serif'],
        heading: ['DM Serif Display', 'serif'],
        body:    ['system-ui', '-apple-system', 'sans-serif'],
        farsi:   ['Noto Naskh Arabic', 'serif'],
      },
      borderRadius: {
        btn:  '8px',
        card: '12px',
        pill: '20px',
      },
      // No shadows — depth comes from surface color steps
      boxShadow: {},
    },
  },
  plugins: [],
}
