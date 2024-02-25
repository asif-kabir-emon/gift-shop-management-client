import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TGImageInputProps = {
    type: string;
    name: string;
    label: string;
    placeholder?: string;
};

const GImageInput = ({ name, type, label }: TGImageInputProps) => {
    return (
        <div style={{ marginBottom: "5px" }}>
            <Controller
                name={name}
                render={({ field: { onChange, value, ...field } }) => (
                    <Form.Item label={label}>
                        <Input
                            type={type}
                            value={value?.fileName}
                            {...field}
                            onChange={(e) => {
                                onChange(e.target.files?.[0]);
                            }}
                            style={{ padding: "15px 10px" }}
                        />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default GImageInput;
