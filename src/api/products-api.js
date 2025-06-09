import { SITE_CONFIG } from "../controller";
import axios from "axios"

export const getAllProducts = async()=> {
    try {
        const res = await axios.get(`${SITE_CONFIG.baseUrl}/api/product`);
        // console.log(res.data)
        return res.data;
    } catch (error) {
        // console.log(error.message)
        throw new Error(error || "An Error Occured")
    }
}

export const addNewProduct = async (data) => {
    try {
        const response = await axios.post(`${SITE_CONFIG.baseUrl}/api/product/add_product`, data);
        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}