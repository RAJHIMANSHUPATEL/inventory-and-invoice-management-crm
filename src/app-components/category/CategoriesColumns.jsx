import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

export const columns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKeyL: "description",
        header: "Description",
    },
    {
        accessorKey: "imageUrl",
        header: "Logo",
        cell: ({ row }) => {
            const imageUrl = row.getValue("imageUrl");
            return imageUrl?.slice(0, 4) ?? "";
        }
    },
    {
        accessorKey: "isActive",
        header: "Active",
    },
    {
        id: "edit",
        header: "Edit",
        cell: () => {

            return (
                <div>

                    <Button
                        variant="outline"
                        size="sm"
                    onClick={() => handleEdit(product)}
                    >
                        Edit
                        <Pencil />
                    </Button>
                </div>
            );
        },
    },
];
