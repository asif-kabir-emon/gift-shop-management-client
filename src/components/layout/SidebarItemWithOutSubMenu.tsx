/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";

type TMenuItem = {
    name: string;
    icon: any;
    path: string;
};

const SidebarItemWithOutSubMenu = ({
    data,
    isOpen,
}: {
    data: TMenuItem;
    isOpen: boolean;
}) => {
    return (
        <li className="relative group">
            <NavLink to={data.path} className={`link`}>
                <data.icon size={23} className="min-w-max" />
                <span
                    className={`whitespace-pre ${!isOpen && "overflow-hidden"}`}
                >
                    {data.name}
                </span>
                {!isOpen && (
                    <div
                        className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-100 shadow-md text-black text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                    >
                        <span className="block whitespace-nowrap">
                            {data.name}
                        </span>
                    </div>
                )}
            </NavLink>
        </li>
    );
};

export default SidebarItemWithOutSubMenu;
