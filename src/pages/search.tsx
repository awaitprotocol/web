import Image from "next/image"
import styles from "@/styles/search.module.css"
import filters from "../assets/images/filter.png"
import close from "../assets/images/close.png"
import search from "../assets/images/icons-search.png"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import SearchResults from "@/components/search`sComponents/SearchResults"
import LoadingSpinner from "@/components/LoadingSpinner"
import Pagination from "@/components/search`sComponents/Pagination"
import ErrorWindow from "@/components/ErrorWindow"
import SettingModal from "@/components/search`sComponents/SettingModal"
import { Res } from "./api/q"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"
import { Schema } from "@/shared/typesense"

const countItemsInPage = 10
const Search = () => {
  const [inputValue, setInputValue] = useState("")
  const [items, setItems] = useState<SearchResponseHit<Schema>[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const inputEl = useRef<HTMLInputElement>(null)
  const [showSetting, setShowSetting] = useState(false)

  useEffect(() => {
    inputEl.current?.focus()
  }, [])

  const handleSubmit = async (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!inputValue) return

    setLoading(true)
    const res = await fetch(process.env.SEARCH_API!)
    if (!res.ok) {
      setError("Server error")
      setLoading(false)
      return
    }
    const data: Res = await res.json()
    if (data.success) {
      setItems(data.result.hits as SearchResponseHit<Schema>[])
      setLoading(false)
      return
    }
    setError("Error")
    setLoading(false)
  }
  const countItems = items.length
  const lastItemsIndex = currentPage * countItemsInPage
  const firstItemsIndex = lastItemsIndex - countItemsInPage
  const currentItems = items.slice(firstItemsIndex, lastItemsIndex)

  if (error) return <ErrorWindow error={error} />

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
                <Image
                  src={filters}
                  alt="filters"
                  className={styles.image}
                  onClick={() => setShowSetting(true)}
                />
              </div>
              <figure className="my-btn" onClick={(e) => handleSubmit(e)}>
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
      {<SettingModal showSetting={showSetting} setShowSetting={setShowSetting} />}
    </div>
  )
}
export default Search
