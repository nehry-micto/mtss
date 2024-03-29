import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useToast } from "@/Components/ui/use-toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FormEvent, useState } from "react";

function Create({
    auth,
    departments,
}: PageProps<{
    departments: Array<{
        id: string;
        name: string;
    }>;
}>) {
    const { toast } = useToast();

    const form = useForm({
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        birth_date: "",
        department: "",
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        form.post(route("employee.store"), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Employee Successfully Created",
                    status: "success",
                });
                // router.reload({ only: ["response"] });
            },
        });
    };

    return (
        <AuthenticatedLayout
            title="Create Employee"
            routeList={[
                { name: "Employees", href: "employee.index" },
                { name: "Create Employee", href: "employee.create" },
            ]}
        >
            <div className="space-y-4">
                <h3>Employee Profile</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid max-w-3xl items-start sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-4">
                        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                type="text"
                                id="first_name"
                                placeholder="Enter first name"
                                error={form.errors.first_name}
                                onChange={(e) => {
                                    form.setData("first_name", e.target.value);
                                }}
                            />
                        </div>
                        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                            <Label htmlFor="middle_name">Middle Name</Label>
                            <Input
                                type="text"
                                id="middle_name"
                                placeholder="Enter middle name"
                                error={form.errors.middle_name}
                                onChange={(e) => {
                                    form.setData("middle_name", e.target.value);
                                }}
                            />
                        </div>
                        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                type="text"
                                id="last_name"
                                placeholder="Enter last name"
                                error={form.errors.last_name}
                                onChange={(e) => {
                                    form.setData("last_name", e.target.value);
                                }}
                            />
                        </div>
                        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                error={form.errors.email}
                                onChange={(e) => {
                                    form.setData("email", e.target.value);
                                }}
                                placeholder="Enter email address"
                            />
                        </div>
                        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                            <Label htmlFor="birth_date">Birth Date</Label>
                            <div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !form.data.birth_date &&
                                                    "text-muted-foreground",
                                                form.errors.birth_date &&
                                                    "border-red-500"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {form.data.birth_date ? (
                                                format(
                                                    form.data.birth_date,
                                                    "PPP"
                                                )
                                            ) : (
                                                <span>Select a birth date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align="start"
                                        className=" w-auto p-0"
                                    >
                                        <Calendar
                                            mode="single"
                                            captionLayout="dropdown-buttons"
                                            selected={
                                                new Date(form.data.birth_date)
                                            }
                                            onSelect={(date) => {
                                                date &&
                                                    form.setData(
                                                        "birth_date",
                                                        date.toISOString()
                                                    );
                                            }}
                                            fromYear={1940}
                                            toYear={new Date().getFullYear()}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <InputError message={form.errors.birth_date} />
                        </div>
                        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Department</Label>
                            <div>
                                <Select
                                    onValueChange={(value: string) =>
                                        form.setData("department", value)
                                    }
                                >
                                    <SelectTrigger
                                        className={cn(
                                            "w-full",
                                            form.errors.department &&
                                                "border-red-500"
                                        )}
                                    >
                                        <SelectValue placeholder="Select a department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Departments
                                            </SelectLabel>
                                            {departments.length > 0 &&
                                                departments.map(
                                                    (department) => (
                                                        <SelectItem
                                                            key={department.id}
                                                            value={department.id.toString()}
                                                        >
                                                            {department.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.department} />
                            </div>
                        </div>
                    </div>

                    <Button type="submit">Save</Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
export default Create;
