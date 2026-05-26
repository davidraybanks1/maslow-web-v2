import './globals.css'
import Nav from './components/Nav'
import Footer from './components/Footer'

export const metadata = {
  title: 'Maslow — practice becoming yourself',
  description: 'Anxiety fills the space your unmet needs leave behind. Maslow helps you fill that space first.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,700;1,400&family=DM+Mono:ital,wght@0,200;0,400;0,500;1,200;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
