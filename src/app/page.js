import styles from './page.module.css'
import HeroFountain from './components/HeroFountain'
import {
  NeedsSection,
  ModesSection,
  PracticesSection,
  CanvasSection,
  MoodsSection,
  DataSection,
  JournalSection,
  DebriefSection,
  NotesSection,
  ReviewSection,
  Divider,
} from './components/HomeSections'

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <HeroFountain />
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            anxiety isn&apos;t who you are.<br />it&apos;s everything you <em>aren&apos;t.</em>
          </h1>
          <p className={styles.heroBody}>Anxiety fills the space you give it. The more space it gets, the more energy you waste meeting its needs rather than your own. Don&apos;t try to manage anxiety. Focus on meeting your needs.</p>
          <p className={styles.heroBody}>MyMaslow is designed to help you take back space.</p>
        </div>
      </section>

      {/* ── Sections 01–03: Needs / Modes / Practices ── */}
      <NeedsSection />
      <ModesSection />
      <PracticesSection />

      {/* ── Divider ── */}
      <Divider text="your canvas holds it all together." />

      {/* ── Sections 04–06: Canvas / Moods / Data ── */}
      <CanvasSection />
      <MoodsSection />
      <DataSection />

      {/* ── Divider ── */}
      <Divider text="and in the background of all of it." />

      {/* ── Sections 07–09: Journal / Debriefs / Notes ── */}
      <JournalSection />
      <DebriefSection />
      <NotesSection />

      {/* ── Divider ── */}
      <Divider text="close the loop." />

      {/* ── Section 10: Review ── */}
      <ReviewSection />

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <h2 className={styles.ctaHeadlineRitual}>hey, you.</h2>
        <div className={styles.ctaRight}>
          <p className={styles.ctaBody}>No app store. No subscription. Just a framework for living with more intention — and less anxiety.</p>
          <a className={styles.ctaBtn} href="https://app.mymaslow.com/onboarding">Create your mymaslow →</a>
        </div>
      </section>
    </div>
  )
}
