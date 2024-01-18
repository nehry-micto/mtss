import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Department, PageProps } from "@/types";
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
import { FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Index({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<Department>({
            name: "",
            abbr: "", //
        });

    const [open, setOpen] = useState<boolean>(false);
    const { toast } = useToast();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("department.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                reset();
                toast({
                    title: "Department Successfully Saved",
                    status: "success",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Department" />
            <div>Department</div>
            <div>
                <Dialog
                    open={open}
                    onOpenChange={(value) => {
                        setOpen(value);
                        reset();
                        clearErrors();
                    }}
                >
                    <DialogTrigger asChild>
                        <Button>Create Department</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle>Create New Department</DialogTitle>
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
                                    Save
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AuthenticatedLayout>
    );
}
