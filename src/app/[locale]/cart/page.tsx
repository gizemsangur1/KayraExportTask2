'use client'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '@/store/cartSlice'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(state => state.cart)
  const t = useTranslations('cart')

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return <div className="p-6">{t('empty')}</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center border p-4 rounded">
            <div className="relative w-20 h-20 mr-4">
              <Image src={item.image} alt={item.title} fill className="object-contain" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">{item.title}</div>
              <div>${item.price.toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="px-2 py-1 border rounded"
              >-</button>
              <span>{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="px-2 py-1 border rounded"
              >+</button>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="ml-4 text-red-500"
            >
              {t('remove')}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-xl font-bold">{t('total')}: ${total.toFixed(2)}</div>
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          {t('clear')}
        </button>
      </div>
    </div>
  )
}
