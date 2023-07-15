import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../redux/hook";
interface AuthRouteProps {
  children: React.ReactNode;
}
const AuthRoute = ({ children }: AuthRouteProps) => {
  const { token, user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (token && user) {
    return <Navigate to="/" state={{ from: location }} />;
  } else {
    return <>{children}</>;
  }
};

export default AuthRoute;
