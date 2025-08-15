import type {Metadata} from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'E-Ticaret',
  description: 'Çok dilli, SEO odaklı e-ticaret frontend'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
