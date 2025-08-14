'use client'
import { useRouter, usePathname } from 'next/navigation'
import { LOCALES } from '@/i18n/locales'

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const current = (pathname?.split('/')[1] as 'tr' | 'en') || 'tr'
  const rest = pathname?.replace(/^\/(tr|en)/, '') || ''

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as 'tr' | 'en'
    router.push(`/${next}${rest}`)
  }

  return (
    <select value={current} onChange={onChange} className="rounded-md border px-2 py-1">
      {LOCALES.map(l => <option key={l} value={l}>{l}</option>)}
    </select>
  )
}
