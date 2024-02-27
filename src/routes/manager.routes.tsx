import Dashboard from "../pages/Dashboard";
import AddCoupon from "../pages/Manager/CouponManagement/AddCoupon";
import AddProduct from "../pages/Manager/ProductManagement/AddProduct";
import BulkDelete from "../pages/Manager/BulkDelete";
import CopyProduct from "../pages/Manager/ProductManagement/CopyProduct";
import UpdateProduct from "../pages/Manager/ProductManagement/UpdateProduct";
import SellHistory from "../pages/SellHistory";
import UpdateCoupon from "../pages/Manager/CouponManagement/UpdateCoupon";
import GiftProducts from "../pages/GiftProducts";
import Coupons from "../pages/Coupons";

export const managerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <Dashboard />,
    },
    {
        name: "Gift Management",
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
            {
                name: "Bulk Product Delete",
                path: "bulk-product-delete",
                element: <BulkDelete />,
            },
        ],
    },
    {
        name: "Coupon Management",
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
    {
        name: "Sell History",
        path: "sell-history",
        element: <SellHistory />,
    },
];
