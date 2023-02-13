import { Messages } from "@/shared/typesense"

type Props = {
  messages: Messages
}
export const Footer = ({ messages }: Props) => {
  return (
    <footer className="footer-container">
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
