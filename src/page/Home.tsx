import { useEffect } from "react";
import SimpleBookCard from "../components/Home/SimpleBookCard";
import Loader from "../components/shared/Loader";
import { useGetLastTenBooksQuery } from "../redux/api/apiSlice";
import { setLastTen } from "../redux/features/book/bookSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { HomeBook } from "../types/book";
const Home = () => {
  const { lastTenList } = useAppSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();
  let { data, isLoading, refetch } = useGetLastTenBooksQuery(undefined);

  useEffect(() => {
    refetch();
    if (data?.data) {
      dispatch(
        setLastTen({
          books: data.data,
        })
      );
      data = undefined;
    }
  }, [data]);

  return (
    <section className="my-10 px-6 md:px-10 flex justify-center">
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {lastTenList
            ? lastTenList.map((product: HomeBook) => {
                return <SimpleBookCard key={product._id} product={product} />;
              })
            : "Loading..."}
        </div>
      )}
    </section>
  );
};

export default Home;
