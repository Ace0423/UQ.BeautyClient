import { defineStore } from "pinia";
import { apiGetTotalSalesRequest, apiGetTotalBookingByWeekRequest, apiGetManagerSalesByTodayRequest,apiGetVisitorCountByTodayRequest,apiGetServiceProportionByTodayRequest,apiGetProductProportionByTodayRequest,apiGetTotalTopUpByTodayRequest,apiGetTotalPayTypeByTodayRequest,apiGetTotalBookingRequest, apiGetManagerSalesRequest, apiGetAverageOrderRequest, apiGetVisitorCountRequest, apiGetVisitorHoursRequest, apiGetServiceProportionRequest, apiGetTotalSalesByTodayRequest } from "@/api/index";
export const useReportStore = defineStore("report", () => {
    const totalSalesList: any = reactive({ data: [] });
    const totalBookingList: any = reactive({ data: [] });
    const managerSalesList: any = reactive({ data: [] });
    const averageOrderList: any = reactive({ data: [] });
    const visitorCountList: any = reactive({ data: [] });
    const visitorHoursList: any = reactive({ data: [] });
    const serviceProportionList: any = reactive({ data: [] });
    const getTotalSales = async (data: any) => {
        try {
            const res = await apiGetTotalSalesRequest(data);
            if (res.data.state == 1) {
                totalSalesList.data = res.data.data.table;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getTotalBooking = async (data: any) => {
        try {
            const res = await apiGetTotalBookingRequest(data);
            if (res.data.state == 1) {
                totalBookingList.data = res.data.data.table;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getManagerSales = async (data: any) => {
        try {
            const res = await apiGetManagerSalesRequest(data);
            if (res.data.state == 1) {
                managerSalesList.data = res.data.data.table;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getAverageOrder = async (data: any) => {
        try {
            const res = await apiGetAverageOrderRequest(data);
            if (res.data.state == 1) {
                averageOrderList.data = res.data.data.table;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getVisitorCount = async (data: any) => {
        try {
            const res = await apiGetVisitorCountRequest(data);
            if (res.data.state == 1) {
                visitorCountList.data = res.data.data.table;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getVisitorHours = async (data: any) => {
        try {
            const res = await apiGetVisitorHoursRequest(data);
            if (res.data.state == 1) {
                visitorHoursList.data = res.data.data.table;
                visitorHoursList.data.hourWeekList = visitorHoursList.data.hourWeekList.reverse()
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getServiceProportion = async (data: any) => {
        try {
            const res = await apiGetServiceProportionRequest(data);
            if (res.data.state == 1) {
                serviceProportionList.data = res.data.data.table;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getTotalSalesByToday = async () => {
        try {
            const res = await apiGetTotalSalesByTodayRequest();
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getTotalBookingByWeek = async () => {
        try {
            const res = await apiGetTotalBookingByWeekRequest();
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getManagerSalesByToday = async () => {
        try {
            const res = await apiGetManagerSalesByTodayRequest();
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getVisitorCountByToday = async () => {
        try {
            const res = await apiGetVisitorCountByTodayRequest();
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getServiceProportionByToday = async () => {
        try {
            const res = await apiGetServiceProportionByTodayRequest();
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getProductProportionByToday = async () => {
        try {
            const res = await apiGetProductProportionByTodayRequest();
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getTotalTopUpByToday = async () => {
        try {
            const res = await apiGetTotalTopUpByTodayRequest();
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getTotalPayTypeByToday = async () => {
        try {
            const res = await apiGetTotalPayTypeByTodayRequest();
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    return {
        totalSalesList,
        totalBookingList,
        managerSalesList,
        averageOrderList,
        visitorCountList,
        visitorHoursList,
        serviceProportionList,
        getTotalSales,
        getTotalBooking,
        getManagerSalesByToday,
        getVisitorCountByToday,
        getServiceProportionByToday,
        getProductProportionByToday,
        getTotalTopUpByToday,
        getTotalPayTypeByToday,
        getManagerSales,
        getAverageOrder,
        getVisitorCount,
        getVisitorHours,
        getServiceProportion,
        getTotalSalesByToday,
        getTotalBookingByWeek
    }
})