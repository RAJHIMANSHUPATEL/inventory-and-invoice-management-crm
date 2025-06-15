import { getAllCategories } from "@/api/categories-api";
import { columns } from "@/app-components/category/CategoryColumns";
import { DataTable } from "@/app-components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Category = () => {
    const [data, setData] = useState([]);

    const navigate = useNavigate()

    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();
            console.log(response.data)
            setData(response.data);
        } catch (error) {
            throw new Error(error.message)
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);


    return (
        <div>
            <h1 className="bg-primary-foreground text-center text-lg p-2 mb-4 rounded-sm border border-gray-500">
                Categories
            </h1>
            <div className="w-full flex justify-between">
                <Input
                    type="text"
                    placeholder="Search"
                    className="md:w-[50%]"
                />
                <Button
                    className="cursor-pointer"
                    onClick={() => navigate("/category/add-category")}
                >
                    Add
                </Button>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}

export default Category