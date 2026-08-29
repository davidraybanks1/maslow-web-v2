import styles from './page.module.css'

export const metadata = {
  title: 'Privacy Policy — MyMaslow',
}

export default function PrivacyPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.eyebrow}>Legal</div>
      <h1 className={styles.headline}>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: August 2026</p>

      <p className={styles.body}>MyMaslow LLC ("Maslow", "we", "us", or "our") is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information when you use the MyMaslow iOS app or our web app at app.mymaslow.com.</p>

      <h2 className={styles.subhead}>Information we collect</h2>
      <p className={styles.body}><strong>Information you give us.</strong> Your name and email address when you create an account, and your answers to the onboarding questions we use to build your canvas.</p>
      <p className={styles.body}><strong>Content you create in the app.</strong> MyMaslow is a journaling and reflection app, so most of what it stores is what you write in it: journal entries, notes to self, mood check-ins, weekly reviews, the tags you create, and the needs and practices on your canvas. This content is private to your account. We do not read it, analyze it for advertising, or use it to train anything.</p>
      <p className={styles.body}><strong>How you use the app.</strong> Which practices you check off and when, so the app can show you your own patterns over time.</p>

      <h2 className={styles.subhead}>How we use your information</h2>
      <p className={styles.body}>We use your information to provide and improve the Maslow service and to show you your own history and patterns. We use your email address to send you sign-in links and occasional product updates. We do not sell your personal information, and we do not use your content for advertising.</p>

      <h2 className={styles.subhead}>Reminders</h2>
      <p className={styles.body}>Daily reminders are scheduled and delivered on your device by iOS. They are not sent through our servers, and your reminder settings do not leave your phone. You can turn them off at any time in the app or in your device&apos;s notification settings.</p>

      <h2 className={styles.subhead}>Who we share data with</h2>
      <p className={styles.body}>We do not sell your personal information. We share data with two service providers, only as needed to run the app.</p>
      <p className={styles.body}><strong>Supabase</strong> hosts our database. Your account and everything you create in the app is stored there.</p>
      <p className={styles.body}><strong>Sentry</strong> receives diagnostic reports when the app hits an error — the error itself, the device and operating system, the app version, and an anonymous account identifier. It is deliberately configured not to receive your journal entries, notes, moods, or any other content you write.</p>

      <h2 className={styles.subhead}>Data retention and deletion</h2>
      <p className={styles.body}>We retain your information for as long as your account is active. You may request deletion of your account and all associated data at any time by emailing <a href="mailto:hello@mymaslow.com" className={styles.link}>hello@mymaslow.com</a>, and we will delete it.</p>

      <h2 className={styles.subhead}>Security</h2>
      <p className={styles.body}>We take reasonable measures to protect your information from unauthorized access, disclosure, or misuse. Your data is stored using Supabase infrastructure and transmitted over encrypted connections.</p>

      <h2 className={styles.subhead}>Age</h2>
      <p className={styles.body}>MyMaslow is not intended for children. You must be at least 16 years old to create an account. If we learn that we have collected information from someone under 16, we will delete it.</p>

      <h2 className={styles.subhead}>Changes to this policy</h2>
      <p className={styles.body}>If we make material changes to this policy, we will update the date at the top of this page and, where appropriate, notify you in the app.</p>

      <h2 className={styles.subhead}>Contact</h2>
      <p className={styles.body}>If you have any questions about this privacy policy, please contact us at <a href="mailto:hello@mymaslow.com" className={styles.link}>hello@mymaslow.com</a>.</p>
    </div>
  )
}
