import { Filters } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { pickBy, throttle } from "lodash";
import React, { useEffect, useState } from "react";
import { usePrevious } from "react-use";
import { Input } from "./ui/input";
function SearchFilter({
    callBack,
    hasTrash = true,
    hasDateRange = false,
    url_data = {},
}: {
    callBack?: Function;
    hasTrash?: boolean;
    hasDateRange?: boolean;
    url_data?: {};
}) {
    const { filters }: any = usePage().props;

    const [values, setValues] = useState({
        search: filters?.search || "",
        direction: filters?.direction || "",
        column: filters?.column || "",
        trash: filters?.trash || 0,
        start_date: filters?.start_date || "",
        end_date: filters?.end_date || "",
    });
    const prevValues = usePrevious(values);
    const reset = () => {
        setValues({
            search: "",
            direction: "",
            column: "",
            trash: 0,
            start_date: "",
            end_date: "",
        });
    };

    useEffect(() => {
        if (prevValues) {
            throttle(() => {
                let params = pickBy(values);
                //@ts-ignore
                router.get(route(route().current(), url_data), params, {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                });
            }, 2000)();
        }
    }, [values]);

    return (
        <Input
            className="max-w-xs ml-auto"
            type="text"
            placeholder="Search..."
            onChange={(e) => {
                setValues({ ...values, search: e.target.value });
            }}
            value={values.search}
        />
    );
}

export default SearchFilter;
