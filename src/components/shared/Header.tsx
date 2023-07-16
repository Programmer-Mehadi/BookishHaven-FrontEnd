import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../public/logo.png";
import { setTokenAndUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const Header = () => {
  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const path = useLocation().pathname;
  const pathList = ["/", "all-books", "add-new-book", "signin", "signup"];
  const [activePath, setActivePath] = useState("/");
  useEffect(() => {
    if (path.split("/")[1]) {
      if (path.split("/")[1] === "home") {
        setActivePath("/");
      } else {
        setActivePath(path.split("/")[1]);
      }
    } else {
      setActivePath("/");
    }
  }, [path]);

  const handleLogOut = () => {
    console.log("logout");
    localStorage.removeItem("bookishHaven-token");
    dispatch(
      setTokenAndUser({
        token: "",
        user: {},
      })
    );
  };

  return (
    <div>
      <nav className="bg-white border-b">
        <div className="flex flex-wrap items-center justify-between mx-auto px-2 pr-4 py-2">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-16 ml-0 mr-3" alt="Flowbite Logo" />
          </Link>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className={
              "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            }
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-semibold mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className={`${
                    activePath === pathList[0] ? "text-blue-700" : "text-black"
                  } block py-2 pl-3 pr-4  rounded md:bg-transparent  md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-books"
                  className={`${
                    activePath === pathList[1] ? "text-blue-700" : "text-black"
                  } block py-2 pl-3 pr-4  rounded md:bg-transparent  md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent`}
                  aria-current="page"
                >
                  All Books
                </Link>
              </li>
              {token && user && (
                <>
                  <li>
                    <Link
                      to="/add-new-book"
                      className={`${
                        activePath === pathList[2]
                          ? "text-blue-700"
                          : "text-black"
                      } block py-2 pl-3 pr-4  rounded md:bg-transparent  md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent`}
                      aria-current="page"
                    >
                      Add New Book
                    </Link>
                  </li>
                  <li onClick={() => handleLogOut()}>
                    <p className="cursor-pointer block py-2 pl-3 pr-4 text-red-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Logout
                    </p>
                  </li>{" "}
                </>
              )}
              {token === "" && (
                <>
                  <li>
                    <Link
                      to="/signin"
                      className={`${
                        activePath === pathList[3]
                          ? "text-blue-700"
                          : "text-black"
                      } block py-2 pl-3 pr-4  rounded md:bg-transparent  md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent`}
                      aria-current="page"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className={`${
                        activePath === pathList[4]
                          ? "text-blue-700"
                          : "text-black"
                      } block py-2 pl-3 pr-4  rounded md:bg-transparent  md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent`}
                      aria-current="page"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
