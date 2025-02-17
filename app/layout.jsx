import './global.css'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Todo App',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Header />
      <main className='container py-16 mx-auto'>
        {children}
      </main>
      <Footer />
      </body>
    </html>
  )
}
