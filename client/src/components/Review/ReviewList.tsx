import React, { useEffect, useState } from 'react'
import { backService } from '../../services';
import { ReviewItem } from './ReviewItem';
import backendApi from '../../services/backend-api';
import { getReviews } from '../../services/backend.service';

export function ReviewList() {
  const [reviews, setReviews] = useState([])

  const getReviews = async () => {
    const reviews = await backendApi.review.getAll({})
  // reviews[1].verified = true;

    setReviews(reviews || [])
  }

  useEffect(() => {
      getReviews()
    }, [])

  return (
    <div>
      <div><h1>Reviews</h1></div>
      <div className='review-wrapper'>
        {
          reviews && reviews.length
            ? reviews.map(el => <ReviewItem review={el} />)
            : <p>0 or Loading...</p>
        }
      </div>
    </div>
  )
}

// export default ReviewList