import { IconProps } from "@radix-ui/react-icons/dist/types";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface NavItem {
    label: string;
    route: string;
    current: string;
    count: 0 | null;
    icon: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export interface Department {
    name: string;
    abbr: string;
    color?: string;
}
