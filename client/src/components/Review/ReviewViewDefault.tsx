import React from "react";
import { formatDate } from "../../shared";

export default function ReviewViewDefault({ review }) {
  return (
    <div className="review-edit-wrapper">
      <div className="review-view t-left">
        <div className="reviw-view-items row">
          <div className="review-view-img-container column-4 w-100">
            <img
              src={review.imageUrl}
              className="img-review"
              alt="review-picture"
              width="250"
            />
          </div>
        </div>
        <div className="reviw-view-items row">
          <h2 className="column-4 br-4 m-0" style={{ color: "yellow" }}>
            {review.text}
          </h2>
        </div>
        <div className="reviw-view-items row" style={{ marginTop: "10px", maxWidth: '500px' }}>
          <span className="review-head ">Description</span>
          <p className="review-description">
            {review.description ||
              "Some text text texs. Some text text texs. Some text text texs. Some text text texs. Some text text texs. Some text text texs. Some text text texs. Some text text texs."}
          </p>
        </div>
        <div className="reviw-view-items row" style={{ marginTop: "15px" }}>
          <p className="column mw-10 m-0 p-0">Author</p>
          <p className="column-4 br-4 w-100 m-0 p-0 t-right">{review.author || ""}</p>
        </div>
        {review.createdAt >= review.updatedAt ? (
          <div className="reviw-view-items row">
            <span className="column mw-10 m-0 p-0">Created</span>
            <p className="column-4 br-4 w-100 m-0 p-0 t-right">
              {formatDate(review.createdAt) || ""}
            </p>
          </div>
        ) : (
          <div className="reviw-view-items row">
            <span className="column mw-10 m-0 p-0">Updated</span>
            <p className="column-4 br-4 w-100 m-0 p-0 t-right">
              {formatDate(review.updatedAt) || ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
