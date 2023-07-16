import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useState } from "react";
import {
  useCreateWishListMutation,
  useGetAllWishListMutation,
} from "../redux/api/apiSlice";
import { toast } from "react-toastify";
import { setWishList } from "../redux/features/wishlist/wishlistSlice";

const BookCard = ({ book }) => {
  const date = new Date(book.publicationDate);
  const formattedDate = date.toLocaleDateString();

  const { user, token } = useAppSelector((state) => state.auth);
  const [wishListValue, setWishListValue] = useState("");
  const [createWishListMutation] = useCreateWishListMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    useGetAllWishListMutation({
      id: user._id,
    }).then((res) => {
      console.log(res?.data?.data);
      dispatch(
        setWishList({
          wishList: res?.data?.data,
        })
      );
    });
  }, []);
  const submitWishList = (e: React.FormEvent) => {
    e.preventDefault();
    setWishListValue(e.target.value);
    if (token && user) {
      createWishListMutation({
        bookId: book._id,
        userId: user._id,
        text: e.target.value,
      }).then((res) => {
        if ("data" in res) {
          if (res?.data?.data) {
            toast.success(res?.data?.message);
            getAllWishListMutation({
              id: user._id,
            }).then((res) => {
              console.log(res?.data?.data);
              dispatch(
                setWishList({
                  wishList: res?.data?.data,
                })
              );
            });
          }
        } else {
          toast.error(res?.data?.message);
        }
      });
    }
  };
  return (
    <div>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-full flex flex-col gap-5">
        <img
          className="rounded-t-lg h-52 w-full"
          src={book.image}
          alt="product image"
        />

        <div className="px-5 pb-5 flex flex-col gap-1 flex-1">
          <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Title: {book.title}
          </h5>

          <p className="my-2 text-base font-medium">Author: {book.author}</p>
          <p className="my-2 text-base font-medium">Genre: {book.genre}</p>
          <p className="my-2 text-base font-medium">
            Publication Date: {formattedDate}
          </p>
          <div className="flex-1">
            {token && user?._id && (
              <select
                name=""
                id=""
                className={` w-full rounded-[4px] px-2 py-1 mb-6`}
                onChange={(e) => {
                  submitWishList(e);
                }}
                value={wishListValue}
              >
                <option value="">Select a List</option>
                <option value="futureList" className={wishListValue + ``}>
                  Future List
                </option>
                <option value="currentList">Current List</option>
                <option value="finishedList">Finished List</option>
              </select>
            )}

            <div className="flex items-end justify-between gap-5 h-full">
              {token && user && user._id === book.authorId && (
                <Link
                  to={`/edit-book/${book._id}`}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                >
                  Edit Book
                </Link>
              )}
              <Link
                to={`/book-details/${book._id}`}
                className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-blue-800 w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
