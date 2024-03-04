import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import HiddenRouteAfterLogin from "../components/layout/HiddenRouteAfterLogin";
import { routeGenerator } from "../utils/routeGenerator";
import { managerPaths } from "./manager.routes";
import { sellerPaths } from "./seller.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import GiftProducts from "../pages/GiftProducts";
import ForgetPassword from "../pages/ForgetPassword";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Invoice from "../pages/Invoice";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <GiftProducts />,
            },
            {
                path: "/products/cart",
                element: (
                    <ProtectedRoute role="all">
                        <Cart />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/products/cart/check-out",
                element: (
                    <ProtectedRoute role="all">
                        <Checkout />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/products/cart/check-out/invoice/:id",
                element: (
                    <ProtectedRoute role="all">
                        <Invoice />
                    </ProtectedRoute>
                ),
            },
        ],
    },

    {
        path: "/manager",
        element: (
            <ProtectedRoute role="manager">
                <App />
            </ProtectedRoute>
        ),
        children: routeGenerator(managerPaths),
    },
    {
        path: "/seller",
        element: (
            <ProtectedRoute role="seller">
                <App />
            </ProtectedRoute>
        ),
        children: routeGenerator(sellerPaths),
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
        path: "/forget-password",
        element: (
            <HiddenRouteAfterLogin>
                <ForgetPassword />
            </HiddenRouteAfterLogin>
        ),
    },
    {
        path: "*",
        element: <div>Not found!</div>,
    },
]);

export default router;
