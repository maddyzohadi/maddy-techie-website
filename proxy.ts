import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

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
    // Exclude /api, /auth, Next.js internals, and static assets
    '/((?!api|auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
