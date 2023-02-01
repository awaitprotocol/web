import Image from "next/image"
import styles from "@/styles/search.module.css"
import filters from "@/assets/images/filter.svg"
import close from "@/assets/images/close.svg"
import search from "@/assets/images/icons-search.svg"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import { SearchResults, Pagination, SettingModal } from "@/components/search"
import { LoadingSpinner, ErrorWindow } from "@/components"
import { Res } from "@/pages/api/search"
import { SearchResponseHit } from "typesense/lib/Typesense/Documents"
import { Schema } from "@/shared/typesense"
import { useRouter } from "next/router"

const countItemsInPage = 10
const Search = ({ messages }: any) => {
  const [startValue, setStartValue] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [items, setItems] = useState<SearchResponseHit<Schema>[]>([])
  const [firstSearch, setFirstSearch] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const inputEl = useRef<HTMLInputElement>(null)
  const [showSetting, setShowSetting] = useState(false)
  const router = useRouter()
  const getPath = () => router.asPath.split("?q=")[1]
  const path = getPath()

  const handleSubmit = async (e?: SyntheticEvent<EventTarget>) => {
    e?.preventDefault()
    if (!inputValue) return
    if (path !== inputValue) {
      router.push("/search?q=" + inputValue)
    }
    setSearchValue(inputValue)
    setLoading(true)
    const res = await fetch("api/search?q=" + inputValue)
    setFirstSearch(true)
    if (!res.ok) {
      setError("Server error")
      setLoading(false)
      return
    }
    const data: Res = await res.json()
    if (data.success) {
      setItems(data.result.hits || [])
      setLoading(false)
      setError("")
    } else {
      setError("Error")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (path) {
      setSearchValue(path)
      setInputValue(path)
      setStartValue(path)
      handleSubmit()
      return
    }
    inputEl.current?.focus()
  }, [path, startValue])

  const countItems = items.length
  const lastItemsIndex = currentPage * countItemsInPage
  const firstItemsIndex = lastItemsIndex - countItemsInPage
  const currentItems = items.slice(firstItemsIndex, lastItemsIndex)

  const cleanInput = () => {
    setInputValue("")
    inputEl.current?.focus()
    setFirstSearch(false)
  }

  return (
    <div className="page-container">
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerText}>
            Search<span className="color-orange">.</span>
          </h1>
          <p className={styles.text}>
            <span className="gray-text">{messages.mainDesc}</span>
            <strong> Web3</strong>
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
              <div className={styles.container} onClick={() => cleanInput()}>
                <Image src={close} alt="close" className={styles.image} />
              </div>
              <div className={styles.container} onClick={() => setShowSetting(true)}>
                <Image src={filters} alt="filters" className={styles.image} />
              </div>
              <figure className="my-btn" onClick={(e) => handleSubmit(e)}>
                <Image src={search} alt="search-icon" className={styles.image} />
                <figcaption>{messages.search}</figcaption>
              </figure>
            </div>
          </form>
        </div>
      </div>
      <div className="items">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <SearchResults
            items={currentItems}
            searchValue={searchValue}
            firstSearch={firstSearch}
            error={error}
          />
        )}
      </div>
      {error && !isLoading && <ErrorWindow error={error} />}
      <div>
        <Pagination
          countItemsInPage={countItemsInPage}
          countItems={countItems}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      {
        <SettingModal
          showSetting={showSetting}
          setShowSetting={setShowSetting}
          messages={messages}
        />
      }
    </div>
  )
}

export default Search
