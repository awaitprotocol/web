import { Nav, Footer } from "@/components"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { en } from "@/locales/en"
import { ru } from "@/locales/ru"
import { useState } from "react"

const messages = {
  en,
  ru,
} as const

const defaultLocale = "en"
function getDirection(locale: string): string {
  if (locale === "ru") return "ru"
  return defaultLocale
}

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter()
  const [langValue, setLangValue] = useState((locale || defaultLocale) as keyof typeof messages)

  return (
    <div className="App">
      <Nav dir={getDirection(langValue)} setLangValue={setLangValue} />
      <Component {...pageProps} dir={getDirection(langValue)} messages={messages[langValue]} />
      <Footer messages={messages[langValue]} />
    </div>
  )
}
