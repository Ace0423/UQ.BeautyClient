import { defineStore } from "pinia";
import { apiGetBusinessHoursRequest } from "@/api/index";
export const useCompanyStore = defineStore("company", () => {
    const businessHoursList: any = reactive({ data: [] });
    const getBusinessHoursList = async () => {
        let data = {
            cId: 0
        }
        try {
            const res = await apiGetBusinessHoursRequest(data);
            console.log(res.data)
            if (res.data.data.table) {
                businessHoursList.data = res.data.data.table;
                console.log(businessHoursList.data);
            }
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    return {
        businessHoursList,
        getBusinessHoursList,
    }
})