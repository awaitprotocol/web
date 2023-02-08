import { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import logo from "@/assets/images/logo.svg"
import twitter from "@/assets/images/twitter.svg"
import github from "@/assets/images/github.svg"

import { useRouter } from "next/router"

type Props = {
  dir: string
  setLangValue: Dispatch<SetStateAction<"en" | "ru">>
}
export const Nav = ({ dir, setLangValue }: Props) => {
  const router = useRouter()
  return (
    <nav>
      <div>
        <Image src={logo} alt="logo" className="nav-logo" onClick={() => router.replace("/")} />
      </div>
      <div className="nav-right">
        <div>
          <Image src={twitter} className="sm-img" alt="twitter" />
        </div>
        <div>
          <Image src={github} className="sm-img opacity-30" alt="github" />
        </div>
        <div
          className="btn btn-sm lang-btn"
          onClick={() => setLangValue(dir === "en" ? "ru" : "en")}
        >
          {dir}
        </div>
      </div>
    </nav>
  )
}
