import Head from "next/head"
import "../styles/globals.css";
import { Navbar } from "./components/navbar"
import Sidebar from "./components/sidebar"
import { Footer } from "./Footer";

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
      <body className="min-h-screen ">
        {/* <body className="min-h-screen bg-slate-50 dark:bg-black dark:text-white "> */}
        <Navbar />
        {/* <Sidebar /> */}
        {children}
        <Footer />
      </body>
    </html>
  )
}
