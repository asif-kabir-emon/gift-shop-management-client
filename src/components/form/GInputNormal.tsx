import { Input } from "antd";
import { Controller } from "react-hook-form";

type GInputProps = {
    type: string;
    name: string;
    placeholder: string;
    label: string;
};

const GInputNormal = ({ type, name, placeholder, label }: GInputProps) => {
    return (
        <div>
            <label className="text-[var(--secondary-color)] block mb-1 text-[16px]">
                {label}
            </label>
            <Controller
                name={name}
                render={({ field }) => (
                    <Input
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        className="custom-input"
                        {...field}
                    />
                )}
            />
        </div>
    );
};

export default GInputNormal;
