import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Fragment,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Toaster } from "@/Components/ui/toaster";
import {
    AvatarIcon,
    CheckIcon,
    DotsHorizontalIcon,
    ExitIcon,
    HamburgerMenuIcon,
    HomeIcon,
    LightningBoltIcon,
    MagnifyingGlassIcon,
    PersonIcon,
} from "@radix-ui/react-icons";
import { Backpack } from "lucide-react";

export default function Authenticated({
    title,
    children,
    routeList,
}: PropsWithChildren<{
    title?: string;
    routeList?: Array<{
        name: string;
        href: string;
        params?: any;
    }>;
}>) {
    const [showSideNav, setShowSideNav] = useState(false);
    const navRef = useRef<any>(null);
    const { auth } = usePage().props as any;

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);

        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    });

    const handleOutsideClick = (event: MouseEvent) => {
        if (
            navRef.current &&
            !navRef.current.contains(event.target) &&
            showSideNav
        ) {
            setShowSideNav((prev) => !prev);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowSideNav((prev) => !prev)}
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <HamburgerMenuIcon className="w-5 h-5" />
            </button>

            <aside
                id="default-sidebar"
                className={cn(
                    "fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0",
                    showSideNav ? "translate-x" : "-translate-x-full"
                )}
                aria-label="Sidebar"
                ref={navRef}
            >
                <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
                    <div className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
                        <ApplicationLogo />
                    </div>
                    <ul className="space-y-1 text-sm font-medium">
                        <li>
                            <NavLink
                                active={route().current("dashboard")}
                                href={route("dashboard")}
                                className=""
                            >
                                <HomeIcon className="w-5 h-5" />
                                <span className="ml-3 flex-1 whitespace-nowrap">
                                    Dashboard
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                active={route().current("user.*")}
                                href={route("user.index")}
                                className=""
                            >
                                <PersonIcon className="w-5 h-5" />
                                <span className="ml-3 flex-1 whitespace-nowrap">
                                    Users
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                active={route().current("employee.*")}
                                href={route("employee.index")}
                                className=""
                            >
                                <AvatarIcon className="w-5 h-5" />
                                <span className="ml-3 flex-1 whitespace-nowrap">
                                    Employee
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                active={route().current("department.*")}
                                href={route("department.index")}
                                className=""
                            >
                                <Backpack className="w-5 h-5" />
                                <span className="ml-3 flex-1 whitespace-nowrap">
                                    Department
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <ul>
                                <li className="font-semibold ml-4 my-3">
                                    Manage Report Data
                                </li>
                                <li>
                                    <NavLink
                                        active={false}
                                        href="#"
                                        className=""
                                    >
                                        <MagnifyingGlassIcon className="w-5 h-5" />
                                        <span className="ml-3 flex-1 whitespace-nowrap">
                                            Findings
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        active={false}
                                        href="#"
                                        className=""
                                    >
                                        <LightningBoltIcon className="w-5 h-5" />
                                        <span className="ml-3 flex-1 whitespace-nowrap">
                                            Action Taken
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        active={false}
                                        href="#"
                                        className=""
                                    >
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="ml-3 flex-1 whitespace-nowrap">
                                            Recommendations
                                        </span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="mt-auto flex">
                        <div className="flex w-full justify-between items-center">
                            <span className="text-sm font-medium text-black dark:text-white">
                                {auth.user.email}
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <DotsHorizontalIcon className="h-5 w-5 text-black dark:text-white" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        {auth.user.name}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <AvatarIcon className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="flex"
                                            >
                                                <ExitIcon className="mr-2 h-4 w-4" />
                                                <span>Logout</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <Head title={title} />
                <div className="mx-auto max-w-7xl mt-4">
                    <div className="mb-8">
                        <h4 className="uppercase">{title}</h4>
                        {routeList && (
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {routeList.map((item, index) => (
                                        <Fragment key={index}>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink asChild>
                                                    <Link
                                                        href={route(
                                                            item.href,
                                                            item.params
                                                        )}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            {routeList.length - 1 !== index && (
                                                <BreadcrumbSeparator />
                                            )}
                                        </Fragment>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        )}
                    </div>

                    {children}
                </div>
            </div>
            <Toaster />
        </>
    );
}
