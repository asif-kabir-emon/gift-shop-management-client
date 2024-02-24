import { Select } from "antd";
import { Controller } from "react-hook-form";

type GInputProps = {
    type: string;
    name: string;
    items: object[];
    placeholder: string;
    label: string;
};

const filterOption = (
    input: string,
    option?: { label: string; value: string },
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const GDropDownSearch = ({ name, placeholder, label, items }: GInputProps) => {
    return (
        <div>
            <label className="text-[var(--secondary-color)] block mb-1 text-[16px]">
                {label}
            </label>
            <Controller
                name={name}
                render={({ field }) => (
                    <Select
                        id={name}
                        placeholder={placeholder}
                        showSearch
                        optionFilterProp="children"
                        filterOption={filterOption}
                        options={items as { label: string; value: string }[]}
                        {...field}
                        className="custom-input"
                        style={{ width: "100%" }}
                    />
                )}
            />
        </div>
    );
};

export default GDropDownSearch;
