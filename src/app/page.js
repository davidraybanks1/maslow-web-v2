import Link from 'next/link'
import styles from './page.module.css'
import CanvasAnimation from './components/CanvasAnimation'


const NEEDS = [
  { id: 'movement',   name: 'Movement',   mode: 'purpose',      pip: '#1B3A2D', num: '01', desc: 'Your body needs to be used — not optimized, not tracked, just moved.' },
  { id: 'community',  name: 'Community',  mode: 'nourishment',  pip: '#E8B81F', num: '02', desc: 'You need people who know you, not followers who see you.' },
  { id: 'reflection', name: 'Reflection', mode: 'appreciation', pip: '#B8C3B1', num: '03', desc: 'Without time to process your own experience, life just happens to you.' },
  { id: 'nutrition',  name: 'Nutrition',  mode: 'survival',     pip: '#D93B1C', num: '04', desc: 'Not just food, but your relationship to eating and being nourished.' },
  { id: 'rest',       name: 'Rest',       mode: 'purpose',      pip: '#1B3A2D', num: '05', desc: 'The nervous system needs to recover — not just through sleep, but through stillness.' },
  { id: 'beauty',     name: 'Beauty',     mode: 'nourishment',  pip: '#E8B81F', num: '06', desc: 'You need contact with things that move you — art, nature, music, something made with care.' },
  { id: 'money',      name: 'Money',      mode: 'appreciation', pip: '#B8C3B1', num: '07', desc: 'Whether money feels like a tool or a threat determines how much of your mind it occupies.' },
  { id: 'dwelling',   name: 'Dwelling',   mode: 'survival',     pip: '#D93B1C', num: '08', desc: 'Your environment shapes your nervous system more than you think.' },
  { id: 'intimacy',   name: 'Intimacy',   mode: 'purpose',      pip: '#1B3A2D', num: '09', desc: 'To be truly known by another person — and to offer the same in return.' },
  { id: 'play',       name: 'Play',       mode: 'nourishment',  pip: '#E8B81F', num: '10', desc: 'Unstructured, purposeless joy — things you do for no reason other than they feel good.' },
]

