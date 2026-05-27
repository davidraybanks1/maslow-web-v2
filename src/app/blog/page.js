import styles from './page.module.css'

export const metadata = {
  title: 'Blog — Maslow',
}

export default function BlogPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.eyebrow}>Blog</div>
      <h1 className={styles.headline}>Coming soon.</h1>
      <p className={styles.body}>We're working on it.</p>
    </div>
  )
}