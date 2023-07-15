import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Main = () => {
  return (
    <div className="max-w-[1680px] mx-auto">
      <Header />
      <Outlet />
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Main;
