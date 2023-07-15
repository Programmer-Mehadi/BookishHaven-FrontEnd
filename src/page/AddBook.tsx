import { useState } from "react";
import { useAddBookMutation } from "../redux/api/apiSlice";

const AddBook = () => {
  const imageHostKey = JSON.stringify(
    import.meta.env.VITE_REACT_APP_imgbb_key
  ) as string;

  const bookGenres = [
    "Action and Adventure",
    "Art",
    "Biography",
    "Business and Finance",
    "Children's",
    "Classics",
    "Comics and Graphic Novels",
    "Computers and Technology",
    "Cookbooks",
    "Crafts and Hobbies",
    "Crime and Mystery",
    "Drama",
    "Education and Teaching",
    "Engineering",
    "Fantasy",
    "Fiction",
    "Health and Wellness",
    "Historical Fiction",
    "History",
    "Horror",
    "Humor",
    "Inspiration and Motivation",
    "LGBTQ+",
    "Memoir",
    "Mindfulness and Meditation",
    "Music",
    "Parenting",
    "Philosophy",
    "Poetry",
    "Politics and Social Sciences",
    "Psychology",
    "Religion and Spirituality",
    "Romance",
    "Science",
    "Science Fiction",
    "Self-Help and Personal Development",
    "Sports",
    "Thriller and Suspense",
    "Travel",
  ];
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState({
    title: true,
    genre: true,
    publicationDate: true,
    image: true,
  });
  const [addBookMutation, { data, isLoading, error: apiErr }] =
    useAddBookMutation();
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setError({ ...error, title: false });
    } else {
      setError({ ...error, title: true });
    }
    setTitle(e.target.value);
  };
  const handleGenre = (genre: string) => {
    setGenre(genre);
    setShowDropdown(!showDropdown);
    setError({ ...error, genre: true });
  };
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setError({ ...error, publicationDate: false });
    } else {
      setError({ ...error, publicationDate: true });
    }
    setPublicationDate(e.target.value);
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
      setError({ ...error, image: true });
    } else {
      setError({ ...error, image: false });
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newError = {
      title: true,
      genre: true,
      publicationDate: true,
      image: true,
    };
    if (title === "") {
      newError = { ...newError, title: false };
    }
    if (genre === "") {
      newError = { ...newError, genre: false };
    }
    if (publicationDate === "") {
      newError = { ...newError, publicationDate: false };
    }
    if (image === "") {
      newError = { ...newError, image: false };
    }
    setError(newError);
    if (
      newError.title === true &&
      newError.genre === true &&
      newError.publicationDate === true &&
      newError.image === true
    ) {
      const formData = new FormData(e.target as HTMLFormElement);
      const imageFile = formData.get("image") as File;
      const submitData: {
        title: string;
        genre: string;
        publicationDate: string;
        imageFileUrl: string;
        author: string;
      } = {
        title,
        genre,
        publicationDate,
        imageFileUrl: "",
        author: "admin",
      };
      const formDataImage = new FormData();
      formDataImage.append("image", imageFile);

      let imgUrl = "";
      const url = `https://api.imgbb.com/1/upload?key=${
        imageHostKey.split('"')[1]
      }`;
      console.log(url);
      fetch(url, {
        method: "POST",
        body: formDataImage,
      })
        .then((res) => res.json())
        .then((imgbb) => {
          console.log(imgbb);
          if (imgbb.success) {
            imgUrl = imgbb.data.display_url;
            submitData["imageFileUrl"] = imgUrl;
            addBookMutation(submitData as any);
            console.log(data);
            console.log(apiErr);
          }
        });
    }
  };
  return (
    <div className="my-10 flex justify-center">
      <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">
            Add new Book
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Give a title"
              onChange={(e) => {
                handleTitle(e);
              }}
            />
            {error?.title === false && (
              <p className="text-red-500 text-xs mt-1">Please enter a title.</p>
            )}
          </div>
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Genre
            </label>

            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center  w-full flex justify-between bg-gray-50 border border-gray-300"
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {genre !== "" ? genre : "Select a Genre"}
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {error?.genre === false && (
              <p className="text-red-500 text-xs mt-1">
                Please choose a genre.
              </p>
            )}
            {showDropdown && (
              <div
                id="dropdown"
                className="absolute top-20 left-0 w-[100%] z-10  bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 max-h-[250px] overflow-auto"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {bookGenres.map((genre) => {
                    return (
                      <li
                        className="border-b"
                        onClick={() => {
                          handleGenre(genre);
                        }}
                      >
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {genre}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Publication Date
            </label>
            <input
              type="date"
              className="w-full rounded-[8px] bg-gray-50 border border-gray-300"
              onChange={(e) => {
                handleDate(e);
              }}
            />
            {error?.publicationDate === false && (
              <p className="text-red-500 text-xs mt-1">Please select a date.</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Preview Image
            </label>

            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              name="image"
              onChange={(e) => handleImage(e)}
            />

            {error?.image === false && (
              <p className="text-red-500 text-xs mt-1">
                Please select a image.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
