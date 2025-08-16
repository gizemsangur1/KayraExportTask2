'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type Product = {
  id: number
  title: string
  image: string
  price: number
}

export default function Searchbar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setAllProducts(data))
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const lower = query.toLowerCase()
    setResults(
      allProducts.filter(p => p.title.toLowerCase().includes(lower)).slice(0, 5)
    )
  }, [query, allProducts])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setResults([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm">
      <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-3 py-2 shadow-sm">
        <MagnifyingGlassIcon className="w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 outline-none text-sm text-slate-700 placeholder-slate-400 bg-transparent"
        />
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg mt-1 shadow-lg z-50 animate-fadeIn">
          {results.map(item => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-8 h-8 object-contain"
              />
              <span className="text-sm text-slate-700 truncate">{item.title}</span>
              <span className="ml-auto text-xs text-rose-600 font-medium">
                ${item.price}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
