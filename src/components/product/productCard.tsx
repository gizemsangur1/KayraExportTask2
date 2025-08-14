import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/fakestore'

export default function ProductCard({ product, locale }: { product: Product; locale: string }) {
  return (
    <Link href={`/${locale}/product/${product.id}`} className="group rounded-lg border p-4 hover:shadow">
      <div className="aspect-square relative mb-3">
        <Image src={product.image} alt={product.title} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-contain" />
      </div>
      <div className="line-clamp-2 text-sm">{product.title}</div>
      <div className="mt-1 font-semibold">${product.price.toFixed(2)}</div>
    </Link>
  )
}
