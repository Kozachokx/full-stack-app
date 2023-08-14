import React, { useEffect, useState } from "react";
import { ReviewItem } from "./ReviewItem";
import backendApi from "../../services/backend-api";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// import "./pagination.css"; // Import your custom CSS file here
import "../Features/pagination-one.css";
// import '../Features/pagination-two.css'
import { CSSTransition } from "react-transition-group";
import { Loader } from "../Shared/Loader";
import { LocalStorage } from "../../api/local-storage";

export function ReviewList() {
  // LOG 1
  // console.log('1-🟩Init RevewList: ', `\t\t${(new Date().toISOString()).slice(17,23)} \t\t\t\tReviewList start`)

  const location = useLocation();
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(location.search)
  );

  const pageSizeFromQuery = searchParams.get("pageSize");
  const pageFromQuery = searchParams.get("page");
  const initedPage =
    !isNaN(Number(pageFromQuery)) && Number(pageFromQuery) > 1
      ? pageFromQuery
      : "1";

  const [currentPage, setCurrentPage] = useState(parseInt(initedPage || "1"));
  const [totalItems, setTotalItems] = useState(0);

  const pag = LocalStorage.pagination.getPagination();
  const initedPageSize = Number(pageSizeFromQuery) || pag.pageSize || 4;

  const [pageSize, setPageSize] = useState(initedPageSize);
  const [totalPages, setTotalPages] = useState(1); // Add state to store total number of pages

  const navigate = useNavigate();

  // Change url search params
  useEffect(() => {
    const oldSearch = searchParams.toString();
    const totalPageAfter = Math.ceil(totalItems / pageSize);
    LocalStorage.pagination.setPagination({
      page: currentPage,
      pageSize: pageSize,
    })

    if (
      (totalItems > 0 && currentPage > 1 && currentPage > totalPageAfter)
    ) {
      return setCurrentPage(totalPageAfter);
    }

    if (pageSize) {
      if (pageSize <= 1) searchParams.delete("pageSize");
      else searchParams.set("pageSize", `${pageSize}`);
    }
    if (currentPage) {
      if (currentPage <= 1) searchParams.delete("page");
      else searchParams.set("page", `${currentPage}`);
    }

    const newSearchQuery = searchParams.toString();

    if (oldSearch !== newSearchQuery) {
      // Update the URL with the new page query parameter
      window.history.pushState(
        {},
        "",
        `${location.pathname}${newSearchQuery ? "?" + newSearchQuery : ""}`
      );
      setSearchParams(searchParams);
    }
  }, [currentPage, pageSize]);

  const onChangePageSize = (event) => {
    const value = Number(event.target.value);
    setPageSize(value);
  };

  const onPaginate = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  const onAddReviewClick = (e) => {
    e.preventDefault();

    navigate(`/reviews/add`, { state: {}, replace: false });
  };

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getReviews = async (page) => {
    setIsLoading(true);

    try {
      const { data, success, error } = await backendApi.review.getAll({
        page,
        size: pageSize,
      });

      setIsLoading(false);

      if (!success) {
        return setIsError(true);
      }

      if (data && data.reviews && data.reviews.length > 0) {
        setReviews(data.reviews);
      }

      if (data && data.count) {
        setTotalItems(data.count);
      } else {
        setTotalItems((data.totalPages || 0) * pageSize);
      }

      // Update the total number of pages
      if (data && data.totalPages) {
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    // LOG 3
    // console.log('\t3-🟦useEffect \t\t\t\t\t\t\tReviewList useEffect')
    getReviews(currentPage);
  }, [currentPage, pageSize]);

  // LOG 2
  return (
    <div>
      {/* <p ref={element => console.log('\t\t2-🟥return \t\t\t\t\tReviewList return')}></p> */}
      <h1>Reviews</h1>
      {
        <div className="review-list-on-top-wrapper">
          <div
            className="items-center"
            style={{ display: "flex", gap: "10px" }}
          >
            <label htmlFor="select">Page size</label>
            <select
              id="select"
              onChange={onChangePageSize}
              className="form-select"
              defaultValue={`${initedPageSize}`}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="10">10</option>
              <option value="12">12</option>
            </select>
          </div>
          <button
            className="btn btn-save"
            type="button"
            onClick={onAddReviewClick}
            style={{
              background: "forestgreen",
              borderRadius: "8%",
              width: "auto",
            }}
          >
            Add review
          </button>
        </div>
      }
      <div className="review-wrapper">
        {/* {isError && <div>Something went wrong ...</div>} */}

        {/* Render the reviews */}
        {reviews && reviews.length > 0 ? (
          reviews.map((el) => <ReviewItem key={el.id} review={el} />)
        ) : (
          <div>No reviews found.</div>
        )}
        {isLoading && <Loader />}
      </div>
      {/* Render the pagination */}
      {reviews && reviews.length > 0 && (
        <CSSTransition
          in={true}
          timeout={350}
          classNames="display"
          unmountOnExit
          appear
        >
          <ReactPaginate
            // initialPage={currentPage > 0 ? currentPage - 1 : 0}
            forcePage={currentPage > 0 ? currentPage - 1 : 0}
            previousLabel={"«"}
            nextLabel={"»"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={totalPages} // Use the total number of pages
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={onPaginate}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLinkClassName={currentPage === 1 ? "disabled" : ""}
            nextLinkClassName={currentPage === totalPages ? "disabled" : ""}
            disabledClassName={"disabled"}
          />
        </CSSTransition>
      )}
    </div>
  );
}
