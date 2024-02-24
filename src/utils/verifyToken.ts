import { jwtDecode } from "jwt-decode";

export const verifyToken = async (token: string) => {
    return jwtDecode(token);
};
