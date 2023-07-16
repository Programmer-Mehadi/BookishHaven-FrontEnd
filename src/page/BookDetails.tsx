import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useGetSingleBookQuery } from "../redux/api/apiSlice";
import Loader from "../components/shared/Loader";
import ReviewComponent from "../components/ReviewComponent";

const BookDetails = () => {
  const id = useLocation().pathname.split("/")[2];
  const { data, isLoading, refetch } = useGetSingleBookQuery(id);
  useEffect(() => {
    void refetch();
  }, [id, data]);

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="my-10 px-5 flex items-center flex-col ">
          <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="p-8 rounded-t-lg h-96 xl:h-[600px] mx-auto "
                src={data?.data?.image}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Title: {data?.data?.title}
                </h5>
              </a>
              <p className="text-semibold text-xl my-2">
                Author: {data?.data?.author}
              </p>
              <p className="text-semibold text-xl my-2">
                Genre: {data?.data?.genre}
              </p>
              <p className="text-semibold text-xl my-2">
                Publication Date: {data?.data?.publicationDate}
              </p>
              <div className="grid grid-cols-2 gap-4 items-center mt-7 ">
                <Link
                  to={`/edit-book/${data?.data._id}`}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                >
                  Edit Book
                </Link>
                <p className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800 cursor-pointer">
                  Delete Book
                </p>
              </div>
            </div>
          </div>
          <ReviewComponent id={id}></ReviewComponent>
        </div>
      )}
    </>
  );
};

export default BookDetails;
