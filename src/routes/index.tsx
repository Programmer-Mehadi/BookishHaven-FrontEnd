import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../layout/Main";
import NotFound from "../page/NotFound";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";

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
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);
export default routes;
