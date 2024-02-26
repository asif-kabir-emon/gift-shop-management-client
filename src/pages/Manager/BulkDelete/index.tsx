/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Spin } from "antd";
import { toast } from "sonner";
import {
    useDeleteMultipleProductsMutation,
    useGetAllProductsQuery,
} from "../../../redux/feature/product/productManagement.api";
import { TProduct } from "../../../types";

const BulkDelete = () => {
    const { data: productData, isLoading: isProductDataLoading } =
        useGetAllProductsQuery(undefined);

    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const addSelectedItem = (item: string) => {
        setSelectedItems([...selectedItems, item]);
    };

    const removeSelectedItem = (item: string) => {
        if (selectedItems.length > 0) {
            const items = selectedItems.filter((i) => i !== item);
            setSelectedItems(items);
        }
    };

    const [deleteProduct] = useDeleteMultipleProductsMutation();

    const removeProducts = async (items: string[]) => {
        const toastId = toast.loading("Deleting ...");
        try {
            const res = await deleteProduct({
                productIds: items,
            }).unwrap();
            if (res.success === true) {
                toast.success(res.message, { id: toastId, duration: 2000 });
            } else {
                toast.error(res.message, { id: toastId, duration: 2000 });
            }
        } catch (error: any) {
            toast.error(error.data.message || "Failed to Login", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <div className="w-full">
            <h1 className=" block text-2xl text-center bg-white py-3">
                Bulk Delete
            </h1>
            <div className="w-full text-[16px] mt-5">
                <div
                    className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 bg-gray-300 my-5 px-5 py-5"
                    // style={{
                    //     display: `${selectedItems.length ? "" : "none"}`,
                    // }}
                >
                    <div>
                        <label className="text-[20px]">
                            Selected Item: {selectedItems.length}
                        </label>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="bg-red-500 text-white px-3 py-1 rounded-md disabled:opacity-50"
                            disabled={selectedItems.length === 0}
                            onClick={() => removeProducts(selectedItems)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full ">
                        <thead>
                            <tr className="bg-gray-400 text-left">
                                <th className="px-4 py-2 w-2"></th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Category</th>
                            </tr>
                        </thead>
                        {isProductDataLoading === false ? (
                            <tbody>
                                {productData?.data?.map((product: TProduct) => (
                                    <tr
                                        key={product._id}
                                        className="bg-gray-200"
                                    >
                                        <td className="px-4 py-2">
                                            <input
                                                type="checkbox"
                                                name="product"
                                                id="product"
                                                onClick={(
                                                    event: React.MouseEvent<
                                                        HTMLInputElement,
                                                        MouseEvent
                                                    >,
                                                ) => {
                                                    if (
                                                        (
                                                            event.target as HTMLInputElement
                                                        ).checked
                                                    ) {
                                                        addSelectedItem(
                                                            product?._id,
                                                        );
                                                    } else {
                                                        removeSelectedItem(
                                                            product?._id,
                                                        );
                                                    }
                                                }}
                                                className="w-4 h-4"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            {product.name}
                                        </td>
                                        <td className="px-4 py-2">
                                            {product.price}
                                        </td>
                                        <td className="px-4 py-2">
                                            {product.quantity}
                                        </td>
                                        <td className="px-4 py-2">
                                            {product?.category
                                                ?.map((c) => c.name)
                                                .join(", ") || ""}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan={5}>
                                        <div className="my-[50px] flex flex-col justify-center">
                                            <div>
                                                <Spin tip="Loading">
                                                    <div className="content" />
                                                </Spin>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BulkDelete;
