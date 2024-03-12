/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { TProduct, TUser } from "../../../types";
import ProductSellModal from "./ProductSellModal";
import { useCurrentToken } from "../../../redux/feature/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import ProductDeleteModal from "./ProductDeleteModal";
import { addToCart } from "../../../redux/feature/cart/cartSlice";
import { Space, Table, TableColumnsType } from "antd";

type TProductDataProps = {
    productData: [TProduct];
};

type TTableData = {
    key: string;
    image: string;
    name: string;
    price: string;
    quantity: string;
    product: TProduct;
};

const ProductListView = ({ productData }: TProductDataProps) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(useCurrentToken);
    const user = token ? verifyToken(token) : null;

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

    const handleAddToCart = (product: TProduct) => {
        dispatch(
            addToCart({
                productId: product._id,
                productName: product.name,
                image: product.imageURL,
                maxQuantity: product.quantity,
                price: product.price,
                quantity: 1,
            }),
        );
    };

    const tableData = productData.map((product: TProduct) => {
        return {
            key: product._id,
            image: product.imageURL,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            product: product,
        };
    });

    const columns: TableColumnsType<TTableData> = [
        {
            title: "",
            dataIndex: "key",
            key: "checkbox",
            render: (key) => {
                return (
                    <div
                        className={`${!user !== null && (user as TUser)?.role === "seller" && "hidden"}`}
                    >
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
                                    (event.target as HTMLInputElement).checked
                                ) {
                                    addSelectedItem(key);
                                } else {
                                    removeSelectedItem(key);
                                }
                            }}
                            className="w-5 h-5 cursor-pointer"
                        />
                    </div>
                );
            },
            width: "5%",
        },
        {
            title: "Product",
            dataIndex: "image",
            key: "image",
            render: (image) => {
                return (
                    <div className="w-full h-[40px]">
                        {image !== "" ? (
                            <img
                                src={image}
                                alt={image}
                                className="h-[40px] w-[40px] object-cover rounded"
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
                );
            },
            width: "40px",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => {
                return (
                    <span className="whitespace-nowrap">&#2547; {price}</span>
                );
            },
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Action",
            dataIndex: "product",
            key: "action",
            render: (product) => {
                return (
                    <Space>
                        <div
                            className={`${!user !== null && (user as TUser)?.role === "seller" && "hidden"}`}
                        >
                            <Link
                                to={`/${(user as TUser)?.role}/update-gift/${product._id}`}
                            >
                                <button className="button-primary font-medium">
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
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                        ></path>
                                    </svg>
                                </button>
                            </Link>
                        </div>
                        <div
                            className={`${!user !== null && (user as TUser)?.role === "seller" && "hidden"}`}
                        >
                            <ProductDeleteModal
                                deleteProductsList={[product._id]}
                                singleDelete={true}
                            />
                        </div>
                        <div>
                            <button
                                className="button-primary font-medium"
                                onClick={() => handleAddToCart(product)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <ProductSellModal productInfo={product} />
                        </div>
                        <div
                            className={`${!user !== null && (user as TUser)?.role === "seller" && "hidden"}`}
                        >
                            <Link
                                to={`/${(user as TUser)?.role}/add-gift/copied/${product._id}`}
                            >
                                <button className="button-primary font-medium">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                        />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </Space>
                );
            },
            width: "10%",
        },
    ];

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
                        <ProductDeleteModal
                            deleteProductsList={selectedItems}
                            singleDelete={false}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <Table
                        columns={columns}
                        dataSource={tableData}
                        scroll={{ x: 500 }}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductListView;
