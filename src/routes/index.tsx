import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../layout/Main";
import AddBook from "../page/AddBook";
import AllBooks from "../page/AllBooks";
import BookDetails from "../page/BookDetails";
import NotFound from "../page/NotFound";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/home",
        element: <App />,
      },
      {
        path: "/signin",
        element: (
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        ),
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/book-details/:id",
        element: <BookDetails />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);
export default routes;
