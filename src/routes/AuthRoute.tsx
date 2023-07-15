import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../redux/hook";
interface AuthRouteProps {
  children: React.ReactNode;
}
const AuthRoute = ({ children }: AuthRouteProps) => {
  const { token, user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  if (token && user) {
    return <Navigate to={from} />;
  } else {
    return <>{children}</>;
  }
};

export default AuthRoute;
