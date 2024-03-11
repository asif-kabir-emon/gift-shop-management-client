/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export type TUser = {
    id: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
};

export type TRoute = {
    path: string;
    element: ReactNode;
};

export type TUserPath = {
    name?: string;
    path?: string;
    icon?: any;
    element?: ReactNode;
    children?: TUserPath[];
};

export type TChildrenMenuItemType =
    | {
          key: string;
          label: ReactNode;
      }
    | undefined;

export type TSidebarItem = {
    key: string;
    label: ReactNode;
    children?: TChildrenMenuItemType[];
};

export type TMenuItem = {
    name: string;
    path: string;
    icon: any;
    menus?: {
        name: string;
        path: string;
    }[];
};
