import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import debounce from "lodash/debounce";

import { getAllBrands } from "@/api/brands-api";
import { columns } from "@/app-components/brand/BrandsColumns";
import { DataTable } from "@/app-components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Brand() {
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await getAllBrands();
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchBrands();
    }, []);

    const handleSearch = debounce((value) => {
        const searchValue = value.trim().toLowerCase();
        const result = data.filter((item) =>
            item.name.trim().toLowerCase().includes(searchValue)
        );
        setFilteredData(result);
    }, 300);

    const handleChange = (e) => {
        setInput(e.target.value);
        handleSearch(e.target.value);
    };

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
                    value={input}
                    onChange={handleChange}
                />
                <Button onClick={() => navigate("/brand/add-brand")}>
                    Add
                </Button>
            </div>
            {filteredData.length === 0 ? (
                <p className="text-center mt-4 text-muted-foreground">No brands found.</p>
            ) : (
                <DataTable columns={columns} data={filteredData} />
            )}
        </div>
    );
}

export default Brand;
