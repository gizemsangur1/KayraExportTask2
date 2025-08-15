'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import LocaleSwitcher from './LocaleSwitcher'
import { useAppSelector } from '@/store/hooks'

export default function Header() {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = (pathname?.split('/')[1] as 'tr' | 'en') || 'tr'
  const prefix = `/${locale}`
  const on = (href: string) => pathname === href || pathname?.startsWith(href)

  const cartItemsCount = useAppSelector(state =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  return (
    <header className="flex items-center justify-between py-4 border-b border-slate-200 bg-slate-50 px-4 md:px-0">
      <Link
        href={prefix}
        className="text-2xl font-bold text-slate-800 tracking-tight hover:text-slate-600 transition-colors"
      >
        Gizem Şangür
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          href={prefix}
          className={`hover:text-slate-800 transition-colors ${
            on(prefix) ? 'font-semibold text-slate-900' : 'text-slate-600'
          }`}
        >
          {t('nav.home')}
        </Link>
        <Link
          href={`${prefix}/products`}
          className={`hover:text-slate-800 transition-colors ${
            on(`${prefix}/products`) ? 'font-semibold text-slate-900' : 'text-slate-600'
          }`}
        >
          {t('nav.products')}
        </Link>
        <Link
          href={`${prefix}/cart`}
          className={`relative hover:text-slate-800 transition-colors ${
            on(`${prefix}/cart`) ? 'font-semibold text-slate-900' : 'text-slate-600'
          }`}
        >
          {t('nav.cart')}
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs font-medium px-2 py-0.5 rounded-full shadow-sm">
              {cartItemsCount}
            </span>
          )}
        </Link>
        <LocaleSwitcher />
      </nav>
    </header>
  )
}
