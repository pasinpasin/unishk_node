import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Loading from "../components/Loading";
function ProtectedRoute({ children }) {
  const { user, userLoading } = useAppContext();

  if (userLoading) return <Loading />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
