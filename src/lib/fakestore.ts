export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: { rate: number; count: number }
}

const API = 'https://fakestoreapi.com'

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${API}/products/categories`, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error('Failed to load categories')
  return res.json()
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API}/products`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to load products')
  return res.json()
}

export async function getProductsByCategory(cat: string): Promise<Product[]> {
  const res = await fetch(`${API}/products/category/${encodeURIComponent(cat)}`, {
    next: { revalidate: 60 }
  })
  if (!res.ok) throw new Error('Failed to load category products')
  return res.json()
}

export async function getProduct(id: string | number): Promise<Product> {
  const res = await fetch(`${API}/products/${id}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to load product')
  return res.json()
}

export function applyQuery(
  products: Product[],
  opts: {
    q?: string
    min?: number
    max?: number
    sort?: 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc'
  }
) {
  let out = [...products]
  if (opts.q) {
    const k = opts.q.toLowerCase()
    out = out.filter(p => p.title.toLowerCase().includes(k) || p.description.toLowerCase().includes(k))
  }
  if (typeof opts.min === 'number') out = out.filter(p => p.price >= opts.min!)
  if (typeof opts.max === 'number') out = out.filter(p => p.price <= opts.max!)
  switch (opts.sort) {
    case 'price-asc':  out.sort((a,b)=>a.price-b.price); break
    case 'price-desc': out.sort((a,b)=>b.price-a.price); break
    case 'title-asc':  out.sort((a,b)=>a.title.localeCompare(b.title)); break
    case 'title-desc': out.sort((a,b)=>b.title.localeCompare(a.title)); break
  }
  return out
}
