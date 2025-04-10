import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Chat() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Aiva
                </h2>
            }
        >
            <Head title="Aiva" />;
        </AuthenticatedLayout>
    );
}
