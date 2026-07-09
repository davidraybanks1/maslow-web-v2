'use client'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import s from './HomeSections.module.css'

// ── Shared hooks ──────────────────────────────────────────────────────────────
function useVisible(ref, threshold = 0.3) {
  const [v, setV] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true) },
      { threshold }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return v
}

function useReducedMotion() {
  const [r, setR] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setR(mq.matches)
    const h = e => setR(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return r
}

// ── Constants ─────────────────────────────────────────────────────────────────
const C = {
  exploration:  '#1B3A2D',
  appreciation: '#B8C3B1',
  nourishment:  '#E8B81F',
  survival:     '#D93B1C',
}

// ── Divider ───────────────────────────────────────────────────────────────────
export function Divider({ text }) {
  return (
    <div className={s.divider}>
      <div className={s.divLine} />
      <span className={s.divText}>— {text}</span>
      <div className={s.divLine} />
    </div>
  )
}

// ── SECTION 01: NEEDS ─────────────────────────────────────────────────────────
const ALL_NEEDS = ['movement','nutrition','rest','community','beauty','intimacy','reflection','play','money','dwelling','information','touch','thrill']

const MIXES = [
  {},
  { movement:'exploration', reflection:'exploration', nutrition:'nourishment', rest:'nourishment', community:'appreciation', beauty:'appreciation', money:'survival', dwelling:'survival' },
  { play:'exploration', intimacy:'appreciation', beauty:'appreciation', community:'nourishment', touch:'nourishment', movement:'survival', nutrition:'survival', rest:'survival', money:'survival' },
  { rest:'nourishment', nutrition:'nourishment', movement:'survival', dwelling:'survival', money:'survival', information:'survival' },
]

export function NeedsSection() {
  const ref = useRef(null)
  const visible = useVisible(ref)
  const reduced = useReducedMotion()
  const [mixIdx, setMixIdx] = useState(0)

  useEffect(() => {
    if (!visible || reduced) return
    const t = setInterval(() => setMixIdx(p => (p + 1) % MIXES.length), 3200)
    return () => clearInterval(t)
  }, [visible, reduced])

  const mix = MIXES[reduced ? 1 : mixIdx]

  return (
    <div className={s.halfRow} ref={ref}>
      <div className={s.visual}>
        <div className={s.card}>
          <div className={s.needsCard}>
            <div className={s.needsCardHeader}>— Your Needs · 14</div>
            <div className={s.needsGrid}>
              {ALL_NEEDS.map(need => {
                const mode = mix[need]
                const col = mode ? C[mode] : null
                return (
                  <div
                    key={need}
                    className={s.needTile}
                    style={col ? {
                      background: col + '26',
                      borderColor: col + '8C',
                      borderLeftColor: col,
                      borderLeftWidth: '3px',
                    } : {}}
                  >
                    {need}
                  </div>
                )
              })}
              <div className={`${s.needTile} ${s.needTileAdd}`}>+ your own</div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.copy}>
        <div className={s.eyebrow}>01 · Needs</div>
        <h2 className={s.heading}>know what you need.</h2>
        <p className={s.subhead}>Everyone needs the same fourteen things to live and to feel alive. The mix that matters to you is yours. Start with the defaults or add your own.</p>
      </div>
    </div>
  )
}

// ── SECTION 02: MODES ─────────────────────────────────────────────────────────
const MODES_LIST = [
  { name: 'EXPLORATION',  color: '#1B3A2D', desc: "you're not just experiencing, you're creating.", bubbles: 3, half: false },
  { name: 'APPRECIATION', color: '#B8C3B1', desc: 'you create space to enjoy meeting a need.',         bubbles: 2, half: false },
  { name: 'NOURISHMENT',  color: '#E8B81F', desc: 'you meet a need in a way that gives you energy.',  bubbles: 1, half: false },
  { name: 'SURVIVAL',     color: '#D93B1C', desc: "you're doing the bare minimum.",                    bubbles: 1, half: true  },
]

