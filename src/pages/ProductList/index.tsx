/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
    useDeleteProductMutation,
    useGetProductsMutation,
} from "../../redux/feature/product/productApi";
import ProductGridView from "./ProductGridView";
import { toast } from "sonner";
import { useSellProductMutation } from "../../redux/feature/SaleInfo/saleInfoApi";
import FilterView from "./FilterView";
import { Spin } from "antd";
import ProductListView from "./ProductListView";

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

const ProductList = () => {
    const [products] = useGetProductsMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [sellProduct] = useSellProductMutation();
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

    const [queryData, setQueryData] = useState({
        name: "",
        category: "",
        brand: "",
        occasion: "",
        theme: "",
        minPrice: 0,
        maxPrice: -1,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("queryData", queryData);
        const fetchProducts = async () => {
            const res = await products(queryData).unwrap();
            if (res.success === true) {
                setProductData(res.data);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [loading]);

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            const res = await products(queryData).unwrap();
            if (res.success === true) {
                setProductData(res.data);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [queryData]);

    const handleDeleteProduct = async (id: string) => {
        const toastId = toast.loading("Deleting Product...");
        try {
            const res = await deleteProduct(id).unwrap();

            if (res.success === true) {
                toast.success(res.message || "Product deleted successfully", {
                    id: toastId,
                    duration: 2000,
                });
                setLoading(true);
            } else {
                toast.error(res.message || "Failed to delete product", {
                    id: toastId,
                    duration: 2000,
                });
            }
        } catch (error: any) {
            toast.error(error.data.message || "Failed to add product", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    const [showSellModal, setShowSellModal] = useState(false);

    const handleSellProduct = async (
        name: string,
        productId: string,
        quantity: number,
    ): Promise<boolean> => {
        const toastId = toast.loading("Selling Product...");
        try {
            const saleInfo = {
                quantity: quantity,
                productId: productId,
                buyerName: name,
            };
            const res = await sellProduct(saleInfo).unwrap();

            if (res.success === true) {
                toast.success(res.message || "Product selling successfully", {
                    id: toastId,
                    duration: 2000,
                });
                setLoading(true);
                return true;
            } else {
                toast.error(res.message || "Failed to sell product", {
                    id: toastId,
                    duration: 2000,
                });
                return false;
            }
        } catch (error: any) {
            toast.error(error.data.message || "Failed to sell product", {
                id: toastId,
                duration: 2000,
            });
            return false;
        }
    };

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
                <FilterView setQueryData={setQueryData} queryData={queryData} />
                {loading === false ? (
                    <div className="w-full">
                        {gridView ? (
                            <ProductGridView
                                productData={productData}
                                handleDeleteProduct={handleDeleteProduct}
                                handleSellProduct={handleSellProduct}
                                showSellModal={showSellModal}
                                setShowSellModal={setShowSellModal}
                            />
                        ) : (
                            <ProductListView
                                productData={productData}
                                handleDeleteProduct={handleDeleteProduct}
                                handleSellProduct={handleSellProduct}
                                showSellModal={showSellModal}
                                setShowSellModal={setShowSellModal}
                                setProductLoading={setLoading}
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

export default ProductList;
