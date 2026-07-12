'use client'
import s from './IllustrationFrame.module.css'

export default function IllustrationFrame({ children }) {
  return <div className={s.frame}>{children}</div>
}
