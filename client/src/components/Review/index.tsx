// import React, { useEffect, useState } from 'react'
// import { backService } from '../../services';
// import ReviewItem from './ReviewItem';

// function ReviewList() {
//   const [reviews, setReviews] = useState([])

//   useEffect(() => {
//     const reviews = backService.getReviews();
//     console.log(reviews)

//     if (reviews && Array.isArray(reviews)) setReviews(reviews)

//     return () => {
//       reviews
//     }
//   }, [])

//   return (
//     <div>
//       <div>Reviews</div>
//       <div className='review-wrapper'>
//         {
//           reviews && reviews.length
//             ? reviews.map(el => <ReviewItem key={el.id} />)
//             : <p>0 or Loading...</p>
//         }
//       </div>
//     </div>
//   )
// }

// export default ReviewList

export * from './ReviewItem'
export * from './ReviewList'