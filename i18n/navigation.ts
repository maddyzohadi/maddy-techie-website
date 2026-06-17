import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Typed navigation helpers that are locale-aware.
// Import Link, redirect, usePathname, useRouter from here
// instead of 'next/navigation' or 'next/link' for locale-aware behaviour.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
