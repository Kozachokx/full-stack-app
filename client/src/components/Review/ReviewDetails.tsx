import React, { useEffect, useState } from "react";

export function ReviewItem({ review }) {
  const [reviews, setReviews] = useState([]);

  console.log("Review Item:", review);

  return (
    <div className="review-block" key={review.id}>
      <a href="" className="a-clean, img-hover-brightness">

        <div className="review-top">
          <img src={review.imageUrl} alt="" />
          <div>
            <span className="text-outline">Status: </span>
            <span className="text-outline" style={{
              paddingRight: '5px',
              color: review.verified ? "greenyellow" : "red" 
              }}>
              {review.verified ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

      </a>

      <div className="review-bottom">
        <div className="review-text">{review.text}</div>
        <div className="review-name-date">
          <span>{review.author}</span>
          <span>18.06.2023</span>
        </div>
      </div>
    </div>
  );
}
