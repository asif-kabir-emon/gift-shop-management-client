import SellHistory from "../pages/SellHistory";
import SellerProductList from "../pages/Seller/SellerProductList";

export const sellerPaths = [
    {
        name: "Gift List",
        path: "gift-list",
        element: <SellerProductList />,
    },
    {
        name: "Sell History",
        path: "sell-history",
        element: <SellHistory />,
    },
];
