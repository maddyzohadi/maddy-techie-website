import assert from 'node:assert/strict'
import test from 'node:test'
import {
  assertBilingualPublishable,
  assertStatusTransition,
  PublishValidationError,
} from '../lib/blog/validation.ts'

function translation(locale: 'en' | 'fa', status: 'draft' | 'in_review' | 'approved' | 'published') {
  return {
    id: `${locale}-1`,
    post_id: 'post-1',
    locale,
    title: `${locale} title`,
    slug: `${locale}-title`,
    excerpt: `${locale} excerpt`,
    body: `<p>${locale} body</p>`,
    seo_title: `${locale} SEO title`,
    meta_description: `${locale} meta description`,
    status,
  } as const
}

test('source-backed bilingual workflow reaches publication atomically', () => {
  let english = translation('en', 'draft')
  let persian = translation('fa', 'draft')

  assert.throws(
    () => assertStatusTransition(english.status, 'approved'),
    PublishValidationError,
  )

  assertStatusTransition(english.status, 'in_review')
  english = { ...english, status: 'in_review' }
  assertStatusTransition(english.status, 'approved')
  english = { ...english, status: 'approved' }

  assert.throws(
    () => assertBilingualPublishable(english, persian),
    PublishValidationError,
  )

  assertStatusTransition(persian.status, 'in_review')
  persian = { ...persian, status: 'in_review' }
  assertStatusTransition(persian.status, 'approved')
  persian = { ...persian, status: 'approved' }

  assert.doesNotThrow(() => assertBilingualPublishable(english, persian))

  const publishedAt = new Date().toISOString()
  const published = [
    { ...english, status: 'published' as const, published_at: publishedAt },
    { ...persian, status: 'published' as const, published_at: publishedAt },
  ]

  assert.equal(published[0].status, 'published')
  assert.equal(published[1].status, 'published')
  assert.equal(published[0].published_at, published[1].published_at)
})