import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { formatDate } from "../../shared";

export function ReviewItem({ review }) {
  const navigate = useNavigate();

  // const [getReview, setReview] = useState([]);

  // console.log(new Date().toISOString())
  // console.log(`${(new Date().toISOString()).slice(17,23)}`)
  // console.log(`${new Date().getSeconds()}.${new Date().getMilliseconds()}`)
  // console.log("[?] Review Item:", review.id, new Date().toISOString());

  // console.log("\t\t\t🟡 \t\t\t\tReview Item:", review.id, `${new Date().toISOString().slice(17, 23)}`);

  // console.log('\t\t🟥return \t\t\t\t\tReviewList return')

  useEffect(() => {
    // console.log("\t\t\t\t🔵 \t\t\tReview Item:", review.id);
  }, []);

  const handleOnView = (e) => {
    e.preventDefault();

    // console.log("Navigate to: ", `reviews/${review.id}`);
    navigate(`/reviews/${review.id}`, { state: { review }, replace: false });
  };

  return (
    <div className="review-block" key={review.id}>
      <a
        href=""
        onClick={handleOnView}
        className="a-clean, img-hover-brightness"
      >
        {/* <Link to={{pathname: `/reviews/${review.id}`}} className="a-clean, img-hover-brightness"  review={review}> */}
        <div className="review-top">
          <img
            src={review.imageUrl}
            className="img-in-list"
            alt="review-picture"
            width="250"
          />
          <div>
            <span className="text-outline">Status: </span>
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
        </div>
        {/* </Link> */}
      </a>

      <div className="review-bottom">
        <div className="review-text">{review.text}</div>
        <div className="review-name-date">
          <span>{review.author}</span>
          <span>
            {formatDate(
              review.createdAt >= review.updatedAt
                ? review.createdAt
                : review.updatedAt
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
