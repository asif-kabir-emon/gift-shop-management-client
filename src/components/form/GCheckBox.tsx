import { Checkbox, Form } from "antd";
import { Controller } from "react-hook-form";

type TGCheckBoxProps = {
    name: string;
    label: string;
    options: { value: string; label: string }[] | undefined;
    disabled?: boolean;
};

const GCheckBox = ({ name, label, options, disabled }: TGCheckBoxProps) => {
    return (
        <div style={{ marginBottom: "5px" }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <Checkbox.Group
                            {...field}
                            options={options}
                            style={{ width: "100%" }}
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

export default GCheckBox;
