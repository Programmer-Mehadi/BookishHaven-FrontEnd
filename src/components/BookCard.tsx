const BookCard = ({ book }) => {
  const date = new Date(book.publicationDate);
  const formattedDate = date.toLocaleDateString();
  return (
    <div>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col gap-5">
        <img
          className="rounded-t-lg h-52 w-full"
          src={book.image}
          alt="product image"
        />

        <div className="px-5 pb-5 flex flex-col gap-1 flex-1">
          <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Title: {book.title}
          </h5>

          <p className="my-2 text-base font-medium">Author: {book.author}</p>
          <p className="my-2 text-base font-medium">Genre: {book.genre}</p>
          <p className="my-2 text-base font-medium">
            Publication Date: {formattedDate}
          </p>
          <div className="flex-1">
            <div className="flex items-end justify-between h-full">
              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
