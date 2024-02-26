import AddProduct from "../pages/Manager/AddProduct";
import BulkDelete from "../pages/Manager/BulkDelete";
import CopyProduct from "../pages/Manager/CopyProduct";
import ManagerProductList from "../pages/Manager/ManagerProductList";
import UpdateProduct from "../pages/Manager/UpdateProduct";
import SellHistory from "../pages/SellHistory";

export const managerPaths = [
    {
        name: "Gift List",
        path: "gift-list",
        element: <ManagerProductList />,
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
        name: "Sell History",
        path: "sell-history",
        element: <SellHistory />,
    },
    {
        name: "Bulk Delete",
        path: "bulk-delete",
        element: <BulkDelete />,
    },
];
