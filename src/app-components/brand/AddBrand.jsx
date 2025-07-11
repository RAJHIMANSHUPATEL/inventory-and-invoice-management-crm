import { addNewBrand } from "@/api/brands-api";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from 'react-toastify';

// Zod schema for validation
const brandSchema = z.object({
    name: z.string().min(1, "Brand name is required"),
    logoUrl: z.string().url("Logo URL must be a valid URL"),
    isActive: z.enum(["true", "false"]),
});

function AddBrand() {
    // useForm with correct defaultValues and resolver
    const form = useForm({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: "",
            logoUrl: "",
            isActive: "true", // Set a default value
        },
    });

    // Handle form submission
    const onSubmit = async (values) => {
        const finalData = {
            ...values,
            isActive: values.isActive === "true", // Convert string to boolean
        };

        try {
            console.log("Submitting:", finalData);

            const response = await addNewBrand(finalData);
            toast.success("Viola!!")
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Brand Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Brand Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter brand name" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Logo URL Field */}
                    <FormField
                        control={form.control}
                        name="logoUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logo URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter logo URL" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.logoUrl?.message}</FormMessage>
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
                                        className={`transition-colors hover:cursor-pointer ${field.value === "true"
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
                                <FormMessage>{form.formState.errors.isActive?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" variant="secondary" disabled={form.formState.isSubmitting || Object.keys(form.formState.errors).length > 0} >
                        Add Brand
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default AddBrand;
