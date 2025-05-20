import { getAllProducts } from '@/api/products-api';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect } from 'react'
import { DataTable } from './DataTable';
import { columns } from './columns';

const Products = () => {

    const fetchAllProducts = async () => {
        try {
            const response = await getAllProducts();
            console.log(response.data.products)
        } catch (error) {
            console.log(error.message)
        }
    }

    const data = [
  { name: "Apple", price: 10, stock: 20 },
  { name: "Banana", price: 5, stock: 10 },
]

    useEffect(() => {
        fetchAllProducts()
    }, [])
    return (
        <div>
            Products
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default Products
