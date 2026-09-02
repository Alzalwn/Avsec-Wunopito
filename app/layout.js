import './globals.css'

export const metadata = {
  title: 'Portal AVSEC Wunopito',
  description: 'Sistem Informasi Keamanan Penerbangan Bandara Wunopito',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
