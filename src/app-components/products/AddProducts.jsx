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
      const brandCode = values.brand.slice(0, 4).toUpperCase();
      const categoryName = categories.find(cat => cat._id === values.category)?.name || "CAT";
      const categoryCode = categoryName.slice(0, 4).toUpperCase();
      const generatedSku = `SKU-${brandCode}-${categoryCode}-${uuidv4().slice(0, 5).toUpperCase()}`;

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
    <div className=" mx-auto p-4 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {["name", "description", "imageUrl", "price", "quantity"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field}
              render={({ field }) => (
                <div>
                  <FormLabel className="capitalize">{field.name}</FormLabel>
                  <FormControl>
                    <Input
                      type={["price", "quantity"].includes(field.name) ? "number" : "text"}
                      placeholder={`Enter ${field.name}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          ))}

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <div>
                <FormLabel>Brand</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand._id} value={brand._id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <div>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <div>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
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
