import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/feature/auth/authSlice";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector(useCurrentToken);

    if (token) {
        const isValid = jwtDecode(token);

        if (isValid.exp) {
            // compare expiration time with current time
            const isExpired = isValid.exp < Date.now() / 1000;

            if (isExpired) {
                return <Navigate to="/login" replace={true} />;
            }
        }
    }

    if (token === null || !token) {
        return <Navigate to="/login" replace={true} />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