const MODES = [
  { name: 'survival',     color: '#D93B1C', desc: 'In survival mode, you are doing the bare minimum. That may be out of necessity or because you have chosen to prioritize other needs.' },
  { name: 'nourishment',  color: '#E8B81F', desc: 'In nourishment mode, you are meeting a need intentionally, in a way that gives you energy rather than depletes it.' },
  { name: 'appreciation', color: '#B8C3B1', desc: 'In appreciation mode, you create space to enjoy meeting a need by being present, invested, and in flow.' },
  { name: 'purpose',      color: '#1B3A2D', desc: 'In purpose mode, you are focusing on one need that is core to you and through which you create what others can appreciate and be nourished by.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroHeadline}>
          anxiety isn't who you are.<br />it's who you <em>aren't.</em>
        </h1>
        <p className={styles.heroBody}>Anxiety fills the space you give it. The more space it gets, the more energy you waste meeting its needs rather than your own. Don't try to manage anxiety. Focus on meeting your needs.<br />Maslow is a simple framework designed to help.</p>
        <div className={styles.heroLinks}>
          <a href="#needs" className={styles.heroLink}>10 needs</a>
          <a href="#modes" className={styles.heroLink}>4 modes</a>
          <a href="#canvas" className={styles.heroLink}>1 canvas</a>
        </div>
      </section>

      {/* Needs */}
      <section className={styles.section} id="needs">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>02 — The Needs</div>
          <div className={styles.sectionHeaderRight}>
            <span className={styles.sectionPillActive}>10 needs</span>
            <span className={styles.dot}>·</span>
            <span className={styles.sectionPill}>4 modes</span>
            <span className={styles.dot}>·</span>
            <span className={styles.sectionPill}>1 canvas</span>
          </div>
        </div>
        <div className={styles.twoCol}>
          <div>
            <h2 className={styles.sectionHeadline}>know what <em>you</em> need,</h2>
            <p className={styles.monoBody} style={{ marginTop: 40, maxWidth: 520 }}>There are things you need to live and things you need to feel alive. They are usually different versions of the same needs. You just need to know which ones matter to you—on a physiological level, not just a logical one.<br /><br /><strong>There are 10 needs most people need most.</strong></p>
          </div>
          <div style={{ paddingTop: 16 }}>
            <div className={styles.bulletList}>
              <div className={styles.bulletItem}><span className={styles.bulletDot}>•</span><span>Needs aren't aspirational goals.</span></div>
              <div className={styles.bulletItem}><span className={styles.bulletDot}>•</span><span>They have no particular order.</span></div>
              <div className={styles.bulletItem}><span className={styles.bulletDot}>•</span><span>They don't give your life meaning.</span></div>
              <div className={styles.bulletItem}><span className={styles.bulletDot}>•</span><span>Needs create the conditions for meaning.</span></div>
            </div>
          </div>
        </div>

        <div className={styles.needsGridHeader}>
          <span>fig. 02 — the ten</span>
          <span className={styles.needsGridHint}>hover to learn more</span>
        </div>
        <div className={styles.needsGrid}>
          {NEEDS.map((need, i) => (
            <div key={need.id} className={styles.needCard}>
              <div className={styles.needCardFront}>
                <div className={styles.needCardTop}>
                  <span className={styles.needCardNum}>{need.num}</span>
                  <span className={styles.needCardPip} style={{ background: need.pip }} />
                </div>
                <div>
                  <div className={styles.needCardName}>{need.name}</div>
                </div>
              </div>
              <div className={styles.needCardBack}>
                <p className={styles.needCardDesc}>{need.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.needsMobileList}>
          {NEEDS.map(need => (
            <details key={need.id} className={styles.needMobileItem}>
              <summary className={styles.needMobileSummary}>
                <div className={styles.needMobileLeft}>
                  <span className={styles.needMobilePip} style={{ background: need.pip }} />
                  <div>
                    <div className={styles.needMobileName}>{need.name}</div>
                    <div className={styles.needMobileMode}>{need.mode}</div>
                  </div>
                </div>
                <span className={styles.needMobileChevron}>↓</span>
              </summary>
              <p className={styles.needMobileDesc}>{need.desc}</p>
            </details>
          ))}
        </div>

        <div className={styles.sectionFooter}>
          <span>§ 01 of 05 sections</span>
          <Link href="/need" className={styles.sectionFooterLink}>explore all 10 needs →</Link>
        </div>
      </section>

      {/* Modes */}
      <section className={styles.section} id="modes">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>03 — The Modes</div>
          <div className={styles.sectionHeaderRight}>
            <span className={styles.sectionPill}>10 needs</span>
            <span className={styles.dot}>·</span>
            <span className={styles.sectionPillActive}>4 modes</span>
            <span className={styles.dot}>·</span>
            <span className={styles.sectionPill}>1 canvas</span>
          </div>
        </div>
        <div style={{ maxWidth: 920 }}>
          <h2 className={styles.sectionHeadline}>know how <em>you</em> need it.</h2>
          <p className={styles.monoBody} style={{ marginTop: 40, maxWidth: 520 }}>What's often missing from meeting our needs is meeting them in a way our unique bodies and minds can internalize. For instance, you need to eat, but what you eat, the circumstances in which you eat, and the nutrition you get determine if your body truly feels fed.<br /><br />Modes tailor needs to each person.</p>
        </div>
        <div className={styles.modesTable}>
          {MODES.map((mode, i) => (
            <div key={mode.name} className={styles.modeRow}>
              <span className={styles.modeRowNum}>0{i + 1}</span>
              <div className={styles.modeRowLabel}>
                <span className={styles.modePip} style={{ background: mode.color }} />
                <span className={styles.modeName} style={{ color: mode.color }}>{mode.name}</span>
              </div>
              <p className={styles.modeDesc}>{mode.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Canvas */}
      <section className={styles.canvasSection} id="canvas">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>04 — Your Canvas</div>
          <div className={styles.sectionHeaderRight}>
            <span className={styles.sectionPill}>10 needs</span>
            <span className={styles.dot}>·</span>
            <span className={styles.sectionPill}>4 modes</span>
            <span className={styles.dot}>·</span>
            <span className={styles.sectionPillActive}>1 canvas</span>
          </div>
        </div>
        <h2 className={styles.canvasHed}>meet your needs.<br /><em>become more of yourself.</em></h2>
        <p className={styles.canvasBody}>Your canvas brings it all together. It's where you decide the mode in which you will approach each need. When you meet the needs important to you in a way that makes sense to you, you become more of yourself and leave less space for anxiety.</p>
        <CanvasAnimation />
      </section>

      {/* How it works */}
      <section className={styles.section} id="how">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>05 — How It Works</div>
        </div>
        <div style={{ maxWidth: 920 }}>
          <h2 className={styles.sectionHeadline}>your maslow,<br /><em>in three steps</em></h2>
          <p className={styles.monoBody} style={{ marginTop: 40, maxWidth: 520 }}>It takes about five minutes to set up. Then it runs in the background of your life.</p>
        </div>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNum}>01</div>
            <div className={styles.stepTitle}>Set your intentions</div>
            <p className={styles.stepBody}>Before anything else, get clear on where you're going. What does a good life look like for you right now? Without direction, meeting your needs is just maintenance.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>02</div>
            <div className={styles.stepTitle}>Build your canvas</div>
            <p className={styles.stepBody}>Answer a short survey and Maslow proposes a canvas — a visual map of your ten needs, sized by how much attention each one deserves right now.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>03</div>
            <div className={styles.stepTitle}>Track and reflect</div>
            <p className={styles.stepBody}>Check in as you go. At the end of each week, your summary shows what you built, what you didn't, and what the data suggests for next week.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2 className={styles.sectionHeadline}>Get started.</h2>
        <div className={styles.ctaRight}>
          <p className={styles.ctaBody}>No app store. No subscription. Just a framework for living with more intention — and less anxiety.</p>
          <a className={styles.ctaBtn} href="https://app.mymaslow.com/onboarding">Create your maslow →</a>
        </div>
      </section>
    </div>
  )
}