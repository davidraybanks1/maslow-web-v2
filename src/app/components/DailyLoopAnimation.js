'use client'
import { useEffect, useRef } from 'react'
import styles from './DailyLoopAnimation.module.css'

export default function DailyLoopAnimation() {
  const cancelRef = useRef(false)

  useEffect(() => {
    cancelRef.current = false

    function delay(ms) {
      return new Promise(resolve => {
        const id = setTimeout(resolve, ms)
        cancelRef.current && clearTimeout(id)
      })
    }

    async function typeNote(text, elId) {
      const el = document.getElementById(elId)
      if (!el) return
      document.getElementById('note-wrap').classList.add(styles.visible)
      el.textContent = ''
      for (let i = 0; i < text.length; i++) {
        if (cancelRef.current) return
        el.textContent += text[i]
        await delay(38)
      }
    }

    function setTime(t) {
      ['morning','midday','evening'].forEach(x => {
        const el = document.getElementById('pill-' + x)
        if (el) el.className = styles.timePill + (x === t ? ' ' + styles.active : '')
      })
    }

    function showRow(i) {
      const el = document.getElementById('row-' + i)
      if (el) el.classList.add(styles.visible)
    }

    function selectChip(row, col, color) {
      const chip = document.getElementById('chip-' + row + '-' + col)
      if (chip) chip.classList.add(styles.chipSelected)
      const b = document.getElementById('b-' + row)
      if (b) { b.style.background = color; b.style.borderColor = color; b.classList.add(styles.bubbleDone) }
    }

    function setMood(m) {
      ['good','fine','bad'].forEach(x => {
        const el = document.getElementById('mood-' + x)
        if (el) el.className = styles.moodBtn + (x === m ? ' ' + styles.moodSelected : '')
      })
    }

    function clearNote() {
      const wrap = document.getElementById('note-wrap')
      const el = document.getElementById('note-text')
      if (wrap) wrap.classList.remove(styles.visible)
      if (el) el.textContent = ''
    }

    function deselectAll() {
      const bubbleColors = ['#1B3A2D','#1B3A2D','#B8C3B1','#E8B81F']
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 2; c++) {
          const chip = document.getElementById('chip-' + r + '-' + c)
          if (chip) chip.classList.remove(styles.chipSelected)
        }
        const b = document.getElementById('b-' + r)
        if (b) { b.style.background = ''; b.style.borderColor = bubbleColors[r]; b.classList.remove(styles.bubbleDone) }
        const row = document.getElementById('row-' + r)
        if (row) row.classList.remove(styles.visible)
      }
      const moodSection = document.getElementById('mood-section')
      if (moodSection) moodSection.classList.remove(styles.visible)
      setMood(null)
      clearNote()
      const fill = document.getElementById('prog-fill')
      if (fill) fill.style.width = '0%'
      const pct = document.getElementById('prog-pct')
      if (pct) pct.textContent = '0%'
      const label = document.getElementById('prog-label')
      if (label) label.textContent = '0 of 10'
    }

    function setProgress(done, total) {
      const pct = Math.round(done / total * 100)
      const fill = document.getElementById('prog-fill')
      const pctEl = document.getElementById('prog-pct')
      const label = document.getElementById('prog-label')
      if (fill) fill.style.width = pct + '%'
      if (pctEl) pctEl.textContent = pct + '%'
      if (label) label.textContent = done + ' of ' + total
    }

    async function runLoop() {
      if (cancelRef.current) return
      deselectAll()
      await delay(500)

      setTime('morning')
      showRow(0); await delay(500)
      showRow(1); await delay(500)
      selectChip(0, 0, '#1B3A2D'); setProgress(1, 10); await delay(500)
      selectChip(1, 1, '#1B3A2D'); setProgress(2, 10); await delay(500)
      const ms = document.getElementById('mood-section')
      if (ms) ms.classList.add(styles.visible)
      await delay(400)
      setMood('good')
      await typeNote('ran before work for the first time in weeks', 'note-text')
      await delay(1400)
      clearNote(); setMood(null)
      if (ms) ms.classList.remove(styles.visible)
      await delay(400)

      setTime('midday')
      showRow(2); await delay(500)
      selectChip(2, 0, '#B8C3B1'); setProgress(3, 10); await delay(500)
      if (ms) ms.classList.add(styles.visible)
      await delay(400)
      setMood('fine')
      await typeNote('skipped lunch, ate at desk again', 'note-text')
      await delay(1400)
      clearNote(); setMood(null)
      if (ms) ms.classList.remove(styles.visible)
      await delay(400)

      setTime('evening')
      showRow(3); await delay(500)
      selectChip(3, 1, '#E8B81F'); setProgress(4, 10); await delay(500)
      if (ms) ms.classList.add(styles.visible)
      await delay(400)
      setMood('bad')
      await typeNote('too much screen time, felt disconnected all evening', 'note-text')
      await delay(1800)
      clearNote(); setMood(null)

      await delay(600)
      if (!cancelRef.current) runLoop()
    }

    runLoop()
    return () => { cancelRef.current = true }
  }, [])

  return (
    <div className={styles.scene}>
      <div className={styles.timeRow}>
        <div className={styles.timePill} id="pill-morning">morning</div>
        <div className={styles.timePill} id="pill-midday">midday</div>
        <div className={styles.timePill} id="pill-evening">evening</div>
      </div>

      <div className={styles.practicesRow}>
        {[
          { id: 0, color: '#1B3A2D', name: 'Movement',   chips: ['Morning run', 'Bike'] },
          { id: 1, color: '#1B3A2D', name: 'Reflection',  chips: ['Journal', 'Meditate'] },
          { id: 2, color: '#B8C3B1', name: 'Nutrition',   chips: ['Cook a meal', 'Greens'] },
          { id: 3, color: '#E8B81F', name: 'Beauty',      chips: ['Time in nature', 'Listen to music'] },
        ].map(r => (
          <div key={r.id} className={styles.needRow} id={'row-' + r.id}>
            <div className={styles.bubble} id={'b-' + r.id} style={{ borderColor: r.color }}>
              <span className={styles.check}>✓</span>
            </div>
            <div className={styles.needName}>{r.name}</div>
            <div className={styles.chips}>
              {r.chips.map((c, ci) => (
                <div key={ci} className={styles.chip} id={`chip-${r.id}-${ci}`}>{c}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.moodSection} id="mood-section">
        <div className={styles.moodRow}>
          <div className={styles.moodLabel}>mood</div>
          <div className={styles.moodBtn} id="mood-good">good</div>
          <div className={styles.moodBtn} id="mood-fine">fine</div>
          <div className={styles.moodBtn} id="mood-bad">bad</div>
        </div>
        <div className={styles.noteWrap} id="note-wrap">
          <div className={styles.noteText} id="note-text"></div>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progLabel} id="prog-label">0 of 10</div>
        <div className={styles.progTrack}><div className={styles.progFill} id="prog-fill"></div></div>
        <div className={styles.progPct} id="prog-pct">0%</div>
      </div>
    </div>
  )
}
