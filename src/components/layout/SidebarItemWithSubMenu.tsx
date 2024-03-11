/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { TMenuItem } from "../../types";

const SidebarItemWithSubMenu = ({
    data,
    isOpen,
}: {
    data: TMenuItem;
    isOpen: boolean;
}) => {
    const { pathname } = useLocation();
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    return (
        <div>
            <li
                className={`relative link group ${
                    pathname.includes(data.name) && "text-blue-600"
                }`}
                onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
            >
                <data.icon size={23} className="min-w-max" />
                <p className={`${!isOpen && "hidden"} capitalize flex-1`}>
                    {data.name}
                </p>
                <IoIosArrowDown
                    className={`${isSubMenuOpen && "rotate-180"} duration-200`}
                />
                {!isOpen && (
                    <div
                        style={{ top: 0, left: "100%" }}
                        className={`absolute flex flex-col gap-1 left-full rounded-md p-2 ml-6 bg-white shadow-xl border-[1px] text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                    >
                        {data?.menus?.map((menu) => (
                            <li key={menu.name}>
                                <NavLink
                                    to={menu.path}
                                    className="link capitalize"
                                >
                                    <span className="block whitespace-nowrap min-w-[100px]">
                                        {menu.name}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </div>
                )}
            </li>
            {isOpen && (
                <motion.ul
                    animate={
                        isSubMenuOpen
                            ? { height: "fit-content" }
                            : { height: 0 }
                    }
                    className="flex flex-col gap-1 pl-12 text-[0.8rem] font-normal overflow-hidden h-0"
                >
                    {data?.menus?.map((menu) => (
                        <li key={menu.name}>
                            <NavLink
                                to={menu.path}
                                className="link !bg-transparent capitalize"
                            >
                                <span>{menu.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </motion.ul>
            )}
        </div>
    );
};

export default SidebarItemWithSubMenu;
