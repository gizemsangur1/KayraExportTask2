import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LOCALES } from '@/i18n/locales';
 
export default async function LocaleLayout({
  children, params
}: { children: React.ReactNode; params: { locale: string } }) {
  const locale = params.locale
  if (!LOCALES.includes(locale as any)) notFound()
  const messages = (await import(`../../../messages/${locale}.json`)).default
 
  return (
   <html lang={locale}>
      <body className="min-h-dvh bg-white text-slate-900">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="mx-auto max-w-6xl px-4">
            <Header />
            <main className="py-8">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}