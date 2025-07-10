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
        cell: () => {

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
                    </div>
            );
        },
    },
];
