import React, { useEffect, useState } from 'react'
import { ReviewItem } from './ReviewItem';
import backendApi from '../../services/backend-api';

export function ReviewList() {
  // LOG 1
  // console.log(1)
  console.log('🟩Init RevewList: ', `\t\t${(new Date().toISOString()).slice(17,23)} \t\t\t\tReviewList start`)

  const [reviews, setReviews] = useState([])

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getReviews = async () => {
    setIsLoading(true);

    const { data, success, error } = await backendApi.review.getAll({})


    setIsLoading(false);
    if (!success) setIsError(true);

    if (data && data.reviews && data.reviews.length > 0 && success) {
      setReviews(data.reviews);
    }
  }

  useEffect(() => {
      // LOG 3
      // console.log(3)
      console.log('\t🟦useEffect \t\t\t\t\t\t\tReviewList useEffect')
      getReviews()
    }, [])

  // LOG 2
  return (
    <div>
      {/* <p ref={element => console.log(2)}></p> */}
      {/* <p ref={element => console.log('\t\t🟥return \t\t\t\t\tReviewList return')}></p> */}
      <h1>Reviews</h1>
      <div className='review-wrapper'>
        {/* {isError && <div>Something went wrong ...</div>} */}
        { isLoading
            ? ( <div>Loading ...</div> )
            : (
                reviews.map((el, i) => {
                  console.log('Once ', i)
                  return <ReviewItem key={el.id} review={el} />
                })
              )
        }
      </div>
    </div>
  )
}

// export default ReviewList