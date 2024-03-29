

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
    id?: string;
    name: string;
    abbr: string;
    color?: string;
}

export interface Employee {
    id?: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    department: Department | null;
    email: string;
    birth_date: string;
    created_at?: string;
    updated_at?: string;
}

export interface PaginationLink {
    active: boolean;
    label: string;
    url: string | null;
}

export interface Pagination<T> {
    current_page: number;
    data: Array<T>;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface Filters {
    search?: string;
    direction?: "asc" | "desc";
    column?: string;
    per_page?: number;
    page?: number;
    trash?: boolean;
    start_date?: string
    end_date?: string
}
