import { InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { TableCell, TableRow } from "./ui/table";

function TableRowEmpty({ colsSpan, name }: { colsSpan: number; name: string }) {
    return (
        <TableRow>
            <TableCell colSpan={colsSpan} className="opacity-50">
                <div className="font-medium text-center  py-8 justify-center flex items-center gap-2 ">
                    <InfoCircledIcon className="w-6 h-6" />
                    <div>
                        {name} is empty you can add by clicking "Add {name}"
                        button
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default TableRowEmpty;
