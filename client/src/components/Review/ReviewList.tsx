import React, { useEffect, useState } from "react";
import { ReviewItem } from "./ReviewItem";
import backendApi from "../../services/backend-api";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// import "./pagination.css"; // Import your custom CSS file here
import '../Features/pagination-one.css'
// import '../Features/pagination-two.css'

export function ReviewList() {
  // LOG 1
  // console.log('1-🟩Init RevewList: ', `\t\t${(new Date().toISOString()).slice(17,23)} \t\t\t\tReviewList start`)

  const location = useLocation();
  const [searchParams, setSearchParams] = useState(new URLSearchParams(location.search));
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));

  const [pageSize, setPageSize] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Add state to store total number of pages


  // Change url search params
  useEffect(() => {
    const oldSearch = searchParams.toString();

    if (pageSize) searchParams.set('pageSize', `${pageSize}`);
    if (currentPage) searchParams.set('page', `${currentPage}`);

    if(oldSearch !== searchParams.toString()) {
      window.history.pushState({}, '', `${location.pathname}?${oldSearch}`);
      setSearchParams(searchParams);
    }
  }, [currentPage, pageSize])

  const onChangePageSize = (event) => {
    const value = Number(event.target.value);
    setPageSize(value);
  };

  // const setString 

  console.warn('location', location)

  const paginate = ({ selected }) => {
    const newPage = selected + 1;

    console.error(`${selected} >> ${newPage}`)

    // searchParams.set('page', newPage);
    setCurrentPage(newPage);
    const newSearch = searchParams.toString();

    
    // Update the URL with the new page query parameter
    window.history.pushState({}, '', `${location.pathname}?${newSearch}`);
    console.warn(searchParams)
    console.warn(1)
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
        setIsError(true);
      } else {
        if (data && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }

        // Update the total number of pages
        if (data && data.totalPages) {
          setTotalPages(data.totalPages);
        }
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
        <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
          <label htmlFor="select">Page size</label>
          <select id="select" onChange={onChangePageSize} className="form-select">
            <option defaultValue='1' value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          </div>
          <button type="button" style={{ background: 'forestgreen', borderRadius: '8%' }}>Add review</button>
        </div>
        }
      <div className="review-wrapper">
        {/* {isError && <div>Something went wrong ...</div>} */}

        {/* Render the reviews */}
        { isLoading
            ? (<div>Loading ...</div>)
            : reviews && reviews.length > 0
              ? (reviews.map((el) => <ReviewItem key={el.id} review={el} />))
              : (<div>No reviews found.</div>)}

      </div>
        {/* Render the pagination */}
        { !isLoading && reviews && reviews.length > 0 &&
            (
              <ReactPaginate
                initialPage={currentPage-1}
                previousLabel={"«"}
                nextLabel={"»"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages} // Use the total number of pages
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={paginate}
                containerClassName={"pagination"}
                activeClassName={"active"}
                previousLinkClassName={currentPage === 1 ? "disabled" : ""}
                nextLinkClassName={currentPage === totalPages ? "disabled" : ""}
                disabledClassName={"disabled"}
              />
            )
        }
    </div>
  );
}
