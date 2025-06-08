import { getAllBrands } from "@/api/brands-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function Brand() {
    const navigate = useNavigate()
    const fetchProducts = async () => {
        try {
            const response = await getAllBrands();
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1 className="bg-primary-foreground text-center text-lg p-2 mb-4 rounded-sm border border-gray-500">
                Brands
            </h1>
            <div className="w-full flex justify-between">
                <Input
                    type="text"
                    placeholder="Search"
                    className="md:w-[50%]"
                />
                <Button
                    className="cursor-pointer"
                    onClick={()=> navigate("/brand/add-brand")}
                    >
                        Add
                </Button>
            </div>
            {/* <DataTable columns={columns} data={data} /> */}
        </div>
    );
}

export default Brand;
