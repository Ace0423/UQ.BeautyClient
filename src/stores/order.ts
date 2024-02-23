import { defineStore } from "pinia";
import { apiGetOrderByUIdRequest } from "@/api/index";
export const useOrderStore = defineStore("order", () => {
    const getOrderByUId = async (data: any) => {
        try {
            const res = await apiGetOrderByUIdRequest(data);
            return res
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    return {
        getOrderByUId,     
    }
})