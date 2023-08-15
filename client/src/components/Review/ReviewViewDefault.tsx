import React from "react";
import { formatDate } from "../../shared";
import { LocalStorage } from "../../api/local-storage";
const revMock = {
  description: "Some text text texs. Some text text texs. Some text text texs. Some text text texs. Some text text texs. Some text text texs. Some text text texs. Some text text texs."
}

export default function ReviewViewDefault({ review }) {
  const [showDate, lastAction] = review.createdAt >= review.updatedAt
    ? [review.createdAt, 'Created']
    : [review.updatedAt, 'Updated'];

  const user = LocalStorage.getUser();
  const haveAuthorRights = !!review?.user && !!user.assignedId && review.user === user.assignedId;

  const isAdmin = user?.isAdmin || false;

  return (
    <div className="review-edit-wrapper">
      <div className="review-view t-left">
        {
          (isAdmin || haveAuthorRights) &&
          (
            <div className="reviw-view-items row jc-right" style={{}}>
              <span className="text-outline" style={{ paddingRight: "5px" }}>Status: </span>
              <span
                className="text-outline"
                style={{
                  paddingRight: "5px",
                  color: review.verified ? "greenyellow" : "red",
                }}
              >
                {review.verified ? "Verified" : "Not Verified"}
              </span>
            </div>
          )   
        }
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
        <div
          className="reviw-view-items row"
          style={{ marginTop: "10px", maxWidth: "500px" }}
        >
          <span className="review-head ">Description</span>
          <p className="review-description">
            {review.description || ""}
          </p>
        </div>
        <div className="reviw-view-items row" style={{ marginTop: "15px" }}>
          <p className="column mw-10 m-0 p-0">Author</p>
          <p className="column-4 br-4 w-100 m-0 p-0 t-right">
            {review.author || ""}
          </p>
        </div>
        <div className="reviw-view-items gap row">
            <p className="column mw-85 m-0 p-0">{lastAction}</p>
            <p className="column-4 br-4 m-0 p-0 t-right">
              {formatDate(showDate) || ""}
            </p>
          </div>
      </div>
    </div>
  );
}
