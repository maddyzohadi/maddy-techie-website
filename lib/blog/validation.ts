import type { PostStatus, PostTranslation } from './types'

export class PublishValidationError extends Error {}

export const POST_STATUS_VALUES: PostStatus[] = ['draft', 'in_review', 'approved', 'published']

export function isPostStatus(value: unknown): value is PostStatus {
  return typeof value === 'string' && (POST_STATUS_VALUES as string[]).includes(value)
}

export function assertStatusTransition(
  current: PostStatus | null | undefined,
  next: PostStatus,
): void {
  if (!current) {
    if (next !== 'draft') {
      throw new PublishValidationError('A new translation must start as a draft.')
    }
    return
  }

  const allowed: Record<PostStatus, PostStatus[]> = {
    draft: ['draft', 'in_review'],
    in_review: ['draft', 'in_review', 'approved'],
    approved: ['draft', 'approved', 'published'],
    published: ['draft', 'published'],
  }

  if (!allowed[current].includes(next)) {
    throw new PublishValidationError(`Invalid status transition: ${current} -> ${next}.`)
  }
}

const REQUIRED_FIELDS: (keyof PostTranslation)[] = [
  'title', 'slug', 'body', 'seo_title', 'meta_description',
]

// A translation can only move from draft -> published once every field an
// SEO-complete public page needs is actually filled in.
export function assertPublishable(translation: Pick<PostTranslation, keyof PostTranslation>): void {
  const missing = REQUIRED_FIELDS.filter((field) => !String(translation[field] ?? '').trim())
  if (missing.length > 0) {
    throw new PublishValidationError(
      `Cannot publish: missing ${missing.join(', ')}.`
    )
  }
}

export function isBilingualPublishEligible(
  english: Pick<PostTranslation, 'status'> | null | undefined,
  persian: Pick<PostTranslation, 'status'> | null | undefined,
): boolean {
  return english?.status === 'approved' && persian?.status === 'approved'
}

export function assertBilingualPublishable(
  english: Pick<PostTranslation, 'status'> & Partial<PostTranslation> | null | undefined,
  persian: Pick<PostTranslation, 'status'> & Partial<PostTranslation> | null | undefined,
): void {
  if (!isBilingualPublishEligible(english, persian)) {
    throw new PublishValidationError(
      'Website publishing requires both English and Persian translations to be approved first.'
    )
  }

  assertPublishable(english as PostTranslation)
  assertPublishable(persian as PostTranslation)
}

export function isValidCoverUrl(url: string): boolean {
  if (!url) return true // empty is allowed — cover image is optional
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

export const ALLOWED_IMAGE_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5 MB

export function validateImageFile(file: { type: string; size: number }): string | null {
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
    return 'Unsupported file type. Use PNG, JPEG, WEBP, or GIF.'
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return 'Image is too large. Maximum size is 5 MB.'
  }
  return null
}
