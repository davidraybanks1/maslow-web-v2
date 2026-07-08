'use client'
import { useState, useEffect, useRef } from 'react'
import styles from './NeedsTypeSpec.module.css'

const UNIVERSAL = [
  { id: 'movement',   name: 'movement',   desc: 'Your body needs to be used — not optimized, not tracked, just moved.' },
  { id: 'nutrition',  name: 'nutrition',  desc: 'Not just food, but your relationship to eating and being nourished.' },
  { id: 'rest',       name: 'rest',       desc: 'The nervous system needs to recover — not just through sleep, but through stillness.' },
]
const PERSONAL = [
  { id: 'community',   name: 'community',   desc: 'You need people who know you, not followers who see you.' },
  { id: 'beauty',      name: 'beauty',      desc: 'You need contact with things that move you — art, nature, music, something made with care.' },
  { id: 'intimacy',    name: 'intimacy',    desc: 'To be truly known by another person — and to offer the same in return.' },
  { id: 'reflection',  name: 'reflection',  desc: 'Without time to process your own experience, life just happens to you.' },
  { id: 'play',        name: 'play',        desc: 'Unstructured, purposeless joy — things you do for no reason other than they feel good.' },
  { id: 'money',       name: 'money',       desc: 'Whether money feels like a tool or a threat determines how much of your mind it occupies.' },
  { id: 'dwelling',    name: 'dwelling',    desc: 'Your environment shapes your nervous system more than you think.' },
  { id: 'information', name: 'information', desc: "Your mind wants to be fed, not just filled. There's a difference between learning and scrolling." },
  { id: 'touch',       name: 'touch',       desc: 'Skin has needs your calendar never accounts for. Contact is not a luxury.' },
  { id: 'thrill',      name: 'thrill',      desc: 'You need moments that make your heart beat faster on purpose — chosen intensity, not ambient stress.' },
]

const DEFAULTS = new Set(['movement', 'beauty', 'reflection', 'thrill'])
const STAGGER = { movement: 0, beauty: 200, reflection: 400, thrill: 600 }

// 4 hand-drawn ellipse variants in viewBox "-14 -10 128 60"
// Each overshoots slightly past the start point for a pencil-loop feel
const PATHS = [
  'M 4,5 C 22,-4 78,-4 96,5 C 108,13 106,28 94,37 C 76,44 22,44 6,37 C -5,28 -3,13 4,5 C 8,1 18,-2 28,-4',
  'M 96,7 C 78,-4 20,-4 4,7 C -7,16 -5,30 8,38 C 26,45 76,44 93,37 C 106,28 104,14 96,7 C 92,3 84,-1 74,-3',
  'M 50,-2 C 70,-6 102,9 100,21 C 98,34 76,46 50,46 C 24,46 2,34 0,21 C -2,7 28,-4 50,-2 C 55,-5 62,-5 68,-2',
  'M 1,20 C -1,7 24,-4 50,-4 C 78,-4 102,8 100,21 C 98,34 76,46 50,46 C 24,46 0,33 1,20 C 2,14 6,8 14,5',
]
const VARIANT = Object.fromEntries([...UNIVERSAL, ...PERSONAL].map((n, i) => [n.id, i % 4]))

const DEFAULT_CAPTION = 'everyone gets the same list. yours is the one you circle.'

export default function NeedsTypeSpec() {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [hoverId, setHoverId] = useState(null)
  const [tappedIds, setTappedIds] = useState(new Set())
  const [caption, setCaption] = useState(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    if (mq.matches) {
      setTriggered(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function circleVisible(need) {
    return (DEFAULTS.has(need.id) && triggered) || tappedIds.has(need.id) || hoverId === need.id
  }

  function circleTrans(need) {
    if (!circleVisible(need)) return 'stroke-dashoffset 250ms ease'
    if (DEFAULTS.has(need.id) && !reduced) return `stroke-dashoffset 600ms ease ${STAGGER[need.id] ?? 0}ms`
    return reduced ? 'none' : 'stroke-dashoffset 350ms ease'
  }

  function onEnter(e, need) {
    if (e.pointerType !== 'mouse') return
    setHoverId(need.id)
    setCaption(need.desc)
  }
  function onLeave(e) {
    if (e.pointerType !== 'mouse') return
    setHoverId(null)
    setCaption(null)
  }
  function onTap(e, need) {
    if (e.pointerType !== 'touch') return
    if (!DEFAULTS.has(need.id)) {
      setTappedIds(prev => {
        const s = new Set(prev)
        s.has(need.id) ? s.delete(need.id) : s.add(need.id)
        return s
      })
    }
    setCaption(prev => (prev === need.desc ? null : need.desc))
  }

  function renderWords(needs) {
    return needs.map((need, i) => (
      <span key={need.id} className={styles.grp}>
        {i > 0 && <span className={styles.sep} aria-hidden="true">·</span>}
        <span
          className={styles.word}
          onPointerEnter={(e) => onEnter(e, need)}
          onPointerLeave={onLeave}
          onClick={(e) => onTap(e, need)}
        >
          {need.name}
          <svg viewBox="-14 -10 128 60" className={styles.svg} aria-hidden="true">
            <path
              d={PATHS[VARIANT[need.id]]}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              pathLength="1"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: circleVisible(need) ? 0 : 1,
                transition: circleTrans(need),
              }}
            />
          </svg>
        </span>
      </span>
    ))
  }

  return (
    <div ref={ref} className={styles.root}>
      <div className={styles.group}>
        <div className={styles.label}>— UNIVERSAL · 3</div>
        <div className={styles.line}>{renderWords(UNIVERSAL)}</div>
      </div>
      <div className={styles.group}>
        <div className={styles.label}>— PERSONAL · 11</div>
        <div className={styles.line}>
          {renderWords(PERSONAL)}
          <span className={styles.grp}>
            <span className={styles.sep} aria-hidden="true">·</span>
            <span className={styles.chip}>+ your own</span>
          </span>
        </div>
      </div>
      <p className={styles.caption}>{caption ?? DEFAULT_CAPTION}</p>
    </div>
  )
}
