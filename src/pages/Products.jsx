import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/api/products-api";
import { DataTable } from "../app-components/Table/DataTable";
import { columns } from "../app-components/products/columns.jsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Products = () => {
    const [products, setProducts] = useState(null);

    const fetchAllProducts = async () => {
        try {
            const response = await getAllProducts();
            // console.log(response.data.products)
            setProducts(response.data.products);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const data = products
        ? products.map((product) => ({
              name: product.name,
              price: product.price,
              quantity: product.quantity,
              stock: product.lowStockAlert,
          }))
        : [];

    return (
        <div>
            <h1 className="bg-primary-foreground text-center text-lg p-2 mb-4 rounded-sm border border-gray-500">
                Products
            </h1>
            <div className="w-full flex justify-between">
                <Input
                    type="text"
                    placeholder="Search"
                    className="md:w-[50%]"
                />
                <Button className="cursor-pointer">Add</Button>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Products;
