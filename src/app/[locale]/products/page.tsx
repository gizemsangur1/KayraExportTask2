import ProductCard from '@/components/product/productCard';
import ProductsFilterBar from '@/components/product/productsFilterBar';
import { getAllProducts, getCategories, getProductsByCategory, applyQuery } from '@/lib/fakestore'

export default async function ProductsPage({
  params, searchParams
}: {
  params: { locale: string },
  searchParams: { category?: string; sort?: string; min?: string; max?: string; q?: string }
}) {
  const { locale } = params
  const categories = await getCategories()

  const base = searchParams.category
    ? await getProductsByCategory(searchParams.category)
    : await getAllProducts()

  const products = applyQuery(base, {
    q: searchParams.q || undefined,
    min: searchParams.min ? Number(searchParams.min) : undefined,
    max: searchParams.max ? Number(searchParams.max) : undefined,
    sort: (searchParams.sort as any) || undefined
  })

  return (
    <section>
      <ProductsFilterBar categories={categories} />
      {products.length === 0 ? (
        <div className="text-slate-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(p => <ProductCard key={p.id} product={p} locale={locale} />)}
        </div>
      )}
    </section>
  )
}
