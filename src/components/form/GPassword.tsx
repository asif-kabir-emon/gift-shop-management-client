import { Form, Input } from "antd";
import { useState } from "react";
import { Controller } from "react-hook-form";

type GPasswordProps = {
    type: string;
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
};

const GPassword = ({
    type,
    name,
    label,
    placeholder,
    disabled,
}: GPasswordProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <div>
            {/* <Controller
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
                        disabled={disabled}
                        className="custom-input"
                        {...field}
                    />
                )}
            /> */}
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <Input.Password
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            visibilityToggle={{
                                visible: passwordVisible,
                                onVisibleChange: setPasswordVisible,
                            }}
                            disabled={disabled}
                            className="custom-input"
                            {...field}
                        />
                        {error && (
                            <small style={{ color: "red" }}>
                                {error.message}
                            </small>
                        )}
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default GPassword;
