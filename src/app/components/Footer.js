import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo} style={{ fontFamily: "'DM Mono', monospace", fontWeight: 200, fontStyle: 'normal' }}>maslow.</div>
      <div className={styles.copy}>practice becoming yourself</div>
    </footer>
  )
}
