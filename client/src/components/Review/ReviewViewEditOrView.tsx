import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import backendApi from "../../services/backend-api";
import ReviewViewDefault from "./ReviewViewDefault";
import { LocalStorage } from "../../api/local-storage";
import ReviewViewEdit from "./ReviewViewEdit";
import EditSaveButtons from "./EditSaveButtons";
import { Loader } from "../Shared/Loader";

export function ReviewEditView({ review }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateLoad, setUpdateLoad] = useState(false);
  const [reviewData, setReviewData] = useState({});

  const location = useLocation();
  const { review: reviewState } = location?.state || {};

  const { id } = useParams();

  const [isEditable, setIsEditable] = useState(false);
  const [inEditMode, setEditMode] = useState(false);

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

  let data = review || reviewState;

  if (
    typeof data === "object" &&
    Object.keys(data).length > 6 &&
    !reviewData &&
    typeof reviewData !== "object" &&
    Object.keys(reviewData).length < 3
  ) {
    setReviewData(data);
  }

  const getReview = async () => {
    const res = await backendApi.review.getById(reviewData?.id || id);

    if (!res.success || !res.data) {
      console.error("FAILED!");
    }

    const { review } = res.data;

    if (Object.keys(reviewData) < Object.keys(review)) {
      setReviewData(review);
    }

    setIsLoading(false);
  };

  const checkIsEditable = async () => {
    let localUserData = LocalStorage.getUser() || {};

    const {
      data: userBack,
    } = await backendApi.users.getByAuthToken();

    if (userBack && Object.keys(userBack).length > 1) {
      if (userBack.id) localUserData.id = userBack.id;
      if (userBack._id) localUserData.assignedId = userBack._id;
      if (userBack.isAdmin) localUserData.isAdmin = userBack.isAdmin;
    }

    // Check if has user rights or has admin rights
    if (
      (localUserData && localUserData.assignedId && localUserData.assignedId === reviewData.user) ||
      userBack?.isAdmin
    ) {
      setIsEditable(true);
    }
  };

  useEffect(() => {
    if (!reviewData || Object.keys(reviewData).length < 10) {
      setIsLoading(true);
      getReview();
    }
    checkIsEditable();
  }, []);

  const handleOnEditClick = (value) => {
    if (typeof value !== 'boolean') {
      setEditMode((prev) => !prev);
    } else {
       setEditMode(value);
     }
  };

  const handleOnDeleteClick = async () => {
    const res = await backendApi.review.deleteById(reviewData?.id || id);

    if (res.success) {
      console.log('Success')
    } else {
      console.log('NOT Success')
    }
    // delete this review logic
  };

  const [updatedValues, setUpdatedValues] = useState(review || {});
  const handleUpdateValues = (values) => {
    setUpdatedValues(values);
  };

  const handleOnSave = async () => {
    if (typeof updatedValues !== 'object' || Object.keys(updatedValues).length <= 1) {
      return 'Nothing to update!';
    }

    setUpdateLoad(!isUpdateLoad);

    // Send update request;
    const result = await backendApi.review.updateById(updatedValues);

    if (result.success) {
      setReviewData({ ...reviewData, ...updatedValues });
      setUpdatedValues({ id: reviewData?.id || id });
    }

    setUpdateLoad(false);
    return { success: true };
  }


  return (
    <div className="flex flex-column items-center">
      {isEditable ? (
        <EditSaveButtons
          handleOnDeleteClick={handleOnDeleteClick}
          handleOnEditClick={handleOnEditClick}
          handleOnSave={handleOnSave}
          props={{ saveButtonIsDisabled: Object.keys(updatedValues).length <= 1 }}
        />
      ) : (
        ""
      )}
      {isLoading && <Loader />}
      {isLoading ? (
        "Loading..."
      ) : inEditMode ? (
        <ReviewViewEdit review={reviewData} onUpdate={handleUpdateValues} isLoading={isUpdateLoad} />
      ) : (
        <ReviewViewDefault review={reviewData} />
      )}
    </div>
  );
}

{
  /* <div className="review-block" key={reviewData.id}>
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
</div>; */
}
