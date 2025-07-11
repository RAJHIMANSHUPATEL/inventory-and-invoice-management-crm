import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { addNewCategory } from "@/api/categories-api";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; // Assuming you're using ShadCN

// ✅ Zod Schema
const categorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
    description: z.string().optional(),
    imageUrl: z.string().url("Valid Image URL is required"),
    isActive: z.enum(["true", "false"]),
});

function AddCategory() {
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
            imageUrl: "",
            isActive: "true",
        },
    });

    // ✅ onSubmit Handler
    const onSubmit = async (values) => {
        try {
            await addNewCategory(values);
            toast.success("Category added successfully!");
            navigate("/category"); // Update with actual route
        } catch (error) {
            console.error(error);
            toast.error("Failed to add category.");
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter category name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description Field */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter category description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Image URL Field */}
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter image URL" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Status Field */}
                    <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger
                                        className={`transition-colors hover:cursor-pointer ${
                                            field.value === "true"
                                                ? "bg-green-100 text-green-700 border-green-400 dark:bg-green-900 dark:text-green-200 dark:border-green-500"
                                                : "bg-red-100 text-red-700 border-red-400 dark:bg-red-900 dark:text-red-200 dark:border-red-500"
                                        }`}
                                    >
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Active</SelectItem>
                                        <SelectItem value="false">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={form.formState.isSubmitting}
                    >
                        Add Category
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default AddCategory;
