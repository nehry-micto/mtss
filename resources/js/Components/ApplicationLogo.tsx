import { LabelHTMLAttributes } from "react";
import { LightningBoltIcon } from "@radix-ui/react-icons";

export default function ApplicationLogo({
    className = "",
    ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <div
            className={
                "max-w-sm text-center py-1 font-medium flex items-center gap-1 " +
                className
            }
        >
            <LightningBoltIcon className="w-4 h-4" />
            <h3 className="font-medium">MTSS</h3>
        </div>
    );
}
