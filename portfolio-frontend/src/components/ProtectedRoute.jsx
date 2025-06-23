import useAuth from "contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./commons/Loading";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        // Replace by Loading component
        return <Loading type="simple" message="Checking login..." />;
    }
    if (!isAuthenticated()) {
        return (
            <Navigate to="/admin/login" state={{ from: location }} replace />
        );
    }
    return children;
}
