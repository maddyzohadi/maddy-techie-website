import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('waitlist')
    .insert({ email: email.toLowerCase().trim() })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ message: "You're already on the list!" }, { status: 200 })
    }
    console.error('Waitlist insert error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ message: "You're on the list! We'll be in touch." }, { status: 200 })
}
