import Image from 'next/image'
import Link from 'next/link'
import { getProduct } from '@/lib/fakestore'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  return {
    title: `${product.title} | Store`,
    description: product.description.slice(0, 150)
  }
}

export default async function ProductDetail({
  params
}: { params: { locale: string; id: string } }) {
  const { locale, id } = params
  const p = await getProduct(id)

  return (
    <article className="grid gap-6 md:grid-cols-2">
      <div className="relative aspect-square">
        <Image src={p.image} alt={p.title} fill sizes="50vw" className="object-contain" />
      </div>
      <div>
        <h1 className="mb-2 text-2xl font-semibold">{p.title}</h1>
        <div className="mb-4 text-xl font-bold">${p.price.toFixed(2)}</div>
        <div className="mb-4 text-sm text-slate-600">Category: {p.category}</div>
        <p className="leading-relaxed">{p.description}</p>

        <div className="mt-6 flex gap-3">
          <button className="rounded-md bg-black px-4 py-2 text-white">Add to cart</button>
          <Link href={`/${locale}/products`} className="rounded-md border px-4 py-2">Back to products</Link>
        </div>
      </div>
    </article>
  )
}
