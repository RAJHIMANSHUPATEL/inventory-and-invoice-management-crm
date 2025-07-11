import { getAllBrands } from "@/api/brands-api";
import { getAllCategories } from "@/api/categories-api";
import { addNewProduct } from "@/api/products-api";
import React, { useEffect, useState } from "react";

function AddProducts() {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
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
    const handleClick = async () => {
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
        <button
            className="bg-green-600"
            onClick={handleClick}
        >
            Add Product
        </button>
    </div>;
}

export default AddProducts;