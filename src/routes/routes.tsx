import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import HiddenRouteAfterLogin from "../components/layout/HiddenRouteAfterLogin";
import AddProduct from "../pages/Manager/AddProduct";
import ProductList from "../pages/ProductList";
import EditProduct from "../pages/EditProduct";
import SellHistory from "../pages/SellHistory";
import BulkDelete from "../pages/BulkDelete";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <ProductList />,
            },
            {
                path: "/gift-products/add",
                element: <AddProduct />,
            },
            {
                path: "/gift-products/gift-list",
                element: <ProductList />,
            },
            {
                path: "/gift-products/edit/:id",
                element: <EditProduct />,
                loader: async ({ params }) => {
                    return {
                        id: params.id,
                    };
                },
            },
            {
                path: "/sell-history",
                element: <SellHistory />,
            },
            {
                path: "/bulk-delete",
                element: <BulkDelete />,
            },
            {
                path: "*",
                element: <div>Not found!</div>,
            },
        ],
    },
    {
        path: "/login",
        element: (
            <HiddenRouteAfterLogin>
                <Login />
            </HiddenRouteAfterLogin>
        ),
    },
    {
        path: "/register",
        element: (
            <HiddenRouteAfterLogin>
                <Registration />
            </HiddenRouteAfterLogin>
        ),
    },
    {
        path: "*",
        element: <div>Not found!</div>,
    },
]);

export default router;
