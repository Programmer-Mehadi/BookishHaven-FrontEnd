import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../redux/hook";
interface PrivateRouteProps {
  children: React.ReactNode;
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { token, user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (token && user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" state={{ from: location }} />;
  }
};

export default PrivateRoute;
