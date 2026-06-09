# Maddy the Techie — Website

**Learn AI. Automate Work. No Coding.**

A modern dark-academy website for the Maddy the Techie brand — built with Next.js 16, Tailwind CSS, and an AI-powered chatbot assistant.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS 3 |
| Icons | lucide-react |
| AI assistant | OpenRouter API (model configurable) |
| Language | TypeScript |

---

## Local setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd maddy-techie-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and add your API key:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your key:

```
OPENROUTER_API_KEY=sk-or-...
```

Get a free API key at [openrouter.ai](https://openrouter.ai).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Changing the AI model

The model is set in one place. Open [app/api/chat/route.ts](app/api/chat/route.ts) and change line 4:

```typescript
const OPENROUTER_MODEL = 'qwen/qwen3-next-80b-a3b-instruct:free'
```

Any OpenRouter-compatible model ID works here.

---

## Project structure

```
app/
  layout.tsx          Root layout (fonts, metadata)
  page.tsx            Home page — assembles all sections
  globals.css         Global styles, dot-pattern, custom scrollbar
  api/
    chat/
      route.ts        POST /api/chat — calls OpenRouter, never exposes the key

components/
  Navigation.tsx      Fixed nav with mobile hamburger
  Hero.tsx            Full hero with stats and CTAs
  ProblemSection.tsx  "Does this sound like you?" pain-point cards
  MethodSection.tsx   Two-part method (Automation + AI)
  CurriculumSection.tsx  Accordion with 4 curriculum parts
  ProjectsSection.tsx    6 real-world project cards
  WhoItsFor.tsx          Audience section + "you don't need" checklist
  ResourcesSection.tsx   Templates and resources
  AboutSection.tsx       Instructor/brand section
  CTASection.tsx         Final call to action
  Footer.tsx             Footer with nav links
  AIAssistant.tsx        Floating AI chatbot (calls /api/chat)
```

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. In **Environment Variables**, add:
   - `OPENROUTER_API_KEY` → your key
4. Click **Deploy**.

Vercel auto-detects Next.js. No extra configuration needed.

> `.env.local` is in `.gitignore` and will never be pushed to GitHub.
> Always set the API key through Vercel's dashboard, never in code.

---

## Security notes

- The `OPENROUTER_API_KEY` is only read in `app/api/chat/route.ts` (server-side).
- It is never passed to any component or included in the client bundle.
- `.env.local` is excluded from git via `.gitignore`.
- `.env.example` is committed as a template — it contains no real values.
