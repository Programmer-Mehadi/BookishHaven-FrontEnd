import { HomeBook } from "../../types/book";
import ViewButton from "../button/ViewButton";
interface SimpleBookCardProps {
  product: HomeBook;
}
const SimpleBookCard: React.FC<SimpleBookCardProps> = ({ product }) => {
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
          <div className="">
            <ViewButton id={product?._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBookCard;
