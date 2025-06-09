import { SITE_CONFIG } from "@/controller"
import axios from "axios"


export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${SITE_CONFIG.baseUrl}/api/category`)
        // console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export const addNewCategory = async (data)=> {
    try {
        const response = await axios.post(`${SITE_CONFIG.baseUrl}/api/category/add-category`, data);
        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}