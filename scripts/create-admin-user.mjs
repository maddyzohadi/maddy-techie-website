// One-time local setup: creates (or upgrades) your Supabase Auth admin account.
//
// This script is NEVER imported by the running app — it's the only place a
// server-side Supabase secret key is used anywhere in this project. Run it
// once, locally, then clear your terminal history if you're on a shared
// machine.
//
// Usage:
//   node --env-file=.env.local scripts/create-admin-user.mjs
//
// Required environment variables (set in .env.local, never committed):
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SECRET_KEY            (preferred — Supabase's current Secret API Key)
//     — or, only for backward compatibility —
//   SUPABASE_SERVICE_ROLE_KEY      (legacy service-role key)
//   ADMIN_EMAIL
//   ADMIN_INITIAL_PASSWORD
//
// No credentials are hardcoded here — the script fails loudly if a required
// variable is missing, and never prints the secret key or the password to
// the terminal.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// Prefer the current Secret API Key; fall back to the legacy service-role
// key only for projects that haven't migrated yet.
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
const usingLegacyKey = !process.env.SUPABASE_SECRET_KEY && !!process.env.SUPABASE_SERVICE_ROLE_KEY
const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_INITIAL_PASSWORD

const missing = []
if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL')
if (!secretKey) missing.push('SUPABASE_SECRET_KEY (or, as a legacy fallback, SUPABASE_SERVICE_ROLE_KEY)')
if (!adminEmail) missing.push('ADMIN_EMAIL')
if (!adminPassword) missing.push('ADMIN_INITIAL_PASSWORD')

if (missing.length > 0) {
  console.error(`Missing required environment variable(s): ${missing.join(', ')}`)
  console.error('Set them in .env.local (or pass via --env-file) and re-run.')
  process.exit(1)
}

if (usingLegacyKey) {
  console.log('Using legacy SUPABASE_SERVICE_ROLE_KEY — consider migrating to SUPABASE_SECRET_KEY.')
}

const supabase = createClient(supabaseUrl, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function findUserByEmail(email) {
  let page = 1
  const perPage = 200
  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage })
    if (error) throw error
    const match = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
    if (match) return match
    if (data.users.length < perPage) return null
    page += 1
  }
}

async function main() {
  console.log(`Looking up existing Supabase Auth user for ${adminEmail}...`)
  const existing = await findUserByEmail(adminEmail)

  if (existing) {
    console.log('User already exists — ensuring the admin claim is set (no duplicate created).')
    const { error } = await supabase.auth.admin.updateUserById(existing.id, {
      app_metadata: { ...existing.app_metadata, is_admin: true },
    })
    if (error) throw error
    console.log(`Done. ${adminEmail} is now an admin. (Password unchanged.)`)
    return
  }

  console.log('No existing user found — creating one.')
  const { error } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true, // auto-confirm — this is a trusted, admin-created account
    app_metadata: { is_admin: true },
  })
  if (error) throw error
  console.log(`Done. Created ${adminEmail} and marked it as admin.`)
  console.log('You can now sign in at /admin/login with that email and the password you set in ADMIN_INITIAL_PASSWORD.')
}

main().catch((err) => {
  console.error('Failed to set up the admin user:', err.message ?? err)
  process.exit(1)
})
