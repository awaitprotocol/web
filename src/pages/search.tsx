import Image from "next/image"
import styles from "@/styles/search.module.css"
import filters from "../assets/images/filter.png"
import close from "../assets/images/close.png"
import search from "../assets/images/icons-search.png"
import { useEffect, useRef, useState } from "react"
import SearchResults from "@/components/search`sComponents/SearchResults"
import { TypeHits } from "./api/types"
import LoadingSpinner from "@/components/LoadingSpinner"
import Pagination from "@/components/search`sComponents/Pagination"
import ServerError from "@/components/ServerError"

const countItemsInPage = 10
const Search = () => {
  const [inputValue, setInputValue] = useState("")
  const [items, setItems] = useState<TypeHits[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const inputEl = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputEl.current?.focus()
  }, [])

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    if (!inputValue) return
    setLoading(true)

    const res = await fetch(`api/search`) // const res = await fetch(`.../${inputValue}`)
    if (!res.ok) {
      setError(true)
      setLoading(false)
    }
    const data = await res.json()
    setItems(data.hits)
    setLoading(false)
  }
  const countItems = items.length
  const lastItemsIndex = currentPage * countItemsInPage
  const firstItemsIndex = lastItemsIndex - countItemsInPage
  const currentItems = items.slice(firstItemsIndex, lastItemsIndex)

  if (error) return <ServerError />

  if (!items) return <p>Your search - {inputValue} - did not match any documents.</p>

  return (
    <div className="page-container">
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerText}>
            Search<span className="color-orange">.</span>
          </h1>
          <p className={styles.text}>
            <span className="gray-text">Searching for information on</span>
            <strong> Bodybuilding</strong>
          </p>
        </div>
        <div>
          <form className={styles.searchForm} onSubmit={(e) => handleSubmit(e)}>
            <input
              className={styles.search}
              type="text"
              ref={inputEl}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="float-right btns">
              <div className={styles.container}>
                <Image src={close} alt="close" className={styles.image} />
              </div>
              <div className={styles.container}>
                <Image src={filters} alt="filters" className={styles.image} />
              </div>
              <figure className="btn" onClick={(e) => handleSubmit(e)}>
                <Image src={search} alt="search-icon" className={styles.image} />
                <figcaption>Go!</figcaption>
              </figure>
            </div>
          </form>
        </div>
      </div>
      <div className="items">
        {isLoading ? <LoadingSpinner /> : <SearchResults items={currentItems} />}
      </div>
      <div>
        <Pagination
          countItemsInPage={countItemsInPage}
          countItems={countItems}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}
export default Search
