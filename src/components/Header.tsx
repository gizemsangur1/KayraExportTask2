'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import LocaleSwitcher from './LocaleSwitcher'
import { useAppSelector } from '@/store/hooks'
import { useState } from 'react'

export default function Header() {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = (pathname?.split('/')[1] as 'tr' | 'en') || 'tr'
  const prefix = `/${locale}`
  const on = (href: string) => pathname === href || pathname?.startsWith(href)

  const cartItemsCount = useAppSelector(state =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = (
    <>
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
    </>
  )

  return (
    <header className="flex items-center justify-between py-4 border-b border-slate-200 bg-slate-50 px-4 md:px-0">
      <Link
        href={prefix}
        className="text-2xl font-bold text-slate-800 tracking-tight hover:text-slate-600 transition-colors"
      >
        Gizem Şangür
      </Link>
      <nav className="hidden md:flex items-center gap-6">{navLinks}</nav>

      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <span className="w-6 h-0.5 bg-slate-800"></span>
        <span className="w-6 h-0.5 bg-slate-800"></span>
        <span className="w-6 h-0.5 bg-slate-800"></span>
      </button>

      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-6"
            onClick={e => e.stopPropagation()}
          >
            {navLinks}
          </div>
        </div>
      )}
    </header>
  )
}
