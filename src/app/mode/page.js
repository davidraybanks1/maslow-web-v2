import styles from './page.module.css'

const MODES = [
  {
    id: 'survival',
    num: '01',
    name: 'Survival',
    pip: '#D93B1C',
    desc: 'Some needs just need to stay alive. Survival mode is the honest acknowledgment that you can\'t give everything equal attention — and that choosing to minimize a need is sometimes the most intentional thing you can do.',
    intro: 'Survival isn\'t neglect. It\'s a deliberate decision to keep a need at baseline so something else can have the space it deserves. The goal is awareness, not guilt.',
    interpretations: [
      { label: 'Check the box', body: 'The minimum required to keep a need from becoming a problem. Not thriving, not growing — just maintaining. Eating something. Sleeping enough. Paying the bill. Survival mode asks: what does this need require just to stay stable?' },
      { label: 'Choosing your trade-offs', body: 'Putting a need in survival is a trade-off, not a failure. When you\'re building something, recovering from something, or carrying more than usual, some needs will take a back seat. Survival mode makes that choice visible and intentional rather than something that just happens.' },
      { label: 'Knowing when to move it', body: 'Survival is a temporary assignment, not a permanent one. The question to keep asking is whether a need in survival mode is staying there by choice — or by default.' },
    ],
  },
  {
    id: 'nourishment',
    num: '02',
    name: 'Nourishment',
    pip: '#E8B81F',
    desc: 'Nourishment is the foundation. It\'s meeting a need in a way that gives you something back — steadily, reliably, without drama. Nourishment doesn\'t require peak experiences. It requires consistency.',
    intro: 'Most needs, met most of the time, should live here. Nourishment is what makes a life feel sustainable rather than depleted.',
    interpretations: [
      { label: 'Intentional over automatic', body: 'Nourishment happens when you meet a need on purpose, not just when it becomes urgent. The difference between eating a meal you prepared and grabbing something because you\'re starving. Between exercising regularly and only moving when the guilt gets loud enough.' },
      { label: 'Building the habit', body: 'Nourishment is where routines live. The daily practices that don\'t require motivation because they\'ve become the default. Building nourishment around a need is the work of turning intention into infrastructure.' },
    ],
  },
  {
    id: 'appreciation',
    num: '03',
    name: 'Appreciation',
    pip: '#B8C3B1',
    desc: 'Appreciation is presence. It\'s meeting a need in a way that you actually notice — where the experience lands, where you\'re invested enough to feel it fully. Appreciation is what turns a routine into something that matters.',
    intro: 'You can\'t live in appreciation mode across every need. But the needs you place here are the ones you want to experience, not just maintain.',
    interpretations: [
      { label: 'Being present for it', body: 'Appreciation requires attention. The meal you actually taste. The conversation where you put the phone away. The workout where you\'re in your body instead of somewhere else. The practice is the same — what changes is the quality of your presence in it.' },
      { label: 'In flow', body: 'Some of the best moments in appreciation mode come when a need and your engagement with it are perfectly matched — where effort disappears and you\'re simply inside the experience. That state is available in almost any need. It requires enough skill to not be frustrated and enough challenge to not be bored.' },
      { label: 'Giving back more than you take', body: 'Needs met in appreciation mode tend to overflow. The person who runs because they love it brings something different to the rest of their day than the person who runs to burn calories. Appreciation changes the texture of how a need is met — and what it leaves behind.' },
    ],
  },
  {
    id: 'purpose',
    num: '04',
    name: 'Purpose',
    pip: '#1B3A2D',
    desc: 'Purpose is where you place the one need that is most core to who you are. The need through which you create — the thing you do that others can benefit from, be moved by, or be nourished by.',
    intro: 'There is only one slot in purpose mode. That constraint is the point. Purpose requires focus, and focus requires choosing.',
    interpretations: [
      { label: 'The need that defines your contribution', body: 'Purpose mode is reserved for the need that, when met at its fullest, produces something beyond yourself. The writer whose reflection becomes writing others need to read. The athlete whose movement becomes something others are inspired by. The parent whose community becomes the ground their children grow up on.' },
      { label: 'Where effort disappears', body: 'Time spent in purpose mode rarely feels like work in the depleting sense. It feels like expression. The effort is real — often significant — but it doesn\'t drain you the way other effort does. If the need you\'ve placed in purpose consistently feels like obligation rather than expression, it may belong somewhere else.' },
      { label: 'The source of everything else', body: 'Purpose mode has a way of raising the floor on every other need. When the thing you\'re most called to do is getting the attention it deserves, the rest of life becomes easier to navigate. The survival needs feel less threatening. The nourishment needs feel more satisfying. Purpose gives everything else context.' },
    ],
  },
]

export const metadata = {
  title: 'The Modes — Maslow',
  description: 'How Maslow maps your needs to the degree of attention they require.',
}

export default function ModePage() {
  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLabel}>The four modes</div>
        <nav className={styles.sidebarNav}>
          {MODES.map(mode => (
            <a key={mode.id} href={`#${mode.id}`} className={styles.sidebarLink}>
              <span className={styles.sidebarPip} style={{ background: mode.pip }} />
              {mode.name}
            </a>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <div className={styles.intro}>
          <div className={styles.introEyebrow}>The four modes</div>
          <h1 className={styles.introHeadline}>how to think about<br /><em>your modes.</em></h1>
          <p className={styles.introBody}>Modes turn your needs into a map. A map that is custom to you, what you want to be and achieve, and the seasons of your life. In today's fast-paced, digital, efficiency-based culture, most of us are running in survival mode across the board — doing the bare minimum across every need just to keep up. Modes help you identify where survival mode actually makes sense, and which needs require real attention to fuel rather than drain you. When your needs are met at the right level, they create the habits and thinking patterns that sustain you. When they're not, the space left behind fills with anxiety.</p>
        </div>

        {MODES.map((mode) => (
          <div key={mode.id} className={styles.needSection} id={mode.id}>
            <div className={styles.needBgNum}>{mode.num}</div>
            <div className={styles.needName} style={{ color: mode.pip }}>{mode.name}</div>
            <p className={styles.needDesc}>{mode.desc}</p>
            <p className={styles.needIntro}>{mode.intro}</p>
            <div className={styles.interpretations}>
              {mode.interpretations.map(item => (
                <div key={item.label} className={styles.interpretation}>
                  <div className={styles.interpretationLabel}>{item.label}</div>
                  <div className={styles.interpretationBody}>{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
