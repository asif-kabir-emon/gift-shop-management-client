import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { Controller } from "react-hook-form";

type GHInputDatePickerProps = {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
};

const GDatePicker = ({
    name,
    label,
    placeholder,
    disabled,
}: GHInputDatePickerProps) => {
    const currentDate = moment().format("YYYY-MM-DD");
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
                            defaultValue={dayjs(currentDate, dateFormat)}
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

export default GDatePicker;
