'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './CanvasAnimation.module.css'

const MODES = {
  survival:     { border: '#e8e8e8', pip: '#D93B1C', modeColor: '#D93B1C', shadow: '0 1px 0 rgba(0,0,0,0.02), 0 10px 18px -14px rgba(0,0,0,0.13)' },
  nourishment:  { border: '#e8e8e8', pip: '#E8B81F', modeColor: '#9A7200', shadow: '0 1px 0 rgba(0,0,0,0.02), 0 10px 18px -14px rgba(0,0,0,0.13)' },
  appreciation: { border: '#e8e8e8', pip: '#B8C3B1', modeColor: '#5E7A6A', shadow: '0 1px 0 rgba(0,0,0,0.02), 0 10px 18px -14px rgba(0,0,0,0.13)' },
  purpose:      { border: '#c8d4c8', pip: '#1B3A2D', modeColor: '#1B3A2D', shadow: '0 1px 0 rgba(0,0,0,0.03), 0 12px 20px -12px rgba(26,58,45,0.18)' },
}

const TILE_H = { survival: 52, nourishment: 72, appreciation: 100, purpose: 170 }
const CANVAS_H = 560
const GAP = 6
const ROWS = 5

const INITIAL_TILES = [
  { name: 'Movement',   mode: 'survival', row: 0, flex: '1 1 100%',            num: '01' },
  { name: 'Community',  mode: 'survival', row: 1, flex: '1 1 calc(50% - 3px)', num: '02' },
  { name: 'Reflection', mode: 'survival', row: 1, flex: '1 1 calc(50% - 3px)', num: '03' },
  { name: 'Nutrition',  mode: 'survival', row: 2, flex: '1 1 calc(50% - 3px)', num: '04' },
  { name: 'Rest',       mode: 'survival', row: 2, flex: '1 1 calc(50% - 3px)', num: '05' },
  { name: 'Beauty',     mode: 'survival', row: 3, flex: '1 1 calc(50% - 3px)', num: '06' },
  { name: 'Money',      mode: 'survival', row: 3, flex: '1 1 calc(50% - 3px)', num: '07' },
  { name: 'Dwelling',   mode: 'survival', row: 4, flex: '1 1 calc(33% - 4px)', num: '08' },
  { name: 'Intimacy',   mode: 'survival', row: 4, flex: '1 1 calc(33% - 4px)', num: '09' },
  { name: 'Play',       mode: 'survival', row: 4, flex: '1 1 calc(33% - 4px)', num: '10' },
]

const FINAL = [
  { idx: 0, mode: 'purpose' },
  { idx: 1, mode: 'appreciation' },
  { idx: 2, mode: 'appreciation' },
  { idx: 3, mode: 'nourishment' },
  { idx: 4, mode: 'nourishment' },
  { idx: 5, mode: 'nourishment' },
]

function computeAnxietyH(tiles) {
  const rowMax = {}
  tiles.forEach(t => { rowMax[t.row] = Math.max(rowMax[t.row] || 0, TILE_H[t.mode]) })
  const tilesH = Object.values(rowMax).reduce((s, h) => s + h, 0) + (ROWS - 1) * GAP
  return Math.max(0, CANVAS_H - 16 - GAP - tilesH)
}

function computePct(tiles) {
  const w = { purpose: 1.4, appreciation: 1.15, nourishment: 1.0, survival: 0.25 }
  return Math.min(Math.round(tiles.reduce((s, t) => s + w[t.mode], 0) / tiles.length * 100), 100)
}

export default function CanvasAnimation() {
  const [tiles, setTiles] = useState(INITIAL_TILES.map(t => ({ ...t })))
  const stepRef = useRef(0)
  const phaseRef = useRef('building')
  const timerRef = useRef(null)

  function tick(currentTiles) {
    if (phaseRef.current === 'building') {
      if (stepRef.current < FINAL.length) {
        const next = [...currentTiles]
        next[FINAL[stepRef.current].idx] = { ...next[FINAL[stepRef.current].idx], mode: FINAL[stepRef.current].mode }
        stepRef.current++
        setTiles(next)
        const delay = stepRef.current === 1 ? 1400 : 950
        timerRef.current = setTimeout(() => tick(next), delay)
      } else {
        phaseRef.current = 'holding'
        timerRef.current = setTimeout(() => {
          phaseRef.current = 'resetting'
          const reset = INITIAL_TILES.map(t => ({ ...t }))
          stepRef.current = 0
          phaseRef.current = 'building'
          setTiles(reset)
          timerRef.current = setTimeout(() => tick(reset), 2000)
        }, 3200)
      }
    }
  }

  useEffect(() => {
    const initial = INITIAL_TILES.map(t => ({ ...t }))
    timerRef.current = setTimeout(() => tick(initial), 1000)
    return () => clearTimeout(timerRef.current)
  }, [])

  const axH = computeAnxietyH(tiles)
  const pct = computePct(tiles)
  const progColor = pct >= 90 ? '#1B3A2D' : pct >= 65 ? '#1a1a1a' : '#D93B1C'

  const rows = {}
  tiles.forEach(t => { if (!rows[t.row]) rows[t.row] = []; rows[t.row].push(t) })

  return (
    <div className={styles.wrap}>
      <div className={styles.frame}>
        <div className={styles.header}>
          <div className={styles.title}>your maslow</div>
        </div>
        <div className={styles.progress}>
          <span className={styles.progLabel}>canvas composed</span>
          <div className={styles.progTrack}>
            <div className={styles.progFill} style={{ width: `${pct}%`, background: progColor }} />
          </div>
          <div className={styles.progPct} style={{ color: progColor }}>{pct}%</div>
        </div>
        <div className={styles.legend}>
          {[
            { label: 'purpose',      color: '#1B3A2D' },
            { label: 'appreciation', color: '#B8C3B1' },
            { label: 'nourishment',  color: '#E8B81F' },
            { label: 'survival',     color: '#D93B1C' },
          ].map(l => (
            <div key={l.label} className={styles.legItem}>
              <div className={styles.legPip} style={{ background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
        <div className={styles.canvas}>
          <div
            className={styles.anxietyBar}
            style={{ height: axH, display: axH < 4 ? 'none' : 'flex' }}
          >
            {axH > 30 && (
              <div className={styles.anxietyTxt}>anxiety fills the space you give it.</div>
            )}
          </div>
          <div className={styles.needsGrid}>
            {Object.keys(rows).sort((a, b) => a - b).map(r => {
              const rowH = Math.max(...rows[r].map(t => TILE_H[t.mode]))
              return (
                <div key={r} className={styles.needsRow}>
                  {rows[r].map(n => {
                    const m = MODES[n.mode]
                    const fz = n.mode === 'purpose' ? 20 : n.mode === 'appreciation' ? 16 : n.mode === 'nourishment' ? 14 : 12
                    return (
                      <div
                        key={n.num}
                        className={styles.tile}
                        style={{
                          flex: n.flex,
                          height: rowH,
                          borderColor: m.border,
                          boxShadow: m.shadow,
                        }}
                      >
                        <div className={styles.tileTop}>
                          <span className={styles.tileNum}>{n.num}</span>
                          <span className={styles.tilePip} style={{ background: m.pip }} />
                        </div>
                        <div>
                          <div className={styles.tileName} style={{ fontSize: fz }}>{n.name}</div>
                          <div className={styles.tileMode} style={{ color: m.modeColor }}>{n.mode}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}