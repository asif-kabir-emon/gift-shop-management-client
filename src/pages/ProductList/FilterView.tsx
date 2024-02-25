/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Button } from "antd";
import {
    useGetAllBrandQuery,
    useGetAllCategoryQuery,
    useGetAllOccasionQuery,
    useGetAllThemeQuery,
} from "../../redux/feature/product/productManagement.api";
import { setSearchQuery } from "../../redux/feature/product/productSlice";
import { useAppDispatch } from "../../redux/hooks";
import GForm from "../../components/form/GForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import GInput from "../../components/form/GInput";
import GCheckBox from "../../components/form/GCheckBox";

const FilterView = () => {
    const dispatch = useAppDispatch();
    const [showFilter, setShowFilter] = useState(false);
    const [resetForm, setResetForm] = useState(false);

    const { data: categoryData, isLoading: categoryDataLoading } =
        useGetAllCategoryQuery(undefined);
    const { data: brandData, isLoading: brandDataLoading } =
        useGetAllBrandQuery(undefined);
    const { data: occasionData, isLoading: occasionDataLoading } =
        useGetAllOccasionQuery(undefined);
    const { data: themeData, isLoading: themeDataLoading } =
        useGetAllThemeQuery(undefined);

    const categoryOptions = categoryData?.data?.map(
        (item: { _id: string; name: string }) => {
            return {
                value: item._id,
                label: item.name,
            };
        },
    );

    const brandOptions = brandData?.data?.map(
        (item: { _id: string; name: string }) => {
            return {
                value: item._id,
                label: item.name,
            };
        },
    );

    const occasionOptions = occasionData?.data?.map(
        (item: { _id: string; name: string }) => {
            return {
                value: item._id,
                label: item.name,
            };
        },
    );

    const themeOptions = themeData?.data?.map(
        (item: { _id: string; name: string }) => {
            return {
                value: item._id,
                label: item.name,
            };
        },
    );

    const handleReset = () => {
        setResetForm(true);
        dispatch(
            setSearchQuery({
                name: "",
                minPrice: 0,
                maxPrice: -1,
                category: [],
                brand: [],
                occasion: [],
                theme: [],
            }),
        );
        setResetForm(false);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const query = {
            name: data.name ? data.name : "",
            minPrice: data.minPrice ? Number(data.minPrice) : 0,
            maxPrice: data.maxPrice ? Number(data.maxPrice) : -1,
            category: data.category ? data.category : [],
            brand: data.brand ? data.brand : [],
            occasion: data.occasion ? data.occasion : [],
            theme: data.theme ? data.theme : [],
        };
        dispatch(setSearchQuery(query));
    };

    return (
        <div>
            <div className="bg-[var(--primary-color)] py-4 px-4 rounded w-full xl:w-[300px]">
                <GForm onSubmit={onSubmit} disableReset={!resetForm}>
                    <GInput
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="Search by name"
                    />
                    <div className="select-none my-[10px]">
                        <h2>Price Range</h2>
                        <div className="flex items-center gap-1 py-1">
                            <GInput
                                type="text"
                                name="minPrice"
                                placeholder="Min Price"
                            />
                            <div className="text-lg font-medium text-gray-400">
                                -
                            </div>
                            <GInput
                                type="text"
                                name="maxPrice"
                                placeholder="Max Price"
                            />
                        </div>
                    </div>
                    <div className="select-none">
                        <div
                            className="pl-2 flex gap-3 hover:cursor-pointer flex-row items-center bg-gray-50 py-1 mb-0"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            {showFilter ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            )}
                            <h2 className="text-[16px] font-medium">Filter</h2>
                        </div>
                        <div
                            className={`${showFilter ? "flex flex-col gap-2 mt-0 px-[15px]" : "hidden"} bg-gray-50`}
                        >
                            <GCheckBox
                                name="category"
                                label="Category"
                                options={categoryOptions}
                                disabled={categoryDataLoading}
                            />
                            <GCheckBox
                                name="brand"
                                label="Brand"
                                options={brandOptions}
                                disabled={brandDataLoading}
                            />
                            <GCheckBox
                                name="occasion"
                                label="Occasion"
                                options={occasionOptions}
                                disabled={occasionDataLoading}
                            />
                            <GCheckBox
                                name="theme"
                                label="Theme"
                                options={themeOptions}
                                disabled={themeDataLoading}
                            />
                        </div>
                    </div>
                    <div className="my-[15px] flex justify-center gap-2">
                        <Button htmlType="submit">Search</Button>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                </GForm>
            </div>
        </div>
    );
};

export default FilterView;
