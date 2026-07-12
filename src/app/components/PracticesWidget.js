'use client'
import { useState, useEffect } from 'react'
import s from './PracticesWidget.module.css'

const GROUPS = [
  {
    need: 'reflection',
    dot: '#1B3A2D',
    text: '#1B3A2D',
    count: '4 / 10',
    practices: [
      { name: 'Journal',          base: '2d ago' },
      { name: 'Work on Maslow',   base: '1d ago' },
      { name: 'Read self-help',   base: '3d ago' },
      { name: 'Morning minutes',  base: '5d ago' },
    ],
  },
  {
    need: 'movement',
    dot: '#E8B81F',
    text: '#854F0B',
    count: '5 / 10',
    practices: [
      { name: 'Bike', base: '6d ago' },
      { name: 'Run',  base: '4d ago' },
      { name: 'Lift', base: '3d ago' },
    ],
  },
  {
    need: 'community',
    dot: '#B8C3B1',
    text: '#4a5e45',
    count: '6 / 10',
    practices: [
      { name: 'Family dinner',   base: '20d ago' },
      { name: 'Thoughtful text', base: '3d ago'  },
      { name: 'Friend',          base: '2d ago'  },
    ],
  },
]

const ALL_PRACTICES = GROUPS.flatMap(g => g.practices)
const TOTAL = ALL_PRACTICES.length
const TICK_MS = 900
const HOLD = 7

export default function PracticesWidget() {
  const [done, setDone] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = e => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  useEffect(() => {
    if (reduced) { setDone(TOTAL); return }
    const t = setInterval(() => {
      setDone(p => (p >= TOTAL + HOLD ? 0 : p + 1))
    }, TICK_MS)
    return () => clearInterval(t)
  }, [reduced])

  const doneCount = Math.min(done, TOTAL)
  const pct = Math.round((doneCount / TOTAL) * 100)

  let globalIdx = 0

  return (
    <div className={s.panel}>
      {/* Top bar */}
      <div className={s.topBar}>
        <div className={s.topLeft}>
          <span className={s.todayEyebrow}>TODAY</span>
          <span className={s.dateText}>saturday, july 11</span>
        </div>
        <div className={s.topRight}>
          <span className={s.progressLabel}>
            <span className={s.progressCount}>{doneCount} of {TOTAL}</span>
            <span className={s.progressWord}> practiced</span>
          </span>
          <div className={s.progressTrack}>
            <div className={s.progressFill} style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Need groups */}
      <div className={s.groups}>
        {GROUPS.map(g => (
          <div key={g.need} className={s.group}>
            <div className={s.groupHeader}>
              <div className={s.groupLeft}>
                <span className={s.groupDot} style={{ background: g.dot }} />
                <span className={s.groupName} style={{ color: g.text }}>{g.need}</span>
              </div>
              <span className={s.groupCount}>{g.count}</span>
            </div>
            {g.practices.map(p => {
              const idx = globalIdx++
              const isDone = idx < doneCount
              const isJust = idx === doneCount - 1
              return (
                <div
                  key={p.name}
                  className={`${s.row}${isJust ? ' ' + s.rowFlash : ''}`}
                >
                  <span
                    className={`${s.check}${isDone ? ' ' + s.checkDone : ''}${isJust ? ' ' + s.checkPop : ''}`}
                    style={isDone ? { background: g.dot } : {}}
                  >
                    {isDone && <span className={s.checkMark}>✓</span>}
                  </span>
                  <span
                    className={s.practiceName}
                    style={{ color: isDone ? '#1c1a16' : '#9a9384' }}
                  >
                    {p.name}
                  </span>
                  <span
                    className={s.timestamp}
                    style={{ color: isDone ? g.text : '#c3bbac' }}
                  >
                    {isDone ? (isJust ? 'just now' : 'today') : p.base}
                  </span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
