import { getAllBrands } from "@/api/brands-api";
import { getAllCategories } from "@/api/categories-api";
import { addNewProduct } from "@/api/products-api";
import {
  Form, FormField, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import 'react-toastify/dist/ReactToastify.css';

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  isActive: z.enum(["true", "false"]),
});

function AddProducts() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      brand: "",
      category: "",
      imageUrl: "",
      isActive: "true",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandRes, categoryRes] = await Promise.all([
          getAllBrands(),
          getAllCategories(),
        ]);
        setBrands(brandRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        toast.error("Failed to load brands or categories");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const generatedSku = `SKU-${values.brand.slice(0, 4).toUpperCase()}-${values.category.slice(0, 4).toUpperCase()}-${uuidv4().slice(0, 5).toUpperCase()}`;

      const payload = {
        ...values,
        sku: generatedSku,
        lowStockAlert: false,
        supplier: "Tech Supplies Co.",
        purchaseDate: new Date().toISOString().slice(0, 10),
      };

      await addNewProduct(payload);
      toast.success("Product added successfully!");
      setTimeout(() => navigate("/product"), 1500);
    } catch (error) {
      toast.error("Error adding product");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-4">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Form fields stay the same */}
          {["name", "description", "imageUrl", "price", "quantity"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field}
              render={({ field }) => (
                <>
                  <FormLabel className="capitalize">{field.name}</FormLabel>
                  <FormControl>
                    <Input
                      type={["price", "quantity"].includes(field.name) ? "number" : "text"}
                      placeholder={field.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          ))}

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <>
                <FormLabel>Brand</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand._id} value={brand.name}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </Form>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default AddProducts;
