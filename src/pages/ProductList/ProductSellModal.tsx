/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useSellProductMutation } from "../../redux/feature/SaleInfo/sellManagement.api";
import { useState } from "react";
import { TProduct } from "../../types";
import { Button, Modal } from "antd";
import GForm from "../../components/form/GForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellProductSchema } from "../../Schemas/sell.schema";
import GInput from "../../components/form/GInput";

const ProductSellModal = ({ productInfo }: { productInfo: TProduct }) => {
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
            </Modal>
        </div>
    );
};

export default ProductSellModal;