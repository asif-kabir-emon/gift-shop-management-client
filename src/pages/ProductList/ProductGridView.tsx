/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import GForm from "../../components/form/GForm";
import GInput from "../../components/form/GInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { sellProductSchema } from "../../Schemas/sell.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeleteSingleProductMutation } from "../../redux/feature/product/productManagement.api";
import { toast } from "sonner";
import { useSellProductMutation } from "../../redux/feature/SaleInfo/sellManagement.api";

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
    }[];
    brand: {
        _id: string;
        name: string;
    };
    occasion: {
        _id: string;
        name: string;
    }[];
    theme: {
        _id: string;
        name: string;
    }[];
    createdAt: string;
    updatedAt: string;
};

type TProductDataProps = {
    productData: [TProductProps];
};

const ProductGridView = ({ productData }: TProductDataProps) => {
    const [deleteProduct] = useDeleteSingleProductMutation();

    const handleDeleteProduct = async (id: string) => {
        const toastId = toast.loading("Deleting Product...");
        try {
            const res = await deleteProduct(id).unwrap();

            if (res.success === true) {
                toast.success(res.message || "Product deleted successfully", {
                    id: toastId,
                    duration: 2000,
                });
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

    return (
        <div className="flex justify-center w-full">
            <div className="flex justify-start flex-wrap gap-2 w-full">
                {productData.length > 0 ? (
                    productData.map((product) => (
                        <div key={product._id} className="w-full md:w-[300px]">
                            <div className="flex flex-col justify-center gap-2 border-2 border-gray-200 rounded-lg w-full bg-[var(--primary-color)] p-4">
                                <div className="w-full h-[200px]">
                                    {product.imageURL !== "" ? (
                                        <img
                                            src={product.imageURL}
                                            alt={product.name}
                                            className="h-[200px] w-[200px]"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex justify-center items-center bg-gray-200">
                                            <h2 className="text-2xl text-black">
                                                No Image
                                            </h2>
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-lg font-bold">
                                    {product.name}
                                </h2>
                                <div className="flex flex-row justify-between items-center">
                                    <h3 className="text-lg font-bold flex flex-row gap-1 items-center">
                                        <span className="text-2xl">
                                            &#2547;
                                        </span>
                                        {product.price}
                                    </h3>
                                    <p className="text-sm">
                                        Quantity: {product.quantity}
                                    </p>
                                </div>
                                <div className="flex flex-row justify-between w-full gap-2">
                                    <div className="w-full">
                                        <SellProductModal
                                            productInfo={product}
                                        />
                                    </div>
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
                                    <button
                                        onClick={() => {
                                            handleDeleteProduct(product._id);
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
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center w-full h-[200px]">
                        <h2 className="text-2xl font-bold">
                            No Products Found
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
};

const SellProductModal = ({ productInfo }: { productInfo: TProductProps }) => {
    const [sellProduct] = useSellProductMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Selling ...");
        const sellInfo = {
            buyerName: data.buyerName,
            quantity: Number(data.quantity),
            productId: productInfo._id,
        };
        console.log(sellInfo);

        try {
            const res = await sellProduct(sellInfo).unwrap();
            if (res.success === true) {
                toast.success(res.message || "Product selling successfully", {
                    id: toastId,
                    duration: 2000,
                });
                setIsModalOpen(false);
            } else {
                toast.error(res.message || "Failed to sell product", {
                    id: toastId,
                    duration: 2000,
                });
            }
        } catch (error: any) {
            toast.error(error.data.message || "Failed to sell product", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <div>
            <button
                onClick={showModal}
                className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-center rounded-md p-2 w-full font-bold"
            >
                Sell
            </button>
            <Modal
                title={`Sell the product`}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="my-5 text-[12px] bg-slate-300 px-3 py-2 font-medium">
                    <h4>Product Name: {productInfo.name}</h4>
                    <h4>
                        Price: &#2547; {}
                        {productInfo.price} x 1
                    </h4>
                    <h4>Available Quantity: {productInfo.quantity}</h4>
                </div>
                <GForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(sellProductSchema)}
                >
                    <GInput
                        type="text"
                        name="buyerName"
                        placeholder="Enter Buyer Name"
                        label="Buyer Name"
                    />
                    <GInput
                        type="number"
                        name="quantity"
                        placeholder="Enter Quantity"
                        label="Quantity"
                    />
                    <div className="flex justify-end my-5">
                        <Button
                            htmlType="submit"
                            className="bg-[var(--secondary-color)] min-w-[100px] text-[var(--primary-color)] m-0 rounded-md"
                        >
                            Sell
                        </Button>
                    </div>
                </GForm>
                {/* <div className="flex flex-col gap-2">
                    <div>
                        <div className="text-xl p-2">Name</div>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Enter buyer name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="m-2 p-2"
                        />
                    </div>
                    <div>
                        <div className="text-xl p-2">Quantity</div>
                        <div className="flex flex-row gap-3 justify-start items-center text-lg">
                            <button
                                onClick={() => changeQuantity("decrease")}
                                className="bg-gray-200 hover:bg-gray-400 px-2 py-1 text-xl m-2"
                            >
                                -
                            </button>
                            <span>{quantity}</span>
                            <button
                                onClick={() => changeQuantity("increase")}
                                className="bg-gray-200 hover:bg-gray-400 px-2 py-1 text-xl m-2"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div> */}
            </Modal>
        </div>
    );
};

export default ProductGridView;
