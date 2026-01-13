import { format } from "date-fns";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import Review from "./Review";

const Reviews = ({ reviews }) => {

    return (
        <div className="flex flex-col gap-4">
            {
                reviews.map((review, i) => <Review key={i} review={review} />)
            }

        </div>
    );
};

export default Reviews;
