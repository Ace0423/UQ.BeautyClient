import { defineStore } from "pinia";
import { apiGetBusinessHoursRequest, apiGetCheckOutTypeRequest } from "@/api/index";
export const useCompanyStore = defineStore("company", () => {
    const businessHoursList: any = reactive({ data: [] });
    const checkOutTypeList: any = reactive({ data: [] });
    const getBusinessHoursList = async () => {
        let data = {
            cId: 0
        }
        try {
            const res = await apiGetBusinessHoursRequest(data);
            if (res.data.data.table) {
                businessHoursList.data = res.data.data.table;
                console.log(businessHoursList.data);
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getCheckOutTypeList = async () => {
        let data = {
            cotid: 0,
            pageIndex: 0,
            count: 0
        }
        try {
            const res = await apiGetCheckOutTypeRequest(data);
            if (res.data.state == 1) {
                checkOutTypeList.data = res.data.data.table;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    return {
        businessHoursList,
        getBusinessHoursList,
        getCheckOutTypeList
    }
})