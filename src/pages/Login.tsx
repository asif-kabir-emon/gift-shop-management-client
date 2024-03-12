/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import GForm from "../components/form/GForm";
import GInput from "../components/form/GInput";
import GPassword from "../components/form/GPassword";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { useLoginMutation } from "../redux/feature/auth/auth.api";
import { setUser } from "../redux/feature/auth/authSlice";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../Schemas/auth.schema";
import { TUser } from "../types";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [login] = useLoginMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Logging in");
        try {
            const userInfo = {
                email: data.email,
                password: data.password,
            };

            const res = await login(userInfo).unwrap();

            if (res.success) {
                const user = verifyToken(res.data.accessToken);
                dispatch(
                    setUser({
                        user: user,
                        token: res.data.accessToken,
                    }),
                );
                navigate(`/${(user as TUser)?.role}/gift-list`);
                toast.success(res.message, { id: toastId, duration: 2000 });
            } else {
                toast.error(res.message, {
                    id: toastId,
                    duration: 2000,
                });
            }
        } catch (error: any) {
            toast.error(error.data.message || "Failed to Login", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="bg-[var(--primary-color)] w-[300px] md:w-[400px] min-h-[200px] p-5 rounded-lg shadow-xl">
                <div className="flex flex-col items-center mb-3">
                    <h1 className="text-[var(--secondary-color)] text-3xl">
                        Sign In
                    </h1>
                </div>
                <GForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(loginSchema)}
                    disableReset={true}
                >
                    <div className="flex flex-col gap-2">
                        <GInput
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            label="Email"
                        />
                        <GPassword
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            label="Password"
                        />
                        <div className="flex justify-start">
                            <Link
                                to="/forget-password"
                                className="text-[var(--secondary-color)] hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="bg-[var(--secondary-color)] text-[var(--primary-color)] w-full py-2 rounded-lg"
                        >
                            Login
                        </button>
                    </div>
                </GForm>
                <Divider className="my-6" />
                <div className="flex justify-start">
                    <p className="text-[var(--secondary-color)] mb-4">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-[var(--secondary-color)] hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
