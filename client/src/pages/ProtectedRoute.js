import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Loading from "../components/Loading";
function ProtectedRoute({ children }) {
  const { user, userLoading } = useAppContext();
  console.log(userLoading);

  if (userLoading) return <Loading center />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
