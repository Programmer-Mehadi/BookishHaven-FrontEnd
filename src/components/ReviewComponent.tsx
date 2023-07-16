import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import {
  useCreateReviewMutation,
  useGetAllReviewsByIdQuery,
} from "../redux/api/apiSlice";
import { toast } from "react-toastify";
import { setReviewsList } from "../redux/features/reviews/reviewsSlice";
import { Link } from "react-router-dom";

const ReviewComponent = ({ id }) => {
  const [reviews, setReviews] = useState("");
  const { reviewsList } = useAppSelector((state: RootState) => state.reviews);
  const { token, user } = useAppSelector((state: RootState) => state.auth);
  const [createReviewMutation] = useCreateReviewMutation();
  let { data: reviewData, refetch } = useGetAllReviewsByIdQuery(id);
  const dispatch = useAppDispatch();
  useEffect(() => {
    void refetch();
    if (reviewData?.data) {
      dispatch(
        setReviewsList({
          reviewsList: reviewData.data,
        })
      );
      reviewData = undefined;
    }
  }, [reviewData]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviews !== "") {
      createReviewMutation({
        userId: user?._id,
        bookId: id,
        text: reviews,
      }).then((res) => {
        if ("data" in res) {
          if (res.data.data) {
            toast.success(res.data.message);
            setReviews("");
            void refetch();
          } else {
            toast.error(res.data.message);
          }
        } else {
          toast.error("Something went wrong");
        }
      });
    } else {
      toast.error("Please fill all the fields");
    }
  };
  return (
    <section className="my-10 w-full">
      <div>
        <div className="grid gap-2">
          <label htmlFor="" className="text-lg font-semibold">
            Write a Review
          </label>
          <textarea
            name=""
            id=""
            rows={3}
            className="rounded-[8px] text-base font-medium p-2"
            onChange={(e) => setReviews(e.target.value)}
            value={reviews}
            disabled={token === "" ? true : false}
          ></textarea>
          {token && user ? (
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300  rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-fit font-semibold text-lg"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Add Review
            </button>
          ) : (
            <Link
              to="/signin"
              type="button"
              className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800 w-fit"
            >
              Please SignIn
            </Link>
          )}
        </div>
      </div>

      {/* review list */}
      <div className="my-10">
        <div>
          <h1 className="text-2xl font-bold ">Previous Reviews</h1>
        </div>
        <div>
          <div className="grid gap-3 mt-8">
            {reviewsList &&
              reviewsList.map((review) => (
                <div key={review._id}>
                  <h1 className="font-bold">
                    Name:{" "}
                    <span className="font-normal">{review?.userId?.name}</span>
                  </h1>
                  <h4>
                    <span className="font-bold">Review: </span>
                    {review.text}
                  </h4>
                </div>
              ))}
            {reviewsList && reviewsList.length === 0 && (
              <h1 className="font-bold ">No Reviews</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewComponent;
