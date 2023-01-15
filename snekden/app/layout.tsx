import Head from "next/head"
import "../styles/globals.css";
import { Navbar } from "./components/navbar"
import Sidebar from "./components/sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <Head>
        <title>Snekden</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Navbar />
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
