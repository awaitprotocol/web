import { Dispatch, SetStateAction } from "react"
type Props = {
  dir: string
  setLangValue: Dispatch<SetStateAction<"en" | "ru">>
}
export const Nav = ({ dir, setLangValue }: Props) => {
  return (
    <nav>
      <div>
        <h2 className="nav-logo">
          u<span className="color-orange nav-span">.</span>
        </h2>
      </div>
      <div>
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
