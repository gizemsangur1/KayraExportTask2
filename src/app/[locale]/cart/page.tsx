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
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-lg shadow-md">
        {t('empty')}
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">{t('title')}</h1>

      <div className="space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className="group flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative w-full sm:w-24 h-24 flex-shrink-0 bg-slate-50 rounded-md overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="font-semibold text-slate-800">{item.title}</div>
              <div className="text-slate-700 font-medium">${item.price.toFixed(2)}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="px-3 py-1 rounded border border-slate-300 hover:bg-slate-100 transition-colors"
              >
                -
              </button>
              <span className="min-w-[2rem] text-center">{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="px-3 py-1 rounded border border-slate-300 hover:bg-slate-100 transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-rose-500 hover:text-rose-600 transition-colors font-medium"
            >
              {t('remove')}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-2xl font-bold text-slate-800">
          {t('total')}: <span className="text-slate-700">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-rose-500 text-white px-6 py-2 rounded-2xl hover:bg-rose-600 transition-colors shadow"
        >
          {t('clear')}
        </button>
      </div>
    </div>
  )
}
