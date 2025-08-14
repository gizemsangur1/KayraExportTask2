'use client'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ProductsFilterBar({ categories }: { categories: string[] }) {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  const locale = (pathname?.split('/')[1] as 'tr' | 'en') || 'tr'
  const base = `/${locale}/products`

  const update = (patch: Record<string, string | undefined>) => {
    const params = new URLSearchParams(sp?.toString())
    Object.entries(patch).forEach(([k, v]) => {
      if (!v || v === '') params.delete(k)
      else params.set(k, v)
    })
    router.push(`${base}?${params.toString()}`)
  }

  return (
    <div className="mb-6 flex flex-wrap items-end gap-3">
      <div className="flex flex-col">
        <label className="text-xs">{t('products.filters.category')}</label>
        <select
          className="rounded-md border px-2 py-1"
          value={sp.get('category') ?? ''}
          onChange={e => update({ category: e.target.value || undefined })}
        >
          <option value="">{t('products.filters.all')}</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs">{t('products.filters.sortBy')}</label>
        <select
          className="rounded-md border px-2 py-1"
          value={sp.get('sort') ?? ''}
          onChange={e => update({ sort: e.target.value || undefined })}
        >
          <option value="">{t('products.filters.none')}</option>
          <option value="price-asc">{t('products.filters.priceAsc')}</option>
          <option value="price-desc">{t('products.filters.priceDesc')}</option>
          <option value="title-asc">{t('products.filters.titleAsc')}</option>
          <option value="title-desc">{t('products.filters.titleDesc')}</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs">{t('products.filters.minPrice')}</label>
        <input className="w-28 rounded-md border px-2 py-1" type="number"
               defaultValue={sp.get('min') ?? ''} onBlur={e=>update({ min: e.target.value || undefined })}/>
      </div>

      <div className="flex flex-col">
        <label className="text-xs">{t('products.filters.maxPrice')}</label>
        <input className="w-28 rounded-md border px-2 py-1" type="number"
               defaultValue={sp.get('max') ?? ''} onBlur={e=>update({ max: e.target.value || undefined })}/>
      </div>

      <div className="flex flex-col">
        <label className="text-xs">{t('products.filters.search')}</label>
        <input className="w-48 rounded-md border px-2 py-1"
               defaultValue={sp.get('q') ?? ''} placeholder={t('products.filters.searchPh')}
               onKeyDown={e => { if (e.key === 'Enter') update({ q: (e.target as HTMLInputElement).value || undefined })}}/>
      </div>

      <button className="rounded-md border px-3 py-1" onClick={()=>router.push(base)}>
        {t('products.filters.clear')}
      </button>
    </div>
  )
}
