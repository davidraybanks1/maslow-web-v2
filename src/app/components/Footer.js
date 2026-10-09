import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>loam.</span>
        <span className={styles.links}>
          <Link href="/privacy" className={styles.link}>privacy</Link>
          <Link href="/terms" className={styles.link}>terms</Link>
          <a href="mailto:hello@loamdaybook.com" className={styles.link}>hello@loamdaybook.com</a>
        </span>
      </div>
    </footer>
  )
}
