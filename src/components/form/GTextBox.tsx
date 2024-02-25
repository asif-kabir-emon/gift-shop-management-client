import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

type GTextBoxProps = {
    type?: string;
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
};

const GTextBox = ({ name, label, placeholder, disabled }: GTextBoxProps) => {
    return (
        <div style={{ marginBottom: "5px" }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <TextArea
                            {...field}
                            id={name}
                            placeholder={placeholder}
                            className="custom-input"
                            autoSize={{ minRows: 3, maxRows: 10 }}
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

export default GTextBox;
