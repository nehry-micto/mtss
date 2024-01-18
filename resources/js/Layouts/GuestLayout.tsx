import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import Logo from "../../static/images/Logo-MICTO.png";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex sm:justify-center md:flex-row flex-col items-center pt-6 sm:pt-0 bg-gray-100 gap-8">
            <ApplicationLogo className="md:hidden inline-block" />
            <div className="md:flex items-center gap-4 hidden">
                <img className="w-28 h-28" src={Logo} alt="MICTO-Logo" />
                <div className="inline-block">
                    <Link href="/">
                        <ApplicationLogo className="" />
                        <h2>Manage Technical Support System</h2>
                    </Link>
                    <hr className="border border-b"></hr>
                    <div className="pt-2">
                        Municipal Information Communication Technology Office
                    </div>
                </div>
            </div>
            <div className="">{children}</div>
        </div>
    );
}
