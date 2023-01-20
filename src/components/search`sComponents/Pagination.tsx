import classNames from "classnames";

type PropsPagination = {
  countItemsInPage: number;
  countItems: number;
  setCurrentPage: (i: number) => void;
  currentPage: number;
};

export default function Pagination({
  countItemsInPage,
  countItems,
  setCurrentPage,
  currentPage,
}: PropsPagination) {
  const pageCount = Math.ceil(countItems / countItemsInPage);
  const pageNumbers: number[] = [];

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }
  // const paginationClass = classNames('item-pagination', {
  //     'active-page': i===currentPage,
  //   });
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map(function (i) {
          return (
            <li
              className={
                i === currentPage
                  ? "item-pagination active-page"
                  : "item-pagination"
              }
              key={String(i)}
              onClick={() => setCurrentPage(i)}
            >
              {i}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
