import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cuponera 💌',
  description: 'Tu cuponera de momentos especiales',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-gray-50 font-body">{children}</body>
    </html>
  )
}
