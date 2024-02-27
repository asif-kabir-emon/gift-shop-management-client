import Dashboard from "../pages/Dashboard";
import AddCoupon from "../pages/Manager/AddCoupon";
import AddProduct from "../pages/Manager/AddProduct";
import BulkDelete from "../pages/Manager/BulkDelete";
import CopyProduct from "../pages/Manager/CopyProduct";
import Coupons from "../pages/Manager/Coupons";
import ManagerProducts from "../pages/Manager/ManagerProducts";
import UpdateProduct from "../pages/Manager/UpdateProduct";
import SellHistory from "../pages/SellHistory";

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
                element: <ManagerProducts />,
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
        ],
    },
    {
        name: "Sell History",
        path: "sell-history",
        element: <SellHistory />,
    },
];
