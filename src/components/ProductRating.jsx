import React, { useState, useEffect } from "react";
import { Star } from "@phosphor-icons/react";
import { getProductReviews } from "../services/reviewService";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const ProductRating = ({ reviews }) => {
  const reviewsPerPage = 5;
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const getPaginatedData = (data) => {
    const startIndex = (currentReviewPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = (data) => Math.ceil(data.length / reviewsPerPage);

  const renderPagination = (data) => (
    <div className="flex items-center justify-end space-x-2 mt-4">
      <button
        onClick={() => setCurrentReviewPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentReviewPage === 1}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
      >
        <CaretLeft />
      </button>
      <span className="text-sm text-gray-500">
        Page {currentReviewPage} of {totalPages(data)}
      </span>
      <button
        onClick={() =>
          setCurrentReviewPage((prev) => Math.min(prev + 1, totalPages(data)))
        }
        disabled={currentReviewPage === totalPages(data)}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
      >
        <CaretRight />
      </button>
    </div>
  );

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.numberOfStar, 0) / reviews.length
  ).toFixed(1);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div
            className="flex mr-2"
            aria-label={`Average rating ${averageRating} out of 5`}
          >
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-6 h-6 ${
                  index < Math.floor(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                weight="fill"
              />
            ))}
          </div>
          <span className="text-lg font-semibold">
            {averageRating} trên thang 5
          </span>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-4">Đánh giá của khách hàng</h3>
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p>Không có đánh giá nào</p>
        ) : (
          getPaginatedData(reviews).map((review) => (
            <div key={review._id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">
                  {review.user.fullname}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < review.numberOfStar
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      weight="fill"
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm ml-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        )}
      </div>
      {renderPagination(reviews)}
    </div>
  );
};

export default ProductRating;
