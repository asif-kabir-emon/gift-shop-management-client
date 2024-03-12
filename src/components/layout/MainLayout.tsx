import { Outlet } from "react-router";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { useMediaQuery } from "react-responsive";

const MainLayout = () => {
    const isTabletMode = useMediaQuery({ query: "(max-width: 1280px)" });
    return (
        <div className={`${!isTabletMode && "flex"} overflow-hidden`}>
            <div>
                <SideBar />
            </div>
            <div className="w-full flex flex-col top-0">
                <div
                    className={`${isTabletMode ? "hidden" : "block sticky top-0 z-[900]"}`}
                >
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
