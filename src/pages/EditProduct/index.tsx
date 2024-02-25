/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useLoaderData, useNavigate } from "react-router";
import GForm from "../../components/form/GForm";
import GInput from "../../components/form/GInput";
import GTextBox from "../../components/form/GTextBox";
import GSelect from "../../components/form/GSelect";
import {
    useGetAllBrandQuery,
    useGetAllCategoryQuery,
    useGetAllOccasionQuery,
    useGetAllThemeQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from "../../redux/feature/product/productManagement.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../Schemas/product.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Spin } from "antd";

function convertNumbersToStrings(
    obj: Record<string, any>,
): Record<string, any> {
    const newObj: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
        newObj[key] = typeof value === "number" ? value.toString() : value;
    }

    return newObj;
}

const EditProduct = () => {
    const navigate = useNavigate();
    const param = useLoaderData() as { id: string };
    const [updateProduct] = useUpdateProductMutation();

    const { data: productData, isLoading: isProductDataLoading } =
        useGetProductByIdQuery(param?.id);

    const { data: categoryData, isLoading: isCategoryDataLoading } =
        useGetAllCategoryQuery(undefined);
    const { data: brandData, isLoading: isBrandDataLoading } =
        useGetAllBrandQuery(undefined);
    const { data: occasionData, isLoading: isOccasionDataLoading } =
        useGetAllOccasionQuery(undefined);
    const { data: themeData, isLoading: isThemeDataLoading } =
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

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Updating Product...");
        const updatedProductInfo = {
            name: data.name,
            price: Number(data.price),
            quantity: Number(data.quantity),
            description: data.description,
            category: data.category,
            brand: data.brand,
            occasion: data.occasion,
            theme: data.theme,
        };

        try {
            const res = await updateProduct({
                id: param?.id,
                productInfo: updatedProductInfo,
            }).unwrap();
            if (res.success === true) {
                toast.success(res.message || "Product updated successfully", {
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
        } catch (error: any) {
            toast.error(error.data.message || "Failed to update product", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <div className="flex flex-col justify-start gap-4">
            {isProductDataLoading === false ? (
                <>
                    <div>
                        <h2 className="text-center bg-white py-3 text-3xl font-bold rounded">
                            Update Product
                        </h2>
                    </div>
                    <div className="bg-white px-5 py-3 rounded text-[16px]">
                        <GForm
                            onSubmit={onSubmit}
                            resolver={zodResolver(productSchema)}
                            defaultValues={convertNumbersToStrings(
                                productData?.data,
                            )}
                            disableReset={true}
                        >
                            <GInput
                                type="text"
                                name="name"
                                placeholder="Enter product name"
                                label="Product Name"
                            />
                            <GInput
                                type="text"
                                name="price"
                                placeholder="Enter price"
                                label="Price"
                            />
                            <GInput
                                type="text"
                                name="quantity"
                                placeholder="Enter Product Quantity"
                                label="Product Quantity"
                            />
                            <GTextBox
                                type="text"
                                name="description"
                                placeholder="Enter Product Details"
                                label="Product Details"
                            />
                            <GSelect
                                name="category"
                                placeholder="Select Product Category"
                                label="Product Category"
                                mode="multiple"
                                options={categoryOptions}
                                disabled={isCategoryDataLoading}
                            />
                            <GSelect
                                name="brand"
                                placeholder="Select Product Brand"
                                label="Product Brand"
                                options={brandOptions}
                                disabled={isBrandDataLoading}
                            />
                            <GSelect
                                name="occasion"
                                placeholder="Select Product Suitable Occasion"
                                label="Product Suitable Occasion"
                                mode="multiple"
                                options={occasionOptions}
                                disabled={isOccasionDataLoading}
                            />
                            <GSelect
                                name="theme"
                                placeholder="Select Product Theme"
                                label="Product Theme"
                                mode="multiple"
                                options={themeOptions}
                                disabled={isThemeDataLoading}
                            />
                            <div className="flex justify-center gap-2">
                                <button
                                    type="button"
                                    className="bg-[var(--secondary-color)] text-[var(--primary-color)] px-5 py-2 rounded-lg"
                                    onClick={() =>
                                        navigate("/gift-products/gift-list")
                                    }
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[var(--secondary-color)] text-[var(--primary-color)] px-5 py-2 rounded-lg"
                                >
                                    Update Product
                                </button>
                            </div>
                        </GForm>
                    </div>
                </>
            ) : (
                <div className="h-[100px] flex justify-center items-center">
                    <Spin size="large" />
                </div>
            )}
        </div>
    );
};

export default EditProduct;
