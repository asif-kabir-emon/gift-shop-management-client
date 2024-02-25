/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../../../redux/hooks";
import { setProduct } from "../../../redux/feature/product/productSlice";
import { useDeleteMultipleProductsMutation } from "../../../redux/feature/product/productManagement.api";
import { TProduct } from "../../../types";
import ProductSellModal from "./ProductSellModal";

type TProductDataProps = {
    productData: [TProduct];
};

const ProductListView = ({ productData }: TProductDataProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [deleteProducts] = useDeleteMultipleProductsMutation();

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

    const handleRemoveProduct = async (items: string[]) => {
        const toastId = toast.loading("Deleting ...");
        try {
            const res = await deleteProducts({
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

    const onClickCopyProduct = (id: string) => {
        console.log("Copy Product", id);
        const product = productData.find((p) => p._id === id);
        dispatch(
            setProduct({
                name: product?.name || "",
                price: Number(product?.price) || 0,
                description: product?.description || "",
                quantity: Number(product?.quantity) || 0,
            }),
        );
        navigate(`/gift-products/add`);
    };

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col justify-start flex-wrap gap-2 w-full">
                <div
                    className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 bg-gray-300 mb-2 px-5 py-3 rounded"
                    style={{
                        display: `${selectedItems.length ? "" : "none"}`,
                    }}
                >
                    <div>
                        <label className="text-[16px]">
                            Selected Item: {selectedItems.length}
                        </label>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="bg-red-500 text-white px-3 py-1 rounded-md disabled:opacity-50"
                            disabled={selectedItems.length === 0}
                            onClick={() => handleRemoveProduct(selectedItems)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <div className="w-full bg-white px-5 py-3 rounded overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-300">
                                <th className="px-4 py-2 w-2"></th>
                                <th className="px-4 py-2 text-left w-[40px]">
                                    Product
                                </th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Price</th>
                                <th className="px-4 py-2 text-left">
                                    Quantity
                                </th>
                                <th className="px-[2px] py-2 text-left w-[40px]">
                                    Action
                                </th>
                                <th className="px-[2px] py-2 text-left  w-[40px]"></th>
                                <th className="px-[2px] py-2 text-left  w-[60px]"></th>
                                <th className="px-[2px] py-2 text-left  w-[40px]"></th>
                            </tr>
                        </thead>
                        {productData.length > 0 ? (
                            <tbody>
                                {productData.map((product: TProduct) => (
                                    <tr
                                        key={product._id}
                                        className="border-[1px] border-l-0 border-r-0 border-gray-200 hover:bg-gray-100"
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
                                                className="w-5 h-5 cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="w-full h-[40px]">
                                                {product.imageURL !== "" ? (
                                                    <img
                                                        src={product.imageURL}
                                                        alt={product.name}
                                                        className="h-[40px] w-[40px]"
                                                    />
                                                ) : (
                                                    <div className="h-[40px] w-[40px] flex justify-center items-center bg-gray-200 rounded">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
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
                                        <td className="px-[2px] py-2">
                                            <Link
                                                to={`/gift-products/edit/${product._id}`}
                                            >
                                                <button className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-center rounded-md p-2 w-[40px]">
                                                    <svg
                                                        className="size-5"
                                                        fill="none"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </Link>
                                        </td>
                                        <td className="px-[2px] py-2">
                                            <button
                                                onClick={() => {
                                                    handleRemoveProduct([
                                                        product._id,
                                                    ]);
                                                }}
                                                className="bg-red-600 hover:bg-red-400 text-[var(--primary-color)] text-center rounded-md p-2 w-[40px]"
                                            >
                                                <svg
                                                    className="size-5"
                                                    fill="none"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </td>
                                        <td className="px-[2px] py-2">
                                            <div>
                                                <ProductSellModal
                                                    productInfo={product}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-[2px] py-2">
                                            <button
                                                onClick={() => {
                                                    onClickCopyProduct(
                                                        product._id,
                                                    );
                                                }}
                                                className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-center rounded-md p-2 w-[40px] font-bold"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="text-center py-[20px]"
                                    >
                                        No Product Found
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

export default ProductListView;
