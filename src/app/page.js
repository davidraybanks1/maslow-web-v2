import styles from './page.module.css'
import DailyLoopAnimation from './components/DailyLoopAnimation'


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
        <p className={styles.heroBody}>Anxiety fills the space you give it. The more space it gets, the more energy you waste meeting its needs rather than your own. Don't try to manage anxiety. Focus on meeting your needs.</p>
        <p className={styles.heroBody}>Maslow App is designed to help you take back space.</p>
      </section>

      {/* How it works */}
      <section className={styles.howItWorks}>
        <div className={styles.howItWorksHeader}>
          <div className={styles.howItWorksLabel}>HOW IT WORKS</div>
          <div className={styles.howItWorksTitle}>how you take back space.</div>
        </div>
        <div className={styles.howItWorksGrid}>
          <div className={styles.howItWorksCol}>
            <div className={styles.howItWorksIllustration}>
              <svg width="80" height="56" viewBox="0 0 80 56" fill="none">
                <circle cx="40" cy="4" r="3" fill="#E8B81F"/>
                <circle cx="32" cy="16" r="3" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
                <circle cx="48" cy="16" r="3" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
                <circle cx="24" cy="28" r="3" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
                <circle cx="40" cy="28" r="3" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
                <circle cx="56" cy="28" r="3" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
                <circle cx="16" cy="40" r="3" stroke="#1A1A1A" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <circle cx="32" cy="40" r="3" stroke="#1A1A1A" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <circle cx="48" cy="40" r="3" stroke="#1A1A1A" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <circle cx="64" cy="40" r="3" stroke="#1A1A1A" strokeWidth="0.5" fill="none" opacity="0.4"/>
              </svg>
            </div>
            <div className={styles.howItWorksCopyLabel}>Needs</div>
            <p className={styles.howItWorksCopyBody}>There are basic things we need as humans but we often fast-forward through them to get to what we want. But without meeting your needs, it's hard to appreciate what you have, who you are, and what you achieve.</p>
          </div>
          <div className={styles.howItWorksCol}>
            <div className={styles.howItWorksIllustration}>
              <svg width="80" height="56" viewBox="0 0 80 56" fill="none">
                <line x1="8" y1="12" x2="72" y2="12" stroke="#1B3A2D" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="24" x2="56" y2="24" stroke="#B8C3B1" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="36" x2="40" y2="36" stroke="#E8B81F" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="48" x2="20" y2="48" stroke="#D93B1C" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.howItWorksCopyLabel}>Modes</div>
            <p className={styles.howItWorksCopyBody}>Everyone meets their needs differently. Modes help you understand what kind of attention each need requires from you right now, and give you permission to not meet all your needs all the time.</p>
          </div>
          <div className={styles.howItWorksCol}>
            <div className={styles.howItWorksIllustration}>
              <svg width="80" height="56" viewBox="0 0 80 56" fill="none">
                <circle cx="40" cy="28" r="20" stroke="#1A1A1A" strokeWidth="1" fill="none" opacity="0.15"/>
                <path d="M40 8 A20 20 0 0 1 60 28" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M40 8 A20 20 0 1 0 40 48" stroke="#E8B81F" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <circle cx="40" cy="28" r="3" fill="#1A1A1A"/>
              </svg>
            </div>
            <div className={styles.howItWorksCopyLabel}>Practices</div>
            <p className={styles.howItWorksCopyBody}>Without action, needs and modes are just interesting ideas. Practices turn needs into positive actions that help you own more space in your life — space that otherwise would be available to anxiety.</p>
          </div>
        </div>
      </section>

      {/* Needs */}
      <section className={styles.section} id="needs">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>NEEDS</div>
        </div>
        <div className={styles.twoCol}>
          <div>
            <h2 className={styles.sectionHeadline}>know what <em>you</em> need.</h2>
            <p className={styles.monoBody} style={{ marginTop: 40, maxWidth: 520 }}>There are things you need to live and things you need to feel alive. They are usually different versions of the same needs. You just need to know which ones matter to you—on a physiological level, not just a logical one.</p>
            <p className={styles.monoBody} style={{ marginTop: 20, maxWidth: 520 }}>Based on the research of Abraham Maslow and other humanistic and positive psychologists, Maslow App centers on 10 needs. You can also create custom needs based on your own experiences.</p>
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

        <div className={styles.needsHairlineGrid}>
          <div className={styles.needsHairlineRow}>
            {NEEDS.slice(0, 5).map((need, i) => (
              <div key={need.id} className={styles.needsHairlineCell} style={{ borderRight: i < 4 ? '0.5px solid var(--border)' : 'none' }}>
                <div className={styles.needsHairlineMeta}>
                  <span className={styles.needCardNum}>{need.num}</span>
                  <span className={styles.needCardPip} style={{ background: need.pip }} />
                </div>
                <div className={styles.needCardName}>{need.name}</div>
                <p className={styles.needsHairlineDesc}>{need.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.needsHairlineRow}>
            {NEEDS.slice(5, 10).map((need, i) => (
              <div key={need.id} className={styles.needsHairlineCell} style={{ borderRight: i < 4 ? '0.5px solid var(--border)' : 'none' }}>
                <div className={styles.needsHairlineMeta}>
                  <span className={styles.needCardNum}>{need.num}</span>
                  <span className={styles.needCardPip} style={{ background: need.pip }} />
                </div>
                <div className={styles.needCardName}>{need.name}</div>
                <p className={styles.needsHairlineDesc}>{need.desc}</p>
              </div>
            ))}
          </div>
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

      </section>

      {/* Modes */}
      <section className={styles.section} id="modes">
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>MODES</div>
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
          <div className={styles.eyebrow}>PRACTICES</div>
        </div>
        <h2 className={styles.canvasHed}>meet your needs.<br /><em>become more of yourself.</em></h2>
        <p className={styles.canvasBody}>Your needs and modes are just information. The real work is what you do with it every day. Maslow helps you turn that information into custom daily practices and keeps them front and center.</p>
        <p className={styles.canvasBody}>Maslow App isn't designed to make you feel bad about not checking off all your practices. It's simply information. With mood and practice tracking, you're able to see what it feels like when you meet all your needs, some, or experiment with different modes.</p>
        <DailyLoopAnimation />
      </section>

      {/* How it works */}
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
            <p className={styles.stepBody}>Tell Maslow where you are in life right now — what's hard, what you value, what pulls at you. Your answers shape a starting canvas built around your actual life, not a generic template.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>02</div>
            <div className={styles.stepTitle}>Review your canvas</div>
            <p className={styles.stepBody}>Maslow proposes a canvas — your ten needs, each assigned a mode based on your answers. Move things around until it feels right. This is your starting point.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>03</div>
            <div className={styles.stepTitle}>Build your practice library</div>
            <p className={styles.stepBody}>For each need, add a handful of practices — the specific things you actually do to meet that need. You don't have to meet your needs the same way every day. The library gives you options.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>04</div>
            <div className={styles.stepTitle}>Track and reflect</div>
            <p className={styles.stepBody}>Check in three times a day. Log your mood. Note what's behind it. Over time, the data shows you what's working, what isn't, and where to focus next.</p>
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