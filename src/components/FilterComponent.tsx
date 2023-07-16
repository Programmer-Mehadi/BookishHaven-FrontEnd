import React from "react";
import { useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { useGetAllBooksQuery } from "../redux/api/apiSlice";
import { setAllBooks } from "../redux/features/book/bookSlice";

const FilterComponent = () => {
  const bookGenres = [
    "All",
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
  const startYear = 1600;
  const endYear = 2023;

  let yearArray = [];
  for (let year = startYear; year <= endYear; year++) {
    yearArray.push(`${year}`);
  }
  yearArray.push("All");
  yearArray = yearArray.reverse();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const dispatch = useAppDispatch();
  let { data, refetch } = useGetAllBooksQuery({
    genre,
    year,
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void refetch();
    if (data?.data) {
      dispatch(
        setAllBooks({
          books: data.data,
        })
      );
      data = undefined;
    }
  };
  return (
    <div className="">
      <div className="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Filter here
          </h5>
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Genre
            </label>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center  w-full flex justify-between bg-gray-50 border border-gray-300"
              type="button"
              onClick={() => {
                setShowDropdown(!showDropdown);
                setShowYearDropdown(false);
              }}
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
            {showDropdown && (
              <div
                id="dropdown"
                className="absolute top-20 left-0 w-[100%] z-10  bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 max-h-[250px] overflow-auto border border-slate-600"
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
                          if (genre === "All") {
                            setGenre("All");
                          } else {
                            setGenre(genre);
                          }
                          setShowDropdown(!showDropdown);
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
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Publication Year
            </label>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center  w-full flex justify-between bg-gray-50 border border-gray-300"
              type="button"
              onClick={() => {
                setShowYearDropdown(!showYearDropdown);
                setShowDropdown(false);
              }}
            >
              {year !== "" ? year : "Select a  Year"}
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
            {showYearDropdown && (
              <div
                id="dropdown"
                className="absolute top-20 left-0 w-[100%] z-10  bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 max-h-[250px] overflow-auto border border-slate-600"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {yearArray.map((year) => {
                    return (
                      <li
                        className="border-b"
                        onClick={() => {
                          setYear(`${year}`);
                          setShowYearDropdown(!showYearDropdown);
                        }}
                      >
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {year}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterComponent;
