import TableRowEmpty from "@/Components/TableRowEmpty";
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
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { useToast } from "@/Components/ui/use-toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Department, PageProps, Pagination } from "@/types";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { InfoCircledIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { FormEvent, useState } from "react";

export default function Index({
    auth,
    response,
}: PageProps<{
    response: Department[];
}>) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<Department>({
            name: "",
            abbr: "", //
        });

    const [open, setOpen] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);
    const [selectedDepartment, setSelectedDepartment] =
        useState<Department | null>(null);

    const { toast } = useToast();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(
            route(`department.${isUpdating ? "update" : "store"}`, {
                id: selectedDepartment?.id,
                _method: isUpdating ? "put" : "post",
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                    toast({
                        title: `Department Successfully ${
                            isUpdating ? "Updated" : "Saved"
                        }`,
                        status: "success",
                    });
                    // router.reload({ only: ["response"] });
                },
            }
        );
        console.log("rerendered");
    };

    const handleContinue = () => {
        if (selectedDepartment !== null) {
            router.delete(
                route("department.destroy", {
                    id: selectedDepartment.id,
                }),
                {
                    onSuccess: () => {
                        setAlertDialogOpen(false);
                        toast({
                            title: "Department Successfully Deleted",
                            status: "success",
                        });
                    },
                }
            );
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Department"
            routeList={[
                {
                    name: "Department",
                    href: "department.index",
                },
            ]}
        >
            <Head title="Department" />
            <AlertDialog open={alertDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will delete the{" "}
                            <span className="font-semibold">
                                {selectedDepartment?.name}
                            </span>{" "}
                            department.
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

            <div className="space-y-4">
                <div>
                    <Dialog
                        open={open}
                        onOpenChange={(value) => {
                            setOpen(value);
                            reset();
                            clearErrors();
                            setIsUpdating(false);
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button>Create Department</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>
                                        {isUpdating ? "Update" : "Create New"}{" "}
                                        Department
                                    </DialogTitle>
                                    <DialogDescription>
                                        This detail can be use to select the
                                        department of the client.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="flex gap-2">
                                        <Label
                                            htmlFor="name"
                                            className="text-right mt-1"
                                        >
                                            Department Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            error={errors.name}
                                            placeholder="Enter Department Name"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Label
                                            htmlFor="username"
                                            className="text-right mt-1"
                                        >
                                            Abbreviation (Abbr)
                                        </Label>
                                        <Input
                                            id="username"
                                            value={data.abbr}
                                            error={errors.abbr}
                                            onChange={(e) =>
                                                setData("abbr", e.target.value)
                                            }
                                            placeholder="Enter Abbreviation"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button disabled={processing} type="submit">
                                        {isUpdating ? "Update" : "Save"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    <div className="mx-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Department Name</TableHead>
                                    <TableHead>Abbreviation</TableHead>
                                    <TableHead>Color</TableHead>
                                    <TableHead className="text-right">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {response.length > 0 ? (
                                    response.map((department) => (
                                        <TableRow key={department.id}>
                                            <TableCell className="font-medium">
                                                {department.name}
                                            </TableCell>
                                            <TableCell>
                                                {department.abbr}{" "}
                                            </TableCell>
                                            <TableCell>
                                                {department.color}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedDepartment(
                                                            department
                                                        );

                                                        setAlertDialogOpen(
                                                            true
                                                        );
                                                    }}
                                                    variant="link"
                                                >
                                                    <Trash2Icon className="w-4 h-4 text-destructive" />
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        setSelectedDepartment(
                                                            department
                                                        );

                                                        setData(department);

                                                        setOpen(true);
                                                        setIsUpdating(true);
                                                    }}
                                                    variant="link"
                                                >
                                                    <PencilIcon className="w-4 h-4 text-foreground" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRowEmpty
                                        colsSpan={4}
                                        name="Department"
                                    />
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
