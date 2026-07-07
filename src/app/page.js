import styles from './page.module.css'
import DailyLoopAnimation from './components/DailyLoopAnimation'
import HeroFountain from './components/HeroFountain'

// Canonical taxonomy pulled from maslow-app/src/lib/constants.js.
// 13 needs total: 3 universal + 10 personal.
const NEEDS_UNIVERSAL = [
  { id: 'movement',   name: 'Movement',   num: '01', desc: 'Your body needs to be used — not optimized, not tracked, just moved.' },
  { id: 'nutrition',  name: 'Nutrition',  num: '02', desc: 'Not just food, but your relationship to eating and being nourished.' },
  { id: 'rest',       name: 'Rest',       num: '03', desc: 'The nervous system needs to recover — not just through sleep, but through stillness.' },
]

const NEEDS_PERSONAL = [
  { id: 'community',   name: 'Community',   num: '04', desc: 'You need people who know you, not followers who see you.' },
  { id: 'beauty',      name: 'Beauty',      num: '05', desc: 'You need contact with things that move you — art, nature, music, something made with care.' },
  { id: 'intimacy',    name: 'Intimacy',    num: '06', desc: 'To be truly known by another person — and to offer the same in return.' },
  { id: 'reflection',  name: 'Reflection',  num: '07', desc: 'Without time to process your own experience, life just happens to you.' },
  { id: 'play',        name: 'Play',        num: '08', desc: 'Unstructured, purposeless joy — things you do for no reason other than they feel good.' },
  { id: 'money',       name: 'Money',       num: '09', desc: 'Whether money feels like a tool or a threat determines how much of your mind it occupies.' },
  { id: 'dwelling',    name: 'Dwelling',    num: '10', desc: 'Your environment shapes your nervous system more than you think.' },
  { id: 'information', name: 'Information', num: '11', desc: 'Your mind wants to be fed, not just filled. There\'s a difference between learning and scrolling.' },
  { id: 'touch',       name: 'Touch',       num: '12', desc: 'Skin has needs your calendar never accounts for. Contact is not a luxury.' },
  { id: 'thrill',      name: 'Thrill',      num: '13', desc: 'You need moments that make your heart beat faster on purpose — chosen intensity, not ambient stress.' },
]

