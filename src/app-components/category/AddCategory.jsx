import { addNewCategory } from "@/api/categories-api";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// zod schema
const categorySchema = z.object({
    name: z.string().min(1, "Brand name is required"),
    imageUrl: z.string().url("Image Url must be a valid url"),
    isActive: z.enum(["true", "false"]),
});

function AddCategory() {
    const form = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            imageUrl: "",
            isActive: "true",
        },
    });

    const onSubmit = async () => {
        try {
            const data = {
                name: "toys",
                description: "This is a toy category",
                imageUrl:
                    "https://www.bing.com/images/search?q=lg%20logo%20png&FORM=IQFRBA&id=D8360BF0B75A7B3A61150F89AB69EB58A95EAD5A",
                isActive: true,
            };
            const response = await addNewCategory(data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="spacce-y-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter category name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.name?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}

export default AddCategory;
