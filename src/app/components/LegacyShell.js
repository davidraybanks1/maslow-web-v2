// Legacy routes (about, modes, mode, need) and /studio were built on the old white page with
// Instrument Sans and thin DM Mono from Google Fonts. This keeps that look on those routes only,
// so the Loam pages (memos, privacy, terms) make no Google Fonts requests.
// React hoists these <link> tags into <head>.
const FONTS =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Mono:ital,wght@0,200;0,400;0,500;1,200;1,400&family=Instrument+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Instrument+Serif:ital@0;1&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap'

export default function LegacyShell({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <div className="legacy-page">{children}</div>
    </>
  )
}
