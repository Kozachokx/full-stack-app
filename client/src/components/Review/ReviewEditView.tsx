import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import backendApi from "../../services/backend-api";
import ReviewViewDefault from "./ReviewViewDefault";
import { LocalStorage } from "../../api/local-storage";

export function ReviewEditView({ review }) {
  console.log("Input review:");
  console.log(review);
  console.log(" ");

  const location = useLocation();
  const { review: reviewState } = location.state;
  console.log("location.state.review is:");
  console.log(reviewState);
  console.log(" ");

  // const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  console.warn("ReviewEditView");
  console.log("Params ", id);

  /*
    author: "Anonymous User"
    createdAt: "2023-06-16T14:06:43.903Z"
    id: 5
    imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    text: "This food is awesome! Taste 5/5!!"
    updatedAt: "2023-06-16T14:06:43.903Z"
    user: "648c5f1b210bf548e6edc7b2"
    verified: true
    __v: 0
    _id: "648c6c7384cdae0cddc08f81"
  */

  let reviewData = review || reviewState;

  console.log("Review  data:", reviewData);
  const getReview = async () => {
    const reviewBack = await backendApi.review.getById(reviewData.id || id);

    console.log("reviewBack:");
    console.log(reviewBack);
    console.log(" ");
  };

  useEffect(() => {
    if (!reviewData || Object.keys(reviewData).length < 10) {
      getReview();
    }
  }, []);

  console.log('createdAt: \t', reviewData.createdAt)
  console.log('updatedAt: \t', reviewData.updatedAt)

  // if (review.user) {
  // }

  const userData = LocalStorage.getUser();

  return (
    <ReviewViewDefault review={reviewData} />
  );
}

{/* <div className="review-block" key={reviewData.id}>
  <div className="review-top">
    <img src={reviewData.imageUrl} alt="" />
    <div>
      <span className="text-outline">Status: </span>
      <span
        className="text-outline"
        style={{
          paddingRight: "5px",
          color: reviewData.verified ? "greenyellow" : "red",
        }}
      >
        {reviewData.verified ? "Verified" : "Not Verified"}
      </span>
    </div>
  </div>

  <div className="review-bottom">
    <div className="review-text">{reviewData.text}</div>
    <div className="review-name-date">
      <span>{reviewData.author}</span>
      <span>18.06.2023</span>
    </div>
  </div>
</div>; */}
