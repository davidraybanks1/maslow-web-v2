'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <img src="/mark-dark-1024.png" alt="" width={48} height={48} style={{ marginRight: 8, verticalAlign: 'middle' }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 200, fontStyle: 'normal' }}>mymaslow.</span>
      </Link>
      <div className={styles.right}>
        <Link href="/blog" className={`${styles.navItem} ${pathname.startsWith('/blog') ? styles.active : ''}`}>
          Memos
        </Link>
        <a href="https://app.mymaslow.com/onboarding" className={styles.navCta}>
          Get started →
        </a>
      </div>
    </nav>
  )
}
