/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
    useDeleteProductsMutation,
    useGetProductsMutation,
} from "../../redux/feature/product/productApi";
import { Spin } from "antd";
import { toast } from "sonner";

type TProductProps = {
    _id: string;
    name: string;
    price: string;
    quantity: string;
    description: string;
    imageURL: string;
    category: {
        _id: string;
        name: string;
    };
    brand: {
        _id: string;
        name: string;
    };
    occasion: {
        _id: string;
        name: string;
    };
    theme: {
        _id: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
};

const BulkDelete = () => {
    const [loading, setLoading] = useState(true);
    const [products] = useGetProductsMutation();
    const [productData, setProductData] = useState<[TProductProps]>([
        {
            _id: "",
            name: "",
            price: "",
            quantity: "",
            description: "",
            imageURL: "",
            category: {
                _id: "",
                name: "",
            },
            brand: {
                _id: "",
                name: "",
            },
            occasion: {
                _id: "",
                name: "",
            },
            theme: {
                _id: "",
                name: "",
            },
            createdAt: "",
            updatedAt: "",
        },
    ]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await products(undefined).unwrap();
            if (res.success === true) {
                setProductData(res.data);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [loading]);

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

    const [deleteProduct] = useDeleteProductsMutation();

    const deleteProducts = async (items: string[]) => {
        const toastId = toast.loading("Deleting ...");
        try {
            const res = await deleteProduct({
                productIds: items,
            }).unwrap();
            if (res.success === true) {
                toast.success(res.message, { id: toastId, duration: 2000 });
                setLoading(true);
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
                            onClick={() => deleteProducts(selectedItems)}
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
                        {loading === false ? (
                            <tbody>
                                {productData.map((product) => (
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
                                            {product.category.name}
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
