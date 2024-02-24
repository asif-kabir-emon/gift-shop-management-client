import { Button, Layout, theme } from "antd";
import { Outlet } from "react-router";
import SideBar from "./SideBar";
import { logout } from "../../redux/feature/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
const { Header, Content } = Layout;

const MainLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const dispatch = useAppDispatch();

    return (
        <Layout style={{ height: "100%", minHeight: "100vh" }}>
            <SideBar />
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div className="flex justify-end p-3">
                        <Button
                            onClick={() => {
                                dispatch(logout());
                            }}
                            className="bg-[var(--secondary-color)] text-white hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)]"
                        >
                            Logout
                        </Button>
                    </div>
                </Header>
                <Content style={{ margin: "24px 16px 0" }}>
                    <div
                        style={{
                            padding: 24,
                            marginBottom: 24,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
