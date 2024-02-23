import { defineStore } from "pinia";
import { apiGetBookingByUIdRequest } from "@/api/index";
export const useBookingStore = defineStore("booking", () => {
    const getBookingByUId = async (data: any) => {
        try {
            const res = await apiGetBookingByUIdRequest(data);
            return res
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    return {
        getBookingByUId,     
    }
})