/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
    useGetProductByIdMutation,
    useUpdateProductMutation,
    // useProductBrandMutation,
    // useProductCategoryMutation,
    // useProductOccasionMutation,
    // useProductThemeMutation,
} from "../../redux/feature/product/productApi";
import { toast } from "sonner";
import { useLoaderData, useNavigate } from "react-router";
import TextArea from "antd/es/input/TextArea";

const EditProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const productId = useLoaderData();
    const [updateProduct] = useUpdateProductMutation();
    const [productData] = useGetProductByIdMutation();
    // const [productCategory] = useProductCategoryMutation();
    // const [productBrand] = useProductBrandMutation();
    // const [productOccasion] = useProductOccasionMutation();
    // const [productTheme] = useProductThemeMutation();
    // const [productCategories, setProductCategories] = useState([]);
    // const [productBrands, setProductBrands] = useState([]);
    // const [productOccasions, setProductOccasions] = useState([]);
    // const [productThemes, setProductThemes] = useState([]);
    const [productInfo, setProductInfo] = useState({
        _id: "",
        name: "",
        price: "",
        quantity: "",
        description: "",
        category: "",
        brand: "",
        occasion: "",
        theme: "",
    });

    const [updatedProductInfo, setUpdatedProductInfo] = useState({
        name: "",
        price: "",
        quantity: "",
        description: "",
        // category: "",
        // brand: "",
        // occasion: "",
        // theme: "",
    });

    const [inputError, setInputError] = useState({
        name: { error: false, message: "" },
        price: { error: false, message: "" },
        quantity: { error: false, message: "" },
        description: { error: false, message: "" },
        category: { error: false, message: "" },
        brand: { error: false, message: "" },
        occasion: { error: false, message: "" },
        theme: { error: false, message: "" },
    });

    // const getProductCategory = async () => {
    //     const res = await productCategory(undefined).unwrap();
    //     const data = res.data.map((item: { _id: string; name: string }) => {
    //         return {
    //             label: item.name,
    //             value: item._id,
    //         };
    //     });
    //     return data;
    // };

    // const getProductBrand = async () => {
    //     const res = await productBrand(undefined).unwrap();
    //     const data = res.data.map((item: { _id: string; name: string }) => {
    //         return {
    //             label: item.name,
    //             value: item._id,
    //         };
    //     });
    //     return data;
    // };

    // const getProductOccasion = async () => {
    //     const res = await productOccasion(undefined).unwrap();
    //     const data = res.data.map((item: { _id: string; name: string }) => {
    //         return {
    //             label: item.name,
    //             value: item._id,
    //         };
    //     });
    //     return data;
    // };

    // const getProductTheme = async () => {
    //     const res = await productTheme(undefined).unwrap();
    //     const data = res.data.map((item: { _id: string; name: string }) => {
    //         return {
    //             label: item.name,
    //             value: item._id,
    //         };
    //     });
    //     return data;
    // };

    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                if (loading === true) {
                    const tProductData = await productData(
                        (productId as { id: string }).id,
                    ).unwrap();
                    // const tProductCategory = await getProductCategory();
                    // const tProductBrand = await getProductBrand();
                    // const tProductOccasion = await getProductOccasion();
                    // const tProductTheme = await getProductTheme();
                    // setProductCategories(tProductCategory);
                    // setProductBrands(tProductBrand);
                    // setProductOccasions(tProductOccasion);
                    // setProductThemes(tProductTheme);
                    setProductInfo(tProductData.data);
                    setUpdatedProductInfo(tProductData.data);
                }
            } catch (error) {
                console.error("Error fetching product categories:", error);
            }
        };
        setLoading(false);

        fetchProductCategories();
    }, [loading]);

    const onSubmit = async () => {
        const toastId = toast.loading("Updating Product...");
        try {
            if (updatedProductInfo) {
                const error = { ...inputError };
                if (
                    updatedProductInfo.name === "" ||
                    updatedProductInfo.name === undefined
                ) {
                    console.log("name");
                    error["name"] = {
                        error: true,
                        message: "Product name is required.",
                    };
                } else {
                    error["name"] = {
                        error: false,
                        message: "",
                    };
                }

                if (
                    updatedProductInfo.price === "" ||
                    updatedProductInfo.price === undefined
                ) {
                    error["price"] = {
                        error: true,
                        message: "Price is required.",
                    };
                } else if (!/^\d+(\.\d+)?$/.test(updatedProductInfo.price)) {
                    error["price"] = {
                        error: true,
                        message:
                            "Price must be a number. Please enter a valid price.",
                    };
                } else if (parseFloat(updatedProductInfo.price) <= 0) {
                    error["price"] = {
                        error: true,
                        message:
                            "Price must be greater than 0. Please enter a valid price.",
                    };
                } else {
                    error["price"] = {
                        error: false,
                        message: "",
                    };
                }

                if (
                    updatedProductInfo.quantity === "" ||
                    updatedProductInfo.quantity === undefined
                ) {
                    error["quantity"] = {
                        error: true,
                        message: "Product Quantity is required.",
                    };
                } else if (!/^\d+$/.test(updatedProductInfo.quantity)) {
                    error["quantity"] = {
                        error: true,
                        message:
                            "Product Quantity must be a number. Please enter a valid quantity.",
                    };
                } else if (parseInt(updatedProductInfo.quantity) <= 0) {
                    error["quantity"] = {
                        error: true,
                        message: "Product Quantity must be greater than 0.",
                    };
                } else {
                    error["quantity"] = {
                        error: false,
                        message: "",
                    };
                }

                if (
                    updatedProductInfo.description === "" ||
                    updatedProductInfo.description === undefined
                ) {
                    error["description"] = {
                        error: true,
                        message: "Product description is required.",
                    };
                } else {
                    error["description"] = {
                        error: false,
                        message: "",
                    };
                }

                // if (updatedProductInfo.category === "" || updatedProductInfo.category === undefined) {
                //     error["category"] = {
                //         error: true,
                //         message: "Product category is required.",
                //     };
                // } else {
                //     error["category"] = {
                //         error: false,
                //         message: "",
                //     };
                // }

                // if (updatedProductInfo.brand === "" || updatedProductInfo.brand === undefined) {
                //     error["brand"] = {
                //         error: true,
                //         message: "Product brand is required.",
                //     };
                // } else {
                //     error["brand"] = {
                //         error: false,
                //         message: "",
                //     };
                // }

                // if (updatedProductInfo.occasion === "" || updatedProductInfo.occasion === undefined) {
                //     error["occasion"] = {
                //         error: true,
                //         message: "Product occasion is required.",
                //     };
                // } else {
                //     error["occasion"] = {
                //         error: false,
                //         message: "",
                //     };
                // }

                // if (updatedProductInfo.theme === "" || updatedProductInfo.theme === undefined) {
                //     error["theme"] = {
                //         error: true,
                //         message: "Product theme is required.",
                //     };
                // } else {
                //     error["theme"] = {
                //         error: false,
                //         message: "",
                //     };
                // }

                setInputError(error);

                const hasError = Object.values(error).some(
                    (item) => item.error,
                );

                if (!hasError) {
                    const productInfoPayload = {
                        name: updatedProductInfo.name,
                        price: parseFloat(updatedProductInfo.price),
                        quantity: parseInt(updatedProductInfo.quantity),
                        description: updatedProductInfo.description,
                    };
                    console.log(productInfo);
                    const res = await updateProduct({
                        id: (productId as { id: string }).id,
                        productInfo: productInfoPayload,
                    }).unwrap();
                    console.log(res);

                    if (res.success === true) {
                        toast.success("Product Updated Successfully", {
                            id: toastId,
                            duration: 2000,
                        });
                        navigate("/gift-products/gift-list");
                    } else {
                        toast.error(res.message || "Failed to update product", {
                            id: toastId,
                            duration: 2000,
                        });
                    }
                } else {
                    toast.error("Please fill all required fields", {
                        id: toastId,
                        duration: 2000,
                    });
                }
            }
        } catch (error: any) {
            console.error("Error updating product:", error);
            toast.error(error.data.message || "Failed to update product", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    const cancelUpdate = () => {
        navigate("/gift-products/gift-list");
    };

    return (
        <div className="flex flex-col justify-start bg-white p-5">
            <div>
                <h2 className="text-center text-2xl">Update Product</h2>
            </div>
            <div className="flex flex-col justify-start gap-4">
                <div className="flex flex-col justify-start gap-1">
                    <label className="text-[var(--secondary-color)] block mb-1 text-[16px]">
                        Product Name
                    </label>
                    <input
                        type="string"
                        id="name"
                        name="name"
                        defaultValue={updatedProductInfo.name}
                        onChange={(e) => {
                            setUpdatedProductInfo({
                                ...productInfo,
                                name: e.target.value,
                            });
                        }}
                        placeholder="Enter Product Name"
                        className="w-full py-2 px-3 rounded-lg border border-[#e4dfdf] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-color)]"
                    />
                    <label className="text-red-500">
                        {inputError.name.error ? inputError.name.message : ""}
                    </label>
                </div>
                <div className="flex flex-col justify-start gap-1">
                    <label className="text-[var(--secondary-color)] block mb-1 text-[16px]">
                        Product Price
                    </label>
                    <input
                        type="number"
                        id="name"
                        name="price"
                        defaultValue={updatedProductInfo.price}
                        onChange={(e) => {
                            setUpdatedProductInfo({
                                ...productInfo,
                                price: e.target.value,
                            });
                        }}
                        placeholder="Enter Product Price"
                        className="w-full py-2 px-3 rounded-lg border border-[#e4dfdf] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-color)]"
                    />
                    <label className="text-red-500">
                        {inputError.price.error ? inputError.price.message : ""}
                    </label>
                </div>
                <div className="flex flex-col justify-start gap-1">
                    <label className="text-[var(--secondary-color)] block mb-1 text-[16px]">
                        Product Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={updatedProductInfo.quantity}
                        onChange={(e) => {
                            setUpdatedProductInfo({
                                ...productInfo,
                                quantity: e.target.value,
                            });
                        }}
                        placeholder="Enter Product Quantity"
                        className="w-full py-2 px-3 rounded-lg border border-[#e4dfdf] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-color)]"
                    />
                    <label className="text-red-500">
                        {inputError.quantity.error
                            ? inputError.quantity.message
                            : ""}
                    </label>
                </div>
                <div className="flex flex-col justify-start gap-1">
                    <label className="text-[var(--secondary-color)] block mb-1 text-[16px]">
                        Product Details
                    </label>
                    <TextArea
                        id="description"
                        name="description"
                        value={updatedProductInfo.description}
                        onChange={(e) => {
                            setUpdatedProductInfo({
                                ...productInfo,
                                description: e.target.value,
                            });
                        }}
                        placeholder="Enter Product Details"
                        autoSize={{ minRows: 3, maxRows: 10 }}
                        className="w-full py-2 px-3 rounded-lg border border-[#e4dfdf] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-color)]"
                    />
                    <label className="text-red-500">
                        {inputError.description.error
                            ? inputError.description.message
                            : ""}
                    </label>
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-2">
                    <button
                        onClick={() => {
                            cancelUpdate();
                        }}
                        className="bg-[var(--secondary-color)] text-[var(--primary-color)] w-full py-2 rounded-lg md:w-[150px]"
                    >
                        Discard
                    </button>
                    <button
                        onClick={() => {
                            onSubmit();
                        }}
                        className="bg-[var(--secondary-color)] text-[var(--primary-color)] w-full py-2 rounded-lg md:w-[150px]"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
