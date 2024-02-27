import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

type GHInputDatePickerProps = {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    defaultValue?: string;
};

const GDatePickerWithDefaultValue = ({
    name,
    label,
    placeholder,
    disabled,
    defaultValue,
}: GHInputDatePickerProps) => {
    const dateFormat = "YYYY-MM-DD";

    return (
        <div style={{ marginBottom: "10px" }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <DatePicker
                            {...field}
                            id={name}
                            placeholder={placeholder}
                            style={{ width: "100%" }}
                            disabled={disabled}
                            defaultValue={dayjs(defaultValue, dateFormat)}
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

export default GDatePickerWithDefaultValue;
