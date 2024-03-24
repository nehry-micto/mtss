import ButtonLink from "@/Components/ButtonLink";
import TableRowEmpty from "@/Components/TableRowEmpty";
import UIPagination from "@/Components/UIPagination";
import { Button } from "@/Components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toDate } from "@/lib/utils";
import { Client, PageProps, Pagination } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { PencilIcon, Trash2Icon } from "lucide-react";

export default function Index({
    auth,
    clients,
}: PageProps<{
    clients: Pagination<Client>;
}>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Clients"
            routeList={[{ name: "Clients", href: "client.index" }]}
        >
            <div className="mx-auto space-y-4">
                <div className="">
                    <ButtonLink href={route("client.create")}>
                        Add New Client
                    </ButtonLink>
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
                        {clients.data.length > 0 ? (
                            clients.data.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">
                                        {client.id}
                                    </TableCell>
                                    <TableCell className="">
                                        {client.last_name +
                                            ", " +
                                            client.first_name +
                                            " " +
                                            client.middle_name}
                                    </TableCell>
                                    <TableCell className="">
                                        {toDate(client.birth_date, "MMM. d, y")}
                                    </TableCell>
                                    <TableCell className="">
                                        {client.department?.abbr}
                                    </TableCell>
                                    <TableCell className="">
                                        {client.created_at &&
                                            toDate(
                                                client.created_at,
                                                "M/d/yyyy hh:mm a"
                                            )}
                                    </TableCell>
                                    <TableCell className="">
                                        {client.updated_at &&
                                            toDate(
                                                client?.updated_at,
                                                "M/d/yyyy hh:mm a"
                                            )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button type="button" variant="link">
                                            <Trash2Icon className="w-4 h-4 text-destructive" />
                                        </Button>
                                        <Button
                                            onClick={() => {}}
                                            variant="link"
                                        >
                                            <PencilIcon className="w-4 h-4 text-foreground" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRowEmpty name="Client" colsSpan={7} />
                        )}
                    </TableBody>
                </Table>
                <UIPagination links={clients.links} />
            </div>
        </AuthenticatedLayout>
    );
}
