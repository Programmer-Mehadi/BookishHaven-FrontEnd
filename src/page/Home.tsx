import SimpleBookCard from "../components/Home/SimpleBookCard";
import { useGetLastTenBooksQuery } from "../redux/api/apiSlice";
import { HomeProduct } from "../types/product";

const Home = () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      img: "https://flowbite.com/docs/images/blog/image-1.jpg",
      author: "Author 1",
    },
    {
      id: 2,
      title: "Product 2",
      img: "https://flowbite.com/docs/images/blog/image-1.jpg",
      author: "Author 2",
    },
    {
      id: 3,
      title: "Product 3",
      img: "https://flowbite.com/docs/images/blog/image-1.jpg",
      author: "Author 3",
    },
    {
      id: 4,
      title: "Product 4",
      img: "https://flowbite.com/docs/images/blog/image-1.jpg",
      author: "Author 4",
    },
    {
      id: 4,
      title: "Product 4",
      img: "https://flowbite.com/docs/images/blog/image-1.jpg",
      author: "Author 5",
    },
  ];

  const { data, isLoading } = useGetLastTenBooksQuery(undefined);
  console.log(data,isLoading);
  return (
    <section className="my-10 px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products
          ? products.map((product: HomeProduct) => {
              return <SimpleBookCard product={product} />;
            })
          : "Loading..."}
      </div>
    </section>
  );
};

export default Home;
