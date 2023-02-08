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
import { Messages, Schema } from "@/shared/typesense"
import { useRouter } from "next/router"
import classNames from "classnames"

type Props = {
  messages: Messages
}

const countItemsInPage = 10
const Search = ({ messages }: Props) => {
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
  const getPath = () => router?.query?.q
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
      setSearchValue(path as string)
      setInputValue(path as string)
      setStartValue(path as string)
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
    <div className={classNames("page-container", path && "page-container-top")}>
      <div className={classNames(styles.header, path ? styles.headerTop : styles.headerCenter)}>
        <div>
          <h1 className={classNames(styles.headerText, path && styles.headerTextTop)}>
            Search<span className="color-orange">.</span>
          </h1>
          <p className={path ? "none" : styles.text}>
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
