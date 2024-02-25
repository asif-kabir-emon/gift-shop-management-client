import { Form, Radio } from "antd";
import { Controller } from "react-hook-form";

type TGRadioInputProps = {
    name: string;
    label: string;
    options: { value: string; label: string; disabled?: boolean }[] | undefined;
    disabled?: boolean;
};

const GRadioInput = ({ name, label, options, disabled }: TGRadioInputProps) => {
    return (
        <div style={{ marginBottom: "5px" }}>
            <label className=" text-[15px] font-bold">{label}</label>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item style={{ margin: "0px" }}>
                        <Radio.Group
                            options={options}
                            style={{ width: "100%" }}
                            disabled={disabled}
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

export default GRadioInput;
