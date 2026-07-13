'use client'
/* ── HomeV2 — approved animated homepage (July 2026 redesign) ─────────────
   Every demo is a fixed-dimension, in-view-triggered timeline that settles
   into a confident final state and replays on re-entry. */
import { useEffect, useRef } from 'react'
import s from './HomeV2.module.css'

const sleep = ms => new Promise(r => setTimeout(r, ms))

/* Replay-on-reentry runner: plays `fn(rootEl)` when the section enters view. */
function useReplay(fn, threshold = 0.45) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let busy = false
    let played = false
    const io = new IntersectionObserver(async entries => {
      for (const e of entries) {
        if (e.isIntersecting && !busy && !played) {
          busy = true; played = true
          try { await fn(el) } catch {}
          busy = false
        }
        if (!e.isIntersecting) played = false
      }
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return ref
}

async function typeInto(el, text, cps = 30) {
  el.textContent = ''
  for (const ch of text) {
    el.textContent += ch
    await sleep(1000 / cps + Math.random() * 18)
  }
}

function countTo(el, to, fmt = v => v, dur = 900) {
  const t0 = performance.now()
  return new Promise(res => {
    (function tick(now) {
      const p = Math.min(1, (now - t0) / dur)
      el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - p, 3))))
      p < 1 ? requestAnimationFrame(tick) : res()
    })(t0)
  })
}

const q = (el, sel) => el.querySelector(sel)
const qa = (el, sel) => [...el.querySelectorAll(sel)]

/* ── shared bits ─────────────────────────────────────────────────────────── */

export function DividerPill({ text }) {
  return <div className={s.dividerRow}><span className={s.pill}>{text}</span></div>
}

function Eyebrow({ children }) {
  return <div><span className={s.pill}>{children}</span></div>
}

const MODE_VARS = {
  e: 'var(--exploration)',
  a: 'var(--appreciation)',
  n: 'var(--nourishment)',
  x: 'var(--survival)', // 's' clashes with the styles import — x = survival
}

function BarSegs({ anxGrow = 5, text = 'anxiety fills the space you give it', short }) {
  return (
    <div className={short ? `${s.spaceBar} ${s.spaceBarShort}` : s.spaceBar}>
      <div className={s.seg} data-seg="e" style={{ background: MODE_VARS.e, flexGrow: 0.3 }} />
      <div className={s.seg} data-seg="a" style={{ background: MODE_VARS.a, flexGrow: 0.3 }} />
      <div className={s.seg} data-seg="n" style={{ background: MODE_VARS.n, flexGrow: 0.3 }} />
      <div className={s.seg} data-seg="s" style={{ background: MODE_VARS.x, flexGrow: 0.3 }} />
      <div className={`${s.seg} ${s.segX}`} data-seg="x" style={{ flexGrow: anxGrow }}>
        <span data-anx>{text}</span>
      </div>
    </div>
  )
}

function applyBar(el, grows, x) {
  qa(el, '[data-seg]').forEach(seg => {
    const k = seg.dataset.seg
    if (k === 'x') seg.style.flexGrow = x
    else seg.style.flexGrow = grows[{ e: 0, a: 1, n: 2, s: 3 }[k]]
  })
}

/* ── hero bar — the opening statement ────────────────────────────────────── */

export function HeroBar() {
  const ref = useReplay(async el => {
    applyBar(el, [0.3, 0.3, 0.3, 0.3], 5)
    await sleep(600)
    const steps = [
      { g: [0.8, 0.9, 1.1, 1.2], x: 3.4 },
      { g: [0.8, 1.2, 1.5, 1.7], x: 2.2 },
      { g: [1.1, 1.5, 1.7, 2.0], x: 1.4 },
    ]
    for (const st of steps) {
      applyBar(el, st.g, st.x)
      await sleep(1400)
    }
  })
  return (
    <div className={s.solo} ref={ref} style={{ marginBottom: 90 }}>
      <BarSegs />
    </div>
  )
}

/* ── canvas — heading only, tight under the divider ─────────────────────── */

export function CanvasSectionV2() {
  return (
    <div className={s.wrap}>
      <section className={s.featureCenter}>
        <div className={s.head} style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto' }}>
          <h2 className={s.h2}>know your space. and own it.</h2>
          <p className={s.copy} style={{ margin: '0 auto', maxWidth: '66ch' }}>
            MyMaslow helps you visualize the space we&apos;re all given. By giving structure to
            your needs, daily practices, and data, you can see how much space you own and how
            much you&apos;re giving to anxiety.
          </p>
        </div>
      </section>
    </div>
  )
}

/* ── needs — choose, test, customize; the canvas responds ────────────────── */

const NEED_CHIPS = [
  ['movement', 'n'], ['nutrition', 'n'], ['rest', 's'], ['community', 'a'],
  ['beauty', 'a'], ['intimacy', 's'], ['dwelling', 's'], ['play', 'e'],
  ['money', 'a'], ['reflection', 'e'], ['information', null], ['touch', 'n'], ['thrill', 's'],
]
const NEED_CLASS = { e: s.needE, a: s.needA, n: s.needN, s: s.needS }

