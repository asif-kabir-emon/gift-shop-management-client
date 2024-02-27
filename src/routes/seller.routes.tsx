import Coupons from "../pages/Coupons";
import Dashboard from "../pages/Dashboard";
import GiftProducts from "../pages/GiftProducts";
import SellHistory from "../pages/SellHistory";

export const sellerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <Dashboard />,
    },
    {
        name: "Gift List",
        path: "gift-list",
        element: <GiftProducts />,
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
