import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Admin route protection ────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    // Login page is always accessible
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      // No password configured — dev mode, allow through
      return NextResponse.next()
    }

    const sessionCookie = request.cookies.get('admin_session')
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Verify cookie against deterministic token derived from ADMIN_PASSWORD
    const encoder    = new TextEncoder()
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(adminPassword + ':maddy_admin_v1'))
    const expected   = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')

    if (sessionCookie.value !== expected) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return NextResponse.next()
  }

  // ── Locale routing for public pages ──────────────────────────────

  // next-intl runs first — handles /en /fa detection and root redirect
  const intlResponse = intlMiddleware(request)

  // Skip Supabase session refresh when env vars are unconfigured placeholders
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  if (!supabaseUrl || supabaseUrl.startsWith('your-')) {
    return intlResponse
  }

  // Merge Supabase session cookies into the intl response
  const supabase = createServerClient(
    supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            intlResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user && request.nextUrl.pathname.match(/^\/(en|fa)\/dashboard/)) {
    const url = request.nextUrl.clone()
    url.pathname = '/en/auth/login'
    return NextResponse.redirect(url)
  }

  return intlResponse
}

export const config = {
  matcher: [
    // Redirect root to default locale
    '/',
    // Handle locale-prefixed routes
    '/(fa|en)/:path*',
    // Handle all other routes EXCEPT static asset paths and Next.js internals
    '/((?!_next|api|auth|videos|images|icons|fonts|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.[^/]+$).*)',
  ],
}
