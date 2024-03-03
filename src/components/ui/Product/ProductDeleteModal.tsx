/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDeleteMultipleProductsMutation } from "../../../redux/feature/product/productManagement.api";
import { toast } from "sonner";
import { Modal } from "antd";

const ProductDeleteModal = ({
    deleteProductsList,
    singleDelete,
}: {
    deleteProductsList: string[];
    singleDelete: boolean;
}) => {
    const [deleteProducts] = useDeleteMultipleProductsMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleRemoveProduct = async (items: string[]) => {
        const toastId = toast.loading("Deleting ...", {
            position: "top-right",
        });
        try {
            const res = await deleteProducts({
                productIds: items,
            }).unwrap();
            if (res.success === true) {
                toast.success(res.message, { id: toastId, duration: 2000 });
                setIsModalOpen(false);
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
        <div>
            {singleDelete ? (
                <button
                    className="button-cancel"
                    onClick={() => {
                        showModal();
                    }}
                >
                    <svg
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        ></path>
                    </svg>
                </button>
            ) : (
                <button
                    type="button"
                    className="button-cancel"
                    disabled={deleteProductsList.length === 0}
                    onClick={() => {
                        showModal();
                    }}
                >
                    Delete
                </button>
            )}
            <Modal
                title={`Delete Product${singleDelete ? "" : "s"}`}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <p>
                    {singleDelete
                        ? "Are you sure you want to delete this product?"
                        : "Are you sure you want to delete these products?"}
                </p>
                <div className="flex justify-end mt-5 gap-2">
                    <button
                        key="cancel"
                        onClick={() => {
                            handleCancel();
                        }}
                        className="button-cancel-outline"
                    >
                        Cancel
                    </button>
                    <button
                        key="submit"
                        onClick={() => {
                            handleRemoveProduct(deleteProductsList);
                        }}
                        className="button-primary"
                    >
                        Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ProductDeleteModal;
