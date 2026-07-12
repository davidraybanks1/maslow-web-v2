'use client'
import { useState, useEffect } from 'react'
import s from './MoodsWidget.module.css'

const SLOTS = [
  { time: 'morning', mood: 'good', note: "Woke before the alarm. Quiet house, coffee, no rush." },
  { time: 'midday',  mood: 'fine', note: "Back-to-back calls. Running on adrenaline, not energy." },
  { time: 'evening', mood: 'bad',  note: "Snapped over something small. It wasn't about the thing." },
]

const PILL_STYLES = {
  good: { background: '#1B3A2D', color: '#fff',    borderColor: '#1B3A2D' },
  fine: { background: '#ece7db', color: '#5c574c', borderColor: '#e0dacd' },
  bad:  { background: '#D93B1C', color: '#fff',    borderColor: '#D93B1C' },
}

const TICK_MS = 950
const HOLD    = 7

export default function MoodsWidget() {
  const [step, setStep]     = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = e => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  useEffect(() => {
    if (reduced) { setStep(6); return }
    const t = setInterval(() => setStep(p => p >= 6 + HOLD ? 0 : p + 1), TICK_MS)
    return () => clearInterval(t)
  }, [reduced])

  const logged = SLOTS.filter((_, i) => i * 2 < step).length

  return (
    <div className={s.panel}>
      {/* Top bar */}
      <div className={s.topBar}>
        <div className={s.topLeft}>
          <span className={s.moodEyebrow}>MOOD</span>
          <span className={s.dateText}>saturday, july 11</span>
        </div>
        <span className={s.loggedLabel}>
          <span className={s.loggedCount}>{logged} of 3</span>
          <span className={s.loggedWord}> logged</span>
        </span>
      </div>

      {/* Time slots */}
      <div className={s.slots}>
        {SLOTS.map((slot, i) => {
          const moodIndex = i * 2
          const noteIndex = i * 2 + 1
          const moodShown = moodIndex < step
          const noteShown = noteIndex < step
          const moodJust  = moodIndex === step - 1
          const noteJust  = noteIndex === step - 1

          return (
            <div key={slot.time} className={s.slot}>
              <div className={s.slotHeader}>
                <span className={s.timeLabel}>{slot.time}</span>
                <div className={s.pills}>
                  {['good', 'fine', 'bad'].map(mood => {
                    const selected = moodShown && slot.mood === mood
                    const isJust   = selected && moodJust
                    return (
                      <span
                        key={mood}
                        className={`${s.pill}${isJust ? ' ' + s.pillPop : ''}`}
                        style={selected ? PILL_STYLES[mood] : {}}
                      >
                        {mood}
                      </span>
                    )
                  })}
                </div>
              </div>
              <div
                className={`${s.note}${noteJust ? ' ' + s.noteUp : ''}`}
                style={{
                  borderColor: noteShown ? '#e0dacd' : '#efeadf',
                  color:       noteShown ? '#1c1a16' : '#c3bbac',
                }}
              >
                {noteShown ? slot.note : 'add a note…'}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
