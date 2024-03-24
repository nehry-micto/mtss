import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import React from "react";
import { ButtonProps, buttonVariants } from "./ui/button";

type ButtonLinkProps = {
    className?: string;
    size?: ButtonProps["size"];
} & React.ComponentProps<typeof Link>;
function ButtonLink({ className, size, ...props }: ButtonLinkProps) {
    return (
        <Link
            className={cn(
                buttonVariants({
                    variant: "default",
                    size: size ?? "default",
                }),
                className
            )}
            {...props}
        />
    );
}

export default ButtonLink;
