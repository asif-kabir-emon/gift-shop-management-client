import { Layout, Menu } from "antd";
const { Sider } = Layout;

import { Link } from "react-router-dom";

const items = [
    {
        key: "gift-products-list",
        title: "gift-products-list",
        label: <Link to="/gift-products/gift-list">Gift List</Link>,
    },
    {
        key: "gift-products-add",
        title: "gift-products-add",
        label: <Link to="/gift-products/add">Add Gift</Link>,
    },
    // {
    //     key: "gift-products",
    //     title: "gift-products",
    //     label: "Gift Shop Management",
    //     children: [
    //         {
    //             key: "gift-products-list",
    //             title: "gift-products-list",
    //             label: <Link to="/gift-products/gift-list">Gift List</Link>,
    //         },
    //         {
    //             key: "gift-products-add",
    //             title: "gift-products-add",
    //             label: <Link to="/gift-products/add">Add Gift</Link>,
    //         },
    //     ],
    // },
    {
        key: "sale-history",
        title: "sale-history",
        label: <Link to="/sell-history">Sell History</Link>,
    },
    {
        key: "bulk-delete",
        title: "bulk-delete",
        label: <Link to="/bulk-delete">Bulk Delete</Link>,
    },
];

const SideBar = () => {
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
                items={items}
            />
        </Sider>
    );
};

export default SideBar;
