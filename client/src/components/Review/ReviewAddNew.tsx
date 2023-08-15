import React, { useEffect, useState } from "react";
import { formatDate } from "../../shared";
import { useNavigate, useParams } from "react-router-dom";
import { LocalStorage } from "../../api/local-storage";
import backendApi from "../../services/backend-api";

const noImgAvaliableUlr =
  "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

export function ReviewAddNew({}) {
  const navigate = useNavigate();

  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(LocalStorage.getUser() || {});

  const getUserData = async () => {
    const localTokens = LocalStorage.getTokens();
    
    if (localTokens?.accessToken && (!currentUser?.firstName || !currentUser?.lastName)) {
      console.log('In get user data')

      const { data: userData } = await backendApi.users.getByAuthToken();

      console.log(userData)

      if (userData) {
        const { id, _id, username, isAdmin } = userData;
        const user: {
          id: string;
          assignedId: string;
          username: string;
          firstName?: string;
          lastName?: string;
          isAdmin?: boolean;
        } = {
          id,
          assignedId: _id,
          username,
          isAdmin: isAdmin || false,
        };
        if (userData.firstName) user.firstName = userData.firstName;
        if (userData.lastName) user.lastName = userData.lastName;
        LocalStorage.setUser(user);
        setCurrentUser(user);
      }
    }
  };

  useEffect(()=>{
    getUserData();
  },[currentUser])

  const review = {
    text: "",
    imageUrl: "",
    description: "",
  };

  const [imageUrl, setImgUrl] = useState(review.imageUrl || "");
  const [previewImageUrl, setPreviewImgUrl] = useState(noImgAvaliableUlr || "");
  const [title, setTitle] = useState(review.text || "");
  const [description, setDesc] = useState(review.description || "");

  const [error, setError] = useState("");
  const [imgError, setImgError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleOnPreview = () => {
    setPreviewImgUrl(imageUrl);
  };

  useEffect(() => {
    // Call the onUpdate callback function with the updated values
    // onUpdate({ imageUrl, title, description });
  }, []);

  const onImgChange = (e) => {
    setImgUrl(e.target.value);
    setError("");
    setImgError(false);
  };
  const onTitleChange = (e) => {
    setTitle(e.target.value);
    setError("");
    setTitleError(false);
  };
  const onDescriptionChange = (e) => {
    setDesc(e.target.value);
    setError("");
    setDescriptionError(false);
  };

  const handleOnSave = async (e) => {
    // Prevent default form action
    e.preventDefault();
    setError("");

    if (!imageUrl) {
      setImgError(true);
      return setError("Image url is required!");
    }

    if (!title) {
      setTitleError(true);
      return setError("Title is required!");
    }
    if (title.length < 3) {
      setTitleError(true);
      return setError("Title should be at leat 4 symbols!");
    }

    if (!description) {
      setDescriptionError(true);
      return setError("Please fill some Description.");
    }

    const { data, success } = await backendApi.review.createNew({
      imageUrl,
      text: title,
      description,
    });

    if (!data && !data.review) {
      setError(data.message || data.error.message || "Something went worng!");
    }

    // setIsLoading(false);

    if (data.review && data.review.id) {
      navigate(`/reviews/${data.review.id}`, { state: {}, replace: false });
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return !review ||
    typeof review !== "object" ||
    Object.keys(review).length < 3 ? (
    "Loading..."
  ) : (
    <div className="flex flex-column items-center">
      {/* <div className="review-edit-wrapper"> */}
      {error && (
        <div
          style={{
            width: "calc(100% - 25%)",
            maxWidth: "600px",
          }}
          className={`signup-error ${error ? "show" : ""}`}
          onTransitionEnd={(e) => {
            console.log("Test transition");
          }}
        >
          {error}
        </div>
      )}

      <div
        className="review-view t-left gap-10"
        // style={{ height: "100%" }}
      >
        <div className="reviw-view-items gap row">
          <div className="review-view-img-container column-4 w-100">
            <img
              src={previewImageUrl}
              className="img-review"
              alt="review-picture"
              width="250"
            />
          </div>
        </div>
        <div className="reviw-view-items gap row">
          <p className="column jc-center mw-85 m-0 p-0">Picture url</p>
          <input
            type="text"
            className={`column-4 cl-dark-l br-4 w-100 ${
              imgError ? "signup-input-error" : ""
            }`}
            value={imageUrl}
            onChange={onImgChange}
            placeholder="Please insert valid image URL and press apply"
          />
        </div>
        <div className="reviw-view-items gap row">
          <div className="column mw-85">
            <button
              type="button"
              className="btn"
              onClick={handleOnPreview}
              style={{ width: "fit-content", alignSelf: "center" }}
            >
              Apply Image
            </button>
          </div>
        </div>
        <div className="reviw-view-items gap row">
          <p className="column mw-85 m-0 p-0">Title</p>
          <input
            type="text"
            className={`column-4 cl-dark-l br-4 w-100 ${
              titleError ? "signup-input-error" : ""
            }`}
            value={title}
            onChange={onTitleChange}
            placeholder="Title to your review"
          />
        </div>
        <div className="reviw-view-items gap row">
          <p className="column mw-85 m-0 p-0">Description</p>
          <textarea
            className={`column-4 cl-dark-l br-4 w-100 ${
              descriptionError ? "signup-input-error" : ""
            }`}
            value={description || ""}
            onChange={onDescriptionChange}
            placeholder="Description to your review"
            style={{ minHeight: "20px" }}
          ></textarea>
        </div>
        <div className="reviw-view-items gap row">
          <p className="column mw-85 m-0 p-0">Author</p>
          <p className="column-4 br-4 w-100 m-0 p-0 t-right">
            {(currentUser.firstName &&
              currentUser.lastName &&
              `${currentUser.firstName} ${currentUser.lastName}`) ||
              currentUser.username ||
              "Anonymous User"}
          </p>
        </div>

        {
          <div className="edit-save-cancel">
            <button
              type="submit"
              onClick={handleOnSave}
              className="btn btn-save"
            >
              Create
            </button>
            <button type="reset" onClick={goBack} className="btn btn-cancel">
              Cancel
            </button>
          </div>
        }
      </div>
    </div>
  );
}
