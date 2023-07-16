import { useState } from "react";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { useCreateReviewMutation } from "../redux/api/apiSlice";
import { toast } from "react-toastify";

const ReviewComponent = ({ id }) => {
  const [reviews, setReviews] = useState("");
  const { reviewsList } = useAppSelector((state: RootState) => state.reviews);
  const { token, user } = useAppSelector((state: RootState) => state.auth);
  const [createReviewMutation] = useCreateReviewMutation();
  console.log(id);
  console.log(reviewsList);
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
          ></textarea>
          {token && user ? (
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-fit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Add Review
            </button>
          ) : (
            <button
              type="button"
              className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800 w-fit"
            >
              Please SignIn
            </button>
          )}
        </div>
      </div>

      {/* review list */}
    </section>
  );
};

export default ReviewComponent;
