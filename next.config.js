const createNextIntlPlugin = require('next-intl/plugin')

// Point to the request config so next-intl can resolve messages server-side
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withNextIntl(nextConfig)
