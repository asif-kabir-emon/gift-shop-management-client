import { Input } from "antd";
import { useState } from "react";
import { Controller } from "react-hook-form";

type GInputProps = {
    type: string;
    name: string;
    placeholder: string;
    label: string;
};

const GInputPassword = ({ type, name, placeholder, label }: GInputProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <div>
            <label className="text-[var(--secondary-color)] block mb-1 text-[16px]">
                {label}
            </label>
            <Controller
                name={name}
                render={({ field }) => (
                    <Input.Password
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        visibilityToggle={{
                            visible: passwordVisible,
                            onVisibleChange: setPasswordVisible,
                        }}
                        className="custom-input"
                        {...field}
                    />
                )}
            />
        </div>
    );
};

export default GInputPassword;
