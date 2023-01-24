import classNames from "classnames"

type PropsPagination = {
  countItemsInPage: number
  countItems: number
  // eslint-disable-next-line no-unused-vars
  setCurrentPage: (i: number) => void
  currentPage: number
}

export default function Pagination({
  countItemsInPage,
  countItems,
  setCurrentPage,
  currentPage,
}: PropsPagination) {
  const pageCount = Math.ceil(countItems / countItemsInPage)
  const pageNumbers: number[] = []

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i)
  }
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map(function (i) {
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
  )
}