const MODES = [
  {
    name: 'survival',
    color: '#D93B1C',
    desc: 'In survival mode, you are doing the bare minimum. That may be out of necessity or because you\'re prioritizing other needs.',
  },
  {
    name: 'nourishment',
    color: '#E8B81F',
    desc: 'In nourishment mode, you are meeting a need intentionally, in a way that gives you energy rather than depletes it.',
  },
  {
    name: 'appreciation',
    color: '#B8C3B1',
    desc: 'In appreciation mode, you create space to enjoy meeting a need by being present, invested, and in flow.',
  },
  {
    name: 'exploration',
    color: '#1B3A2D',
    desc: 'In exploration mode, you\'re not just experiencing, you\'re creating. You\'re pushing the boundaries of a thing and yourself.',
  },
]

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        {/* Workstream 2: rising-circles fountain, behind headline */}
        <HeroFountain />
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            anxiety isn&apos;t who you are.<br />it&apos;s everything you <em>aren&apos;t.</em>
          </h1>
          <p className={styles.heroBody}>Anxiety fills the space you give it. The more space it gets, the more energy you waste meeting its needs rather than your own. Don&apos;t try to manage anxiety. Focus on meeting your needs.</p>
          <p className={styles.heroBody}>MyMaslow is designed to help you take back space.</p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className={styles.howItWorks}>
        <div className={styles.howItWorksHeader}>
          <div className={styles.howItWorksTitle}>how it works.</div>
        </div>
        <div className={styles.howItWorksGrid}>
          <div className={styles.howItWorksCol}>
            <div className={styles.howItWorksIllustration}>
              <div className={styles.appUI}>
                {[
                  { color: '#1B3A2D', needs: ['movement'] },
                  { color: '#B8C3B1', needs: ['reflection', 'play'] },
                  { color: '#E8B81F', needs: ['nutrition', 'rest'] },
                  { color: '#D93B1C', needs: ['information'] },
                ].map((row, i) => (
                  <div key={i} className={styles.appUICanvasRow}>
                    <span className={styles.appUICanvasDot} style={{ background: row.color }} />
                    {row.needs.map(n => (
                      <span key={n} className={styles.appUICanvasChip} style={{ borderColor: row.color }}>{n}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.howItWorksCopyLabel}>Needs</div>
            <p className={styles.howItWorksCopyBody}>There are basic things we need as humans but we often fast-forward through them to get to what we want. But without meeting your needs, it&apos;s hard to appreciate what you have, who you are, and what you achieve.</p>
          </div>
          <div className={styles.howItWorksCol}>
            <div className={styles.howItWorksIllustration}>
              <div className={styles.appUI}>
                {[
                  { color: '#1B3A2D', name: 'exploration' },
                  { color: '#B8C3B1', name: 'appreciation' },
                  { color: '#E8B81F', name: 'nourishment' },
                  { color: '#D93B1C', name: 'survival' },
                ].map(m => (
                  <div key={m.name} className={styles.appUIModeRow}>
                    <span className={styles.appUIModePip} style={{ background: m.color }} />
                    <span className={styles.appUIModeLabel}>{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.howItWorksCopyLabel}>Modes</div>
            <p className={styles.howItWorksCopyBody}>Everyone meets their needs differently. Modes help you understand what kind of attention each need requires from you right now, and give you permission to not meet all your needs all the time.</p>
          </div>
          <div className={styles.howItWorksCol}>
            <div className={styles.howItWorksIllustration}>
              <div className={styles.appUI}>
                {[
                  { color: '#1B3A2D', name: 'movement',   chips: ['morning run', 'bike'],  done: true },
                  { color: '#B8C3B1', name: 'reflection', chips: ['journal'],              done: true },
                  { color: '#E8B81F', name: 'nutrition',  chips: ['cook a meal', 'greens'], done: false },
                ].map((r, i) => (
                  <div key={i} className={styles.appUIPracticeRow}>
                    <span className={styles.appUIBubble} style={{ borderColor: r.color, background: r.done ? r.color : 'transparent' }} />
                    <span className={styles.appUINeedName}>{r.name}</span>
                    {r.chips.map(c => <span key={c} className={styles.appUIChip}>{c}</span>)}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.howItWorksCopyLabel}>Practices</div>
            <p className={styles.howItWorksCopyBody}>Without action, needs and modes are just interesting ideas. Practices turn needs into positive actions that help you own more space in your life — space that otherwise would be available to anxiety.</p>
          </div>
        </div>
      </section>

      {/* ── Needs ── */}
      <section className={styles.section} id="needs">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>NEEDS</div>
        </div>
        <div style={{ maxWidth: 920 }}>
          <h2 className={styles.sectionHeadline}>know <em>what</em> you need.</h2>
          <p className={styles.monoBody} style={{ marginTop: 40, maxWidth: 520 }}>
            There are things you need to live and things you need to feel alive. They are usually different versions of the same needs. You just need to know which ones matter to you — physiologically, not just logically.
          </p>
          <p className={styles.monoBody} style={{ marginTop: 20, maxWidth: 520 }}>
            MyMaslow is built around 14 needs based on the research of Abraham Maslow and remixed to fit our highly-connected, highly-digital modern lives.
          </p>
        </div>

        {/* Desktop needs grid — universal group then personal group */}
        <div className={styles.needsHairlineGrid}>

          <div className={styles.needsGroupLabel}>— UNIVERSAL · 3</div>
          <div className={styles.needsHairlineRowUniversal}>
            {NEEDS_UNIVERSAL.map((need, i) => (
              <div key={need.id} className={styles.needsHairlineCell} style={{ borderRight: i < 2 ? '0.5px solid var(--border)' : 'none' }}>
                <div className={styles.needsHairlineMeta}>
                  <span className={styles.needCardPip} />
                </div>
                <div className={styles.needCardName}>{need.name}</div>
                <p className={styles.needsHairlineDesc}>{need.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.needsGroupLabel}>— PERSONAL · 10</div>
          <div className={styles.needsHairlineRow}>
            {NEEDS_PERSONAL.slice(0, 5).map((need, i) => (
              <div key={need.id} className={styles.needsHairlineCell} style={{ borderRight: i < 4 ? '0.5px solid var(--border)' : 'none' }}>
                <div className={styles.needsHairlineMeta}>
                  <span className={styles.needCardPip} />
                </div>
                <div className={styles.needCardName}>{need.name}</div>
                <p className={styles.needsHairlineDesc}>{need.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.needsHairlineRow}>
            {NEEDS_PERSONAL.slice(5, 10).map((need, i) => (
              <div key={need.id} className={styles.needsHairlineCell} style={{ borderRight: i < 4 ? '0.5px solid var(--border)' : 'none' }}>
                <div className={styles.needsHairlineMeta}>
                  <span className={styles.needCardPip} />
                </div>
                <div className={styles.needCardName}>{need.name}</div>
                <p className={styles.needsHairlineDesc}>{need.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.needsHairlineRow}>
            <div className={`${styles.needsHairlineCell} ${styles.needCellAdd}`} style={{ borderRight: 'none' }}>
              <div className={styles.needsHairlineMeta} />
              <div className={styles.needCardName}>+ your own</div>
              <p className={styles.needsHairlineDesc}>add needs that are yours alone.</p>
            </div>
          </div>

        </div>

        {/* Mobile needs list — accordion, all 13 */}
        <div className={styles.needsMobileList}>
          <div className={styles.needsMobileGroupLabel}>— universal</div>
          {NEEDS_UNIVERSAL.map(need => (
            <details key={need.id} className={styles.needMobileItem}>
              <summary className={styles.needMobileSummary}>
                <div className={styles.needMobileLeft}>
                  <span className={styles.needMobilePip} />
                  <div className={styles.needMobileName}>{need.name}</div>
                </div>
                <span className={styles.needMobileChevron}>↓</span>
              </summary>
              <p className={styles.needMobileDesc}>{need.desc}</p>
            </details>
          ))}
          <div className={styles.needsMobileGroupLabel}>— personal</div>
          {NEEDS_PERSONAL.map(need => (
            <details key={need.id} className={styles.needMobileItem}>
              <summary className={styles.needMobileSummary}>
                <div className={styles.needMobileLeft}>
                  <span className={styles.needMobilePip} />
                  <div className={styles.needMobileName}>{need.name}</div>
                </div>
                <span className={styles.needMobileChevron}>↓</span>
              </summary>
              <p className={styles.needMobileDesc}>{need.desc}</p>
            </details>
          ))}
          <details className={styles.needMobileItem}>
            <summary className={styles.needMobileSummary}>
              <div className={styles.needMobileLeft}>
                <span className={styles.needMobilePip} style={{ background: 'transparent', border: '1px dashed rgba(26,26,26,0.3)' }} />
                <div className={styles.needMobileName}>+ your own</div>
              </div>
              <span className={styles.needMobileChevron}>↓</span>
            </summary>
            <p className={styles.needMobileDesc}>add needs that are yours alone.</p>
          </details>
        </div>

      </section>

      {/* ── Modes ── */}
      <section className={styles.section} id="modes">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>MODES</div>
        </div>
        <div style={{ maxWidth: 920 }}>
          <h2 className={styles.sectionHeadline}>know <em>how</em> you need it.</h2>
          <p className={styles.monoBody} style={{ marginTop: 40, maxWidth: 520 }}>
            What&apos;s often missing from meeting our needs is meeting them in a way our unique bodies and minds can internalize. For instance, you need to eat, but what you eat, the circumstances in which you eat, and the nutrition you get determine if your body truly feels fed.<br /><br />
            Modes tailor needs to each person.
          </p>
        </div>
        <div className={styles.modesTable}>
          {MODES.map((mode, i) => (
            <div key={mode.name} className={styles.modeRow}>
              <span className={styles.modeRowNum}>0{i + 1}</span>
              <div className={styles.modeRowLabel}>
                <span className={styles.modePip} style={{ background: mode.color }} />
                <span className={styles.modeName}>{mode.name}</span>
              </div>
              <p className={styles.modeDesc}>{mode.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Practices / Canvas ── */}
      <section className={styles.canvasSection} id="canvas">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>PRACTICES</div>
        </div>
        <h2 className={styles.canvasHed}>meet your needs.<br /><em>become more of yourself.</em></h2>
        <p className={styles.canvasBody}>Your needs and modes are just information. The real work is what you do with it every day. MyMaslow helps you turn that information into custom daily practices and keeps them front and center.</p>
        <p className={styles.canvasBody}>MyMaslow isn&apos;t designed to make you feel bad about not checking off all your practices. It&apos;s simply information. With mood and practice tracking, you&apos;re able to see what it feels like when you meet all your needs, some, or experiment with different modes.</p>
        <DailyLoopAnimation />
        {/*
          WORKSTREAM 3 — ASSET SLOTS
          ─────────────────────────────────────────────────────────────────────
          Drop updated app screenshots here when ready.
          Slot A: Today screen showing practice chips and donut progress chart
          Slot B: Canvas screen showing mode cards with exploration/appreciation/nourishment/survival
          Slot C: Data screen — mood + streak + BY NEED accordion
          ─────────────────────────────────────────────────────────────────────
          <Image src="/screenshots/today.png" alt="Today screen" width={860} height={640} />
          <Image src="/screenshots/canvas.png" alt="Canvas screen" width={860} height={640} />
          <Image src="/screenshots/data.png" alt="Data screen" width={860} height={640} />
        */}
      </section>

      {/* ── Features ── */}
      <section className={styles.section} id="debriefs">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>FEATURES</div>
        </div>
        <div style={{ maxWidth: 920 }}>
          <h2 className={styles.sectionHeadline}>the rest of<br /><em>the practice.</em></h2>
          <p className={styles.monoBody} style={{ marginTop: 40, maxWidth: 520 }}>
            Meeting needs is the core of MyMaslow, but living leaves data. A journal for what&apos;s on your mind. Debriefs for anxiety spikes and peak moments. Notes to self you actually see again. A weekly review that takes minutes, not resolve.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {[
            { name: 'journal',       desc: 'a place to think that stays with your day.' },
            { name: 'debriefs',      desc: 'seven minutes to process an anxiety episode or understand a peak moment.' },
            { name: 'notes to self', desc: 'swipeable cards that resurface what you want to remember.' },
            { name: 'weekly review', desc: 'five steps to close the week and set the next one.' },
          ].map(f => (
            <div key={f.name} className={styles.featureBlock}>
              <div className={styles.featureName}>{f.name}</div>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Your maslow, in four steps ── */}
      <section className={styles.section} id="how">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>GET STARTED</div>
        </div>
        <div style={{ maxWidth: 920 }}>
          <h2 className={styles.sectionHeadline}>your mymaslow,<br /><em>in four steps</em></h2>
          <p className={styles.monoBody} style={{ marginTop: 40, maxWidth: 520 }}>It takes about five minutes to set up. Then it runs in the background of your life.</p>
        </div>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNum}>01</div>
            <div className={styles.stepTitle}>Answer a few questions</div>
            <p className={styles.stepBody}>Tell MyMaslow where you are in life right now — what&apos;s hard, what you value, what pulls at you. Your answers shape a starting canvas built around your actual life, not a generic template.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>02</div>
            <div className={styles.stepTitle}>Review your canvas</div>
            <p className={styles.stepBody}>MyMaslow proposes a canvas — not all thirteen needs, a deliberate few. One to explore deeply. Two to appreciate. A handful to keep nourished, and a floor of survival-mode needs that just need to not fall apart. You can&apos;t do everything at once. The canvas is where you admit that — and choose.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>03</div>
            <div className={styles.stepTitle}>Build your practice library</div>
            <p className={styles.stepBody}>For each need, add a handful of practices — the specific things you actually do to meet that need. You don&apos;t have to meet your needs the same way every day. The library gives you options.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>04</div>
            <div className={styles.stepTitle}>Track and reflect</div>
            <p className={styles.stepBody}>Check in three times a day. Log your mood. Note what&apos;s behind it. Over time, the data shows you what&apos;s working, what isn&apos;t, and where to focus next.</p>
          </div>
        </div>
      </section>

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
