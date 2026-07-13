'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo} style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
        <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }} aria-hidden="true">
          <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 21, lineHeight: 1, color: 'var(--ink)' }}>m</span>
          <svg width={24} height={4} viewBox="0 0 56 12" preserveAspectRatio="none" style={{ marginTop: 3, display: 'block' }}>
            <rect x="0" width="15" height="12" fill="#1B3A2D" />
            <rect x="15" width="11" height="12" fill="#B8C3B1" />
            <rect x="26" width="9" height="12" fill="#E8B81F" />
            <rect x="35" width="8" height="12" fill="#D93B1C" />
            <rect x="43" width="13" height="12" fill="#1A1A1A" />
          </svg>
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 200, fontStyle: 'normal' }}>mymaslow.</span>
      </Link>
      <div className={styles.right}>
        <Link href="/blog" className={`${styles.navItem} ${pathname.startsWith('/blog') ? styles.active : ''}`}>
          Memos
        </Link>
        <a href="https://app.mymaslow.com/signin" className={styles.navSecondary}>
          Sign in
        </a>
        <a href="https://app.mymaslow.com/onboarding" className={styles.navCta}>
          Get started →
        </a>
      </div>
    </nav>
  )
}
