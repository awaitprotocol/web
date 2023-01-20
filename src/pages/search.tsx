import Image from "next/image"
import styles from "@/styles/search.module.css"
import filters from "@/assets/images/filter.png"
import close from "@/assets/images/close.png"
import search from "@/assets/images/icons-search.png"
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react"
import SearchResults from "@/components/SearchResults"
import { typeHits, TypeResult } from "@/pages/api/types"
import { exRes } from "@/pages/api/hello"
import LoadingSpinner from "@/components/LoadingSpinner"

const Search = () => {
  const [inputValue, setInputValue] = useState("")
  const [items, setItems] = useState<typeHits[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const inputEl = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputEl.current?.focus()
  }, [])

  const handleSubmit = async (
    e?: FormEvent<HTMLFormElement> | MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    e?.preventDefault()
    if (!inputValue) return
    setLoading(true)
    try {
      fetch(`.../${inputValue}`)
        .then((res) => res.json())
        .then((data: TypeResult) => {
          setItems(data.hits)
        })
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
    setItems(exRes.hits) //пример из api/hello.js
  }
  if (error) return <p>Server Error</p>
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
              <figure className="btn" onClick={() => handleSubmit()}>
                <Image src={search} alt="search-icon" className={styles.image} />
                <figcaption>Go!</figcaption>
              </figure>
            </div>
          </form>
        </div>
      </div>
      <div className="items">
        {isLoading ? <LoadingSpinner /> : <SearchResults items={items} />}
      </div>
    </div>
  )
}
export default Search
