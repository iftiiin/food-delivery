import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";


export default function ProtectedRoute({ children, redirectTo = "/signin" }) {


    const { isLoggedIn, isLoading, profile } = useAuth();


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        )
    }


    
    if (isLoggedIn && profile?.profile.is_admin === true) {
        return children;
    }
    
    return <Navigate to={redirectTo} replace />;
}