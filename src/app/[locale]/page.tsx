import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function LocaleHome({ params }: { params: { locale: string } }) {
  const t = await getTranslations()
  const { locale } = params
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">{t('app.title')}</h1>
      <div className="flex gap-3">
        <Link href={`/${locale}/products`} className="rounded-md bg-black px-4 py-2 text-white">
          {t('cta.explore')}
        </Link>
      </div>
    </section>
  )
}
