'use client'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import s from './CanvasWidget.module.css'

const NEEDS_ORDER = [
  { name: 'rest',        mode: 'survival' },
  { name: 'movement',    mode: 'nourishment' },
  { name: 'reflection',  mode: 'exploration' },
  { name: 'community',   mode: 'appreciation' },
  { name: 'intimacy',    mode: 'survival' },
  { name: 'nutrition',   mode: 'nourishment' },
  { name: 'money',       mode: 'appreciation' },
  { name: 'beauty',      mode: 'nourishment' },
  { name: 'dwelling',    mode: 'survival' },
  { name: 'play',        mode: 'exploration' },
  { name: 'thrill',      mode: 'survival' },
  { name: 'information', mode: 'appreciation' },
  { name: 'touch',       mode: 'survival' },
]

const TOTAL   = 13
const START   = 3
const TICK_MS = 900
const HOLD    = 3
const MODES   = ['exploration', 'appreciation', 'nourishment', 'survival']

const TOKEN = {
  exploration:  { solid: '#1B3A2D', tint: 'rgba(27,58,45,0.08)',    text: '#1B3A2D', border: 'rgba(27,58,45,0.22)' },
  appreciation: { solid: '#B8C3B1', tint: 'rgba(184,195,177,0.25)', text: '#4a5e45', border: 'rgba(184,195,177,0.9)' },
  nourishment:  { solid: '#E8B81F', tint: 'rgba(232,184,31,0.12)',  text: '#854F0B', border: 'rgba(232,184,31,0.55)' },
  survival:     { solid: '#D93B1C', tint: 'rgba(217,59,28,0.07)',   text: '#993C1D', border: 'rgba(217,59,28,0.35)' },
}

export default function CanvasWidget() {
  const wrapperRef = useRef(null)
  const [scale, setScale]   = useState(1)
  const [placed, setPlaced] = useState(START)
  const [reduced, setReduced] = useState(false)

  // Detect reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = e => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  // Initial scale — runs before first paint to avoid flash of unscaled content
  useLayoutEffect(() => {
    const el = wrapperRef.current
    if (el) setScale(el.getBoundingClientRect().width / 1000)
  }, [])

  // Resize observer for subsequent changes
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      setScale(entries[0].contentRect.width / 1000)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Tick animation
  useEffect(() => {
    if (reduced) { setPlaced(TOTAL); return }
    const t = setInterval(() => {
      setPlaced(p => {
        const next = p + 1
        return next > TOTAL + HOLD ? START : next
      })
    }, TICK_MS)
    return () => clearInterval(t)
  }, [reduced])

  const placedCount = Math.min(placed, TOTAL)
  const placedNeeds = NEEDS_ORDER.slice(0, placedCount)
  const unassigned  = NEEDS_ORDER.slice(placedCount)

  return (
    <div className={s.wrapper} ref={wrapperRef}>
      <div className={s.widget} style={{ transform: `scale(${scale})` }}>

        {/* Space-owned bar */}
        <div className={s.barSection}>
          <div className={s.barRow}>
            <span className={s.barLeft}>space owned</span>
            <span className={s.barRight}>
              {placedCount} of {TOTAL} needs placed · {Math.round(placedCount / TOTAL * 100)}%
            </span>
          </div>
          <div className={s.bar}>
            {MODES.map(mode => (
              <div
                key={mode}
                className={s.seg}
                style={{
                  flexBasis: `${(placedNeeds.filter(n => n.mode === mode).length / TOTAL) * 100}%`,
                  background: TOKEN[mode].solid,
                }}
              />
            ))}
            <div className={s.anxietySeg}>
              <span className={s.anxietyText}>anxiety fills the space you give it</span>
            </div>
          </div>
        </div>

        {/* Main region */}
        <div className={s.main}>

          {/* Left: mode bands */}
          <div className={s.bands}>
            {MODES.map(mode => {
              const t = TOKEN[mode]
              const needs = placedNeeds.filter(n => n.mode === mode)
              return (
                <div key={mode} className={s.band}>
                  <div className={s.bandHead}>
                    <span className={s.bandName} style={{ color: t.solid }}>{mode}</span>
                    <span className={s.bandCount}>{needs.length} placed</span>
                  </div>
                  <div className={s.pills}>
                    {needs.map(n => (
                      <span
                        key={n.name}
                        className={s.pill}
                        style={{
                          background: t.tint,
                          color: t.text,
                          border: `1px solid ${t.border}`,
                        }}
                      >
                        {n.name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: unassigned rail */}
          <div className={s.rail}>
            <div className={s.railTitle}>unassigned</div>
            <div className={s.railPills}>
              {unassigned.map(n => (
                <span key={n.name} className={s.railPill}>{n.name}</span>
              ))}
            </div>
            <div
              className={s.railHint}
              style={unassigned.length === 0 ? { color: '#4a5e45' } : {}}
            >
              {unassigned.length === 0
                ? 'all placed — the space is yours.'
                : 'tap one to place it.'}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
