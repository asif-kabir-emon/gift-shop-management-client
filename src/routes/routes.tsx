import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import HiddenRouteAfterLogin from "../components/layout/HiddenRouteAfterLogin";
import { routeGenerator } from "../utils/routeGenerator";
import { managerPaths } from "./manager.routes";
import { sellerPaths } from "./seller.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ManagerProducts from "../pages/Manager/ProductManagement/ManagerProducts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <ManagerProducts />,
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
        path: "*",
        element: <div>Not found!</div>,
    },
]);

export default router;
