import styles from './page.module.css'

export const metadata = {
  title: 'Privacy Policy | Loam',
  description: 'How Loam collects, uses, shares, and deletes your information.',
}

const EMAIL = 'hello@loamdaybook.com'

function Email() {
  return <a href={`mailto:${EMAIL}`} className={styles.link}>{EMAIL}</a>
}

export default function PrivacyPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.eyebrow}>Legal</div>
      <h1 className={styles.headline}>Loam Privacy Policy</h1>
      <p className={styles.updated}>Last updated: October 12, 2026</p>

      <h2 className={styles.subhead}>Who we are and what this covers</h2>
      <p className={styles.body}>Loam is a journaling and habit app for iPhone and the web, made by Loam Daybook LLC (&quot;Loam,&quot; &quot;we,&quot; &quot;us&quot;). This policy explains what the app collects, why, who else handles it, and how you can delete it. Loam is a self-care tool, not medical care. By creating an account you agree to this policy.</p>

      <h2 className={styles.subhead}>Information we collect</h2>
      <p className={styles.body}>We collect only what Loam needs to work.</p>

      <p className={styles.body}><strong>What you give us</strong></p>
      <ul className={styles.list}>
        <li><strong>Account details:</strong> your email address and a password. Passwords are stored as one-way hashes by our authentication provider, so we cannot read them.</li>
        <li><strong>What you write and track:</strong> journal entries, check-ins, moods, feelings, practices, intentions, weekly reviews, notes to self, debrief answers, and custom tags. This can include sensitive thoughts about your mental wellbeing. We treat all of it as private to your account.</li>
        <li><strong>Photos:</strong> images you choose to attach to notes. They are stored in private storage that only your account can read.</li>
      </ul>

      <p className={styles.body}><strong>What is collected automatically</strong></p>
      <ul className={styles.list}>
        <li><strong>Crash and error reports:</strong> if the app crashes, technical details such as the error message, app version, iOS version, and device model go to our error-monitoring provider. We configure reporting to strip personal details, and it is turned off in development.</li>
        <li><strong>Basic server logs:</strong> our hosting and database providers log requests (such as IP address and time) for security and reliability.</li>
      </ul>

      <p className={styles.body}><strong>What stays on your device</strong></p>
      <p className={styles.body}>Your settings, a local copy of your data for offline use, and your reminder schedule. Reminders are local notifications scheduled on your phone. They do not leave your device.</p>

      <p className={styles.body}><strong>What we do not collect</strong></p>
      <p className={styles.body}>Your location, contacts, phone number, advertising identifier, or browsing activity. Loam has no ads and no third-party analytics or advertising trackers.</p>

      <h2 className={styles.subhead}>How we use information</h2>
      <p className={styles.body}>We use your information to run Loam, and for nothing else. That means creating and securing your account, storing and showing your entries, emailing you sign-in and password-reset codes, scheduling the reminders you turn on, finding and fixing crashes, and answering when you email us.</p>
      <p className={styles.body}>We do not sell your information or use it for advertising. We do not routinely read your entries. Access is limited to what is needed to keep the service running, investigate abuse or security problems, or comply with the law.</p>

      <h2 className={styles.subhead}>Who handles your data</h2>
      <p className={styles.body}>We share data only with the service providers that help run Loam, and when the law requires it. Each handles data under its own privacy terms.</p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Provider</th>
              <th scope="col">What it does for Loam</th>
              <th scope="col">Data it handles</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Supabase</td><td>Database, sign-in, and file storage</td><td>Account, entries, and photos</td></tr>
            <tr><td>Vercel</td><td>Hosts the web app</td><td>Request logs, including IP address</td></tr>
            <tr><td>Sentry</td><td>Crash and error reporting</td><td>Technical crash details</td></tr>
            <tr><td>Resend</td><td>Sends sign-in and reset emails</td><td>Your email address and the message</td></tr>
            <tr><td>Apple</td><td>App Store and TestFlight</td><td>Per Apple&apos;s own terms</td></tr>
          </tbody>
        </table>
      </div>
      <p className={styles.body}>Our providers may store and process data in the United States and other countries. We may also disclose information if the law requires it, to protect people&apos;s safety, or as part of a sale or transfer of the business, in which case this policy continues to apply to your data until you are told otherwise. We do not sell personal information or share it for advertising.</p>

      <h2 className={styles.subhead}>Keeping and deleting your data</h2>
      <p className={styles.body}>You can delete your account and all of its data yourself, at any time, inside the app. Open Profile, choose Delete account, and type DELETE to confirm. This permanently removes your account, entries, check-ins, notes, and photos, and signs you out. It cannot be undone.</p>
      <p className={styles.body}>Routine backups kept by our database provider may hold deleted data for a limited time, up to 30 days, before they are overwritten. If you cannot get into the app, email <Email /> from the address on your account and we will delete it for you. Until you delete your account, we keep your data so the app keeps working. Crash reports are kept by our error-monitoring provider for a limited period.</p>

      <h2 className={styles.subhead}>Security</h2>
      <p className={styles.body}>We protect your data with encryption in transit (HTTPS) and at rest, and with database access rules that keep each account&apos;s data readable only by that account. Photos are kept in private storage.</p>
      <p className={styles.body}>No system is perfectly secure, so we cannot guarantee absolute security. Use a strong, unique password, and email us right away if you think your account has been accessed by someone else.</p>

      <h2 className={styles.subhead}>Your choices and privacy rights</h2>
      <p className={styles.body}>You control your data in the app: edit or delete entries, turn reminders on or off (also under Settings, Notifications on your iPhone), and delete your account.</p>
      <p className={styles.body}>If you live in California, or in another place with similar laws, you can ask us what personal information we hold about you, get a copy, correct it, or have it deleted, and we will not treat you differently for asking. We do not sell personal information or share it for cross-context behavioral advertising. To make a request, email <Email /> from the address on your account. We will confirm it is you and respond within 45 days.</p>
      <p className={styles.body}>We do not track you across other websites or apps, so there is no Do Not Track signal for us to respond to.</p>

      <h2 className={styles.subhead}>Children</h2>
      <p className={styles.body}>Loam is for people 13 and older, and we do not knowingly collect information from children under 13. If you believe a child has created an account, email <Email /> and we will delete it.</p>

      <h2 className={styles.subhead}>Changes and contact</h2>
      <p className={styles.body}>We will post any changes to this policy here and update the date at the top. For significant changes, we will tell you in the app or by email before they take effect.</p>
      <p className={styles.body}>Questions or requests: <Email /></p>
      <p className={styles.body}>Loam Daybook LLC, California</p>
    </div>
  )
}
