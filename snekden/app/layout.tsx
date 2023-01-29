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
      <body className="min-h-screen ">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

