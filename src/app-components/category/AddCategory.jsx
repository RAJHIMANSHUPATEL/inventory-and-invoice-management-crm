import { addNewCategory } from "@/api/categories-api";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function AddCategory() {
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const data = {
                name: "toys",
                description: "This is a toy category",
                imageUrl: "https://www.bing.com/images/search?q=lg%20logo%20png&FORM=IQFRBA&id=D8360BF0B75A7B3A61150F89AB69EB58A95EAD5A",
                isActive: true,
            };
            const response = await addNewCategory(data);
            toast.success("Items Added");
            navigate("/categories");
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <button className="bg-red-500" onClick={() => handleSubmit()}>AddCategory</button>
        </div>
    );
}

export default AddCategory;