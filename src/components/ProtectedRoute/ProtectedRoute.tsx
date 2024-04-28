import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider";
import { SpinnerComponent } from "../index";

const ProtectedRoute = () => {
  const { currentUser, loading } = useUserContext();

  if (loading) {
    return <SpinnerComponent />;
  }

  if (currentUser) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
