import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentToken } from "../../redux/feature/auth/authSlice";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types";

type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(useCurrentToken);

    let user;

    if (token) {
        user = verifyToken(token);
    }

    if (role !== undefined && (user as TUser)?.role !== role) {
        dispatch(logout());
        return <Navigate to="/" replace={true} />;
    }

    if (token) {
        const isValid = jwtDecode(token);

        if (isValid.exp) {
            // compare expiration time with current time
            const isExpired = isValid.exp < Date.now() / 1000;

            if (isExpired) {
                dispatch(logout());
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
