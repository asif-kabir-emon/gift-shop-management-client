import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TGSelectProps = {
    name: string;
    label: string;
    placeholder?: string;
    options: { value: string; label: string; disabled?: boolean }[] | undefined;
    disabled?: boolean;
    mode?: "multiple" | undefined;
};

const GSelect = ({
    name,
    label,
    placeholder,
    options,
    disabled,
    mode,
}: TGSelectProps) => {
    return (
        <div style={{ marginBottom: "5px" }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <Select
                            mode={mode}
                            style={{ width: "100%" }}
                            {...field}
                            placeholder={placeholder}
                            options={options}
                            disabled={disabled}
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

export default GSelect;
