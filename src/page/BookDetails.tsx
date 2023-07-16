// @ts-ignore
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewComponent from "../components/ReviewComponent";
import Loader from "../components/shared/Loader";
import {
  useCreateWishListMutation,
  useDeleteSingleBookMutation,
  useGetAllWishListMutation,
  useGetSingleBookQuery,
} from "../redux/api/apiSlice";
import { setWishList } from "../redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";

const BookDetails = () => {
  const navigate = useNavigate();
  const id = useLocation().pathname.split("/")[2];
  const { data, isLoading, refetch } = useGetSingleBookQuery(id);
  const { wishList } = useAppSelector((state: RootState) => state.wishList);
  useEffect(() => {
    void refetch();
  }, [id, data]);
  useEffect(() => {
    let find:
      | {
          text: string;
          bookId: string;
        }
      | undefined = wishList?.find(
      (item: { bookId: string; text: string }) =>
        item.bookId === data?.data?._id
    );
    if (find) {
      if ("text" in find) {
        setWishListValue(find.text);
      }
    } else {
      setWishListValue("");
    }
  }, [wishList]);
  const { user, token } = useAppSelector((state: RootState) => state.auth);
  const [wishListValue, setWishListValue] = useState("");
  const [createWishListMutation] = useCreateWishListMutation();
  const [getAllWishListMutation] = useGetAllWishListMutation();
  const [deleteSingleBookMutation] = useDeleteSingleBookMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if ("_id" in user) {
      getAllWishListMutation({
        id: user?._id,
      }).then((res) => {
        if ("data" in res) {
          dispatch(
            setWishList({
              wishList: res?.data?.data,
            })
          );
        }
      });
    }
  }, [user]);

  const submitWishList = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const value = target.value;
    setWishListValue(value);
    if (token && user) {
      if ("_id" in user) {
        createWishListMutation({
          bookId: data?.data?._id,
          userId: user._id,
          text: value,
        }).then((res) => {
          if ("data" in res) {
            if (res?.data?.data) {
              toast.success(res?.data?.message);
              getAllWishListMutation({
                id: user._id,
              }).then((res) => {
                if ("data" in res) {
                  dispatch(
                    setWishList({
                      wishList: res?.data?.data,
                    })
                  );
                }
              });
            }
          } else {
            toast.error("Something went wrong");
          }
        });
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          {data?.data ? (
            <div className="my-10 px-5 flex items-center flex-col ">
              <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="p-8 rounded-t-lg h-96 xl:h-[600px] mx-auto "
                  src={data?.data?.image}
                  alt="product image"
                />
                <div className="px-5 pb-5">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Title: {data?.data?.title}
                  </h5>
                  <p className="text-semibold text-xl my-2">
                    Author: {data?.data?.author}
                  </p>
                  <p className="text-semibold text-xl my-2">
                    Genre: {data?.data?.genre}
                  </p>
                  <p className="text-semibold text-xl my-2">
                    Publication Date: {data?.data?.publicationDate}
                  </p>
                  {token && user && (
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
                  {token &&
                    user &&
                    "_id" in user &&
                    user._id === data?.data?.authorId && (
                      <div className="grid grid-cols-2 gap-4 items-center mt-7 ">
                        <Link
                          to={`/edit-book/${data?.data._id}`}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                        >
                          Edit Book
                        </Link>
                        <p
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800 cursor-pointer"
                          onClick={() => {
                            if ("_id" in user) {
                              deleteSingleBookMutation({
                                data: {
                                  token,
                                  uid: user?._id,
                                },
                                id,
                              }).then((res) => {
                                if ("data" in res) {
                                  if (res?.data?.data) {
                                    toast.success(res?.data?.message);
                                    return navigate("/all-books");
                                  } else {
                                    toast.error(res?.data?.message);
                                  }
                                } else {
                                  toast.error("Something went wrong");
                                }
                              });
                            }
                          }}
                        >
                          Delete Book
                        </p>
                      </div>
                    )}
                </div>
              </div>
              <ReviewComponent id={id}></ReviewComponent>
            </div>
          ) : (
            <h2 className="text-red-500 text-center my-14">Book not found</h2>
          )}
        </>
      )}
    </>
  );
};

export default BookDetails;