export function ModesSection() {
  return (
    <div className={s.halfRow}>
      <div className={s.visual}>
        <div className={s.card}>
          <div className={s.modesCard}>
            {MODES_LIST.map(m => (
              <div key={m.name} className={s.modeRow}>
                <span className={s.modePip} style={{ background: m.color }} />
                <div>
                  <div className={s.modeName}>{m.name}</div>
                  <div className={s.modeDesc}>{m.desc}</div>
                </div>
                <div />
                <div className={s.modeBubbles}>
                  {m.half
                    ? <span className={s.modeBubble} style={{ background: `linear-gradient(to right, ${m.color} 50%, transparent 50%)`, border: `1px solid ${m.color}` }} />
                    : Array.from({ length: m.bubbles }).map((_, i) => (
                        <span key={i} className={s.modeBubble} style={{ background: m.color }} />
                      ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={s.copy}>
        <div className={s.eyebrow}>02 · Modes</div>
        <h2 className={s.heading}>know how you need it.</h2>
        <p className={s.subhead}>Meeting a need isn&apos;t binary. Some days you&apos;re doing the bare minimum. Some days you&apos;re going deep. Modes tell you which one you&apos;re in and what that means.</p>
      </div>
    </div>
  )
}

// ── SECTION 03: PRACTICES ─────────────────────────────────────────────────────
const PRACTICE_GROUPS = [
  {
    name: 'Reflection', color: '#1B3A2D', count: '4/10',
    rows: [
      { name: 'Journal',          when: 'today' },
      { name: 'Work on Maslow',   when: '1d ago' },
      { name: 'Read self-help',   when: '3d ago' },
      { name: 'Morning minutes',  when: 'today' },
    ],
  },
  {
    name: 'Movement', color: '#E8B81F', count: '5/10',
    rows: [
      { name: 'Bike', when: '6d ago' },
      { name: 'Run',  when: '1d ago' },
      { name: 'Lift', when: '3d ago' },
    ],
  },
]

export function PracticesSection() {
  return (
    <div className={s.halfRow}>
      <div className={s.visual}>
        <div className={s.card}>
          <div className={s.practicesCard}>
            {PRACTICE_GROUPS.map(g => (
              <div key={g.name} className={s.practiceGroup}>
                <div className={s.practiceGroupHeader}>
                  <div className={s.practiceGroupLeft}>
                    <span className={s.practiceGroupPip} style={{ background: g.color }} />
                    <span className={s.practiceGroupName}>{g.name}</span>
                  </div>
                  <span className={s.practiceGroupCount}>{g.count}</span>
                </div>
                {g.rows.map(r => (
                  <div key={r.name} className={s.practiceRow}>
                    <span className={s.practiceName}>{r.name}</span>
                    <span className={s.practiceWhen}>{r.when}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={s.copy}>
        <div className={s.eyebrow}>03 · Practices</div>
        <h2 className={s.heading}>small things, done today.</h2>
        <p className={s.subhead}>Practices are the daily actions that meet a need. Cook a meal. Go for a walk. Text a friend back. Tap them off when you do them, or don&apos;t. The point isn&apos;t the checklist.</p>
      </div>
    </div>
  )
}

// ── SECTION 04: CANVAS ────────────────────────────────────────────────────────
const CANVAS_STATES = [
  { exploration:['reflection'], appreciation:['nutrition','community'], nourishment:['movement','rest','beauty'], survival:['intimacy','money','dwelling','thrill'], unassigned:['play','information','touch'] },
  { exploration:[], appreciation:['nutrition','reflection'], nourishment:['movement','rest','beauty'], survival:['intimacy','money','dwelling','thrill'], unassigned:['play','information','touch','community'] },
  { exploration:['play'], appreciation:['nutrition','reflection'], nourishment:['movement','rest','beauty'], survival:['intimacy','money','dwelling','thrill'], unassigned:['information','touch','community'] },
  { exploration:['play'], appreciation:['nutrition','reflection'], nourishment:['movement','rest','beauty','information'], survival:['intimacy','money','dwelling','thrill'], unassigned:['touch','community'] },
  { exploration:['play'], appreciation:['touch','reflection'], nourishment:['movement','rest','beauty','information'], survival:['intimacy','money','dwelling','thrill'], unassigned:['nutrition','community'] },
]
const MODE_CAPS = { exploration:1, appreciation:2, nourishment:4, survival:4 }
// All 13 needs always present in some group — safe to snapshot all at once
const ALL_CANVAS_NEEDS = ['reflection','nutrition','community','movement','rest','beauty','intimacy','money','dwelling','thrill','play','information','touch']

export function CanvasSection() {
  const ref = useRef(null)
  const visible = useVisible(ref, 0.2)
  const reduced = useReducedMotion()
  const [idx, setIdx] = useState(0)

  // FLIP state
  const chipRefs = useRef({})   // need name → current DOM element
  const prevRects = useRef({})  // need name → DOMRect captured before state change

  // Auto-advance: snapshot positions, then update index
  useEffect(() => {
    if (!visible || reduced) return
    const t = setInterval(() => {
      // F(irst): record every chip's current screen rect
      prevRects.current = {}
      for (const name of ALL_CANVAS_NEEDS) {
        const el = chipRefs.current[name]
        if (el) prevRects.current[name] = el.getBoundingClientRect()
      }
      setIdx(p => (p + 1) % CANVAS_STATES.length)
    }, 2600)
    return () => clearInterval(t)
  }, [visible, reduced])

  // FLIP play: runs after React commits the new DOM (chips are in new positions)
  useLayoutEffect(() => {
    if (reduced || Object.keys(prevRects.current).length === 0) return
    for (const [name, prev] of Object.entries(prevRects.current)) {
      const el = chipRefs.current[name]
      if (!el) continue
      // L(ast): read new position
      const next = el.getBoundingClientRect()
      const dx = prev.left - next.left
      const dy = prev.top  - next.top
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) continue
      // I(nvert): teleport chip back to old visual position
      el.style.transition = 'none'
      el.style.transform  = `translate(${dx}px,${dy}px)`
      el.style.opacity    = '0.55'
      // Force layout flush so the browser registers the invert
      void el.offsetHeight
      // P(lay): animate to natural (new) position
      el.style.transition = 'transform 400ms cubic-bezier(0.4,0,0.2,1), opacity 350ms ease'
      el.style.transform  = ''
      el.style.opacity    = ''
    }
    prevRects.current = {}
  }, [idx, reduced])

  const cs = CANVAS_STATES[idx]

  // Stable callback-ref factory (uses object assignment, not closure per render)
  function setChipRef(name) {
    return el => { chipRefs.current[name] = el }
  }

  return (
    <div className={s.fullRow} ref={ref}>
      <div className={s.fullCenter}>
        <div className={s.eyebrow}>04 · Canvas</div>
        <h2 className={s.heading}>your life takes up space. see it.</h2>
        <p className={s.subhead} style={{ margin: '0 auto 40px', maxWidth: 500 }}>Your Canvas is a picture of the space you protect for what matters. It&apos;s where you set what you&apos;re meeting, in what mode, and how often. Everything else in the app follows from it.</p>
      </div>
      <div className={s.card} style={{ maxWidth: 1100, margin: '0 auto', aspectRatio: '2/1' }}>
        <div className={s.canvasCard}>
          <div className={s.canvasGroups}>
            {(['exploration','appreciation','nourishment','survival']).map(mode => {
              const col = C[mode]
              const needs = cs[mode]
              return (
                <div key={mode}>
                  <div className={s.canvasGroupLabel} style={{ color: col }}>
                    <span>{mode.toUpperCase()}</span>
                    <span className={s.canvasGroupCount}>{needs.length} of {MODE_CAPS[mode]}</span>
                  </div>
                  <div className={s.canvasGroupBody} style={{ borderLeftColor: col, background: col + '0d', borderColor: col + '33' }}>
                    {needs.map(n => (
                      <span
                        key={n}
                        ref={setChipRef(n)}
                        className={s.canvasChip}
                        style={{ background: col + '1a', borderColor: col + '55', color: col }}
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <div className={s.canvasUnassigned}>
            <div className={s.canvasGroupLabel} style={{ color: 'rgba(26,26,26,0.45)' }}>
              <span>UNASSIGNED</span>
            </div>
            <div className={s.unassignedBody}>
              {cs.unassigned.map(n => (
                <span key={n} ref={setChipRef(n)} className={s.unassignedChip}>{n}</span>
              ))}
            </div>
            <div className={s.unassignedFooter}>tap one to place it.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── SECTION 05: MOODS ─────────────────────────────────────────────────────────
const MOOD_COLORS = {
  good: { bg: '#1B3A2D', text: '#F7F5F0' },
  fine: { bg: '#B8C3B1', text: '#1A1A1A' },
  bad:  { bg: '#D93B1C', text: '#F7F5F0' },
}
const EVE_POOL = ['good','fine','bad']

export function MoodsSection() {
  const ref = useRef(null)
  const visible = useVisible(ref)
  const reduced = useReducedMotion()
  const [sel, setSel] = useState({ morning: null, midday: null, evening: null })
  const [noteText, setNoteText] = useState({ morning: '', midday: '' })
  const [noteVis, setNoteVis] = useState({ morning: false, midday: false })

  useEffect(() => {
    if (reduced) {
      setSel({ morning: 'good', midday: 'good', evening: 'fine' })
      setNoteText({ morning: 'Docs launch — so far so good.', midday: 'Shared docs strategy.' })
      setNoteVis({ morning: true, midday: true })
      return
    }
    if (!visible) return
    let cancelled = false

    async function cycle() {
      if (cancelled) return
      setSel({ morning: null, midday: null, evening: null })
      setNoteText({ morning: '', midday: '' })
      setNoteVis({ morning: false, midday: false })

      await new Promise(r => setTimeout(r, 500))
      if (cancelled) return
      setSel(p => ({ ...p, morning: 'good' }))
      await new Promise(r => setTimeout(r, 180))
      if (cancelled) return
      setNoteText(p => ({ ...p, morning: 'Docs launch — so far so good.' }))
      setNoteVis(p => ({ ...p, morning: true }))

      await new Promise(r => setTimeout(r, 900))
      if (cancelled) return
      setSel(p => ({ ...p, midday: 'good' }))
      await new Promise(r => setTimeout(r, 180))
      if (cancelled) return
      setNoteText(p => ({ ...p, midday: 'Shared docs strategy.' }))
      setNoteVis(p => ({ ...p, midday: true }))

      await new Promise(r => setTimeout(r, 900))
      if (cancelled) return
      setSel(p => ({ ...p, evening: EVE_POOL[Math.floor(Math.random() * 3)] }))

      await new Promise(r => setTimeout(r, 4100))
      if (!cancelled) cycle()
    }

    cycle()
    return () => { cancelled = true }
  }, [visible, reduced])

  return (
    <div className={s.halfRow} ref={ref}>
      <div className={s.visual}>
        <div className={s.card}>
          <div className={s.moodsCard}>
            <div className={s.moodLabel}>Mood</div>
            {(['morning','midday','evening']).map(time => {
              const chosen = sel[time]
              const showNote = time !== 'evening' && noteVis[time]
              return (
                <div key={time} className={s.moodRowWrap}>
                  <div className={s.moodRowMain}>
                    <span className={s.moodTime}>{time}</span>
                    <div className={s.moodChips}>
                      {(['good','fine','bad']).map(mood => {
                        const active = chosen === mood
                        const mc = MOOD_COLORS[mood]
                        return (
                          <span
                            key={mood}
                            className={s.moodChip}
                            style={active ? { background: mc.bg, color: mc.text, borderColor: mc.bg } : {}}
                          >
                            {mood}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  {time !== 'evening' && (
                    <div className={`${s.moodNote} ${showNote ? s.moodNoteVisible : ''}`}>
                      {noteText[time]}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={s.copy}>
        <div className={s.eyebrow}>05 · Moods</div>
        <h2 className={s.heading}>morning, midday, evening.</h2>
        <p className={s.subhead}>Three check-ins a day. Good, fine, bad. Two seconds each. Over weeks, they show you what actually moves the needle.</p>
      </div>
    </div>
  )
}

// ── SECTION 06: DATA ──────────────────────────────────────────────────────────
const DATA_TABS = ['OVERVIEW','PRACTICES','MOOD','DEBRIEFS']

function DataOverview() {
  return (
    <>
      <div className={s.dataStatRow}>
        <div className={s.dataStat}>
          <div className={s.dataStatLabel}>Streak</div>
          <div className={s.dataStatValue}>11 days</div>
        </div>
        <div className={s.dataStat}>
          <div className={s.dataStatLabel}>Mood</div>
          <div className={s.dataStatValue}>good</div>
        </div>
      </div>
      <div className={s.dataCanvasCard}>
        <div className={s.dataCanvasLabel}>Live Canvas — 7D Pace</div>
        <div className={s.dataOverallRow}>
          <span className={s.dataOverallKey}>OVERALL</span>
          <span className={s.dataOverallVal}>71%</span>
        </div>
        <div className={s.dataProgressTrack}>
          <div className={s.dataProgressFill} style={{ width: '71%' }} />
          <div className={s.dataProgressTick} style={{ left: '43%' }} />
        </div>
        <div className={s.dataProgressNote}>canvas target 43%</div>
        <div className={s.dataDivider} />
        {[
          { need: 'movement',   color: '#1B3A2D', pct: 100 },
          { need: 'nutrition',  color: '#E8B81F', pct: 100 },
          { need: 'rest',       color: '#E8B81F', pct: 100 },
          { need: 'reflection', color: '#1B3A2D', pct: 71  },
        ].map(r => (
          <div key={r.need} className={s.dataNeedRow}>
            <span className={s.dataNeedPip} style={{ background: r.color }} />
            <span className={s.dataNeedName}>{r.need}</span>
            <div className={s.dataNeedBar}>
              <div className={s.dataNeedFill} style={{ width: r.pct + '%', background: r.color }} />
            </div>
            <span className={s.dataNeedPct}>{r.pct}%</span>
          </div>
        ))}
      </div>
    </>
  )
}

function DataPractices() {
  return (
    <>
      <div className={s.dataAlertRow}>
        <div className={s.dataAlertCard} style={{ borderLeftColor: '#D93B1C', background: 'rgba(217,59,28,0.04)' }}>
          <div className={s.dataAlertLabel}>Needs Attention</div>
          {['play — 18d ago','touch — 12d ago','dwelling — 9d ago'].map(i => (
            <div key={i} className={s.dataAlertItem}>{i}</div>
          ))}
        </div>
        <div className={s.dataAlertCard} style={{ borderLeftColor: '#1B3A2D', background: 'rgba(27,58,45,0.04)' }}>
          <div className={s.dataAlertLabel}>Going Well</div>
          {['movement — today','reflection — today','nutrition — yesterday'].map(i => (
            <div key={i} className={s.dataAlertItem}>{i}</div>
          ))}
        </div>
      </div>
      <div className={s.dataCanvasCard}>
        <div className={s.dataCanvasLabel}>By Need</div>
        {[
          { need: 'movement',   color: '#1B3A2D', pct: 100 },
          { need: 'reflection', color: '#1B3A2D', pct: 86  },
          { need: 'nutrition',  color: '#E8B81F', pct: 71  },
          { need: 'rest',       color: '#E8B81F', pct: 57  },
          { need: 'community',  color: '#B8C3B1', pct: 43  },
        ].map(r => (
          <div key={r.need} className={s.dataNeedRow}>
            <span className={s.dataNeedPip} style={{ background: r.color }} />
            <span className={s.dataNeedName}>{r.need}</span>
            <div className={s.dataNeedBar}>
              <div className={s.dataNeedFill} style={{ width: r.pct + '%', background: r.color }} />
            </div>
            <span className={s.dataNeedPct}>{r.pct}%</span>
          </div>
        ))}
      </div>
    </>
  )
}

function DataMood() {
  return (
    <>
      <div className={s.dataCanvasCard}>
        <div className={s.dataCanvasLabel}>By Time of Day</div>
        {[
          { time: 'morning', good: 71, fine: 21, bad: 8  },
          { time: 'midday',  good: 57, fine: 29, bad: 14 },
          { time: 'evening', good: 64, fine: 25, bad: 11 },
        ].map(r => (
          <div key={r.time} className={s.dataMoodRow}>
            <span className={s.dataMoodTime}>{r.time}</span>
            <div className={s.dataMoodBarWrap}>
              <div className={s.dataMoodSeg} style={{ width: r.good + '%', background: '#1B3A2D' }} />
              <div className={s.dataMoodSeg} style={{ width: r.fine + '%', background: '#B8C3B1' }} />
              <div className={s.dataMoodSeg} style={{ width: r.bad  + '%', background: '#D93B1C' }} />
            </div>
            <span className={s.dataMoodPct}>{r.good}% good</span>
          </div>
        ))}
      </div>
      <p className={s.dataInsight}>your days tend to get better as they go.</p>
      <div className={s.dataCorrelCard}>
        <div className={s.dataCorrelLabel}>Needs → Mood</div>
        <div className={s.dataCorrelText}>on days you complete movement, your next morning runs good 2.7× more often.</div>
      </div>
    </>
  )
}

function DataDebriefs() {
  // Circumference of r=20 circle ≈ 125.66
  // 2/3 segment: 83.8, 1/3 segment: 41.9
  return (
    <>
      <div className={s.dataDebriefCard}>
        <div className={s.dataCanvasLabel}>Anxiety Episodes</div>
        <div className={s.dataDebriefMuted}>patterns appear after a few anxiety debriefs</div>
      </div>
      <div className={s.dataDebriefCard}>
        <div className={s.dataCanvasLabel}>Peak Moments</div>
        <div className={s.dataDonutWrap}>
          <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
            <circle cx="28" cy="28" r="20" fill="none" stroke="#efece0" strokeWidth="10" />
            <circle cx="28" cy="28" r="20" fill="none" stroke="#1B3A2D" strokeWidth="10"
              strokeDasharray="83.8 125.7" strokeDashoffset="0" />
            <circle cx="28" cy="28" r="20" fill="none" stroke="#B8C3B1" strokeWidth="10"
              strokeDasharray="41.9 125.7" strokeDashoffset="-83.8" />
          </svg>
          <div className={s.dataDonutByType}>
            <div className={s.dataDonutTypeLabel}>By Type</div>
            <div className={s.dataDonutTypeVal}>creative · 2</div>
            <div className={s.dataDonutTypeVal}>curious · 1</div>
          </div>
        </div>
      </div>
    </>
  )
}

export function DataSection() {
  const ref = useRef(null)
  const visible = useVisible(ref, 0.2)
  const reduced = useReducedMotion()
  const [tabIdx, setTabIdx] = useState(0)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    if (!visible || reduced) return
    const t = setInterval(() => {
      setOpacity(0)
      setTimeout(() => {
        setTabIdx(p => (p + 1) % DATA_TABS.length)
        setOpacity(1)
      }, 280)
    }, 4200)
    return () => clearInterval(t)
  }, [visible, reduced])

  const VIEWS = [DataOverview, DataPractices, DataMood, DataDebriefs]
  const View = VIEWS[tabIdx]

  return (
    <div className={s.fullRow} ref={ref}>
      <div className={s.fullCenter}>
        <div className={s.eyebrow}>06 · Data</div>
        <h2 className={s.heading}>patterns from your own days.</h2>
        <p className={s.subhead} style={{ margin: '0 auto 40px', maxWidth: 520 }}>MyMaslow doesn&apos;t tell you what everyone should do. It tells you what you did and what came after. Computed from your own check-ins.</p>
      </div>
      <div className={s.card} style={{ maxWidth: 1100, margin: '0 auto', aspectRatio: '2/1', overflow: 'hidden' }}>
        <div className={s.dataCardInner}>
          <div className={s.dataHeader}>
            <span className={s.dataTitle}>data</span>
            <div className={s.dataPillRow}>
              <span className={`${s.dataPill} ${s.dataPillActive}`}>7d</span>
              <span className={s.dataPill}>30d</span>
            </div>
          </div>
          <div className={s.dataTabs}>
            {DATA_TABS.map((tab, i) => (
              <span key={tab} className={`${s.dataTab} ${i === tabIdx ? s.dataTabActive : ''}`}>{tab}</span>
            ))}
          </div>
          <div style={{ opacity, transition: 'opacity 280ms ease', minHeight: 220 }}>
            <View />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── SECTION 07: JOURNAL ───────────────────────────────────────────────────────
export function JournalSection() {
  return (
    <div className={s.halfRow}>
      <div className={s.visual}>
        <div className={s.journalCard}>
          <div className={s.journalHeader}>
            <span className={s.cardMono}>journal</span>
            <span className={s.cardMonoMuted}>wednesday, july 8</span>
          </div>
          <div className={s.journalEntry}>
            <p className={s.journalPara}>[7:53am] you&apos;ve been active all morning with Docs launch stuff in a good way. Feeling like part of the team.</p>
            <p className={s.journalPara}>[1:27pm] feeling strong. Completed and shared docs strategy and feel myself getting back into a position of confidence at work.</p>
          </div>
          <div className={s.journalFooter}>
            <span className={s.journalLink}>› anxiety debrief</span>
            <span className={s.journalLink}>› peak debrief</span>
          </div>
        </div>
      </div>
      <div className={s.copy}>
        <div className={s.eyebrow}>07 · Journal</div>
        <h2 className={s.heading}>somewhere to think.</h2>
        <p className={s.subhead}>Not a mood log. Not a template. Just a page. The app dates it and saves it and leaves you alone.</p>
      </div>
    </div>
  )
}

// ── SECTION 08: DEBRIEFS ──────────────────────────────────────────────────────
export function DebriefSection() {
  return (
    <div className={s.halfRow}>
      <div className={s.visual}>
        <div className={s.card}>
          <div className={s.debriefCard}>
            <div className={s.debriefTitle}>your debriefs.</div>
            <div className={s.debriefFilters}>
              <span className={`${s.debriefChip} ${s.debriefChipActive}`}>all</span>
              <span className={s.debriefChip} style={{ color: '#D93B1C', borderColor: '#D93B1C' }}>anxiety</span>
              <span className={s.debriefChip} style={{ color: '#1B3A2D', borderColor: '#1B3A2D' }}>peak</span>
            </div>
            <div className={s.debriefList}>
              <div className={s.debriefEntry}>
                <div className={s.debriefEntryTop}>
                  <span className={s.debriefDate}>jul 5</span>
                  <span className={s.debriefTag} style={{ background: '#1B3A2D', color: '#F7F5F0', borderColor: '#1B3A2D' }}>creative</span>
                  <span className={s.debriefTag} style={{ color: 'var(--ink3)', borderColor: 'var(--border)' }}>personal</span>
                </div>
                <p className={s.debriefSummary}>You write the about page for Maslow at 507 coffee with the hour to yourself.</p>
              </div>
              <div className={s.debriefEntry}>
                <div className={s.debriefEntryTop}>
                  <span className={s.debriefDate}>jun 30</span>
                  <span className={s.debriefTag} style={{ background: '#7a8ba3', color: '#fff', borderColor: '#7a8ba3' }}>overwhelm</span>
                  <span className={s.debriefTag} style={{ background: '#1A1A1A', color: '#F7F5F0', borderColor: '#1A1A1A' }}>work</span>
                </div>
                <p className={s.debriefSummary}>Moon keeps bringing up &apos;quality bar&apos; in your 1:1s. Just a bruise to your ego.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.copy}>
        <div className={s.eyebrow}>08 · Debriefs</div>
        <h2 className={s.heading}>seven minutes when it spikes.</h2>
        <p className={s.subhead}>For anxiety episodes and peak moments alike — same tool, different reasons. A short set of prompts to help you name what happened while it&apos;s still fresh.</p>
      </div>
    </div>
  )
}

// ── SECTION 09: NOTES TO SELF ─────────────────────────────────────────────────
const NOTES_LIST = [
  "You’re only using a small portion of your abilities making everything feel like a challenge rather than an opportunity.",
  "the walk always helps. take the walk.",
  "you don’t need to reply tonight.",
  "buy the flowers.",
]

export function NotesSection() {
  const ref = useRef(null)
  const visible = useVisible(ref)
  const reduced = useReducedMotion()
  const [noteIdx, setNoteIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (!visible || reduced) return
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setNoteIdx(p => (p + 1) % NOTES_LIST.length)
        setFading(false)
      }, 300)
    }, 3200)
    return () => clearInterval(t)
  }, [visible, reduced])

  return (
    <div className={s.halfRow} ref={ref}>
      <div className={s.visual}>
        <div className={s.card}>
          <div className={s.notesOuter}>
            <div className={s.notesInner}>
              <div className={s.notesEyebrow}>Note to Self</div>
              <div className={s.notesQuoteWrap}>
                <p className={`${s.notesQuote} ${fading ? s.notesQuoteFading : ''}`}>
                  &ldquo;{NOTES_LIST[noteIdx]}&rdquo;
                </p>
              </div>
              <div className={s.notesFooter}>
                <div className={s.notesDots}>
                  {NOTES_LIST.map((_, i) => (
                    <span key={i} className={`${s.notesDot} ${i === noteIdx ? s.notesDotActive : ''}`} />
                  ))}
                </div>
                <span className={s.notesManage}>manage ✎</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.copy}>
        <div className={s.eyebrow}>09 · Notes to Self</div>
        <h2 className={s.heading}>the things worth remembering.</h2>
        <p className={s.subhead}>Cards you write to your future self. They resurface later — sometimes when you ask for them, sometimes when the app thinks you could use one.</p>
      </div>
    </div>
  )
}

// ── SECTION 10: REVIEW ────────────────────────────────────────────────────────
const STEPS = [
  { label: 'Last Week',    question: 'what worked?',               response: 'Docs launch. Long morning walks. Called mom on tuesday.' },
  { label: 'How It Felt',  question: 'how did it feel?',           response: 'Steady. A little tired by friday, but not depleted.' },
  { label: 'Canvas Check', question: 'does your canvas still fit?',response: 'Yes — moving thrill from survival to nourishment.' },
  { label: 'Insight',      question: "what’s clear now?",     response: 'Community shows up in small moments, not big ones.' },
  { label: 'Note',         question: 'note to next you?',          response: 'The walk always helps. Take the walk.' },
]

export function ReviewSection() {
  const ref = useRef(null)
  const visible = useVisible(ref)
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  const [fading, setFading] = useState(false)
  const [typed, setTyped] = useState(reduced ? STEPS[0].response : '')
  const cancelRef = useRef(false)

  // Typewriter: re-runs when step changes
  useEffect(() => {
    const text = STEPS[step].response
    if (reduced || !visible) { setTyped(text); return }
    cancelRef.current = false
    setTyped('')
    let i = 0
    const t = setInterval(() => {
      if (cancelRef.current) { clearInterval(t); return }
      i++
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(t)
    }, 22)
    return () => { cancelRef.current = true; clearInterval(t) }
  }, [step, visible, reduced])

  // Step advancer
  useEffect(() => {
    if (!visible || reduced) return
    const HOLD = 3600
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setStep(p => (p + 1) % STEPS.length)
        setFading(false)
      }, 300)
    }, HOLD)
    return () => clearInterval(t)
  }, [visible, reduced])

  const cur = STEPS[step]

  return (
    <div className={s.halfRow} ref={ref}>
      <div className={s.visual}>
        <div className={s.card}>
          <div className={s.reviewCard}>
            <div className={s.reviewTop}>
              <span className={s.reviewTitle}>weekly review.</span>
              <span className={s.reviewStep}>{step + 1} of {STEPS.length}</span>
            </div>
            <div className={s.reviewStepper}>
              {STEPS.map((_, i) => (
                <div key={i} className={`${s.reviewSegment} ${i <= step ? s.reviewSegmentFilled : ''}`} />
              ))}
            </div>
            <div style={{ opacity: fading ? 0 : 1, transition: 'opacity 300ms ease', minHeight: 90 }}>
              <div className={s.reviewLabel}>{cur.label}</div>
              <div className={s.reviewQuestion}>{cur.question}</div>
              <div className={s.reviewResponse}>{typed}<span style={{ opacity: 0.4 }}>|</span></div>
            </div>
            <div className={s.reviewFooter}>
              <span className={s.reviewFooterLeft}>sunday · 8:30pm</span>
              <span className={s.reviewFooterRight}>next →</span>
            </div>
          </div>
        </div>
      </div>
      <div className={s.copy}>
        <div className={s.eyebrow}>10 · Review</div>
        <h2 className={s.heading}>close the week.</h2>
        <p className={s.subhead}>Five prompts. Five minutes. What worked, what didn&apos;t, what you&apos;re carrying into next week. Then start it on purpose.</p>
      </div>
    </div>
  )
}
