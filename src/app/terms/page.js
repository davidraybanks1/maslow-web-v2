import styles from './page.module.css'

export const metadata = {
  title: 'Terms of Service — Maslow',
}

export default function TermsPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.eyebrow}>Legal</div>
      <h1 className={styles.headline}>Terms of Service</h1>
      <p className={styles.updated}>Last updated: May 2026</p>

      <p className={styles.body}>By using Maslow ("the app") at app.mymaslow.com, you agree to these terms. Please read them carefully.</p>

      <h2 className={styles.subhead}>Using Maslow</h2>
      <p className={styles.body}>Maslow is a personal wellness tool designed to help you build intentional habits around your needs. You must be 18 or older to use the app. You are responsible for maintaining the confidentiality of your account.</p>

      <h2 className={styles.subhead}>SMS messaging terms</h2>
      <p className={styles.body}>If you provide your phone number during onboarding, you consent to receive up to 3 automated SMS messages per day from Maslow. These messages include a morning reminder, a midday check-in, and an evening check-in, each containing a link to your practice tracker.</p>
      <p className={styles.body}><strong>Message and data rates may apply.</strong></p>
      <p className={styles.body}><strong>To opt out:</strong> Reply STOP to any message at any time. You will receive one confirmation message and no further messages will be sent. You can also remove your phone number from your account at any time.</p>
      <p className={styles.body}><strong>To get help:</strong> Reply HELP to any message or email us at <a href="mailto:hello@mymaslow.com" className={styles.link}>hello@mymaslow.com</a>.</p>
      <p className={styles.body}>Maslow will never share your phone number with third parties for marketing purposes.</p>

      <h2 className={styles.subhead}>Your content</h2>
      <p className={styles.body}>Your canvas, practices, and check-in data belong to you. We do not claim ownership of any content you create in the app. You can request deletion of your data at any time.</p>

      <h2 className={styles.subhead}>Disclaimers</h2>
      <p className={styles.body}>Maslow is a wellness tool, not a medical or mental health service. It is not a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing a mental health crisis, please contact a qualified professional.</p>

      <h2 className={styles.subhead}>Changes to these terms</h2>
      <p className={styles.body}>We may update these terms from time to time. We will notify you of significant changes via email. Continued use of the app after changes constitutes acceptance of the new terms.</p>

      <h2 className={styles.subhead}>Contact</h2>
      <p className={styles.body}>Questions about these terms? Email us at <a href="mailto:hello@mymaslow.com" className={styles.link}>hello@mymaslow.com</a>.</p>
    </div>
  )
}