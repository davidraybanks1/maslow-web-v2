'use client'
import { useEffect, useRef } from 'react'
import styles from './DailyLoopAnimation.module.css'

export default function DailyLoopAnimation() {
  const cancelRef = useRef(false)

  useEffect(() => {
    cancelRef.current = false

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function typeText(elId, text, speed = 36) {
      if (cancelRef.current) return
      const el = document.getElementById(elId)
      if (!el) return
      el.textContent = ''
      for (let i = 0; i < text.length; i++) {
        if (cancelRef.current) return
        el.textContent += text[i]
        await delay(speed)
      }
    }

    function setProgress(done) {
      const pct = Math.round(done / 10 * 100)
      const fill = document.getElementById('prog-fill')
      const pctEl = document.getElementById('prog-pct')
      const label = document.getElementById('prog-label')
      if (fill) fill.style.width = pct + '%'
      if (pctEl) pctEl.textContent = pct + '%'
      if (label) label.textContent = done + '/10'
    }

    function setPracticeTime(t) {
      ['morning', 'midday', 'evening'].forEach(x => {
        const el = document.getElementById('p-' + x)
        if (el) el.className = styles.timePill + (x === t ? ' ' + styles.active : '')
      })
    }

    const BUBBLE_COLORS = ['#1B3A2D', '#1B3A2D', '#B8C3B1']
    const BAR_HEIGHTS = [38, 52, 44, 60, 50, 65, 72, 80]
    const NOTES = [
      'ran before work for the first time in weeks',
      'ate at desk, felt rushed all afternoon',
      'quiet evening, felt like myself again'
    ]

    function reset() {
      for (let i = 0; i < 3; i++) {
        const row = document.getElementById('pr-' + i)
        if (row) row.classList.remove(styles.vis)
        const b = document.getElementById('pb-' + i)
        if (b) { b.style.background = ''; b.style.borderColor = BUBBLE_COLORS[i]; b.classList.remove(styles.done) }
        const ck = document.getElementById('pck-' + i)
        if (ck) ck.textContent = ''
      }
      for (let i = 0; i < 6; i++) {
        const c = document.getElementById('pc-' + i)
        if (c) c.classList.remove(styles.chipSel)
      }
      const mn0 = document.getElementById('mn-0')
      if (mn0) mn0.textContent = ''
      ;['good', 'fine', 'bad'].forEach(m => {
        const el = document.getElementById('mb-0-' + m)
        if (el) el.classList.remove(styles.moodSel)
      })
      for (let i = 1; i < 3; i++) {
        const m = document.getElementById('m-' + i)
        if (m) m.classList.remove(styles.vis)
        const mn = document.getElementById('mn-' + i)
        if (mn) mn.textContent = ''
        ;['good', 'fine', 'bad'].forEach(mood => {
          const el = document.getElementById('mb-' + i + '-' + mood)
          if (el) el.classList.remove(styles.moodSel)
        })
      }
      setProgress(0)
      setPracticeTime('morning')
      for (let i = 0; i < 8; i++) {
        const b = document.getElementById('bar-' + i)
        if (b) b.style.height = '0px'
      }
    }

    async function runLoop() {
      if (cancelRef.current) return
      reset()
      await delay(500)

      setPracticeTime('morning')
      document.getElementById('pr-0')?.classList.add(styles.vis); await delay(400)
      document.getElementById('pr-1')?.classList.add(styles.vis); await delay(400)
      document.getElementById('pc-0')?.classList.add(styles.chipSel)
      const b0 = document.getElementById('pb-0')
      if (b0) { b0.style.background = '#1B3A2D'; b0.style.borderColor = '#1B3A2D'; b0.classList.add(styles.done) }
      const ck0 = document.getElementById('pck-0'); if (ck0) ck0.textContent = '✓'
      setProgress(1)
      document.getElementById('mb-0-good')?.classList.add(styles.moodSel)
      await typeText('mn-0', NOTES[0]); await delay(500)

      if (cancelRef.current) return
      setPracticeTime('midday')
      document.getElementById('pr-2')?.classList.add(styles.vis); await delay(400)
      document.getElementById('pc-2')?.classList.add(styles.chipSel)
      const b1 = document.getElementById('pb-1')
      if (b1) { b1.style.background = '#1B3A2D'; b1.style.borderColor = '#1B3A2D'; b1.classList.add(styles.done) }
      const ck1 = document.getElementById('pck-1'); if (ck1) ck1.textContent = '✓'
      setProgress(2)
      document.getElementById('m-1')?.classList.add(styles.vis); await delay(300)
      document.getElementById('mb-1-fine')?.classList.add(styles.moodSel)
      await typeText('mn-1', NOTES[1]); await delay(500)

      if (cancelRef.current) return
      setPracticeTime('evening')
      document.getElementById('pc-4')?.classList.add(styles.chipSel)
      const b2 = document.getElementById('pb-2')
      if (b2) { b2.style.background = '#B8C3B1'; b2.style.borderColor = '#B8C3B1'; b2.classList.add(styles.done) }
      const ck2 = document.getElementById('pck-2'); if (ck2) ck2.textContent = '✓'
      setProgress(3)
      document.getElementById('m-2')?.classList.add(styles.vis); await delay(300)
      document.getElementById('mb-2-bad')?.classList.add(styles.moodSel)
      await typeText('mn-2', NOTES[2]); await delay(600)

      if (cancelRef.current) return
      for (let i = 0; i < 8; i++) {
        const b = document.getElementById('bar-' + i)
        if (b) b.style.height = BAR_HEIGHTS[i] + 'px'
        await delay(120)
      }

      await delay(2000)
      if (!cancelRef.current) runLoop()
    }

    runLoop()
    return () => { cancelRef.current = true }
  }, [])

  return (
    <div className={styles.grid}>

      {/* Col 1: Practices */}
      <div className={styles.cell}>
        <div className={styles.colLabel}>Daily practices</div>
        <div className={styles.colTitle}>what you do</div>
        <div className={styles.timeRow}>
          <div className={styles.timePill} id="p-morning">morning</div>
          <div className={styles.timePill} id="p-midday">midday</div>
          <div className={styles.timePill} id="p-evening">evening</div>
        </div>
        {[
          { id: 0, color: '#1B3A2D', name: 'Movement',   chips: ['Morning run', 'Bike'] },
          { id: 1, color: '#1B3A2D', name: 'Reflection', chips: ['Journal', 'Meditate'] },
          { id: 2, color: '#B8C3B1', name: 'Nutrition',  chips: ['Cook a meal', 'Greens'] },
        ].map(r => (
          <div key={r.id} className={styles.needRow} id={'pr-' + r.id}>
            <div className={styles.bubble} id={'pb-' + r.id} style={{ borderColor: r.color }}>
              <span id={'pck-' + r.id}></span>
            </div>
            <div className={styles.needName}>{r.name}</div>
            <div className={styles.chips}>
              {r.chips.map((c, ci) => (
                <div key={ci} className={styles.chip} id={`pc-${r.id * 2 + ci}`}>{c}</div>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.progRow}>
          <div className={styles.progLabel} id="prog-label">0/10</div>
          <div className={styles.progTrack}><div className={styles.progFill} id="prog-fill"></div></div>
          <div className={styles.progPct} id="prog-pct">0%</div>
        </div>
      </div>

      {/* Col 2: Mood */}
      <div className={styles.cell}>
        <div className={styles.colLabel}>Mood check-ins</div>
        <div className={styles.colTitle}>how you feel</div>
        <div className={`${styles.moodBlock} ${styles.alwaysVisible}`} id="m-0">
          <div className={styles.moodBlockTop}>
            <div className={styles.moodTime}>morning</div>
            <div className={styles.moodBtns}>
              {['good', 'fine', 'bad'].map(m => (
                <div key={m} className={styles.moodBtn} id={`mb-0-${m}`}>{m}</div>
              ))}
            </div>
          </div>
          <div className={styles.moodNote} id="mn-0"></div>
        </div>
        {[1, 2].map(i => (
          <div key={i} className={styles.moodBlock} id={`m-${i}`}>
            <div className={styles.moodBlockTop}>
              <div className={styles.moodTime}>{i === 1 ? 'midday' : 'evening'}</div>
              <div className={styles.moodBtns}>
                {['good', 'fine', 'bad'].map(m => (
                  <div key={m} className={styles.moodBtn} id={`mb-${i}-${m}`}>{m}</div>
                ))}
              </div>
            </div>
            <div className={styles.moodNote} id={`mn-${i}`}></div>
          </div>
        ))}
      </div>

      {/* Col 3: Chart */}
      <div className={styles.cell}>
        <div className={styles.colLabel}>Progress tracking</div>
        <div className={styles.colTitle}>what's working</div>
        <div className={styles.chartArea}>
          {[
            { bg: '#E8B81F', op: 1 },
            { bg: '#E8B81F', op: 0.85 },
            { bg: '#E8B81F', op: 0.7 },
            { bg: '#E8B81F', op: 1 },
            { bg: '#1B3A2D', op: 0.7 },
            { bg: '#1B3A2D', op: 0.85 },
            { bg: '#1B3A2D', op: 1 },
            { bg: '#1B3A2D', op: 1 },
          ].map((b, i) => (
            <div key={i} className={styles.barGroup}>
              <div className={styles.bar} id={`bar-${i}`} style={{ height: 0, background: b.bg, opacity: b.op }} />
              <div className={styles.barWeek}>W{i + 1}</div>
            </div>
          ))}
        </div>
        <div className={styles.chartDivider} />
        <div className={styles.chartLegend}>
          <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: '#E8B81F' }} />practices</div>
          <div className={styles.legendItem}><div className={styles.legendDot} style={{ background: '#1B3A2D' }} />mood</div>
        </div>
      </div>

    </div>
  )
}
