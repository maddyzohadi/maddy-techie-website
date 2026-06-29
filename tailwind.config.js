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
          bg:       '#F5ECE0',
          card:     '#EFE7DC',
          text:     '#111111',
          muted:    '#5A504A',
          orange:    '#B53389',
          coral:     '#9E2A76',
          red:       '#B53389',
          'red-dark': '#9E2A76',
          'red-tint': '#F2C1D1',
          charcoal:  '#171717',
          border:    '#D8C7B8',
          peach:     '#F2C1D1',
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
