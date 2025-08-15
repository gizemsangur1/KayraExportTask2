"use client"
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/fakestore'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/cartSlice'
import { useTranslations } from 'next-intl'
import AddToCart from '../AddToCart'

export default function ProductCard({ product, locale }: { product: Product; locale: string }) {
  const dispatch = useAppDispatch()
  const t = useTranslations('products')

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    }))
  }

  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      className="group block rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-slate-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="line-clamp-2 min-h-[40px] text-sm font-medium text-slate-800 group-hover:text-slate-900">
        {product.title}
      </h3>

      <div className="mt-2 text-lg font-semibold text-slate-900">
        ${product.price.toFixed(2)}
      </div>

      <div className="mt-3">
        <AddToCart product={product} />
      </div>
    </Link>
  )
}
