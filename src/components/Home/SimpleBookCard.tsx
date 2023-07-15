import { HomeProduct } from "../../types/product";
import ViewButton from "../button/ViewButton";
interface SimpleBookCardProps {
  product: HomeProduct;
}
const SimpleBookCard: React.FC<SimpleBookCardProps> = ({ product }) => {
  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={product?.img} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product?.title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {product?.author}
          </p>
          <ViewButton id={product?.id} />
        </div>
      </div>
    </div>
  );
};

export default SimpleBookCard;
