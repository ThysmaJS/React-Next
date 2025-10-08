import Link from 'next/link'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          {/* Prefetched when the link is hovered or enters the viewport */}
          <Link href="/about/tata">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/counter">Counter</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}