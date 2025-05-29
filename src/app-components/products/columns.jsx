import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

export const columns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: (info) => `$${info.getValue()}`,
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        id: "edit", // Use `id` instead of `accessorKey` for action columns
        header: "Edit",
        cell: ({ row }) => {
            const product = row.original;

            return (
                <div>

                <Button
                    variant="outline"
                    size="sm"
                    // onClick={() => handleEdit(product)}
                >
                    Edit
                    <Pencil />
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    // onClick={() => handleEdit(product)}
                >
                    Delete
                    <Trash />
                </Button>
                    </div>
            );
        },
    },
];
