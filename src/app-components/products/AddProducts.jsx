import { getAllBrands } from "@/api/brands-api";
import { getAllCategories } from "@/api/categories-api";
import { addNewProduct } from "@/api/products-api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
// Zod Schema
const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),

    imageUrl: z.string().url("Image url must be a valid url"),
    isActive: z.enum(["true", "false"]),
});


function AddProducts() {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            sku: "",
            description: "",
            brand: "",
            category: "",
            price: 0,
            quantity: 50,
            lowStockAlert: false,
            supplier: "",
            purchaseDate: ""
        },
    });
    // Fetching categories
    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    // Fetching brands
    const fetchBrands = async () => {
        try {
            const response = await getAllBrands();
            setBrands(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        fetchCategories()
        fetchBrands()
    }, [])



    const onSubmit = async () => {
        try {
            const data = {
                "name": "Controller",
                "sku": "WC-12345",
                "description": "Ergonomic wireless controller with USB receiver",
                "brand": "684552f4aea32e2870948b41",
                "category": "6845a42f7d098da0ba4d1d74",
                "price": 1499,
                "quantity": 50,
                "lowStockAlert": false,
                "supplier": "Tech Supplies Co.",
                "purchaseDate": "2025-06-09"
            }
            const response = await addNewProduct(data)
            console.log(response)
        } catch (error) {
            console.log(error.message)
        }
    }
    return <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Product Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Select Brand */}
                <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        {/* Show selected brand name or a placeholder */}
                                        {field.value
                                            ? brands.find((brand) => brand._id === field.value)?.name
                                            : "Select a brand"}
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {brands?.map((brand) => (
                                        <SelectItem key={brand._id} value={brand._id}>
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />


            </form>
        </Form>

    </div>;
}

export default AddProducts;