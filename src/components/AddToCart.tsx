'use client'
import { addToCart } from '@/store/cartSlice'
import { useAppDispatch } from '@/store/hooks'
import { useTranslations } from 'next-intl'
import type { Product } from '@/lib/fakestore'
import React from 'react'

export default function AddToCart({ product }: { product: Product }) {
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
    <button
      onClick={handleAddToCart}
      className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
    >
      {t('addToCart')}
    </button>
  )
}
