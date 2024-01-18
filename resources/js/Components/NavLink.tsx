import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                "w-full inline-flex items-center justify-center px-4 rounded-lg py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active ? "bg-primary" : "hover:bg-secondary") +
                className
            }
        >
            {children}
        </Link>
    );
}
