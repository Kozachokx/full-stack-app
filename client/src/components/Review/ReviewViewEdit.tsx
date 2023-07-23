import React, { useEffect, useState } from "react";
import { formatDate } from "../../shared";
import { useParams } from "react-router-dom";

export default function ReviewViewEdit({ review, onUpdate }) {
  const { id } = useParams();

  console.log(!review, typeof review)

  const [imageUrl, setImgUrl] = useState(review.imageUrl || "");
  const [previewImageUrl, setPreviewImgUrl] = useState(review.imageUrl || "");
  const [title, setTitle] = useState(review.text || "");
  const [description, setDesc] = useState(review.description || "");

  const handleOnPreview = () => {
    setPreviewImgUrl(imageUrl);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    // Call the onUpdate callback function with the updated values
    onUpdate({ imageUrl, title, description });
  }, []);

  const onImgChange = (e) => setImgUrl(e.target.value);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onDescriptionChange = (e) => setDesc(e.target.value);

  const handleOnSave = () => {
    if (!id)
      return console.error(`Bad 'id' from params. Provided id: '${id}'.`);

    const updateReview: {
      id: string;
      imageUrl?: string;
      text?: string;
      description?: string;
    } = {
      id,
    };
    if (review.text !== title) updateReview.text = title;
    if (review.imageUrl !== imageUrl) updateReview.imageUrl = imageUrl;
    if (review.description !== description)
      updateReview.description = description;

    console.log("Save: ");
    console.log(updateReview);
    if (Object.keys(updateReview).length <= 1) return "Nothing to update";
  };

  return (
    !review || typeof review !== 'object' || Object.keys(review).length < 3
      ? 'Loading...'
      :
  (
    <div className="review-edit-wrapper">
      <div className="review-view t-left">
        <div className="reviw-view-items row">
          <div className="review-view-img-container column-4 w-100">
            <img
              src={previewImageUrl}
              className="img-review"
              alt="review-picture"
              width="250"
            />
          </div>
        </div>
        <div className="reviw-view-items row">
          <p className="column jc-center mw-85 m-0 p-0">Picture url</p>
          <input
            type="text"
            className="column-4 cl-dark-l br-4 w-100"
            value={imageUrl}
            onChange={onImgChange}
            placeholder="Please insert valid image URL and press preview"
          />
        </div>
        <div className="reviw-view-items row">
          <div className="column mw-85">
            <button
              type="button"
              className="btn"
              onClick={handleOnPreview}
              style={{ width: "fit-content", alignSelf: 'center' }}
            >
              Apply Image
            </button>
          </div>
        </div>
        <div className="reviw-view-items row">
          <p className="column mw-85 m-0 p-0">Title</p>
          <input
            type="text"
            className="column-4 cl-dark-l br-4 w-100"
            value={title}
            onChange={onTitleChange}
            placeholder="Title to your review"
          />
        </div>
        <div className="reviw-view-items row">
          <p className="column mw-85 m-0 p-0">Description</p>
          <textarea
            className="column-4 cl-dark-l br-4 w-100"
            value={description || ""}
            onChange={onDescriptionChange}
            placeholder="Description to your review"
            style={{ minHeight: "20px" }}
          ></textarea>
          {/* <textarea rows="4" cols="50" className="column-4 cl-dark-l br-4 w-100" placeholder={review.description || ''}></textarea> */}
          {/* <input type="text" className="column-4 cl-dark-l br-4" placeholder={review.description || ''} /> */}
        </div>
        <div className="reviw-view-items row">
          <p className="column mw-85 m-0 p-0">Author</p>
          <p className="column-4 br-4 w-100 m-0 p-0">{review.author || ""}</p>
        </div>
        {review.createdAt >= review.updatedAt ? (
          <div className="reviw-view-items row">
            <p className="column mw-85 m-0 p-0">Created</p>
            <p className="column-4 br-4 m-0 p-0">
              {formatDate(review.createdAt) || ""}
            </p>
          </div>
        ) : (
          <div className="reviw-view-items row">
            <p className="column mw-10 m-0 p-0">Updated</p>
            <p className="column-4 br-4 m-0 p-0">
              {formatDate(review.updatedAt) || ""}
            </p>
          </div>
        )}
        <div className="edit-save-cancel">
          <button type="submit" onClick={handleOnSave} className="btn btn-save">
            Save
          </button>
          <button type="reset" className="btn btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  )
  );
}
