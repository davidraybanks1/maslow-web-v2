import styles from './page.module.css'

export const metadata = {
  title: 'Privacy Policy — Maslow',
}

export default function PrivacyPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.eyebrow}>Legal</div>
      <h1 className={styles.headline}>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: May 2026</p>

      <p className={styles.body}>Maslow ("we", "us", or "our") is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information when you use our app at app.mymaslow.com.</p>

      <h2 className={styles.subhead}>Information we collect</h2>
      <p className={styles.body}>We collect information you provide directly to us, including your name, email address, phone number, and responses to onboarding questions. We also collect information about how you use the app, including which practices you check off and when.</p>

      <h2 className={styles.subhead}>How we use your information</h2>
      <p className={styles.body}>We use your information to provide and improve the Maslow service, including sending you daily check-in reminders via SMS if you have opted in. We use your email address to send you sign-in links and occasional product updates.</p>

      <h2 className={styles.subhead}>SMS messaging</h2>
      <p className={styles.body}><strong>Message frequency:</strong> If you provide your phone number during onboarding, you will receive up to 3 SMS messages per day — a morning reminder, a midday check-in, and an evening check-in.</p>
      <p className={styles.body}><strong>Message and data rates may apply.</strong> Check with your carrier for details.</p>
      <p className={styles.body}><strong>Opt out:</strong> You can opt out of SMS messages at any time by replying STOP to any message. You can also remove your phone number from your account settings.</p>
      <p className={styles.body}><strong>We will never sell or share your mobile phone number with third parties for marketing purposes.</strong> Your phone number is used solely to send you Maslow check-in reminders.</p>

      <h2 className={styles.subhead}>Data sharing</h2>
      <p className={styles.body}>We do not sell your personal information. We may share your information with service providers who help us operate the app (such as Supabase for database storage and Twilio for SMS delivery), but only as necessary to provide the service.</p>

      <h2 className={styles.subhead}>Data retention</h2>
      <p className={styles.body}>We retain your information for as long as your account is active. You may request deletion of your account and data at any time by emailing us.</p>

      <h2 className={styles.subhead}>Security</h2>
      <p className={styles.body}>We take reasonable measures to protect your information from unauthorized access, disclosure, or misuse. Your data is stored securely using Supabase infrastructure.</p>

      <h2 className={styles.subhead}>Contact</h2>
      <p className={styles.body}>If you have any questions about this privacy policy, please contact us at <a href="mailto:hello@mymaslow.com" className={styles.link}>hello@mymaslow.com</a>.</p>
    </div>
  )
}