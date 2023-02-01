import { Nav } from "@/components"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { en } from "@/locales/en"
import { ru } from "@/locales/ru"

const messages = {
  en,
  ru,
}

function getDirection(locale: string): string {
  if (locale === "ru") return "ru"
  return "en"
}

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter()

  return (
    <>
      <Nav />
      <Component {...pageProps} dir={getDirection(locale as string)} messages={messages[locale]} />
    </>
  )
}
