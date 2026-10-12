import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: 'Terms of Service | Loam',
  description: 'The terms that apply when you use the Loam app and website.',
}

const EMAIL = 'hello@loamdaybook.com'

function Email() {
  return <a href={`mailto:${EMAIL}`} className={styles.link}>{EMAIL}</a>
}

export default function TermsPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.eyebrow}>Legal</div>
      <h1 className={styles.headline}>Loam Terms of Service</h1>
      <p className={styles.updated}>Last updated: October 12, 2026</p>

      <h2 className={styles.subhead}>Agreement and eligibility</h2>
      <p className={styles.body}>By creating an account or using Loam, you agree to these terms. They are an agreement between you and Loam Daybook LLC (&quot;Loam,&quot; &quot;we,&quot; &quot;us&quot;) covering the Loam app and website. If you do not agree, please do not use Loam.</p>
      <p className={styles.body}>You must be at least 13 years old. If you are under 18, a parent or guardian should read these terms with you. If you use the iOS app, Apple&apos;s standard end user license terms also apply, and Apple is not responsible for the app or for supporting it. Our <Link href="/privacy" className={styles.link}>Privacy Policy</Link> explains how we handle your information.</p>

      <h2 className={styles.subhead}>Loam is not medical care</h2>
      <p className={styles.body}>Loam is a journaling and self-care tool. It does not provide medical, mental-health, or crisis services, and it is not a substitute for professional care, diagnosis, or treatment. Do not rely on Loam in an emergency.</p>
      <p className={styles.body}>If you may be in danger or in crisis, call or text 988 (the Suicide &amp; Crisis Lifeline in the United States) or your local emergency number. If you are outside the United States, contact your local emergency services.</p>

      <h2 className={styles.subhead}>Your account and your content</h2>
      <p className={styles.body}>You own what you write and upload to Loam. We do not claim ownership of your entries, check-ins, notes, or photos (&quot;Your Content&quot;). You give us a limited permission to store, process, and display Your Content solely to run Loam for you. You can delete Your Content or your whole account at any time.</p>
      <p className={styles.body}>Keep your password safe. You are responsible for activity under your account, and you should tell us right away at <Email /> if you think someone else has gained access.</p>

      <h2 className={styles.subhead}>Acceptable use</h2>
      <p className={styles.body}>Use Loam only for its intended purpose, which is your own journaling and habit tracking. Please do not:</p>
      <ul className={styles.list}>
        <li>break the law or use Loam to harm, harass, or threaten anyone</li>
        <li>try to access another person&apos;s account or data</li>
        <li>probe, test, or bypass Loam&apos;s security without our written permission</li>
        <li>scrape, overload, or interfere with the service</li>
        <li>copy, reverse engineer, or resell the app, except where the law allows it</li>
        <li>upload content that is illegal</li>
      </ul>
      <p className={styles.body}>We may suspend or remove accounts that break these rules.</p>

      <h2 className={styles.subhead}>Beta software and changes to Loam</h2>
      <p className={styles.body}>Loam is in beta, so it may have bugs, features may change or be removed, and data could be lost despite our care. Keep your own copy of anything you cannot afford to lose.</p>
      <p className={styles.body}>Loam is free to use today. If we add paid features later, we will tell you before you are charged for anything. If you send us feedback, we may use it to improve Loam without owing you anything for it.</p>

      <h2 className={styles.subhead}>Ending your account</h2>
      <p className={styles.body}>You can stop using Loam at any time and delete your account from inside the app: open Profile, choose Delete account, and type DELETE to confirm. Deleting your account permanently removes your data, as described in the Privacy Policy.</p>
      <p className={styles.body}>We may suspend or end your access if you break these terms or if we need to protect Loam or other people, and where practical we will tell you why. The parts of these terms about ownership, disclaimers, liability, and governing law continue after your account ends.</p>

      <h2 className={styles.subhead}>Disclaimers and limit of liability</h2>
      <p className={styles.body}>Loam is provided &quot;as is&quot; and &quot;as available,&quot; without warranties of any kind. We do not promise that Loam will be uninterrupted or error-free, or that it will reduce anxiety or produce any particular result for you.</p>
      <p className={styles.body}>To the fullest extent the law allows, Loam Daybook LLC is not liable for indirect, incidental, special, consequential, or punitive damages, or for lost data, and our total liability for any claim related to Loam is limited to the greater of $100 or the amount you paid us in the 12 months before the claim. Some places do not allow certain limits, so parts of this section may not apply to you, and nothing here limits liability that the law does not allow us to limit.</p>

      <h2 className={styles.subhead}>Governing law</h2>
      <p className={styles.body}>California law governs these terms, without regard to its conflict-of-law rules. Before filing any claim, please email <Email /> and give us 30 days to try to resolve it informally. Any dispute we cannot resolve that way will be brought in the state or federal courts located in California, and you and we consent to those courts.</p>

      <h2 className={styles.subhead}>Changes and contact</h2>
      <p className={styles.body}>We may update these terms as Loam changes. We will post the new version here and update the date at the top, and for significant changes we will tell you in the app or by email before they take effect. If you keep using Loam after a change, you accept the new terms.</p>
      <p className={styles.body}>Questions: <Email /></p>
      <p className={styles.body}>Loam Daybook LLC, California</p>
    </div>
  )
}
