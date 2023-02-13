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

const Search = ({ messages }: Props) => {
  const [startValue, setStartValue] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [items, setItems] = useState<SearchResponseHit<Schema>[]>([])
  const [itemsFound, setItemsFound] = useState(0)
  const [countItemsInPage, setCountItemsInPage] = useState(10)
  const [firstSearch, setFirstSearch] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const inputEl = useRef<HTMLInputElement>(null)
  const [showSetting, setShowSetting] = useState(false)
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(Number(router.asPath.split("&page=")[1]) || 1)

  const pathQ = router?.query?.q
  const handleSubmit = async (e?: SyntheticEvent<EventTarget>) => {
    e?.preventDefault()
    if (!inputValue) return
    if (pathQ !== inputValue && inputValue !== startValue) {
      router.replace(`/search?q=${inputValue}`)
      setCurrentPage(1)
    }
    if (pathQ !== inputValue) router.push("/search?q=" + inputValue)
    if (currentPage === 1) router.replace(`/search?q=${inputValue}`)
    if (currentPage !== 1) router.push("/search?q=" + inputValue + "&page=" + currentPage)

    setSearchValue(inputValue)
    setLoading(true)
    const res = await fetch(
      "api/search?" +
        new URLSearchParams({
          q: inputValue,
          page: currentPage.toString(),
        }),
    )
    setFirstSearch(true)
    if (!res.ok) {
      setError("Server error")
      setLoading(false)
      return
    }
    const data: Res = await res.json()
    if (data.success) {
      setItems(data.result.hits || [])
      setCountItemsInPage(data.result.request_params.per_page || 10)
      setItemsFound(data.result.found)
      setLoading(false)
      setError("")
    } else {
      setError("Error")
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSubmit()
  }, [currentPage])

  useEffect(() => {
    if (pathQ) {
      setSearchValue(pathQ as string)
      setInputValue(pathQ as string)
      setStartValue(pathQ as string)
      handleSubmit()
      return
    }
    inputEl.current?.focus()
  }, [pathQ, startValue])

  const cleanInput = () => {
    setInputValue("")
    inputEl.current?.focus()
    setFirstSearch(false)
  }

  return (
    <div className={classNames("page-container", pathQ && "page-container-top")}>
      <div className={classNames(styles.header, pathQ ? styles.headerTop : styles.headerCenter)}>
        <div>
          <h1 className={classNames(styles.headerText, pathQ && styles.headerTextTop)}>
            Search<span className="color-orange">.</span>
          </h1>
          <p className={pathQ ? "none" : styles.text}>
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
                <figcaption className="search-text">{messages.search}</figcaption>
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
            items={items}
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
          countItems={itemsFound}
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
