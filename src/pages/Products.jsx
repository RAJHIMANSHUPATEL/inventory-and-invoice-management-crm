import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/api/products-api";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataTable } from "../app-components/products/DataTable";
import { columns } from "../app-components/products/columns.jsx";

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
            Products
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Products;
