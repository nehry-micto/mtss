import { clsx, type ClassValue } from "clsx";
import { format } from 'date-fns';
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function toDate(date: string, formatStr: string) {
    return format(new Date(date), formatStr);
}
