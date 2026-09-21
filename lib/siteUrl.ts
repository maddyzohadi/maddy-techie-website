// Resolves the site's own public base URL for building absolute links
// (metadata, sitemap, robots, JSON-LD). Never hardcode the production
// domain in new blog code — read it from here instead.
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL
  if (configured) {
    return configured.replace(/\/$/, '')
  }
  return 'http://localhost:3000'
}
