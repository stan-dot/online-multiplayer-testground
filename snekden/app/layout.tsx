import "../styles/globals.css";
import { Navbar } from "./(components)/navbar";
import { Footer } from "./sections/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="min-h-screen">
        <Navbar />
        <div className="grid  bg-cyan-900 grid-cols-1 gap-4 place-content-center">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}

