import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Loan Calculator - EMI, Home Loan, Car Loan Calculator',
  description: 'Free online loan calculator to calculate EMI, home loan, car loan, personal loan. Get accurate loan EMI calculations with our professional finance calculator.',
  keywords: 'loan calculator, emi calculator, home loan calculator, car loan calculator, personal loan calculator, finance calculator',
  authors: [{ name: 'Finance Calculator' }],
  openGraph: {
    title: 'Loan Calculator - EMI, Home Loan, Car Loan Calculator',
    description: 'Free online loan calculator to calculate EMI, home loan, car loan, personal loan.',
    type: 'website',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
}
