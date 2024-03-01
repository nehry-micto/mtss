import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Client, PageProps, Pagination } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({
    auth,
    clients,
}: PageProps<{
    clients: Pagination<Client[]>;
}>) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Client" />
            <div className="space-y-4">
                <h4 className="uppercase">Clients</h4>
            </div>
        </AuthenticatedLayout>
    );
}
