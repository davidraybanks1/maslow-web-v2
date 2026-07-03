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

const NEEDS_ALL = [...NEEDS_UNIVERSAL, ...NEEDS_PERSONAL]

const MODES = [
  {
    name: 'survival',
    color: '#D93B1C',
    desc: 'In survival mode, you are doing the bare minimum. That may be out of necessity or because you have chosen to prioritize other needs. The floor that frees everything else.',
  },
  {
    name: 'nourishment',
    color: '#E8B81F',
    desc: 'In nourishment mode, you are meeting a need intentionally, in a way that gives you energy rather than depletes it. One practice a day, steady and reliable.',
  },
  {
    name: 'appreciation',
    color: '#B8C3B1',
    desc: 'In appreciation mode, you create space to enjoy meeting a need by being present, invested, and in flow. Two practices a day, present and intentional.',
  },
  {
    name: 'exploration',
    color: '#1B3A2D',
    desc: 'In exploration mode, you go deepest on a single need. It gets your fullest attention — three practices a day — because right now, it\'s the one with the most to teach you about who you\'re becoming.',
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
            anxiety isn&apos;t who you are.<br />it&apos;s who you <em>aren&apos;t.</em>
          </h1>
          <p className={styles.heroBody}>Anxiety fills the space you give it. The more space it gets, the more energy you waste meeting its needs rather than your own. Don&apos;t try to manage anxiety. Focus on meeting your needs.</p>
          <p className={styles.heroBody}>Maslow is designed to help you take back space.</p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className={styles.howItWorks}>
        <div className={styles.howItWorksHeader}>
          <div className={styles.howItWorksLabel}>HOW IT WORKS</div>
          <div className={styles.howItWorksTitle}>how you take back space.</div>
        </div>
        <div className={styles.howItWorksGrid}>
          <div className={styles.howItWorksCol}>
            <div className={styles.howItWorksIllustration}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="12" r="3" fill="#E8B81F"/>
                <circle cx="24" cy="24" r="3" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
                <circle cx="40" cy="24" r="3" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
                <circle cx="16" cy="36" r="3" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
                <circle cx="32" cy="36" r="3" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
                <circle cx="48" cy="36" r="3" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
                <circle cx="8" cy="48" r="3" stroke="#1A1A1A" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <circle cx="24" cy="48" r="3" stroke="#1A1A1A" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <circle cx="40" cy="48" r="3" stroke="#1A1A1A" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <circle cx="56" cy="48" r="3" stroke="#1A1A1A" strokeWidth="0.5" fill="none" opacity="0.4"/>
              </svg>
            </div>
            <div className={styles.howItWorksCopyLabel}>Needs</div>
            <p className={styles.howItWorksCopyBody}>There are basic things we need as humans but we often fast-forward through them to get to what we want. But without meeting your needs, it&apos;s hard to appreciate what you have, who you are, and what you achieve.</p>
          </div>
          <div className={styles.howItWorksCol}>
            <div className={styles.howItWorksIllustration}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <line x1="8" y1="12" x2="56" y2="12" stroke="#1B3A2D" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="24" x2="46" y2="24" stroke="#B8C3B1" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="36" x2="34" y2="36" stroke="#E8B81F" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="48" x2="20" y2="48" stroke="#D93B1C" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.howItWorksCopyLabel}>Modes</div>
            <p className={styles.howItWorksCopyBody}>Everyone meets their needs differently. Modes help you understand what kind of attention each need requires from you right now, and give you permission to not meet all your needs all the time.</p>
          </div>
          <div className={styles.howItWorksCol}>
            <div className={styles.howItWorksIllustration}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="30" r="20" stroke="#1A1A1A" strokeWidth="1" fill="none" opacity="0.15"/>
                <path d="M32 10 A20 20 0 0 1 52 30" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M32 10 A20 20 0 1 0 32 50" stroke="#E8B81F" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <circle cx="32" cy="30" r="3" fill="#1A1A1A"/>
              </svg>
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
        <div className={styles.twoCol}>
          <div>
            <h2 className={styles.sectionHeadline}>know what <em>you</em> need.</h2>
            <p className={styles.monoBody} style={{ marginTop: 40, maxWidth: 520 }}>
              There are things you need to live and things you need to feel alive. They are usually different versions of the same needs. You just need to know which ones matter to you—on a physiological level, not just a logical one.
            </p>
            <p className={styles.monoBody} style={{ marginTop: 20, maxWidth: 520 }}>
              Three needs are universal — movement, nutrition, rest. Your body doesn&apos;t negotiate on these. The other ten are personal. Some of them are quietly running your life. Some don&apos;t matter to you at all. Knowing the difference is the work.
            </p>
            <p className={styles.monoBody} style={{ marginTop: 20, maxWidth: 520 }}>
              Based on the research of Abraham Maslow and other humanistic and positive psychologists — plus room to name needs no researcher ever listed, because they&apos;re yours.
            </p>
          </div>
          <div style={{ paddingTop: 16 }}>
            <div className={styles.bulletList}>
              <div className={styles.bulletItem}><span className={styles.bulletDot}>•</span><span>Needs aren&apos;t aspirational goals.</span></div>
              <div className={styles.bulletItem}><span className={styles.bulletDot}>•</span><span>They have no particular order.</span></div>
              <div className={styles.bulletItem}><span className={styles.bulletDot}>•</span><span>They don&apos;t give your life meaning.</span></div>
              <div className={styles.bulletItem}><span className={styles.bulletDot}>•</span><span>Needs create the conditions for meaning.</span></div>
            </div>
          </div>
        </div>

        {/* Desktop needs grid — universal group then personal group */}
        <div className={styles.needsHairlineGrid}>

          <div className={styles.needsGroupLabel}>— UNIVERSAL · 3</div>
          <div className={styles.needsHairlineRowUniversal}>
            {NEEDS_UNIVERSAL.map((need, i) => (
              <div key={need.id} className={styles.needsHairlineCell} style={{ borderRight: i < 2 ? '0.5px solid var(--border)' : 'none' }}>
                <div className={styles.needsHairlineMeta}>
                  <span className={styles.needCardNum}>{need.num}</span>
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
                  <span className={styles.needCardNum}>{need.num}</span>
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
                  <span className={styles.needCardNum}>{need.num}</span>
                  <span className={styles.needCardPip} />
                </div>
                <div className={styles.needCardName}>{need.name}</div>
                <p className={styles.needsHairlineDesc}>{need.desc}</p>
              </div>
            ))}
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
        </div>

      </section>

      {/* ── Modes ── */}
      <section className={styles.section} id="modes">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>MODES</div>
        </div>
        <div style={{ maxWidth: 920 }}>
          <h2 className={styles.sectionHeadline}>know how <em>you</em> need it.</h2>
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
        <p className={styles.canvasBody}>Your needs and modes are just information. The real work is what you do with it every day. Maslow helps you turn that information into custom daily practices and keeps them front and center.</p>
        <p className={styles.canvasBody}>Maslow isn&apos;t designed to make you feel bad about not checking off all your practices. It&apos;s simply information. With mood and practice tracking, you&apos;re able to see what it feels like when you meet all your needs, some, or experiment with different modes.</p>
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

      {/* ── Debriefs ── */}
      <section className={styles.section} id="debriefs">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>DEBRIEFS</div>
        </div>
        <div style={{ maxWidth: 920 }}>
          <h2 className={styles.sectionHeadline}>seven minutes.<br /><em>no more, no less.</em></h2>
          <div className={styles.debriefBody}>
            <p className={styles.monoBody}>
              Anxiety episodes and peak moments have one thing in common: they&apos;re data about who you are. Most of it evaporates.
            </p>
            <p className={styles.monoBody}>
              When anxiety hits, Maslow walks you through a seven-minute debrief — name it, feel it, examine it, reclaim it. Not to process it forever. To take what&apos;s useful and put it down.
            </p>
            <p className={styles.monoBody}>
              Peak moments get the same treatment. When you feel fully alive, that&apos;s worth understanding too — what conditions made it possible, and how to create more of them.
            </p>
            <p className={styles.monoBody}>
              Over time, patterns surface. What kind of anxiety. Where it finds you. What your best moments share. Computed from your own entries — not generic advice.
            </p>
          </div>
        </div>
      </section>

      {/* ── Your maslow, in four steps ── */}
      <section className={styles.section} id="how">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>GET STARTED</div>
        </div>
        <div style={{ maxWidth: 920 }}>
          <h2 className={styles.sectionHeadline}>your maslow,<br /><em>in four steps</em></h2>
          <p className={styles.monoBody} style={{ marginTop: 40, maxWidth: 520 }}>It takes about five minutes to set up. Then it runs in the background of your life.</p>
        </div>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNum}>01</div>
            <div className={styles.stepTitle}>Answer a few questions</div>
            <p className={styles.stepBody}>Tell Maslow where you are in life right now — what&apos;s hard, what you value, what pulls at you. Your answers shape a starting canvas built around your actual life, not a generic template.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>02</div>
            <div className={styles.stepTitle}>Review your canvas</div>
            <p className={styles.stepBody}>Maslow proposes a canvas — not all thirteen needs, a deliberate few. One to explore deeply. Two to appreciate. A handful to keep nourished, and a floor of survival-mode needs that just need to not fall apart. You can&apos;t do everything at once. The canvas is where you admit that — and choose.</p>
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
          <a className={styles.ctaBtn} href="https://app.mymaslow.com/onboarding">Create your maslow →</a>
        </div>
      </section>
    </div>
  )
}
