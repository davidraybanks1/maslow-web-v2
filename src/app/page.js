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
          <p className={styles.heroBody}>Anxiety fills the space you give it. The more space it gets, the more energy you waste meeting its needs rather than your own.</p>
          <p className={styles.heroBody}>MyMaslow helps you take back space.</p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <Divider text="HOW IT WORKS" />

      {/* ── Canvas ── */}
      <CanvasSection />

      {/* ── Needs / Modes / Practices ── */}
      <NeedsSection />
      <ModesSection />
      <PracticesSection />

      {/* ── Moods / Data ── */}
      <MoodsSection />
      <DataSection />

      {/* ── HOW YOU KEEP MOMENTUM ── */}
      <Divider text="HOW YOU KEEP MOMENTUM" />

      {/* ── Journal / Debriefs / Notes / Review ── */}
      <JournalSection />
      <DebriefSection />
      <NotesSection />
      <ReviewSection />

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <h2 className={styles.ctaHeadlineRitual}>let&apos;s get started.</h2>
        <div className={styles.ctaRight}>
          <a className={styles.ctaBtn} href="https://app.mymaslow.com/onboarding">Create your mymaslow</a>
        </div>
      </section>
    </div>
  )
}
