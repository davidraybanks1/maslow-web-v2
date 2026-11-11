'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

export default function Nav() {
  const pathname = usePathname()
  const onMemos = pathname.startsWith('/memos')

  return (
    <header className={styles.bar}>
      <nav className={styles.nav} aria-label="Main">
        {/* a plain link: / is the static homepage, so a Next prefetch of it 404s */}
        <a href="/" className={styles.logo} aria-label="loam, home">loam.</a>

        <div className={styles.right}>
          <Link
            href="/memos"
            className={`${styles.navItem} ${onMemos ? styles.active : ''}`}
            aria-current={onMemos ? 'page' : undefined}
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
    </header>
  )
}
