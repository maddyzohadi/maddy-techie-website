import { getLocale } from 'next-intl/server'
import HeroFa from './HeroFa'
import HeroEn from './HeroEn'

export default async function Hero() {
  const locale = await getLocale()
  if (locale === 'fa') return <HeroFa />
  return <HeroEn />
}
