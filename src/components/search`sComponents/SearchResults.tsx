import { ensName } from "@/shared/consts"
import { Schema } from "@/shared/typesense"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"

const buildLink = (domain: string) => {
  const valueENS = localStorage.getItem(ensName)
  if (valueENS === "eth.link") {
    return `https://${domain}.link/`
  }
  if (valueENS === "eth.limo") {
    return `https://${domain}.limo/`
  }
  return domain
}

type Props = {
  items: SearchResponseHit<Schema>[]
}
const SearchResults = ({ items }: Props) => {
  return (
    <>
      {items.map(function (item, index) {
        return (
          <div key={String(index)} className="item">
            <a
              href={buildLink(item.document.id)}
              className="item-title"
              target="_blank"
              rel="noreferrer"
            >
              {item.document.title}
            </a>
            <div>
              <p className="gray-text fs-14">{item.document.desc}</p>
            </div>
            <hr />
            <div className="snippets-container">
              {item?.highlights![0].snippets?.map(function (el: string, i: number) {
                return (
                  <div
                    key={String(i)}
                    className="ml-10 snippets"
                    dangerouslySetInnerHTML={{ __html: el }}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default SearchResults
