import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import ProductCard from '@/components//product/productCard'
import { getAllProducts } from '@/lib/fakestore'

export default async function LocaleHome({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations()
  const products = await getAllProducts()
  const featured = products.slice(0, 4)

  return (
    <section className="flex flex-col gap-10 bg-slate-50">
      <div className="flex items-center gap-3">
        <Link
          href={`/${locale}/products`}
          className="rounded-2xl bg-rose-500 px-4 py-2 text-white"
        >
          {t('cta.explore')}
        </Link>
      </div>

      <div>
        <h2 className="mb-4 text-2xl text-[#461128] font-semibold">
          {t('home.featured')}
        </h2>
        {featured.length === 0 ? (
          <div className="text-slate-500">{t('home.empty')}</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} locale={locale} />
            ))}
          </div>
        )}
        <Link
          href={`/${locale}/products`}
          className="text-sm text-slate-600 hover:underline"
        >
          {t('home.viewAll')}
        </Link>
      </div>
    </section>
  )
}
