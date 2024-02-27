import Dashboard from "../pages/Dashboard";
import Coupons from "../pages/Manager/CouponManagement/Coupons";
import SellHistory from "../pages/SellHistory";
import SellerProductList from "../pages/Seller/SellerProductList";

export const sellerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <Dashboard />,
    },
    {
        name: "Gift List",
        path: "gift-list",
        element: <SellerProductList />,
    },
    {
        name: "Coupon List",
        path: "coupon-list",
        element: <Coupons />,
    },
    {
        name: "Sell History",
        path: "sell-history",
        element: <SellHistory />,
    },
];
