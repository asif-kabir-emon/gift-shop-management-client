import { TRoute, TUserPath } from "../types/global.type";

export const routeGenerator = (items: TUserPath[]) => {
    const routes = items.reduce((acc: TRoute[], item) => {
        if (item.element && item.path) {
            acc.push({
                path: item.path,
                element: item.element,
            });
        }

        if (item.children) {
            item.children.forEach((child) => {
                if (child.element && child.path) {
                    acc.push({
                        path: child.path,
                        element: child.element,
                    });
                }
            });
        }

        return acc;
    }, []);

    return routes;
};
