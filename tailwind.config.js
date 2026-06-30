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
        brand: {
          bg:          '#FFF9F1',   // page background, hero, navbar
          surface:     '#FAF1E6',   // cards, panels, soft sections, forms
          border:      '#E6D7C8',   // borders, dividers, card outlines
          text:        '#111111',   // headings, primary text, logo
          muted:       '#625B55',   // body text, descriptions, captions
          blue:        '#3F8DDE',   // primary CTAs, active states, links, icons
          'blue-dark': '#2F70BF',   // hover state for blue
          sky:         '#9CCCEF',   // soft highlights, badges, icon backgrounds
          orange:      '#ED5821',   // warm accent — eyebrows, labels, dots, accents (FA-primary)
          clay:        '#ED5821',   // alias for orange
          coral:       '#C9785A',   // alias kept for EN components using text-brand-coral
          white:       '#FFFDF8',   // floating cards, overlays, clean surfaces
        },
      },
      fontFamily: {
        fa:      ['var(--font-vazirmatn)', 'Vazirmatn', 'sans-serif'],
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
      boxShadow: {},
    },
  },
  plugins: [],
}
