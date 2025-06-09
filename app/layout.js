import { Fugaz_One, Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400']})
const opensans = Open_Sans({ subsets: ["latin"], weight: ['400']})

export const metadata = {
  title: "Moodoshii",
  description: "Track your daily mood, every day of the year",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="flex items-center justify-between gap-4 p-4 sm:p-8">
      <h1 className={`${fugaz.className} text-xl sm:text-2xl md:text-3xl text-gradient`}>Moodoshii</h1>
      <div className="flex items-center justify-between">  
        PLACEHOLDER CTA || STATS
      </div>
    </header>
  )
  const footer = (
    <footer className="p-4 sm:p-8">
      <p className={`${fugaz.className} text-center mx-auto text-indigo-600`}> Created by HMZ</p>
    </footer>
  )
  
  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body className={`${opensans.className} antialiased text-slate-800 w-full max-w-[1500px] mx-auto my-auto text-sm sm:text-base min-h-screen flex flex-col justify-center`}>
          {header}
          {children} 
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
