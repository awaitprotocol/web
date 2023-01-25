import classNames from "classnames"

type PropsPagination = {
  countItemsInPage: number
  countItems: number
  // eslint-disable-next-line no-unused-vars
  setCurrentPage: (i: number) => void
  currentPage: number
}

const Pagination = ({
  countItemsInPage,
  countItems,
  setCurrentPage,
  currentPage,
}: PropsPagination) => {
  const pageCount = Math.ceil(countItems / countItemsInPage)
  const pageNumbers: number[] = Array.from({ length: pageCount }, (_, i) => i)

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
export default Pagination
