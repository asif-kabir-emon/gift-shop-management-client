import { zodResolver } from "@hookform/resolvers/zod";
import GForm from "../../components/form/GForm";
import { forgetPasswordSchema } from "../../Schemas/auth.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import GInput from "../../components/form/GInput";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="bg-[var(--primary-color)] w-[300px] md:w-[400px] min-h-[200px] p-5 rounded-lg shadow-xl py-10">
                <div className="flex flex-col items-center mb-3">
                    <h1 className="text-[var(--secondary-color)] text-xl font-bold">
                        Forget Password
                    </h1>
                </div>
                <GForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(forgetPasswordSchema)}
                    disableReset={true}
                >
                    <GInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                    <div className="my-4">
                        <Link
                            to="/login"
                            className="text-[var(--secondary-color)] hover:underline"
                        >
                            Back to Login ?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="bg-[var(--secondary-color)] text-[var(--primary-color)] w-full py-2 rounded-lg mt-2"
                    >
                        Send Email
                    </button>
                </GForm>
            </div>
        </div>
    );
};

export default ForgetPassword;
