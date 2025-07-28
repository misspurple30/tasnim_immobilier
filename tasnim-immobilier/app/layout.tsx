import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { DataProvider } from '@/lib/data-context'

export const metadata: Metadata = {
  title: 'TASNIM IMMOBILIER - Gestion Immobilière',
  description: 'Plateforme de gestion immobilière moderne pour propriétaires et gestionnaires',
  keywords: ['immobilier', 'gestion', 'location', 'propriété', 'Côte d\'Ivoire', 'Abidjan'],
  authors: [{ name: 'TASNIM IMMOBILIER' }],
  creator: 'TASNIM IMMOBILIER',
  openGraph: {
    title: 'TASNIM IMMOBILIER - Gestion Immobilière',
    description: 'Plateforme de gestion immobilière moderne',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <DataProvider>
            {children}
            <Toaster />
            <Sonner />
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
