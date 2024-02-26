/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import ProductGridView from "./ProductGridView";
import FilterView from "./FilterView";
import { Spin } from "antd";
import ProductListView from "./ProductListView";
import { useGetAllProductsQuery } from "../../../redux/feature/product/productManagement.api";
import { useAppSelector } from "../../../redux/hooks";
import { useSearchParameter } from "../../../redux/feature/product/productSlice";

const filterObject = (obj: { [s: string]: unknown } | ArrayLike<unknown>) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => {
            if (Array.isArray(value)) {
                return value.length !== 0;
            } else {
                return value !== "" && value !== 0 && value !== -1;
            }
        }),
    );
};

const ManagerProductList = () => {
    const searchParameter = useAppSelector(useSearchParameter);
    const { data: productsData, isLoading } = useGetAllProductsQuery(
        filterObject(searchParameter),
    );

    const [gridView, setGridView] = useState(false);

    const changeView = () => {
        setGridView(!gridView);
    };

    return (
        <div className="flex flex-col w-full gap-3">
            <div className="flex flex-col md:flex-row md:justify-between rounded gap-3 text-center bg-white py-2 px-5">
                <h2 className="text-3xl font-bold">Gift Products</h2>
                <div className="flex justify-between md:justify-end gap-3 border-[1px] border-black border-opacity-20 rounded p-[3px]">
                    <button
                        onClick={changeView}
                        className={`${
                            gridView ? "bg-white" : "bg-gray-300"
                        } px-3 py-2 rounded-md w-[50%] md:w-[100px]`}
                    >
                        List View
                    </button>
                    <button
                        onClick={changeView}
                        className={`${
                            gridView ? "bg-gray-300" : "bg-white"
                        } px-3 py-2 rounded-md w-[50%] md:w-[100px]`}
                    >
                        Grid View
                    </button>
                </div>
            </div>
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-center gap-3">
                <FilterView />
                {isLoading === false ? (
                    <div className="w-full">
                        {gridView ? (
                            <ProductGridView
                                productData={productsData?.data || []}
                            />
                        ) : (
                            <ProductListView
                                productData={productsData?.data || []}
                            />
                        )}
                    </div>
                ) : (
                    <div className="flex justify-center items-center w-full my-10">
                        <Spin tip="Loading"></Spin>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagerProductList;
