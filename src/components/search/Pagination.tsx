import classNames from "classnames"
import { Dispatch, SetStateAction } from "react"

type PropsPagination = {
  countItemsInPage: number
  countItems: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  currentPage: number
}

export const Pagination = ({
  countItemsInPage,
  countItems,
  setCurrentPage,
  currentPage,
}: PropsPagination) => {
  const pageCount = Math.ceil(countItems / countItemsInPage)
  const pageNumbers: number[] = Array.from({ length: pageCount }, (_, i) => i)

  return (
    <>
      {pageNumbers.length > 1 && (
        <div>
          <ul className="pagination">
            {pageNumbers.map((i) => {
              return (
                <li
                  className={classNames("item-pagination", i === currentPage && "active-page")}
                  key={String(i)}
                  onClick={() => setCurrentPage(i)}
                >
                  {i}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
