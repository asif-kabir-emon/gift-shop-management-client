import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

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

type TProductDataProps = {
    productData: [TProductProps];
    handleDeleteProduct: (id: string) => void;
    handleSellProduct: (
        name: string,
        productId: string,
        quantity: number,
    ) => Promise<boolean>;
    showSellModal: boolean;
    setShowSellModal: (value: boolean) => void;
};

const ProductGridView = ({
    productData,
    handleDeleteProduct,
    handleSellProduct,
    showSellModal,
    setShowSellModal,
}: TProductDataProps) => {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleCancel = () => {
        setName("");
        setQuantity(1);
        setProductId("");
        setShowSellModal(false);
    };

    const handleOk = async () => {
        setLoading(true);
        const res = await handleSellProduct(name, productId, quantity);
        if (res) {
            setLoading(false);
            handleCancel();
            setShowSellModal(false);
        } else {
            setLoading(false);
        }
    };

    const changeQuantity = (type: string) => {
        if (type === "increase") {
            setQuantity(quantity + 1);
        }
        if (type === "decrease") {
            if (quantity !== 1) {
                setQuantity(quantity - 1);
            }
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
                                        <button
                                            onClick={() => {
                                                setShowSellModal(true);
                                                setProductId(product._id);
                                            }}
                                            className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-center rounded-md p-2 w-full font-bold"
                                        >
                                            Sell
                                        </button>
                                    </div>
                                    {showSellModal && (
                                        <Modal
                                            open={showSellModal}
                                            title={`Sell the product - ${product.name}`}
                                            onOk={handleOk}
                                            onCancel={handleCancel}
                                            footer={[
                                                <Button
                                                    key="back"
                                                    onClick={handleCancel}
                                                >
                                                    Close
                                                </Button>,
                                                <Button
                                                    key="link"
                                                    loading={loading}
                                                    onClick={handleOk}
                                                    className="bg-[var(--secondary-color)] text-[var(--primary-color)] m-0 rounded-md"
                                                >
                                                    Buy
                                                </Button>,
                                            ]}
                                        >
                                            <div className="flex flex-col gap-2">
                                                <div>
                                                    <div className="text-xl p-2">
                                                        Name
                                                    </div>
                                                    <Input
                                                        type="text"
                                                        id="name"
                                                        placeholder="Enter buyer name"
                                                        value={name}
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="m-2 p-2"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-xl p-2">
                                                        Quantity
                                                    </div>
                                                    <div className="flex flex-row gap-3 justify-start items-center text-lg">
                                                        <button
                                                            onClick={() =>
                                                                changeQuantity(
                                                                    "decrease",
                                                                )
                                                            }
                                                            className="bg-gray-200 hover:bg-gray-400 px-2 py-1 text-xl m-2"
                                                        >
                                                            -
                                                        </button>
                                                        <span>{quantity}</span>
                                                        <button
                                                            onClick={() =>
                                                                changeQuantity(
                                                                    "increase",
                                                                )
                                                            }
                                                            className="bg-gray-200 hover:bg-gray-400 px-2 py-1 text-xl m-2"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                    )}
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

export default ProductGridView;
