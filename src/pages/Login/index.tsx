/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./login-style.css";
import GForm from "../../components/form/GForm";
import GInputNormal from "../../components/form/GInputNormal";
import GInputPassword from "../../components/form/GInputPassword";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import { setUser } from "../../redux/feature/auth/authSlice";
import { toast } from "sonner";
import { verifyToken } from "../../utils/verifyToken";

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
            console.log(userInfo);

            if (userInfo.email === "" || userInfo.password === "") {
                toast.error("Please fill all required Fields", {
                    id: toastId,
                    duration: 2000,
                });
                return;
            } else {
                const res = await login(userInfo).unwrap();
                console.log(res.data);

                if (res.data.success === false) {
                    toast.error(res.message, {
                        id: toastId,
                        duration: 2000,
                    });
                } else {
                    const user = await verifyToken(res.data.accessToken);
                    dispatch(
                        setUser({
                            user: user,
                            token: res.data.accessToken,
                        }),
                    );
                    toast.success(res.message, { id: toastId, duration: 2000 });
                    navigate("/");
                }
            }
        } catch (error: any) {
            // console.log(error);
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
                <GForm onSubmit={onSubmit}>
                    <div className="flex flex-col gap-3">
                        <GInputNormal
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            label="Email"
                        />
                        <GInputPassword
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            label="Password"
                        />
                        <div className="flex justify-start">
                            <a
                                href="#"
                                className="text-[var(--secondary-color)] hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-[var(--secondary-color)] text-[var(--primary-color)] w-full py-2 rounded-lg"
                            >
                                Login
                            </button>
                        </div>
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
