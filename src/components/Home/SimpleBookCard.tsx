import {
  useCreateWishListMutation,
  useGetAllWishListMutation,
} from "../../redux/api/apiSlice";
import { setWishList } from "../../redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import { HomeBook } from "../../types/book";
import ViewButton from "../button/ViewButton";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
interface SimpleBookCardProps {
  product: HomeBook;
}
const SimpleBookCard: React.FC<SimpleBookCardProps> = ({ product }) => {
  const { token, user } = useAppSelector((state: RootState) => state.auth);
  const [wishListValue, setWishListValue] = useState("");
  const [createWishListMutation] = useCreateWishListMutation();
  const dispatch = useAppDispatch();
  const [getAllWishListMutation, { data, refetch }] =
    useGetAllWishListMutation();
  useEffect(() => {
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
  }, []);

  const submitWishList = (e: React.FormEvent) => {
    e.preventDefault();
    setWishListValue(e.target.value);
    if (token && user) {
      createWishListMutation({
        bookId: product._id,
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
    <div className="h-full">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
        <a href="#">
          <img
            className="rounded-t-lg h-44 w-full"
            src={product?.image}
            alt=""
          />
        </a>
        <div className="p-5 flex-1 flex flex-col gap-4 justify-between">
          <div>
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product?.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {product?.author}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:justify-between">
            <ViewButton id={product?._id} />
            {token && user?._id && (
              <select
                name=""
                id=""
                className={` w-full md:w-[45%] rounded-[8px] px-2`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBookCard;
