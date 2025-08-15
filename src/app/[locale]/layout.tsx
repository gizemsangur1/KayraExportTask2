import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { LOCALES } from '@/i18n/locales';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReduxProvider from '@/store/provider';
import { ToastContainer } from 'react-toastify';

type Locale = typeof LOCALES[number];

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as Locale)) notFound();

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <ReduxProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="mx-auto max-w-6xl px-4">
          <Header />
          <main className="py-8">{children}</main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </div>
      </NextIntlClientProvider>
    </ReduxProvider>
  );
}
