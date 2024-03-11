import { TMenuItem, TUserPath } from "../types";
// import { TMenuItem, TSidebarItem, TUserPath } from "../types";
// import { NavLink } from "react-router-dom";

// export const sideBarItemsGenerator = (items: TUserPath[], role: string) => {
//     const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
//         if (item.path && item.name) {
//             acc.push({
//                 key: item.name || (item.path as string),
//                 label: (
//                     <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>
//                 ),
//             });
//         }

//         if (item.children) {
//             acc.push({
//                 key: item.name || (item.path as string),
//                 label: item.name,
//                 children: item.children.map((child) => {
//                     if (child.name) {
//                         return {
//                             key: child.name,
//                             label: (
//                                 <NavLink to={`/${role}/${child.path}`}>
//                                     {child.name}
//                                 </NavLink>
//                             ),
//                         };
//                     }
//                 }),
//             });
//         }

//         return acc;
//     }, []);

//     return sidebarItems;
// };

export const sideBarItemsGenerator = (items: TUserPath[], role: string) => {
    const sidebarItems = items.reduce((acc: TMenuItem[], item) => {
        if (item.path && item.name) {
            acc.push({
                name: item.name,
                path: `/${role}/${item.path}`,
                icon: item?.icon,
            });
        }

        if (item.children) {
            acc.push({
                name: item.name || (item.path as string),
                path: `/${role}/${item.path}`,
                icon: item?.icon,
                menus: item.children
                    .filter((child) => child.name) // Filter out undefined values
                    .map((child) => ({
                        name: child.name,
                        path: `/${role}/${child.path}`,
                    })) as { name: string; path: string }[],
            });
        }

        return acc;
    }, []);

    return sidebarItems;
};
