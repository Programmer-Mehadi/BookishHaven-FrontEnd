import BookCard from "../components/BookCard";
import Loader from "../components/shared/Loader";
import { useGetAllBooksQuery } from "../redux/api/apiSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setAllBooks } from "../redux/features/book/bookSlice";
import FilterComponent from "../components/FilterComponent";

const AllBooks = () => {
  const { allBookList } = useAppSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();
  let { data, refetch, isLoading } = useGetAllBooksQuery({
    genre: "All",
    year: "",
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
        <section className="px-5 my-10 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <FilterComponent></FilterComponent>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:col-span-2 xl:col-span-3 xl:grid-cols-3">
            {allBookList &&
              allBookList?.map((book) => {
                return <BookCard key={book?._id} book={book}></BookCard>;
              })}
          </div>
        </section>
      )}
    </>
  );
};

export default AllBooks;
