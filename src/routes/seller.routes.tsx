import { MdDashboard, MdShoppingCart } from "react-icons/md";
import Coupons from "../pages/Coupons/Coupons";
import GiftProducts from "../pages/GiftProducts";
import SellHistory from "../pages/SellHistory";
import { RiCoupon2Fill } from "react-icons/ri";

export const sellerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        icon: MdDashboard,
        element: <SellHistory />,
    },
    {
        name: "Gift List",
        path: "gift-list",
        icon: MdShoppingCart,
        element: <GiftProducts />,
    },
    {
        name: "Coupon List",
        path: "coupon-list",
        icon: RiCoupon2Fill,
        element: <Coupons />,
    },
];
