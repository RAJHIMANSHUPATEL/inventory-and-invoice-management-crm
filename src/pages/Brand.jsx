import { getAllBrands } from "@/api/brands-api";
import { columns } from "@/app-components/brand/BrandsColumns";
import { DataTable } from "@/app-components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Brand() {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const fetchBrands = async () => {
        try {
            const response = await getAllBrands();
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        fetchBrands();
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
                    onClick={() => navigate("/brand/add-brand")}
                >
                    Add
                </Button>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}

export default Brand;
