import { Dialog } from "@material-tailwind/react";
import { Star } from "@phosphor-icons/react";
import React, { useState } from "react";
import { createReview } from "../services/reviewService";

export default function RatingDialog({ productId, open, handleOpen }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const newReview = {
      productId,
      userId: user._id,
      numberOfStar: rating,
      comment: review,
    };
    console.log(newReview);
    const response = await createReview(
      newReview,
      localStorage.getItem("accessToken")
    );
    console.log(response);
    setRating(0);
    setReview("");

    handleOpen(productId);
  };

  const RatingStars = ({ value, isInteractive = false }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <Star
              key={index}
              className={`h-6 w-6 ${isInteractive ? "cursor-pointer" : ""} ${
                ratingValue <= (isInteractive ? hover || rating : value)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => isInteractive && setHover(ratingValue)}
              onMouseLeave={() => isInteractive && setHover(0)}
              onClick={() => isInteractive && setRating(ratingValue)}
              weight="fill"
            />
          );
        })}
      </div>
    );
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Average Rating Display */}
        {/* <div className="mb-8">
          <div className="flex items-center gap-4">
            <RatingStars value={averageRating} />
            <span className="text-lg text-gray-600">
              {averageRating} out of 5 ({totalReviews} reviews)
            </span>
          </div>
        </div> */}

        {/* Rating Submission Form */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Viết đánh giá</h3>
          <form onSubmit={handleSubmit}>
            <div className=" mb-4">
              <label className="block text-gray-700 mb-2">
                Đánh giá của bạn
              </label>
              <RatingStars value={rating} isInteractive={true} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="review">
                Mô tả cụ thể (tuỳ chọn)
              </label>
              <textarea
                id="review"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Chia sẽ suy nghĩ của bạn về đơn hàng..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-organe-700 transition-colors"
              disabled={!rating}
            >
              Đánh giá
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
