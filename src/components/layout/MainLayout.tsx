import { Outlet } from "react-router";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

const MainLayout = () => {
    return (
        <div className="md:flex">
            <div>
                <SideBar />
            </div>
            <div className="w-full">
                <div className="hidden md:block">
                    <NavBar children={<div></div>} />
                </div>
                <div className="p-5 md:px-10 md:py-16 mx-auto w-full max-w-[1400px]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
