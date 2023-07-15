import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import { useCheckSignInMutation } from "../redux/api/apiSlice";
import { setTokenAndUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";

const Main = () => {
  const dispatch = useAppDispatch();
  const [checkSignIn] = useCheckSignInMutation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const localToken = localStorage.getItem("bookishHaven-token");
    if (localToken) {
      checkSignIn({
        token: localToken,
      }).then((response) => {
        if ("data" in response) {
          if (response.data.data) {
            // toast.success(response.data.message);
            dispatch(
              setTokenAndUser({
                token: localToken,
                user: response.data.data,
              })
            );
          } else {
            toast.error(response.data.message);
            localStorage.removeItem("bookishHaven-token");
          }
        } else if ("error" in response) {
          if ("error" in response.error) {
            toast.warn("Something went wrong");
          }
        }
        setLoading(!loading);
      });
    } else {
      setLoading(!loading);
    }
  }, []);

  return (
    <div className="max-w-[1680px] mx-auto">
      <Header />
      <div className="px-5">
        <Outlet />
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Main;
