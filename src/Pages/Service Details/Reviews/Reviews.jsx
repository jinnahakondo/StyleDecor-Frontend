import { format } from "date-fns";
import React from "react";
import { AiFillStar } from "react-icons/ai";

const Review = ({ review }) => {
    return (
        <div className="bg-base-100 border border-base-300 rounded-xl p-5">

            <div className="flex gap-4">

                {/* Avatar */}
                <img
                    src={review?.userImage}
                    alt={review?.userName}
                    className="h-12 w-12 rounded-full bg-base-200"
                />

                {/* Content */}
                <div className="flex-1 space-y-2">

                    {/* Name + Date */}
                    <div className="flex items-center justify-between">
                        <p className="font-medium">
                            {review?.userName}
                        </p>
                        <span className="text-xs text-base-content/60">
                            {/* {format(new Date(review?.date), "dd MMM yyyy")} */}
                            {/* {review.data} */}
                        </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-warning text-sm">
                        {[...Array(5)].map((_, i) => (
                            <AiFillStar key={i} />
                        ))}
                        <span className="text-xs text-base-content/60 ml-2">
                            {review?.rating}
                        </span>
                    </div>

                    {/* Comment */}
                    <p className="text-sm text-base-content/80 leading-relaxed">
                        {review?.comment}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Review;
