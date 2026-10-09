'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>loam.</Link>

      <div className={styles.right}>
        <Link
          href="/memos"
          className={`${styles.navItem} ${pathname.startsWith('/memos') ? styles.active : ''}`}
        >
          memos
        </Link>
        <a href="https://app.mymaslow.com/signin" className={`${styles.navItem} ${styles.hideSmall}`}>
          sign in
        </a>
        <a href="https://app.mymaslow.com/onboarding" className={styles.navCta}>
          get started
        </a>
      </div>
    </nav>
  )
}
