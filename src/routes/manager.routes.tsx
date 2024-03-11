// import Dashboard from "../pages/Dashboard";
import AddCoupon from "../pages/Manager/CouponManagement/AddCoupon";
import AddProduct from "../pages/Manager/ProductManagement/AddProduct";
import CopyProduct from "../pages/Manager/ProductManagement/CopyProduct";
import UpdateProduct from "../pages/Manager/ProductManagement/UpdateProduct";
import Dashboard from "../pages/Dashboard/Dashboard";
import UpdateCoupon from "../pages/Manager/CouponManagement/UpdateCoupon";
import GiftProducts from "../pages/GiftProducts";
import Coupons from "../pages/Coupons/Coupons";
import { MdDashboard, MdShoppingCart } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";

export const managerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        icon: MdDashboard,
        element: <Dashboard />,
    },
    {
        name: "Products",
        icon: MdShoppingCart,
        children: [
            {
                name: "Gift List",
                path: "gift-list",
                element: <GiftProducts />,
            },
            {
                name: "Add Gift",
                path: "add-gift",
                element: <AddProduct />,
            },
            {
                path: "update-gift/:productId",
                element: <UpdateProduct />,
            },
            {
                path: "add-gift/copied/:productId",
                element: <CopyProduct />,
            },
        ],
    },
    {
        name: "Coupon",
        icon: RiCoupon2Fill,
        children: [
            {
                name: "Coupon List",
                path: "coupon-list",
                element: <Coupons />,
            },
            {
                name: "Add Coupon",
                path: "add-coupon",
                element: <AddCoupon />,
            },
            {
                path: "update-coupon/:couponId",
                element: <UpdateCoupon />,
            },
        ],
    },
];
