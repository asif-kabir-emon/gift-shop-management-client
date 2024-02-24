import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

type GInputProps = {
    type?: string;
    name: string;
    placeholder: string;
    label: string;
};

const GTextBox = ({ name, placeholder, label }: GInputProps) => {
    return (
        <div>
            <label className="text-[var(--secondary-color)] block mb-1 text-[16px]">
                {label}
            </label>
            <Controller
                name={name}
                render={({ field }) => (
                    <TextArea
                        id={name}
                        placeholder={placeholder}
                        className="custom-input"
                        autoSize={{ minRows: 3, maxRows: 10 }}
                        {...field}
                    />
                )}
            />
        </div>
    );
};

export default GTextBox;
