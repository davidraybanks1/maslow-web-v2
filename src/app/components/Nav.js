'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

export default function Nav() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAboutOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <img src="/mark-dark-1024.png" alt="" width={32} height={32} style={{ marginRight: 8, verticalAlign: 'middle' }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 200 }}>maslow.</span>
      </Link>
      <div className={styles.right}>
        <div className={styles.dropdownWrap} ref={dropdownRef}>
          <button
            className={`${styles.navItem} ${['/about', '/need', '/modes'].includes(pathname) ? styles.active : ''}`}
            onClick={() => setAboutOpen(v => !v)}
          >
            About
            <span className={`${styles.chevron} ${aboutOpen ? styles.chevronOpen : ''}`}>↓</span>
          </button>
          {aboutOpen && (
            <div className={styles.dropdown}>
              <Link href="/about" className={styles.dropdownItem} onClick={() => setAboutOpen(false)}>
                <span className={styles.dropdownLabel}>Why Maslow</span>
                <span className={styles.dropdownSub}>The philosophy behind it</span>
              </Link>
              <Link href="/need" className={styles.dropdownItem} onClick={() => setAboutOpen(false)}>
                <span className={styles.dropdownLabel}>The Needs</span>
                <span className={styles.dropdownSub}>The ten needs, explained</span>
              </Link>
              <Link href="/modes" className={styles.dropdownItem} onClick={() => setAboutOpen(false)}>
                <span className={styles.dropdownLabel}>The Modes</span>
                <span className={styles.dropdownSub}>How you meet each need</span>
              </Link>
            </div>
          )}
        </div>
        <Link href="/blog" className={`${styles.navItem} ${pathname.startsWith('/blog') ? styles.active : ''}`}>
          Blog
        </Link>
        <a href="https://app.mymaslow.com/onboarding" className={styles.navCta}>
          Get started →
        </a>
      </div>
    </nav>
  )
}
