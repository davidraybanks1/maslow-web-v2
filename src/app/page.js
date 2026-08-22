import styles from './page.module.css'
import {
  HeroBar,
  DividerPill,
  CanvasSectionV2,
  NeedsSectionV2,
  ModesSectionV2,
  PracticesSectionV2,
  MoodsSectionV2,
  DataSectionV2,
  JournalSectionV2,
  NotesSectionV2,
  ReviewSectionV2,
  CtaSectionV2,
} from './components/HomeV2'

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            anxiety isn&apos;t who you are.<br />it&apos;s who you <em>aren&apos;t.</em>
          </h1>
          <p className={styles.heroBody}>Anxiety fills the space you give it. The more space it gets, the more energy you waste meeting its needs rather than your own.</p>
          <p className={styles.heroBody}>MyMaslow helps you take back space.</p>
        </div>
      </section>

      {/* ── The opening statement: colors reclaim space from anxiety ── */}
      <HeroBar />

      {/* ── HOW IT WORKS ── */}
      <DividerPill text="how it works" />
      <CanvasSectionV2 />

      <NeedsSectionV2 />
      <ModesSectionV2 />
      <PracticesSectionV2 />
      <MoodsSectionV2 />
      <DataSectionV2 />

      {/* ── HOW YOU KEEP MOMENTUM ── */}
      <DividerPill text="how you keep momentum" />
      <JournalSectionV2 />
      <NotesSectionV2 />
      <ReviewSectionV2 />

      {/* ── CTA + closing bar ── */}
      <CtaSectionV2 />
    </div>
  )
}
