import { useEffect } from "react";
import BookCard from "../components/BookCard";
import FilterComponent from "../components/FilterComponent";
import Loader from "../components/shared/Loader";
import { useGetAllBooksQuery } from "../redux/api/apiSlice";
import { setAllBooks } from "../redux/features/book/bookSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";

const AllBooks = () => {
  const { allBookList } = useAppSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();
  let { data, refetch, isLoading } = useGetAllBooksQuery({
    genre: "All",
    year: "",
    name: "",
  });
  useEffect(() => {
    refetch();
    if (data?.data) {
      dispatch(
        setAllBooks({
          books: data.data,
        })
      );
      data = undefined;
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : (
        <section className="flex justify-center">
          <div className="px-5 my-10 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FilterComponent></FilterComponent>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:col-span-2 xl:col-span-3 xl:grid-cols-3">
              {Array.isArray(allBookList) && allBookList.length ? (
                allBookList?.map(
                  (book: {
                    _id: string;
                    title: string;
                    author: string;
                    image: string;
                    publicationDate: string;
                    genre: string;
                    authorId: string;
                  }) => {
                    return <BookCard key={book?._id} book={book}></BookCard>;
                  }
                )
              ) : (
                <p className="text-center text-xl font-semibold md:col-span-2 xl:col-span-3">
                  No Books Found
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AllBooks;
