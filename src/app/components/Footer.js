import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo} style={{ fontFamily: "'DM Mono', monospace", fontWeight: 200, fontStyle: 'normal' }}>mymaslow.</div>
      <div className={styles.links}>
        <Link href="/privacy" className={styles.link}>privacy</Link>
        <Link href="/terms" className={styles.link}>terms</Link>
      </div>
      <div className={styles.copy}>practice becoming yourself · © 2026 MyMaslow LLC</div>
    </footer>
  )
}
