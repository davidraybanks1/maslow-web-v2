import './globals.css'
import Nav from './components/Nav'
import Footer from './components/Footer'

export const metadata = {
  title: 'Loam — anxiety isn’t who you are',
  description: 'Loam helps you sort out what matters, do small things about it, and see what’s working.',
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
