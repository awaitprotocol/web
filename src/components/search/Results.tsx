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
  return `https://${domain}/`
}

type Props = {
  items: SearchResponseHit<Schema>[]
  searchValue: string
  firstSearch: boolean
  error: string
}

export const SearchResults = ({ items, searchValue, firstSearch, error }: Props) => {
  if (firstSearch && !items.length && !error)
    return (
      <p className="text-center no-result">
        Your search - {searchValue} - did not match any documents.
      </p>
    )

  return (
    <>
      {!error &&
        items.map((item) => {
          const snippet = item.highlights?.[0].snippets?.[0] || item.document.desc || ""

          return (
            <div key={item.document.id} className="item">
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
                <div className="ml-10 snippets" dangerouslySetInnerHTML={{ __html: snippet }} />
              </div>
            </div>
          )
        })}
    </>
  )
}
