import '../styles/globals.css'
import { Navbar } from "./components/navbar"
import Sidebar from "./components/sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <Navbar />
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
