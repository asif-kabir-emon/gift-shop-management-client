import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/feature/auth/authSlice";
import { Button } from "antd";
import { TCartItem } from "../../redux/feature/cart/cartSlice";

const countQuantity = (cart: TCartItem[]) => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
};

const NavBar = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();

    return (
        <div className="bg-white shadow flex justify-between items-center p-3 md:px-5 md:py-[18px] sticky top-0 z-[900]">
            <div className="flex-1">{children}</div>
            <div className="flex gap-6">
                <Link to="/products/cart">
                    <div className="flex justify-center items-center relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                        </svg>
                        <span className="absolute flex justify-center items-center pt-2 text-[8px]">
                            {countQuantity(
                                useAppSelector((state) => state.cart.cartItems),
                            )}
                        </span>
                    </div>
                </Link>
                <Button
                    onClick={() => {
                        dispatch(logout());
                    }}
                    className="bg-[var(--secondary-color)] text-white hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)]"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default NavBar;
