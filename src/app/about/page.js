import styles from './page.module.css'

export const metadata = {
  title: 'About — Maslow',
}

export default function AboutPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.eyebrow}>About</div>
      <h1 className={styles.headline}>Why Maslow</h1>
      <p className={styles.body}>This page is coming soon.</p>
    </div>
  )
}