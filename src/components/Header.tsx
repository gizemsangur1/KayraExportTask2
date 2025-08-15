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
    <header className="flex items-center justify-between py-6">
      <Link href={prefix} className="text-xl font-bold">Store</Link>
      <nav className="flex items-center gap-6">
        <Link href={prefix} className={on(prefix) ? 'font-semibold' : ''}>
          {t('nav.home')}
        </Link>
        <Link href={`${prefix}/products`} className={on(`${prefix}/products`) ? 'font-semibold' : ''}>
          {t('nav.products')}
        </Link>
        <Link href={`${prefix}/cart`} className={on(`${prefix}/cart`) ? 'font-semibold' : ''}>
          {t('nav.cart')}
          {cartItemsCount > 0 && (
            <span className="ml-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full">
              {cartItemsCount}
            </span>
          )}
        </Link>
        <LocaleSwitcher />
      </nav>
    </header>
  )
}
