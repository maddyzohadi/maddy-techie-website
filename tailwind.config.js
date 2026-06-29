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
          bg:          '#F5ECE0',   // page background, navbar, hero
          card:        '#EFE7DC',   // cards, feature boxes, footer bg
          border:      '#D8C7B8',   // borders, dividers, card outlines
          text:        '#111111',   // H1, H2, logo, primary headings
          muted:       '#5A504A',   // body text, nav links, captions
          blue:        '#4B92DB',   // primary CTAs, active states, links
          'blue-dark': '#3478C2',   // hover state for blue
          babyblue:    '#89CFF0',   // tags, badges, icon bg circles
          terra:       '#C08064',   // secondary/outline buttons, warm accent
          dark:        '#351C1C',   // premium sections background
          white:       '#FFFFFF',   // modal backgrounds, overlays
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
      // No shadows — depth comes from surface color steps
      boxShadow: {},
    },
  },
  plugins: [],
}
