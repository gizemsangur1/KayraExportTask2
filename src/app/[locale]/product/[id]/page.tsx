import Image from 'next/image'
import Link from 'next/link'
import { getProduct } from '@/lib/fakestore'
import AddToCart from '@/components/AddToCart'

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
    <article className="mx-auto grid max-w-6xl gap-10 rounded-xl bg-white p-6 shadow-md md:grid-cols-2 md:p-10">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="50vw"
          className="object-contain p-6 transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="mb-3 text-3xl font-bold text-gray-900">{p.title}</h1>
          <div className="mb-4 text-2xl font-semibold text-blue-600">
            ${p.price.toFixed(2)}
          </div>
          <div className="mb-4 text-sm text-gray-500">
            {`Category: ${p.category}`}
          </div>
          <p className="text-gray-700 leading-relaxed">{p.description}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <AddToCart product={p} />
          <Link
            href={`/${locale}/products`}
            className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-500 hover:bg-blue-50"
          >
            Back to products
          </Link>
        </div>
      </div>
    </article>
  )
}
