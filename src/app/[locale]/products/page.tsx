import ProductCard from '@/components/product/productCard';
import ProductsFilterBar from '@/components/product/productsFilterBar';
import { getAllProducts, getCategories, getProductsByCategory, applyQuery } from '@/lib/fakestore';

type ProductsSearchParams = {
  category?: string;
  sort?: string;
  min?: string;
  max?: string;
  q?: string;
};

type SortKey = 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc';
const isSortKey = (v: unknown): v is SortKey =>
  v === 'price-asc' || v === 'price-desc' || v === 'title-asc' || v === 'title-desc';

export default async function ProductsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<ProductsSearchParams>;
}) {
  const { locale } = await params;
  const sp = await searchParams;

  const categories = await getCategories();

  const base = sp.category
    ? await getProductsByCategory(sp.category)
    : await getAllProducts();

  const products = applyQuery(base, {
    q: sp.q || undefined,
    min: sp.min ? Number(sp.min) : undefined,
    max: sp.max ? Number(sp.max) : undefined,
    sort: isSortKey(sp.sort) ? sp.sort : undefined
  });

  return (
    <section>
      <ProductsFilterBar categories={categories} />
      {products.length === 0 ? (
        <div className="text-slate-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      )}
    </section>
  );
}
