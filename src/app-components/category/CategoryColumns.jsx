import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

export const columns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "logoUrl",
        header: "Logo",
        cell: ({ row }) => {
            const item = row.original;
            return (
                <div className=" rounded-full p-2">
                    <img
                        src={item.logoUrl}
                        className="h-6 w-6"
                        alt="logoUrl"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "isActive",
        header: "Active",
    },
    {
        id: "edit", // Use `id` instead of `accessorKey` for action columns
        header: "Edit",
        cell: ({ row }) => {
            const item = row.original;
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
