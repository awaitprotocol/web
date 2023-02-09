import { Messages } from "@/shared/typesense"
import { useRouter } from "next/router"
import { useEffect } from "react"

type Props = {
  messages: Messages
}
export const Footer = ({ messages }: Props) => {
  const router = useRouter()
  const getPath = () => router?.query?.q
  const path = getPath()
  useEffect(() => {
    // console.log(path)
  }, [path])
  return (
    <footer className={path ? "footer-container" : "footer-container bottom"}>
      <div className="footer-text">
        <p>{messages.we}</p>
        <p>{messages.weDesc}</p>
      </div>
      <ul className="footer-social">
        <li>
          <b>{messages.social}</b>
        </li>
        <li>
          <a href="./">Twitter</a>
        </li>
        <li>
          {" "}
          <a href="./">Github</a>
        </li>
      </ul>
    </footer>
  )
}
