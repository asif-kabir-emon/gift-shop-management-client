/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import GDropDownSearch from "../../components/form/GDropDownSearch";
import GForm from "../../components/form/GForm";
import GInputNormal from "../../components/form/GInputNormal";
import GTextBox from "../../components/form/GTextBoxNormal";
import {
    useCreateProductMutation,
    useProductBrandMutation,
    useProductCategoryMutation,
    useProductOccasionMutation,
    useProductThemeMutation,
} from "../../redux/feature/product/productApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const AddProduct = () => {
    const navigate = useNavigate();
    const [newProduct] = useCreateProductMutation();
    const [productCategory] = useProductCategoryMutation();
    const [productBrand] = useProductBrandMutation();
    const [productOccasion] = useProductOccasionMutation();
    const [productTheme] = useProductThemeMutation();
    const [productCategories, setProductCategories] = useState([]);
    const [productBrands, setProductBrands] = useState([]);
    const [productOccasions, setProductOccasions] = useState([]);
    const [productThemes, setProductThemes] = useState([]);

    const [inputError, setInputError] = useState({
        name: { error: false, message: "" },
        price: { error: false, message: "" },
        quantity: { error: false, message: "" },
        details: { error: false, message: "" },
        category: { error: false, message: "" },
        brand: { error: false, message: "" },
        occasion: { error: false, message: "" },
        theme: { error: false, message: "" },
    });

    const getProductCategory = async () => {
        const res = await productCategory(undefined).unwrap();
        const data = res.data.map((item: { _id: string; name: string }) => {
            return {
                label: item.name,
                value: item._id,
            };
        });
        return data;
    };

    const getProductBrand = async () => {
        const res = await productBrand(undefined).unwrap();
        const data = res.data.map((item: { _id: string; name: string }) => {
            return {
                label: item.name,
                value: item._id,
            };
        });
        return data;
    };

    const getProductOccasion = async () => {
        const res = await productOccasion(undefined).unwrap();
        const data = res.data.map((item: { _id: string; name: string }) => {
            return {
                label: item.name,
                value: item._id,
            };
        });
        return data;
    };

    const getProductTheme = async () => {
        const res = await productTheme(undefined).unwrap();
        const data = res.data.map((item: { _id: string; name: string }) => {
            return {
                label: item.name,
                value: item._id,
            };
        });
        return data;
    };

    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                const tProductCategory = await getProductCategory();
                const tProductBrand = await getProductBrand();
                const tProductOccasion = await getProductOccasion();
                const tProductTheme = await getProductTheme();
                setProductCategories(tProductCategory);
                setProductBrands(tProductBrand);
                setProductOccasions(tProductOccasion);
                setProductThemes(tProductTheme);
            } catch (error) {
                console.error("Error fetching product categories:", error);
            }
        };

        fetchProductCategories();
    }, [productCategory, productBrand]);

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Creating Product...");
        try {
            if (data) {
                const error = { ...inputError };
                if (data.name === "" || data.name === undefined) {
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

                if (data.price === "" || data.price === undefined) {
                    error["price"] = {
                        error: true,
                        message: "Price is required.",
                    };
                } else if (!/^\d+(\.\d+)?$/.test(data.price)) {
                    error["price"] = {
                        error: true,
                        message:
                            "Price must be a number. Please enter a valid price.",
                    };
                } else if (data.price <= 0) {
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

                if (data.quantity === "" || data.quantity === undefined) {
                    error["quantity"] = {
                        error: true,
                        message: "Product Quantity is required.",
                    };
                } else if (!/^\d+$/.test(data.quantity)) {
                    error["quantity"] = {
                        error: true,
                        message:
                            "Product Quantity must be a number. Please enter a valid quantity.",
                    };
                } else if (data.quantity <= 0) {
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

                if (data.details === "" || data.details === undefined) {
                    error["details"] = {
                        error: true,
                        message: "Product details is required.",
                    };
                } else {
                    error["details"] = {
                        error: false,
                        message: "",
                    };
                }

                if (data.category === "" || data.category === undefined) {
                    error["category"] = {
                        error: true,
                        message: "Product category is required.",
                    };
                } else {
                    error["category"] = {
                        error: false,
                        message: "",
                    };
                }

                if (data.brand === "" || data.brand === undefined) {
                    error["brand"] = {
                        error: true,
                        message: "Product brand is required.",
                    };
                } else {
                    error["brand"] = {
                        error: false,
                        message: "",
                    };
                }

                if (data.occasion === "" || data.occasion === undefined) {
                    error["occasion"] = {
                        error: true,
                        message: "Product occasion is required.",
                    };
                } else {
                    error["occasion"] = {
                        error: false,
                        message: "",
                    };
                }

                if (data.theme === "" || data.theme === undefined) {
                    error["theme"] = {
                        error: true,
                        message: "Product theme is required.",
                    };
                } else {
                    error["theme"] = {
                        error: false,
                        message: "",
                    };
                }

                setInputError(error);
                console.log(error);

                const hasError = Object.values(error).some(
                    (item) => item.error,
                );

                if (!hasError) {
                    const productInfo = {
                        name: data.name,
                        price: parseFloat(data.price),
                        quantity: parseInt(data.quantity),
                        description: data.details,
                        category: data.category,
                        brand: data.brand,
                        occasion: data.occasion,
                        theme: data.theme,
                    };
                    const res = await newProduct(productInfo).unwrap();
                    console.log(res);

                    if (res.success === true) {
                        toast.success("Product Created Successfully", {
                            id: toastId,
                            duration: 2000,
                        });
                        navigate("/gift-products/gift-list");
                    } else {
                        toast.error(res.message || "Failed to add product", {
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
            console.error("Error adding product:", error);
            toast.error(error.data.message || "Failed to add product", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <div className="flex flex-col justify-start gap-4">
            <div>
                <h2 className="text-center bg-white py-3 text-3xl font-bold rounded">
                    Add Product
                </h2>
            </div>
            <GForm onSubmit={onSubmit}>
                <div className="flex flex-col justify-start gap-4  rounded p-5 bg-white">
                    <div className="flex flex-col justify-start gap-1">
                        <GInputNormal
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            label="Product Name"
                        />
                        <label className="text-red-500">
                            {inputError.name.error
                                ? inputError.name.message
                                : ""}
                        </label>
                    </div>
                    <div className="flex flex-col justify-start gap-1">
                        <GInputNormal
                            type="text"
                            name="price"
                            placeholder="Enter price"
                            label="Price"
                        />
                        <label className="text-red-500">
                            {inputError.price.error
                                ? inputError.price.message
                                : ""}
                        </label>
                    </div>
                    <div className="flex flex-col justify-start gap-1">
                        <GInputNormal
                            type="text"
                            name="quantity"
                            placeholder="Enter Product Quantity"
                            label="Product Quantity"
                        />
                        <label className="text-red-500">
                            {inputError.quantity.error
                                ? inputError.quantity.message
                                : ""}
                        </label>
                    </div>
                    <div className="flex flex-col justify-start gap-1">
                        <GTextBox
                            type="text"
                            name="details"
                            placeholder="Enter Product Details"
                            label="Product Details"
                        />
                        <label className="text-red-500">
                            {inputError.details.error
                                ? inputError.details.message
                                : ""}
                        </label>
                    </div>
                    <div className="flex flex-col justify-start gap-1">
                        <GDropDownSearch
                            type="text"
                            name="category"
                            items={productCategories}
                            placeholder="Select Product Category"
                            label="Product Category"
                        />
                        <label className="text-red-500">
                            {inputError.category.error
                                ? inputError.category.message
                                : ""}
                        </label>
                    </div>
                    <div className="flex flex-col justify-start gap-1">
                        <GDropDownSearch
                            type="text"
                            name="brand"
                            items={productBrands}
                            placeholder="Select Product Brand"
                            label="Product Brand"
                        />
                        <label className="text-red-500">
                            {inputError.brand.error
                                ? inputError.brand.message
                                : ""}
                        </label>
                    </div>
                    <div className="flex flex-col justify-start gap-1">
                        <GDropDownSearch
                            type="text"
                            name="occasion"
                            items={productOccasions}
                            placeholder="Select Product Suitable Occasion"
                            label="Product Suitable Occasion"
                        />
                        <label className="text-red-500">
                            {inputError.occasion.error
                                ? inputError.occasion.message
                                : ""}
                        </label>
                    </div>
                    <div className="flex flex-col justify-start gap-1">
                        <GDropDownSearch
                            type="text"
                            name="theme"
                            items={productThemes}
                            placeholder="Select Product Theme"
                            label="Product Theme"
                        />
                        <label className="text-red-500">
                            {inputError.theme.error
                                ? inputError.theme.message
                                : ""}
                        </label>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-[var(--secondary-color)] text-[var(--primary-color)] w-full py-2 rounded-lg"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </GForm>
        </div>
    );
};

export default AddProduct;
