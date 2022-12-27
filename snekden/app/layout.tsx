
import { Navbar } from "./navbar"
import Sidebar from "./sidebar"


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
