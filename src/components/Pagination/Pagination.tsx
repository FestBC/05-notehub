import css from "./Pagination.module.css";

import ReactPaginate from "react-paginate";

interface PropsPagination {
    setPage: (page: number) => void,
    page: number,
    totalPages: number
}

export default function Pagination({ setPage, page, totalPages }: PropsPagination) {
    return (
        <ReactPaginate
          nextLabel="→"
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          pageCount={totalPages}
          previousLabel="←"
          containerClassName={css.pagination}
          activeClassName={css.active}
        />
    );
}