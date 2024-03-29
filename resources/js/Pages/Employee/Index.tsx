import ButtonLink from "@/Components/ButtonLink";
import TableRowEmpty from "@/Components/TableRowEmpty";
import UIPagination from "@/Components/UIPagination";
import { Button, buttonVariants } from "@/Components/ui/button";

import SearchFilter from "@/Components/SearchFilter";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { toast } from "@/Components/ui/use-toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toDate } from "@/lib/utils";
import { Employee, PageProps, Pagination } from "@/types";
import { Link, router } from "@inertiajs/react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Index({
    employees,
}: PageProps<{
    employees: Pagination<Employee>;
}>) {
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>();
    const [params, setParams] = useState({
        search: "",
        per_page: 10,
        column: "",
        direction: "",
    });

    useEffect(() => {
        console.log(params);
    }, [params]);

    const handleContinue = () => {
        if (selectedEmployee !== null) {
            router.delete(
                route("employee.destroy", {
                    id: selectedEmployee?.id,
                }),
                {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        setAlertDialogOpen(false);
                        toast({
                            title: "Employee Successfully Deleted",
                            status: "success",
                        });
                    },
                }
            );
        }
    };

    return (
        <AuthenticatedLayout
            title="Employees"
            routeList={[{ name: "Employees", href: "employee.index" }]}
        >
            <AlertDialog open={alertDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will delete{" "}
                            <span className="font-semibold">
                                {selectedEmployee?.first_name +
                                    " " +
                                    selectedEmployee?.last_name}
                            </span>{" "}
                            employee record.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => {
                                setAlertDialogOpen(false);
                            }}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleContinue}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="mx-auto space-y-4">
                <div className="flex md:flex-row flex-col">
                    <ButtonLink href={route("employee.create")}>
                        Add New employee
                    </ButtonLink>
                    <SearchFilter />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Birth Date</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.data.length > 0 ? (
                            employees.data.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell className="font-medium">
                                        {employee.id}
                                    </TableCell>
                                    <TableCell className="">
                                        {employee.last_name +
                                            ", " +
                                            employee.first_name +
                                            " " +
                                            employee.middle_name}
                                    </TableCell>
                                    <TableCell className="">
                                        {toDate(
                                            employee.birth_date,
                                            "MMM. d, y"
                                        )}
                                    </TableCell>
                                    <TableCell className="">
                                        {employee.department?.abbr}
                                    </TableCell>
                                    <TableCell className="">
                                        {employee.created_at &&
                                            toDate(
                                                employee.created_at,
                                                "M/d/yyyy hh:mm a"
                                            )}
                                    </TableCell>
                                    <TableCell className="">
                                        {employee.updated_at &&
                                            toDate(
                                                employee?.updated_at,
                                                "M/d/yyyy hh:mm a"
                                            )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            onClick={() => {
                                                setAlertDialogOpen(true);
                                                setSelectedEmployee(employee);
                                            }}
                                            type="button"
                                            variant="link"
                                        >
                                            <Trash2Icon className="w-4 h-4 text-destructive" />
                                        </Button>
                                        <Link
                                            href={route(
                                                "employee.edit",
                                                employee.id
                                            )}
                                            className={buttonVariants({
                                                variant: "link",
                                            })}
                                        >
                                            <PencilIcon className="w-4 h-4 text-foreground" />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRowEmpty name="employee" colsSpan={7} />
                        )}
                    </TableBody>
                </Table>
                <UIPagination links={employees.links} />
            </div>
        </AuthenticatedLayout>
    );
}
