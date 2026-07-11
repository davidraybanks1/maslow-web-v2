'use client'
import { useState, useEffect } from 'react'
import s from './NeedsWidget.module.css'

// 13 library needs — order determines grid index used by SELECT_SEQ
const LIBRARY = [
  { name: 'movement',    mode: 'nourishment' },  // 0
  { name: 'nutrition',   mode: 'nourishment' },  // 1
  { name: 'rest',        mode: 'survival' },     // 2
  { name: 'community',   mode: 'appreciation' }, // 3
  { name: 'beauty',      mode: 'appreciation' }, // 4
  { name: 'intimacy',    mode: 'survival' },     // 5
  { name: 'dwelling',    mode: 'survival' },     // 6
  { name: 'play',        mode: 'exploration' },  // 7
  { name: 'money',       mode: 'survival' },     // 8
  { name: 'reflection',  mode: 'exploration' },  // 9
  { name: 'information', mode: 'exploration' },  // 10
  { name: 'touch',       mode: 'nourishment' },  // 11
  { name: 'thrill',      mode: 'exploration' },  // 12
]

const MODE = {
  survival:     { solid: '#D93B1C', tint: 'rgba(217,59,28,0.07)',    border: 'rgba(217,59,28,0.32)',   text: '#993C1D' },
  nourishment:  { solid: '#E8B81F', tint: 'rgba(232,184,31,0.13)',   border: 'rgba(232,184,31,0.55)',  text: '#854F0B' },
  appreciation: { solid: '#8a9b7f', tint: 'rgba(184,195,177,0.30)',  border: 'rgba(184,195,177,0.95)', text: '#4a5e45' },
  exploration:  { solid: '#1B3A2D', tint: 'rgba(27,58,45,0.08)',     border: 'rgba(27,58,45,0.26)',    text: '#1B3A2D' },
}

const LEGEND = [
  { label: 'survival',     color: '#D93B1C' },
  { label: 'nourishment',  color: '#E8B81F' },
  { label: 'appreciation', color: '#B8C3B1' },
  { label: 'exploration',  color: '#1B3A2D' },
]

// Ticks 1–9: select these grid indices in order
// [2,0,1,5,3,4,8,11,7] → rest, movement, nutrition, intimacy, community, beauty, money, touch, play
const SELECT_SEQ  = [2, 0, 1, 5, 3, 4, 8, 11, 7]
const TYPED_WORD  = 'quiet'
const TICK_MS     = 650
const TOTAL_TICKS = 22

export default function NeedsWidget() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setTick(p => (p >= TOTAL_TICKS ? 0 : p + 1))
    }, TICK_MS)
    return () => clearInterval(t)
  }, [])

  // All display state derived from tick
  const numChosen  = Math.min(tick, 9)
  const chosen     = new Set(SELECT_SEQ.slice(0, numChosen))
  const isTyping   = tick >= 11 && tick <= 15
  const typedText  = isTyping ? TYPED_WORD.slice(0, tick - 10) : ''
  const hasCustom  = tick >= 16 && tick <= 21
  const totalCount = numChosen + (hasCustom ? 1 : 0)

  const status =
    tick >= 16 ? "made a need of your own — that one's yours" :
    tick >= 10 ? 'add one of your own with +' :
    'choosing the needs that matter…'

  return (
    <div className={s.panel}>

      {/* Header */}
      <div className={s.header}>
        <div className={s.headerLeft}>
          <span className={s.dim}>—</span>
          <span className={s.headerLabel}>your needs</span>
          <span className={s.dim}>·</span>
          <span className={s.headerCount}>{totalCount}</span>
        </div>
        <span className={s.headerHint}>tap to choose</span>
      </div>

      {/* Grid */}
      <div className={s.grid}>
        {LIBRARY.map((need, i) => {
          const isChosen = chosen.has(i)
          const m = MODE[need.mode]
          return (
            <div
              key={need.name}
              className={s.card}
              style={isChosen ? {
                background: m.tint,
                color: m.text,
                border: `1px solid ${m.border}`,
                boxShadow: `inset 3px 0 0 ${m.solid}, 0 1px 2px rgba(28,26,22,0.03)`,
                opacity: 1,
              } : {
                background: '#ffffff',
                color: '#a29a89',
                border: '1px dashed #e6e0d4',
                boxShadow: 'inset 3px 0 0 transparent, 0 1px 2px rgba(28,26,22,0.03)',
                opacity: 0.75,
              }}
            >
              <span className={s.cardName}>{need.name}</span>
              <span className={s.cardMarker} style={{ color: isChosen ? m.solid : '#d3ccbe' }}>
                {isChosen ? '✓' : '+'}
              </span>
            </div>
          )
        })}

        {/* Committed custom card */}
        {hasCustom && (
          <div
            className={s.card}
            style={{
              background: 'rgba(28,26,22,0.05)',
              color: '#1c1a16',
              border: '1px solid rgba(28,26,22,0.18)',
              boxShadow: 'inset 3px 0 0 #1c1a16, 0 1px 2px rgba(28,26,22,0.03)',
              opacity: 1,
            }}
          >
            <span className={s.cardName}>quiet</span>
            <span className={s.cardMarker} style={{ color: '#1c1a16' }}>✎</span>
          </div>
        )}

        {/* Create-your-own cell */}
        <div
          className={s.createCell}
          style={isTyping ? {
            background: 'rgba(28,26,22,0.03)',
            color: '#1c1a16',
            border: '1px solid #c3bbac',
          } : {
            background: 'transparent',
            color: '#b3ab9a',
            border: '1px dashed #ddd6c8',
          }}
        >
          {isTyping ? (
            <>{typedText}<span className={s.caret} /></>
          ) : '+ your own'}
        </div>
      </div>

      {/* Footer */}
      <div className={s.footer}>
        <span className={s.footerStatus}>{status}</span>
        <div className={s.legend}>
          {LEGEND.map(item => (
            <div key={item.label} className={s.legendItem}>
              <span className={s.swatch} style={{ background: item.color }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
