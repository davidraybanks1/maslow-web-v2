'use client'
import { useState, useEffect } from 'react'
import s from './ModesWidget.module.css'

const CHIPS = ['rest', 'movement', 'reflection', 'community', 'nutrition']
const INITIAL_LANES = [3, 3, 2, 3, 1]  // index into MODES array (0=exploration, 3=survival)
const HOLD_TICKS = 5
const TICK_MS = 1250

const MODES = ['exploration', 'appreciation', 'nourishment', 'survival']

const MODE_DESCS = [
  "you're not just experiencing, you're creating.",
  'you create space to enjoy meeting a need.',
  'you meet a need in a way that gives you energy.',
  "you're doing the bare minimum.",
]

const TOKEN = {
  exploration:  { solid: '#1B3A2D', tint: 'rgba(27,58,45,0.05)',    border: 'rgba(27,58,45,0.2)',     text: '#1B3A2D' },
  appreciation: { solid: '#B8C3B1', tint: 'rgba(184,195,177,0.2)',  border: 'rgba(184,195,177,0.85)', text: '#4a5e45' },
  nourishment:  { solid: '#E8B81F', tint: 'rgba(232,184,31,0.1)',   border: 'rgba(232,184,31,0.42)',  text: '#854F0B' },
  survival:     { solid: '#D93B1C', tint: 'rgba(217,59,28,0.05)',   border: 'rgba(217,59,28,0.24)',   text: '#993C1D' },
}

const PIPS = {
  exploration:  { filled: 3, half: false, empty: 0 },
  appreciation: { filled: 2, half: false, empty: 1 },
  nourishment:  { filled: 1, half: false, empty: 2 },
  survival:     { filled: 0, half: true,  empty: 2 },
}

function getNextState({ lanes, holdCount, justMoved }) {
  const allAtTop = lanes.every(l => l === 0)
  if (allAtTop) {
    const nextHold = holdCount + 1
    if (nextHold >= HOLD_TICKS) {
      return { lanes: [...INITIAL_LANES], holdCount: 0, justMoved: null }
    }
    return { lanes, holdCount: nextHold, justMoved: null }
  }
  let targetIdx = -1
  let maxLane = -1
  for (let i = 0; i < lanes.length; i++) {
    if (lanes[i] > maxLane) {
      maxLane = lanes[i]
      targetIdx = i
    }
  }
  const newLanes = [...lanes]
  newLanes[targetIdx] = newLanes[targetIdx] - 1
  return { lanes: newLanes, holdCount: 0, justMoved: targetIdx }
}

export default function ModesWidget() {
  const [state, setState] = useState({
    lanes: [...INITIAL_LANES],
    holdCount: 0,
    justMoved: null,
  })

  useEffect(() => {
    const t = setInterval(() => setState(prev => getNextState(prev)), TICK_MS)
    return () => clearInterval(t)
  }, [])

  return (
    <div className={s.panel}>
      <div className={s.header}>
        <span className={s.headerLeft}>↑ move a need up</span>
        <span className={s.headerRight}>practices / day</span>
      </div>

      <div className={s.lanes}>
        {MODES.map((mode, modeIdx) => {
          const tk = TOKEN[mode]
          const pip = PIPS[mode]
          const chipsHere = CHIPS.filter((_, ci) => state.lanes[ci] === modeIdx)
          const justMovedName =
            state.justMoved !== null && state.lanes[state.justMoved] === modeIdx
              ? CHIPS[state.justMoved]
              : null

          return (
            <div
              key={mode}
              className={s.lane}
              style={{ background: tk.tint, border: `1px solid ${tk.border}` }}
            >
              <div className={s.label}>
                <div className={s.labelTop}>
                  <span className={s.dot} style={{ background: tk.solid }} />
                  <span className={s.modeName} style={{ color: tk.text }}>{mode}</span>
                </div>
                <div className={s.modeDesc}>{MODE_DESCS[modeIdx]}</div>
              </div>

              <div className={s.chips}>
                {chipsHere.map(chip => (
                  <span
                    key={chip}
                    className={chip === justMovedName ? `${s.chip} ${s.chipMoved}` : s.chip}
                    style={{ color: tk.text, border: `1px solid ${tk.border}` }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className={s.pips}>
                {Array.from({ length: pip.filled }).map((_, i) => (
                  <span key={`f${i}`} className={s.pip} style={{ background: tk.solid }} />
                ))}
                {pip.half && (
                  <span
                    className={s.pip}
                    style={{
                      background: `linear-gradient(90deg, ${tk.solid} 50%, #ece6da 50%)`,
                      border: '1px solid #e6ddce',
                    }}
                  />
                )}
                {Array.from({ length: pip.empty }).map((_, i) => (
                  <span key={`e${i}`} className={s.pip} style={{ background: '#ece6da' }} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