export function NeedsSectionV2() {
  const ref = useReplay(async el => {
    const chips = qa(el, '[data-need]')
    const cnt = q(el, '[data-count]')
    const pct = q(el, '[data-pct]')
    const msg = q(el, '[data-msg]')
    const custom = q(el, '[data-custom]')
    const mark = q(el, '[data-mark]')
    const caret = q(el, '[data-caret]')
    const typeEl = q(el, '[data-type]')
    const segOf = {}
    qa(el, '[data-mseg]').forEach(seg => { segOf[seg.dataset.mseg] = seg })
    const grows = { e: 0.12, a: 0.12, n: 0.12, s: 0.12 }
    let x = 5, k = 0

    chips.forEach(c => {
      c.classList.remove(s.needOn, NEED_CLASS[c.dataset.mode])
      q(c, '.m_').textContent = '+'
    })
    custom.classList.remove(s.needLocked)
    mark.style.opacity = '0'; caret.style.display = ''
    typeEl.textContent = ''
    cnt.textContent = '0'; pct.textContent = '0%'
    msg.textContent = '+ add your own'
    Object.entries(grows).forEach(([m, g]) => { segOf[m].style.flexGrow = g })
    segOf.x.style.flexGrow = x

    function claim(mode, dir = 1) {
      grows[mode] = Math.max(0.12, grows[mode] + 0.34 * dir)
      x = Math.min(5, Math.max(0.8, x - 0.42 * dir))
      segOf[mode].style.flexGrow = grows[mode]
      segOf.x.style.flexGrow = x
      k += dir
      cnt.textContent = k
      pct.textContent = Math.round(k / 13 * 100) + '%'
    }
    function toggle(chip, on) {
      chip.classList.toggle(s.needOn, on)
      chip.classList.toggle(NEED_CLASS[chip.dataset.mode], on)
      q(chip, '.m_').textContent = on ? '✓' : '+'
    }

    await sleep(500)
    for (const i of [0, 2, 3, 9, 1, 7, 8]) {
      toggle(chips[i], true); claim(chips[i].dataset.mode, 1)
      await sleep(i === 9 ? 520 : 300)
    }
    await sleep(700)
    toggle(chips[12], true); claim('s', 1)
    await sleep(1100)
    toggle(chips[12], false); claim('s', -1)
    await sleep(700)
    await typeInto(typeEl, 'quiet time', 14)
    await sleep(400)
    caret.style.display = 'none'
    custom.classList.add(s.needLocked)
    mark.style.opacity = '1'
    claim('a', 1)
    await sleep(500)
    msg.textContent = 'your needs. not a template.'
  })

  return (
    <div className={s.wrap}>
      <section className={s.feature} ref={ref}>
        <div>
          <Eyebrow>needs</Eyebrow>
          <h2 className={s.h2}>meet your needs, not anxiety&apos;s</h2>
          <p className={s.copy}>You fill your canvas by adding the needs you want to focus on. MyMaslow gives you a library of needs to choose from, test, and customize to create a lifestyle that gives you energy.</p>
        </div>
        <div className={s.card}>
          <div className={s.chead} style={{ marginBottom: 14 }}>
            <span>— your needs · <b data-count style={{ color: 'var(--ink)' }}>0</b></span>
            <span>choose to place</span>
          </div>
          <div className={s.needsGrid}>
            {NEED_CHIPS.map(([name, mode]) => (
              <span key={name} className={s.need} data-need data-mode={mode || ''}>
                <span>{name}</span><span className="m_">+</span>
              </span>
            ))}
            <span className={`${s.need} ${s.needTyping}`} data-custom>
              <span><span data-type /><span className={s.caret} data-caret /></span>
              <span className="m_" data-mark style={{ opacity: 0 }}>✓</span>
            </span>
          </div>
          <div className={s.needsFoot}>
            <span className={s.chead} data-msg>+ add your own</span>
            <span className={s.chead}>space owned · <b data-pct style={{ color: 'var(--ink)' }}>0%</b></span>
          </div>
          <div className={s.miniBar}>
            <div className={s.seg} data-mseg="e" style={{ background: MODE_VARS.e, flexGrow: 0.12 }} />
            <div className={s.seg} data-mseg="a" style={{ background: MODE_VARS.a, flexGrow: 0.12 }} />
            <div className={s.seg} data-mseg="n" style={{ background: MODE_VARS.n, flexGrow: 0.12 }} />
            <div className={s.seg} data-mseg="s" style={{ background: MODE_VARS.x, flexGrow: 0.12 }} />
            <div className={s.seg} data-mseg="x" style={{ background: 'var(--ink)', flexGrow: 5 }} />
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── modes — community climbs from survival to exploration ───────────────── */

const MODE_CARDS = [
  { key: 'e', name: 'exploration', color: 'var(--exploration)', text: '#1B3A2D', tint: 'rgba(27,58,45,0.07)', desc: "you're not just experiencing, you're creating.", pips: 3 },
  { key: 'a', name: 'appreciation', color: 'var(--appreciation)', text: '#4a5e45', tint: 'rgba(184,195,177,0.22)', desc: 'you create space to enjoy meeting a need.', pips: 2 },
  { key: 'n', name: 'nourishment', color: 'var(--nourishment)', text: '#854F0B', tint: 'rgba(232,184,31,0.12)', desc: 'you meet a need in a way that gives you energy.', pips: 1 },
  { key: 's', name: 'survival', color: 'var(--survival)', text: '#993C1D', tint: 'rgba(217,59,28,0.08)', desc: "you're doing the bare minimum.", pips: 1 },
]
const PILL_TINT = {
  e: { bg: 'rgba(27,58,45,0.09)', border: 'rgba(27,58,45,0.4)' },
  a: { bg: 'rgba(184,195,177,0.3)', border: 'rgba(184,195,177,0.95)' },
  n: { bg: 'rgba(232,184,31,0.14)', border: 'rgba(232,184,31,0.5)' },
  s: { bg: 'rgba(217,59,28,0.09)', border: 'rgba(217,59,28,0.4)' },
}

export function ModesSectionV2() {
  const ref = useReplay(async el => {
    const pill = q(el, '[data-movepill]')
    const hint = q(el, '[data-hint]')
    const order = ['s', 'n', 'a', 'e']
    const slots = order.map(k => q(el, `[data-slot="${k}"]`))
    const cards = order.map(k => q(el, `[data-mcard="${k}"]`))

    cards.forEach(c => c.classList.remove(s.mcardLift))
    hint.classList.remove(s.mhintOn)
    pill.style.transition = 'none'; pill.style.transform = 'none'
    const paint = k => {
      pill.style.background = PILL_TINT[k].bg
      pill.style.borderColor = PILL_TINT[k].border
    }
    pill.style.border = '1px solid'
    paint('s')
    if (pill.parentElement !== slots[0]) slots[0].appendChild(pill)
    await sleep(1000)

    for (let i = 1; i < slots.length; i++) {
      const from = pill.getBoundingClientRect()
      slots[i].appendChild(pill)
      const to = pill.getBoundingClientRect()
      pill.style.transition = 'none'
      pill.style.transform = `translate(${from.left - to.left}px, ${from.top - to.top}px)`
      pill.getBoundingClientRect()
      pill.style.transition = 'transform .75s cubic-bezier(.4,.9,.3,1)'
      pill.style.transform = 'none'
      await sleep(400)
      paint(order[i])
      cards[i].classList.add(s.mcardLift)
      await sleep(450)
      cards[i].classList.remove(s.mcardLift)
      await sleep(250)
    }
    hint.classList.add(s.mhintOn)
  })

  return (
    <div className={s.wrap}>
      <section className={s.feature} ref={ref}>
        <div>
          <Eyebrow>modes</Eyebrow>
          <h2 className={s.h2}>live beyond survival-mode</h2>
          <p className={s.copy}>Move needs between modes to tailor your canvas to your unique experience with anxiety, goals, and season of life. Some needs will be in survival-mode, but that&apos;s not the default.</p>
        </div>
        <div className={s.card}>
          <div className={s.chead} style={{ marginBottom: 16 }}>
            <span>move a need up or down</span><span>practices / day</span>
          </div>
          {MODE_CARDS.map(m => (
            <div key={m.key} className={s.mcard} data-mcard={m.key} style={{ background: m.tint }}>
              <div className={s.mleft}>
                <div className={s.mname} style={{ color: m.text }}>
                  <span className={s.dot} style={{ background: m.color }} />
                  {m.name}
                  <span className={s.slot} data-slot={m.key}>
                    {m.key === 's' && <span className={s.movePill} data-movepill>community</span>}
                  </span>
                </div>
                <div className={s.mdesc}>{m.desc}</div>
              </div>
              <div className={s.mdots}>
                {[0, 1, 2].map(i => (
                  <span key={i} className={s.dot} style={{ background: i < m.pips ? m.color : 'var(--border2)' }} />
                ))}
              </div>
            </div>
          ))}
          <div className={s.mhint} data-hint>community moved all the way up — exploration asks the most of it.</div>
        </div>
      </section>
    </div>
  )
}

/* ── practices — three slow hero checks, then the day fills in ───────────── */

const PRACTICE_GROUPS = [
  { name: 'community', color: 'var(--exploration)', count: '6 / 10', rows: [
    { label: 'Family dinner', step: 0, when: 'today', ago: '3d ago', ring: 'var(--exploration)' },
    { label: 'Thoughtful text', step: 2, when: 'just now', ago: '1d ago', ring: 'var(--exploration)', hot: true },
    { label: 'Friend hang', step: 3, when: 'today', ago: '2d ago', ring: 'var(--exploration)' },
  ]},
  { name: 'movement', color: 'var(--nourishment)', count: '5 / 10', rows: [
    { label: 'Bike', step: 4, when: 'today', ago: '6d ago', ring: 'var(--nourishment)' },
    { label: 'Run', step: 1, when: 'today', ago: '4d ago', ring: 'var(--nourishment)' },
    { label: 'Lift', step: 5, when: 'today', ago: '3d ago', ring: 'var(--nourishment)' },
  ]},
  { name: 'dwelling', color: 'var(--survival)', count: '1 / 10', rows: [
    { label: 'Tidy', step: 6, when: 'today', ago: '3d ago', ring: 'var(--survival)' },
  ]},
]

export function PracticesSectionV2() {
  const ref = useReplay(async el => {
    const rows = qa(el, '[data-prow]')
    const bar = q(el, '[data-pbar]')
    const cnt = q(el, '[data-pcount]')
    rows.forEach(r => {
      r.classList.remove(s.prowDone, s.prowHot)
      q(r, '[data-when]').textContent = r.dataset.ago
      q(r, '[data-ring]').style.background = 'transparent'
    })
    bar.style.width = '0%'; cnt.textContent = '0 of 10'
    await sleep(600)
    const ordered = [...rows].sort((a, b) => (+a.dataset.step) - (+b.dataset.step))
    let done = 0
    for (const row of ordered) {
      row.classList.add(s.prowDone)
      if (row.dataset.hot) row.classList.add(s.prowHot)
      q(row, '[data-ring]').style.background = row.dataset.ringcolor
      q(row, '[data-when]').textContent = row.dataset.when
      done++
      bar.style.width = done * 10 + '%'
      cnt.textContent = done + ' of 10'
      await sleep(done <= 3 ? 850 : 240)
    }
  })

  return (
    <div className={s.wrap}>
      <section className={s.feature} ref={ref}>
        <div>
          <Eyebrow>practices</Eyebrow>
          <h2 className={s.h2}>do things instead of think them</h2>
          <p className={s.copy}>The needs and modes in your canvas guide the practices you do everyday. Practices force you to take up real space in your day. Space that anxiety would fill otherwise.</p>
        </div>
        <div className={s.card}>
          <div className={s.ctop}>
            <div>
              <div className={s.chead}>today</div>
              <div className={s.cdate}>saturday, july 11</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className={s.counter}><b data-pcount>0 of 10</b> <span className={s.counterLite}>practiced</span></div>
              <div className={s.pbar}><i data-pbar /></div>
            </div>
          </div>
          {PRACTICE_GROUPS.map(g => (
            <div key={g.name}>
              <div className={s.pgroup}>
                <span className={s.dot} style={{ background: g.color }} />{g.name}
                <span className={s.pgroupR}>{g.count}</span>
              </div>
              {g.rows.map(r => (
                <div key={r.label} className={s.prow} data-prow data-step={r.step} data-when={r.when} data-ago={r.ago} data-ringcolor={r.ring} {...(r.hot ? { 'data-hot': '1' } : {})}>
                  <span className={s.ring} data-ring>✓</span>{r.label}
                  <span className={s.pwhen} data-when>{r.ago}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ── moods — press a button, say a true thing ────────────────────────────── */

export function MoodsSectionV2() {
  const ref = useReplay(async el => {
    const good = q(el, '[data-good]')
    const fine = q(el, '[data-fine]')
    const n1 = q(el, '[data-note1]')
    const n2 = q(el, '[data-note2]')
    const cnt = q(el, '[data-mcount]')
    const evening = q(el, '[data-evening]')
    good.classList.remove(s.optGood); fine.classList.remove(s.optFine)
    evening.classList.remove(s.moodNudge)
    n1.innerHTML = `<span class="${s.ph}">add a note…</span>`
    n2.innerHTML = `<span class="${s.ph}">add a note…</span>`
    cnt.textContent = '0 of 3'
    await sleep(700)
    good.classList.add(s.optGood); cnt.textContent = '1 of 3'
    await sleep(450)
    n1.innerHTML = ''; await typeInto(n1, 'Woke before the alarm. Quiet house, coffee, no rush.', 34)
    await sleep(650)
    fine.classList.add(s.optFine); cnt.textContent = '2 of 3'
    await sleep(450)
    n2.innerHTML = ''; await typeInto(n2, 'Back-to-back calls. Running on adrenaline.', 34)
    await sleep(700)
    evening.classList.add(s.moodNudge)
    await sleep(1100)
    evening.classList.remove(s.moodNudge)
  })

  return (
    <div className={s.wrap}>
      <section className={s.feature} ref={ref}>
        <div>
          <Eyebrow>moods</Eyebrow>
          <h2 className={s.h2}>be honest with yourself</h2>
          <p className={s.copy}>Three times a day, press a button to document how you feel. Your moods provide a barometer to measure how well everything you are working on is working for you.</p>
        </div>
        <div className={s.card}>
          <div className={s.ctop}>
            <div>
              <div className={s.chead}>mood</div>
              <div className={s.cdate}>saturday, july 11</div>
            </div>
            <div className={s.counter}><b data-mcount>0 of 3</b> <span className={s.counterLite}>logged</span></div>
          </div>
          <div className={s.moodBlock}>
            <div className={s.moodTop}>
              <span className={s.moodK}>morning</span>
              <span className={s.opts}><span className={s.opt} data-good>good</span><span className={s.opt}>fine</span><span className={s.opt}>bad</span></span>
            </div>
            <div className={s.notebox}><span data-note1><span className={s.ph}>add a note…</span></span></div>
          </div>
          <div className={s.moodBlock}>
            <div className={s.moodTop}>
              <span className={s.moodK}>midday</span>
              <span className={s.opts}><span className={s.opt}>good</span><span className={s.opt} data-fine>fine</span><span className={s.opt}>bad</span></span>
            </div>
            <div className={s.notebox}><span data-note2><span className={s.ph}>add a note…</span></span></div>
          </div>
          <div className={s.moodBlock} data-evening>
            <div className={s.moodTop}>
              <span className={s.moodK}>evening</span>
              <span className={s.opts}><span className={s.opt}>good</span><span className={s.opt}>fine</span><span className={s.opt}>bad</span></span>
            </div>
            <div className={s.notebox}><span className={s.ph}>add a note…</span></div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── data — the guided tour: overview / practices / mood / days ──────────── */

const SPOKES = [
  [-90, 0.95, 'var(--survival)', 'Nap'],
  [-60, 0.70, 'var(--exploration)', 'Review'],
  [-30, 0.80, 'var(--exploration)', 'Read'],
  [0, 0.95, 'var(--survival)', 'Tidy'],
  [30, 0.60, 'var(--nourishment)', 'Air'],
  [60, 0.85, 'var(--nourishment)', 'Full bottle'],
  [90, 0.75, 'var(--appreciation)', 'Thoughtful'],
  [120, 0.55, 'var(--nourishment)', 'Creatine'],
  [150, 0.90, 'var(--exploration)', 'Journal'],
  [180, 0.65, 'var(--exploration)', 'Meditate'],
  [210, 0.80, 'var(--nourishment)', 'Bike'],
  [240, 0.50, 'var(--appreciation)', 'Morning'],
]
const CX = 150, CY = 130, MAXR = 100, INR = 26

function Spoke([deg, len, color, label], i) {
  const rad = deg * Math.PI / 180
  const x1 = CX + Math.cos(rad) * INR, y1 = CY + Math.sin(rad) * INR
  const x2 = CX + Math.cos(rad) * (INR + (MAXR - INR) * len)
  const y2 = CY + Math.sin(rad) * (INR + (MAXR - INR) * len)
  const tx = CX + Math.cos(rad) * (INR + (MAXR - INR) * len + 14)
  const ty = CY + Math.sin(rad) * (INR + (MAXR - INR) * len + 14)
  return (
    <g key={i}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" strokeLinecap="round" pathLength="1" data-spoke />
      <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" data-spoketext>{label}</text>
    </g>
  )
}

const PANEL_HOLD = [1800, 1500, 1600, 2200]

export function DataSectionV2() {
  const rootRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const stage = q(el, '[data-stage]')
    const panels = qa(el, '[data-dpanel]')
    const tabs = qa(el, '[data-tab]')
    let inView = false
    let running = false

    function sizeStage() {
      stage.style.height = Math.max(...panels.map(p => p.offsetHeight)) + 'px'
    }
    sizeStage()
    window.addEventListener('load', sizeStage)
    window.addEventListener('resize', sizeStage)

    const resetBars = panel => {
      qa(panel, '.trk_ i').forEach(b => { b.style.transition = 'none'; b.style.width = '0'; b.getBoundingClientRect(); b.style.transition = '' })
      qa(panel, '[data-n]').forEach(n => { n.textContent = '0' + n.dataset.suffix })
    }

    async function animOverview(panel) {
      const streak = q(panel, '[data-streak]')
      const mood = q(panel, '[data-mood]')
      const pattern = q(panel, '[data-pattern]')
      mood.style.opacity = 0; pattern.classList.remove(s.patternOn)
      resetBars(panel)
      q(panel, '[data-ovpct]').textContent = '0%'
      streak.textContent = '0'
      await sleep(300)
      countTo(streak, 11, v => v, 1000)
      await sleep(400)
      mood.style.opacity = 1
      const ovB = q(panel, '[data-ovbar]')
      ovB.style.width = ovB.dataset.w + '%'
      countTo(q(panel, '[data-ovpct]'), 71, v => v + '%', 900)
      await sleep(400)
      for (const r of qa(panel, '[data-drow]')) {
        const b = q(r, '.trk_ i')
        b.style.width = b.dataset.w + '%'
        countTo(q(r, '[data-n]'), +b.dataset.w, v => v + '%', 800)
        await sleep(160)
      }
      await sleep(500)
      pattern.classList.add(s.patternOn)
    }

    async function animPractices(panel) {
      q(panel, '[data-pattern]').classList.remove(s.patternOn)
      resetBars(panel)
      await sleep(300)
      for (const r of qa(panel, '[data-practrow]')) {
        const b = q(r, '.trk_ i')
        b.style.width = b.dataset.w + '%'
        const ct = q(r, '[data-n]')
        countTo(ct, +ct.dataset.count, v => v + '×', 800)
        await sleep(150)
      }
      await sleep(500)
      q(panel, '[data-pattern]').classList.add(s.patternOn)
    }

    async function animMood(panel) {
      q(panel, '[data-cap]').classList.remove(s.moodCapOn)
      qa(panel, '[data-dayb]').forEach(b => b.classList.remove(s.dayBOn))
      resetBars(panel)
      await sleep(300)
      for (const r of qa(panel, '[data-distrow]')) {
        const b = q(r, '.trk_ i')
        b.style.width = b.dataset.w + '%'
        const pv = q(r, '[data-n]')
        countTo(pv, +b.dataset.w, v => v + '%', 800)
        await sleep(180)
      }
      await sleep(300)
      for (const b of qa(panel, '[data-dayb]')) {
        b.classList.add(s.dayBOn)
        await sleep(110)
      }
      await sleep(300)
      q(panel, '[data-cap]').classList.add(s.moodCapOn)
    }

    async function animDays(panel) {
      const lines = qa(panel, '[data-spoke]')
      const texts = qa(panel, '[data-spoketext]')
      const center = q(panel, '[data-center]')
      lines.forEach(l => l.classList.remove(s.spokeLineOn))
      texts.forEach(t => t.classList.remove(s.spokeTextOn))
      center.classList.remove(s.spokeCenterOn)
      resetBars(panel)
      await sleep(300)
      center.classList.add(s.spokeCenterOn)
      await sleep(350)
      for (let i = 0; i < lines.length; i++) {
        lines[i].classList.add(s.spokeLineOn)
        const t = texts[i]
        setTimeout(() => t && t.classList.add(s.spokeTextOn), 250)
        await sleep(95)
      }
      await sleep(300)
      for (const r of qa(panel, '[data-bnrow]')) {
        const b = q(r, '.trk_ i')
        if (b) b.style.width = b.dataset.w + '%'
        await sleep(140)
      }
    }

    const anims = [animOverview, animPractices, animMood, animDays]

    async function tour() {
      if (running) return
      running = true
      let i = 0
      while (inView) {
        tabs.forEach((t, j) => t.classList.toggle(s.tabOn, j === i))
        panels.forEach((p, j) => p.classList.toggle(s.dpanelOn, j === i))
        try { await anims[i](panels[i]) } catch {}
        const t0 = Date.now()
        while (inView && Date.now() - t0 < PANEL_HOLD[i]) await sleep(150)
        i = (i + 1) % 4
      }
      running = false
    }

    const io = new IntersectionObserver(es => {
      for (const e of es) {
        inView = e.isIntersecting
        if (inView) tour()
      }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => {
      inView = false
      io.disconnect()
      window.removeEventListener('load', sizeStage)
      window.removeEventListener('resize', sizeStage)
    }
  }, [])

  const Track = ({ w, color, tgt, thin }) => (
    <span className={`${s.track} trk_`} style={thin ? { height: 5, margin: '4px 0 0' } : undefined}>
      <i data-w={w} style={{ background: color }} />
      {tgt != null && <span className={s.tgt} style={{ left: tgt + '%' }} />}
    </span>
  )

  return (
    <div className={s.wrap}>
      <section className={s.featureCenter} style={{ padding: '130px 0' }} ref={rootRef}>
        <div className={s.head} style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 48px' }}>
          <Eyebrow>data</Eyebrow>
          <h2 className={s.h2}>discover what makes for good days</h2>
          <p className={s.copy} style={{ margin: '0 auto', maxWidth: '66ch' }}>The information from your canvas and practices turns into data that helps pinpoint what to add, subtract, or try.</p>
        </div>
        <div className={s.card} style={{ padding: '34px 38px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 24 }}>data</span>
            <span className={s.toggle}><span className={`${s.tg} ${s.tgOn}`}>7d</span><span className={s.tg}>30d</span></span>
          </div>
          <div className={s.tabs}>
            {['overview', 'practices', 'mood', 'days'].map((t, i) => (
              <span key={t} className={i === 0 ? `${s.tab} ${s.tabOn}` : s.tab} data-tab>{t}</span>
            ))}
          </div>
          <div className={s.dstage} data-stage>
            {/* overview */}
            <div className={`${s.dpanel} ${s.dpanelOn}`} data-dpanel>
              <div className={s.stat2}>
                <div className={s.stat}><div className={s.statK}>streak</div><div className={s.statV}><span data-streak>0</span> <i>days</i></div></div>
                <div className={s.stat}><div className={s.statK}>mood</div><div className={s.statV} data-mood style={{ opacity: 0, transition: 'opacity .8s', fontStyle: 'italic' }}>good</div></div>
              </div>
              <div className={s.panel}>
                <div className={s.panelK}>live canvas — 7d pace</div>
                <div className={s.ov}><span className={s.panelK}>overall</span><span className={s.ovPct} data-ovpct>0%</span></div>
                <span className={`${s.track} trk_`}><i data-ovbar data-w="71" style={{ background: 'var(--ink2)' }} /><span className={s.tgt} style={{ left: '43%' }} /></span>
                <div className={s.tnote}>canvas target 43%</div>
                {[
                  ['movement', 'var(--exploration)', 100, 60],
                  ['nutrition', 'var(--nourishment)', 100, 60],
                  ['rest', 'var(--nourishment)', 100, 50],
                  ['reflection', 'var(--exploration)', 71, 80],
                ].map(([nm, c, w, tgt]) => (
                  <div key={nm} className={s.drow} data-drow>
                    <span className={s.drowNm}><span className={s.dot} style={{ background: c }} />{nm}</span>
                    <Track w={w} color={c} tgt={tgt} />
                    <span className={s.drowPv} data-n data-suffix="%">0%</span>
                  </div>
                ))}
                <div className={s.pattern} data-pattern>
                  <span className={s.patternK}>pattern</span>
                  on days you complete 80%+ of your practices, you log <em>good</em> 1.8× more often than on days below 50%.
                </div>
              </div>
            </div>
            {/* practices */}
            <div className={s.dpanel} data-dpanel>
              <div className={s.panel}>
                <div className={s.panelK} style={{ marginBottom: 18 }}>most practiced — last 30 days</div>
                {[
                  ['Full water bottle', 'var(--nourishment)', 93, 14],
                  ['Journal', 'var(--exploration)', 80, 12],
                  ['Bike', 'var(--nourishment)', 60, 9],
                  ['Family dinner', 'var(--appreciation)', 40, 6],
                  ['Morning pages', 'var(--exploration)', 37, 5],
                  ['Nap', 'var(--survival)', 20, 3],
                ].map(([nm, c, w, n]) => (
                  <div key={nm} className={s.practRow} data-practrow>
                    <span className={s.practNm}><span className={s.dot} style={{ background: c }} />{nm}</span>
                    <Track w={w} color={c} />
                    <span className={s.practCt} data-n data-count={n} data-suffix="×">0×</span>
                  </div>
                ))}
                <div className={s.pattern} data-pattern style={{ marginTop: 18 }}>
                  <span className={s.patternK}>pattern</span>
                  <em>bike</em> shows up on 7 of your last 9 <em>good</em> days.
                </div>
              </div>
            </div>
            {/* mood */}
            <div className={s.dpanel} data-dpanel>
              <div className={s.panel}>
                <div className={s.panelK} style={{ marginBottom: 18 }}>mood — last 7 days</div>
                {[
                  ['good', 'var(--exploration)', 62],
                  ['fine', 'var(--appreciation)', 28],
                  ['hard', 'var(--survival)', 10],
                ].map(([nm, c, w]) => (
                  <div key={nm} className={s.distRow} data-distrow>
                    <span className={s.distNm}>{nm}</span>
                    <Track w={w} color={c} />
                    <span className={s.drowPv} data-n data-suffix="%">0%</span>
                  </div>
                ))}
                <div className={s.dayStrip}>
                  {[
                    ['sun', 'var(--exploration)'], ['mon', 'var(--appreciation)'], ['tue', 'var(--exploration)'],
                    ['wed', 'var(--exploration)'], ['thu', 'var(--survival)'], ['fri', 'var(--appreciation)'],
                    ['sat', 'var(--exploration)'],
                  ].map(([d, c]) => (
                    <div key={d} className={s.dayCol}>
                      <div className={s.dayLbl}>{d}</div>
                      <div className={s.dayB} data-dayb style={{ background: c }} />
                    </div>
                  ))}
                </div>
                <div className={s.moodCap} data-cap>you mostly logged <em>good</em> — your most consistent stretch in recent weeks.</div>
              </div>
            </div>
            {/* days */}
            <div className={s.dpanel} data-dpanel>
              <div className={s.panel}>
                <div className={s.dayHead}><span className={s.dayHeadD}>wednesday, july 8</span><span className={s.dayHeadS}>60½ of 84 · 72%</span></div>
                <div className={s.spokeWrap}>
                  <svg className={s.spokeSvg} viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg">
                    <circle cx={CX} cy={CY} r={40} fill="none" stroke="var(--bg2)" strokeWidth="1" />
                    <circle cx={CX} cy={CY} r={70} fill="none" stroke="var(--bg2)" strokeWidth="1" />
                    <circle cx={CX} cy={CY} r={100} fill="none" stroke="var(--bg2)" strokeWidth="1" />
                    {SPOKES.map(Spoke)}
                    <g className={s.spokeCenter} data-center>
                      <circle cx={CX} cy={CY} r={INR} fill="var(--exploration)" />
                      <text className={s.spokeCtext} x={CX} y={CY + 1} textAnchor="middle" dominantBaseline="middle">good</text>
                    </g>
                  </svg>
                  <div className={s.byNeed}>
                    <div className={s.byNeedK}>by need — 7 day</div>
                    {[
                      ['movement', 'var(--nourishment)', 100],
                      ['rest', 'var(--survival)', 100],
                      ['community', 'var(--appreciation)', 71],
                      ['reflection', 'var(--exploration)', 52],
                    ].map(([nm, c, w]) => (
                      <div key={nm} className={s.bnRow} data-bnrow>
                        <span>{nm}<br /><Track w={w} color={c} thin /></span>
                        <span className={s.bnPct}>{w}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${s.moodCap} ${s.moodCapOn}`} style={{ marginTop: 14 }}>tap a spoke to see the practice — this is what created a <em>good</em> day.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── journal — typewriter ─────────────────────────────────────────────────── */

export function JournalSectionV2() {
  const ref = useReplay(async el => {
    const j1 = q(el, '[data-j1]')
    const j2 = q(el, '[data-j2]')
    const j2t = q(el, '[data-j2t]')
    const links = q(el, '[data-jlinks]')
    const jl1 = q(el, '[data-jl1]')
    j1.textContent = ''; j2.textContent = ''; j2t.style.opacity = 0
    links.classList.remove(s.jlinksOn); jl1.classList.remove(s.jlinkHl)
    await sleep(500)
    await typeInto(j1, 'slow start, then a long walk cleared my head. felt like myself by nine.', 44)
    await sleep(650)
    j2t.style.opacity = 1
    await typeInto(j2, 'the presentation went better than the story I had been telling myself all week. worth remembering.', 44)
    await sleep(400)
    links.classList.add(s.jlinksOn)
    await sleep(800)
    jl1.classList.add(s.jlinkHl)
    await sleep(900)
    jl1.classList.remove(s.jlinkHl)
  })

  return (
    <div className={s.wrap}>
      <section className={s.feature} ref={ref}>
        <div>
          <Eyebrow>journal</Eyebrow>
          <h2 className={s.h2}>talk about yourself to yourself.</h2>
          <p className={s.copy}>Every day you get a fresh journal entry. Jot down the day&apos;s events, wins and challenges, or fleeting thoughts. This is the color commentary for the trends in your data.</p>
        </div>
        <div className={s.jcard}>
          <div className={s.jhead}><span>journal</span><span>wednesday, july 8</span></div>
          <div className={s.jbody}>
            <div className={s.jentry}><b>[7:53am]</b> <span data-j1 /></div>
            <div className={s.jentry}><b data-j2t style={{ opacity: 0 }}>[1:27pm]</b> <span data-j2 /></div>
          </div>
          <div className={s.jlinks} data-jlinks><span data-jl1>› anxiety debrief</span><span>› peak debrief</span></div>
        </div>
      </section>
    </div>
  )
}

/* ── debriefs — the form fills itself out ────────────────────────────────── */

const DB_FIELDS = [
  { key: 1, label: '1. name it', ph: 'what happened, just the facts.', text: 'My manager flagged a mistake in the report I sent out.' },
  { key: 2, label: '2. feel it', ph: 'what did you feel and think.', text: "Tight chest. Heard it as 'you're not good at this.'" },
  { key: 3, label: '3. examine it', ph: 'what does this assume about you that might not be true.', text: "Assumes one mistake is a verdict on my ability. It isn't." },
  { key: 4, label: '4. reclaim it', ph: 'what’s something productive you can actually take from this.', text: 'Fix it in ten minutes tomorrow. Feedback is data.' },
]

export function DebriefSectionV2() {
  const ref = useReplay(async el => {
    const nature = q(el, '[data-nature]')
    const env = q(el, '[data-env]')
    const save = q(el, '[data-save]')
    nature.classList.remove(s.dbChipSel); env.classList.remove(s.dbChipSel)
    save.classList.remove(s.dbSaveDone); save.textContent = 'save'
    DB_FIELDS.forEach(f => {
      q(el, `[data-text="${f.key}"]`).textContent = ''
      q(el, `[data-fcaret="${f.key}"]`).style.display = 'none'
      q(el, `[data-fph="${f.key}"]`).style.display = ''
    })
    await sleep(700)
    nature.classList.add(s.dbChipSel)
    await sleep(500)
    env.classList.add(s.dbChipSel)
    await sleep(600)
    for (const f of DB_FIELDS) {
      q(el, `[data-fph="${f.key}"]`).style.display = 'none'
      const caret = q(el, `[data-fcaret="${f.key}"]`)
      caret.style.display = ''
      await typeInto(q(el, `[data-text="${f.key}"]`), f.text, 40)
      caret.style.display = 'none'
      await sleep(350)
    }
    await sleep(400)
    save.classList.add(s.dbSaveDone)
    save.textContent = 'saved ✓'
  }, 0.3)

  return (
    <div className={s.wrap}>
      <section className={s.feature} ref={ref}>
        <div>
          <Eyebrow>debriefs</Eyebrow>
          <h2 className={s.h2}>turn a moment of anxiety into growth</h2>
          <p className={s.copy}>Answer simple questions in debriefs to turn an anxious episode into useful information. Similarly, deconstruct peak experiences to learn how to create more of them.</p>
        </div>
        <div className={s.card} style={{ padding: '26px 30px' }}>
          <div className={s.dbTop}>~ anxiety debrief</div>
          <div className={s.dbLbl}>nature of anxiety <span className={s.ddot} /></div>
          <div className={s.dbChips}>
            <span className={s.dbChip}>frenetic</span>
            <span className={s.dbChip} data-nature>overwhelm</span>
            <span className={s.dbChip}>apathy</span>
          </div>
          <div className={s.dbLbl}>environment <span className={s.ddot} /></div>
          <div className={s.dbChips}>
            <span className={s.dbChip} data-env>work</span>
            <span className={s.dbChip}>home</span>
            <span className={s.dbChip}>social</span>
            <span className={s.dbChip}>personal</span>
          </div>
          {DB_FIELDS.map(f => (
            <div key={f.key}>
              <div className={s.dbLbl}>{f.label}</div>
              <div className={s.dbArea}>
                <span data-text={f.key} />
                <span className={s.caret} data-fcaret={f.key} style={{ display: 'none' }} />
                <span className={s.ph} data-fph={f.key}>{f.ph}</span>
              </div>
            </div>
          ))}
          <button className={s.dbSave} data-save>save</button>
        </div>
      </section>
    </div>
  )
}

/* ── notes to self — rotating deck ───────────────────────────────────────── */

const NOTES = [
  "Take up space. Don't play it safe.",
  'Everything you want is on the other side of discomfort.',
  "If it feels like you're doing too much, you're not doing enough of what matters.",
]

export function NotesSectionV2() {
  const rootRef = useRef(null)
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const quote = q(el, '[data-nquote]')
    const dots = qa(el, '[data-ndot]')
    let i = 0
    const t = setInterval(async () => {
      i = (i + 1) % NOTES.length
      quote.classList.add(s.nquoteOut)
      await sleep(450)
      quote.textContent = NOTES[i]
      dots.forEach((d, j) => d.classList.toggle(s.ndotOn, j === i))
      quote.classList.remove(s.nquoteOut)
    }, 3600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className={s.wrap}>
      <section className={s.feature} ref={rootRef}>
        <div>
          <Eyebrow>notes to self</Eyebrow>
          <h2 className={s.h2}>keep your best thoughts top of mind</h2>
          <p className={s.copy}>A phrase, quote, or memory can transport you to a better state of mind. Notes to self give you a series of custom messages and photos that keep you centered throughout the day.</p>
        </div>
        <div className={s.card} style={{ padding: 14 }}>
          <div className={s.ncard}>
            <div className={s.ncardK}>note to self</div>
            <div className={s.nquote} data-nquote>{NOTES[0]}</div>
            <div className={s.nfoot}>
              <div className={s.ndots}>
                {NOTES.map((_, j) => <span key={j} data-ndot className={j === 0 ? s.ndotOn : undefined} />)}
              </div>
              <span>manage ✎</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── weekly review — a miniature of the real 5-step ritual ───────────────── */

const WK_META = [
  { e: 'step 1 of 5 — last week', q: 'how did last week go?' },
  { e: 'step 2 of 5 — the week', q: 'overall, how was last week?' },
  { e: 'step 3 of 5 — canvas check', q: 'does your canvas still fit?' },
  { e: 'step 4 of 5 — insight', q: 'one thing the data noticed.' },
  { e: 'step 5 of 5 — note to self', q: 'what should your future self remember?' },
]

export function ReviewSectionV2() {
  const ref = useReplay(async el => {
    const segs = qa(el, '[data-wseg] i')
    const cnt = q(el, '[data-wcount]')
    const eyebrow = q(el, '[data-weyebrow]')
    const headline = q(el, '[data-wq]')
    const steps = qa(el, '[data-wstep]')
    const steady = q(el, '[data-steady]')
    const pattern = q(el, '[data-wpattern]')
    const finish = q(el, '[data-wfinish]')
    const note = q(el, '[data-wnote]')
    const ph = q(el, '[data-wph]')
    const caret = q(el, '[data-wcaret]')

    segs.forEach(sg => { sg.style.width = '0' })
    cnt.textContent = '0 of 5'
    steady.classList.remove(s.wmoodSel)
    pattern.classList.remove(s.patternOn)
    finish.classList.remove(s.dbSaveDone); finish.textContent = 'finish review →'
    note.textContent = ''; ph.style.display = ''; caret.style.display = 'none'
    qa(el, '[data-wstep] .trk_ i').forEach(b => { b.style.transition = 'none'; b.style.width = '0'; b.getBoundingClientRect(); b.style.transition = '' })
    qa(el, '[data-wdm]').forEach(m => m.classList.remove(s.wdmOn))
    await sleep(500)

    async function show(i) {
      steps.forEach((st, j) => st.classList.toggle(s.wstepOn, j === i))
      eyebrow.textContent = WK_META[i].e
      headline.textContent = WK_META[i].q
      segs[i].style.width = '100%'
      cnt.textContent = (i + 1) + ' of 5'
    }

    await show(0)
    for (const row of qa(steps[0], '[data-wday]')) {
      const b = q(row, '.trk_ i')
      b.style.width = b.dataset.w + '%'
      const m = q(row, '[data-wdm]')
      setTimeout(() => m.classList.add(s.wdmOn), 450)
      await sleep(280)
    }
    await sleep(1600)

    await show(1)
    await sleep(900)
    steady.classList.add(s.wmoodSel)
    await sleep(1500)

    await show(2)
    for (const row of qa(steps[2], '[data-wday]')) {
      q(row, '.trk_ i').style.width = q(row, '.trk_ i').dataset.w + '%'
      await sleep(240)
    }
    await sleep(1600)

    await show(3)
    await sleep(300)
    pattern.classList.add(s.patternOn)
    await sleep(2000)

    await show(4)
    await sleep(600)
    ph.style.display = 'none'; caret.style.display = ''
    await typeInto(note, 'Protect the morning walk. It sets everything else.', 30)
    caret.style.display = 'none'
    await sleep(500)
    finish.classList.add(s.dbSaveDone)
    finish.textContent = 'review complete ✓ see you sunday'
  })

  const WTrack = ({ w, color, tgt }) => (
    <span className={`${s.track} trk_`}>
      <i data-w={w} style={{ background: color }} />
      {tgt != null && <span className={s.tgt} style={{ left: tgt + '%' }} />}
    </span>
  )

  return (
    <div className={s.wrap}>
      <section className={s.feature} ref={ref}>
        <div>
          <Eyebrow>weekly review</Eyebrow>
          <h2 className={s.h2}>review, remember, revise</h2>
          <p className={s.copy}>At the end of each week, review your data, journal entries, and debriefs. Then revise or recommit so your next week is even better than the last.</p>
        </div>
        <div className={s.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 20 }}>weekly review.</span>
            <span className={s.counter}><b data-wcount>0 of 5</b></span>
          </div>
          <div className={s.wsegs}>
            {[0, 1, 2, 3, 4].map(i => <span key={i} className={s.wseg} data-wseg><i /></span>)}
          </div>
          <div className={s.wEyebrow} data-weyebrow>step 1 of 5 — last week</div>
          <div className={s.wq} data-wq>how did last week go?</div>
          <div className={s.wstage}>
            <div className={`${s.wstep} ${s.wstepOn}`} data-wstep>
              {[
                ['mon', 78, 'good', 'var(--exploration)', '#fff'],
                ['wed', 55, 'fine', 'var(--appreciation)', 'var(--ink)'],
                ['fri', 89, 'good', 'var(--exploration)', '#fff'],
              ].map(([d, w, mood, bg, fg]) => (
                <div key={d} className={s.wday} data-wday>
                  <span className={s.wdl}>{d}</span>
                  <WTrack w={w} color="var(--ink)" />
                  <span className={s.wdm} data-wdm style={{ background: bg, color: fg }}>{mood}</span>
                </div>
              ))}
            </div>
            <div className={s.wstep} data-wstep>
              <div className={s.wmoods}>
                <div className={s.wmood}><b>strong</b><span>real momentum — most days felt like progress.</span></div>
                <div className={s.wmood} data-steady><b>steady</b><span>consistent. nothing dramatic either way.</span></div>
                <div className={s.wmood}><b>mixed</b><span>some real highs, some real lows.</span></div>
                <div className={s.wmood}><b>hard</b><span>this week took more than it gave.</span></div>
              </div>
            </div>
            <div className={s.wstep} data-wstep>
              {[
                ['community', 86, 'var(--exploration)', 80],
                ['movement', 100, 'var(--nourishment)', 60],
                ['rest', 57, 'var(--survival)', 25],
              ].map(([nm, w, c, tgt]) => (
                <div key={nm} className={s.wday} data-wday>
                  <span className={`${s.wdl} ${s.wdlWide}`}>{nm}</span>
                  <WTrack w={w} color={c} tgt={tgt} />
                  <span className={s.wdp}>{w}%</span>
                </div>
              ))}
              <div className={s.wnote}>every need paced against its mode target.</div>
            </div>
            <div className={s.wstep} data-wstep>
              <div className={s.pattern} data-wpattern style={{ marginTop: 4 }}>
                <span className={s.patternK}>pattern</span>
                on days you complete 80%+ of your practices, you log <em>good</em> 1.8× more often than on days below 50%.
              </div>
            </div>
            <div className={s.wstep} data-wstep>
              <div className={s.dbArea} style={{ marginBottom: 12 }}>
                <span data-wnote />
                <span className={s.caret} data-wcaret style={{ display: 'none' }} />
                <span className={s.ph} data-wph>what does your future self need to remember this week?</span>
              </div>
              <button className={s.dbSave} data-wfinish>finish review →</button>
            </div>
          </div>
          <div className={s.wfoot}><span>sunday · 8:30pm</span><span className={s.wfootNx}>next →</span></div>
        </div>
      </section>
    </div>
  )
}

/* ── cta — the bookend: this canvas is yours to claim ────────────────────── */

export function CtaSectionV2() {
  const ref = useReplay(async el => {
    const btn = q(el, '[data-ctabtn]')
    const bar = q(el, '[data-ctabar]')
    applyBar(bar, [0.25, 0.25, 0.25, 0.25], 7)
    btn.classList.remove(s.ctaPulse)
    await sleep(500)
    applyBar(bar, [0.7, 0.85, 1.05, 1.15], 3.2)
    await sleep(1000)
    applyBar(bar, [1.1, 1.4, 1.6, 1.9], 1.2)
    await sleep(800)
    btn.classList.add(s.ctaPulse)
  }, 0.35)

  return (
    <div ref={ref}>
      <div className={s.wrap}>
        <section className={s.ctaSec}>
          <h2 className={s.ctaH}>let&apos;s get started.</h2>
          <p className={s.ctaSub}>your maslow takes two minutes to create.</p>
          <a className={s.ctaBtn} data-ctabtn href="https://app.mymaslow.com/onboarding">create your maslow</a>
        </section>
      </div>
      <div className={s.solo} data-ctabar>
        <BarSegs anxGrow={7} short />
      </div>
    </div>
  )
}
