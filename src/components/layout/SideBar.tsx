import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentToken } from "../../redux/feature/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { sideBarItemsGenerator } from "../../utils/sideBarItemsGenerator";
import { managerPaths } from "../../routes/manager.routes";
import { sellerPaths } from "../../routes/seller.routes";
import { TUser } from "../../types";

const userRole = {
    MANAGER: "manager",
    SELLER: "seller",
};

const SideBar = () => {
    const token = useAppSelector(useCurrentToken);
    const dispatch = useAppDispatch();

    let user;

    if (token) {
        user = verifyToken(token);
    } else {
        user = null;
        dispatch(logout());
    }

    let sideBarItems;

    switch ((user as TUser)?.role) {
        case userRole.MANAGER:
            sideBarItems = sideBarItemsGenerator(
                managerPaths,
                userRole.MANAGER,
            );
            break;
        case userRole.SELLER:
            sideBarItems = sideBarItemsGenerator(sellerPaths, userRole.SELLER);
            break;
        default:
            break;
    }

    return (
        <Sider breakpoint="lg" collapsedWidth="0">
            <div
                className="demo-logo-vertical text-[var(--secondary-color)]"
                style={{
                    height: "32px",
                    margin: "16px",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    alignItems: "center",
                }}
            >
                Gift Shop
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={sideBarItems}
            />
        </Sider>
    );
};

export default SideBar;
