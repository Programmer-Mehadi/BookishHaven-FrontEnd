import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateWishListMutation,
  useGetAllWishListMutation,
} from "../../redux/api/apiSlice";
import { setWishList } from "../../redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import { HomeBook } from "../../types/book";
import ViewButton from "../button/ViewButton";
interface SimpleBookCardProps {
  product: HomeBook;
}
const SimpleBookCard: React.FC<SimpleBookCardProps> = ({ product }) => {
  const {
    token,
    user,
  }: {
    token: string;
    user:
      | {
          _id: string;
          name: string;
          email: string;
        }
      | {};
  } = useAppSelector((state: RootState) => state.auth);
  const { wishList } = useAppSelector((state: RootState) => state.wishList);
  const [wishListValue, setWishListValue] = useState("");
  const [createWishListMutation] = useCreateWishListMutation();
  const dispatch = useAppDispatch();
  const [getAllWishListMutation] = useGetAllWishListMutation();
  useEffect(() => {
    if ("_id" in user) {
      getAllWishListMutation({
        id: user._id,
      }).then((res) => {
        if ("data" in res) {
          dispatch(
            setWishList({
              wishList: res?.data?.data,
            })
          );
          const find = res?.data?.data?.find(
            (item: { bookId: string }) => item.bookId === product._id
          );
          if (find) {
            setWishListValue(find.text);
          } else {
            setWishListValue("");
          }
        }
      });
    }
  }, []);

  const submitWishList = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const value = target.value;
    setWishListValue(value);
    if ("_id" in user) {
      if (token && user) {
        createWishListMutation({
          bookId: product._id,
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
            {token && user && (
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
            <ViewButton id={product?._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBookCard;
