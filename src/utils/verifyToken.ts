import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
    const user = jwtDecode(token);
    return user;
};
