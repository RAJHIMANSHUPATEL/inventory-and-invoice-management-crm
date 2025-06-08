import { SITE_CONFIG } from "@/controller"
import axios from "axios"


export const getAllBrands = async()=> {
    try {
        const response = await axios.get(`${SITE_CONFIG.baseUrl}/api/brand`)
        // console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export const addNewBrand = async(data)=> {
    try {
        const response = await axios.post(`${SITE_CONFIG.baseUrl}/api/brand/add-brand`, data)
        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}