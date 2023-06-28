import React from 'react'

const formatDate = (dateStr) => {
  try {
    const date = new Date(dateStr).toISOString().split("T")[0].split("-");
    return `${date[2]}.${date[1]}.${date[0]}`;
  } catch (error) {
    return `${dateStr}`;
  }
};

export default function ReviewViewDefault({ review }) {
  return (
    <div className="review-view t-left">
      <div className="reviw-view-items row">
        <p className="column jc-center">Picture</p>
        <div className="review-view-img-container column-4">
          <img src={review.imageUrl} className="img-review" alt="review-picture" width="250" />
        </div>
      </div>
      <div className="reviw-view-items row">
        <p className="column mw-10">Title</p>
        <p className="column-4 cl-dark-l br-4">{review.text}</p>
      </div>
      <div className="reviw-view-items row">
        <p className="column mw-10">Description</p>
        <p className="column-4 cl-dark-l br-4">{review.description || ''}</p>
      </div>
      <div className="reviw-view-items row">
        <p className="column mw-10">Author</p>
        <p className="column-4 cl-dark-l br-4">{review.author || ''}</p>
      </div>
      {
        review.createdAt >= review.updatedAt
          ?
            (
              <div className="reviw-view-items row">
                <p className="column mw-10">Created</p>
                <p className="column-4 cl-dark-l br-4">{formatDate(review.createdAt) || ''}</p>
              </div>
            )
          :
            (
              <div className="reviw-view-items row">
                <p className="column mw-10">Updated</p>
                <p className="column-4 cl-dark-l br-4">{formatDate(review.updatedAt) || ''}</p>
              </div>
            )
      }
    </div>
  )
}
