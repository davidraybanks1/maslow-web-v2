'use client'

import { useMemo } from 'react'
import styles from './HeroFountain.module.css'

// Palette weighted for calm — appreciation/lavender often, survival rarely.
// Tokens declared in globals.css.
const PALETTE = [
  ['var(--appreciation)',   5],
  ['var(--loader-lavender)', 5],
  ['var(--nourishment)',    3],
  ['var(--exploration)',    3],
  ['var(--survival)',       1],
]
const POOL = PALETTE.flatMap(([c, w]) => Array(w).fill(c))
const rand = (min, max) => Math.random() * (max - min) + min
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const COUNT = 18  // ~half of the app's loading screen

function buildCircles(reduce) {
  return Array.from({ length: COUNT }, () => {
    const size  = rand(8, 44)
    const depth = (size - 8) / 36
    // Opacity halved vs app (max ~0.31) so headline text dominates
    const op    = (0.31 - depth * 0.17).toFixed(2)
    const blur  = (depth * 2.4).toFixed(1)
    const dur   = (7 + depth * 4 + rand(-1, 1)).toFixed(1)
    const drift = rand(8, 26).toFixed(0)
    const sdur  = rand(3.5, 6).toFixed(1)
    return {
      drop: {
        '--x':     rand(2, 96).toFixed(1) + '%',
        '--dur':   dur + 's',
        '--delay': (-rand(0, parseFloat(dur))).toFixed(1) + 's',
        '--op':    op,
        ...(reduce ? { bottom: 'auto', top: rand(6, 90).toFixed(1) + '%', opacity: op } : {}),
      },
      bubble: {
        '--size':   size.toFixed(0) + 'px',
        '--color':  pick(POOL),
        '--blur':   blur + 'px',
        '--drift':  drift + 'px',
        '--sdur':   sdur + 's',
        '--sdelay': (-rand(0, parseFloat(sdur))).toFixed(1) + 's',
      },
    }
  })
}

export default function HeroFountain() {
  const reduce = useMemo(
    () => typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )
  const circles = useMemo(() => buildCircles(reduce), [reduce])

  return (
    <div className={styles.fountain} aria-hidden="true">
      {circles.map((c, i) => (
        <div key={i} className={styles.drop} style={c.drop}>
          <div className={styles.bubble} style={c.bubble} />
        </div>
      ))}
      <div className={styles.veil} />
    </div>
  )
}
