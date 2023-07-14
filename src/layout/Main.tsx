import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

const Main = () => {
  return (
    <div className="max-w-[1680px] mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
