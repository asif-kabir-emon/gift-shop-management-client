/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { TProduct, TUser } from "../../../types";
import ProductSellModal from "./ProductSellModal";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/feature/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import ProductDeleteModal from "./ProductDeleteModal";
import { addToCart } from "../../../redux/feature/cart/cartSlice";

type TProductDataProps = {
    productData: [TProduct];
};

const ProductGridView = ({ productData }: TProductDataProps) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(useCurrentToken);
    const user = token ? verifyToken(token) : null;

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

    return (
        <div className="flex justify-center w-full">
            <div className="flex justify-start flex-wrap gap-2 w-full">
                {productData.length > 0 ? (
                    productData.map((product) => (
                        <div key={product._id} className="w-[300px]">
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
                                <div className="flex flex-row justify-between w-full gap-1">
                                    <div className="w-full">
                                        <ProductSellModal
                                            productInfo={product}
                                        />
                                    </div>
                                    <div
                                        className={`${!user !== null && (user as TUser)?.role === "seller" && "hidden"}`}
                                    >
                                        <Link
                                            to={`/${(user as TUser)?.role}/update-gift/${product._id}`}
                                        >
                                            <button className="button-primary">
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
                                    </div>
                                    <div
                                        className={`${!user !== null && (user as TUser)?.role === "seller" && "hidden"}`}
                                    >
                                        <ProductDeleteModal
                                            deleteProductsList={[product._id]}
                                            singleDelete={true}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="button-primary font-medium w-full flex justify-center gap-2"
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
                                                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                            />
                                        </svg>
                                        <span className="p-0 m-0">
                                            Add to cart
                                        </span>
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
