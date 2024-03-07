import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
const reportRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,

});
export const getTotalSalesByTodayRequest = () => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/TotalSalesByToday");
}
export const getTotalBookingByWeekRequest = () => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/TotalBookingByWeek");
}
export const getManagerSalesByTodayRequest = () => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/ManagerSalesByToday");
}
export const getVisitorCountByTodayRequest = () => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/VisitorCountByToday");
}
export const getServiceProportionByTodayRequest = () => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/ServiceProportionByToday");
}
export const getProductProportionByTodayRequest = () => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/ProductProportionByToday");
}
export const getTotalTopUpByTodayRequest = () => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/TotalTopUpByToday");
}
export const getTotalPayTypeByTodayRequest = () => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/TotalPayTypeByToday");
}
export const getTotalSalesRequest = (data: any) => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/TotalSales", { params: data });
}
export const getTotalBookingRequest = (data: any) => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/TotalBooking", { params: data });
}
export const getManagerSalesRequest = (data: any) => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/ManagerSales", { params: data });
}
export const getAverageOrderRequest = (data: any) => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/AverageOrder", { params: data });
}
export const getVisitorCountRequest = (data: any) => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/VisitorCount", { params: data });
}
export const getVisitorHoursRequest = (data: any) => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/VisitorHours", { params: data });
}
export const getServiceProportionRequest = (data: any) => {
    let token: any = getToken('token');
    reportRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return reportRequest.get("/Analysis/ServiceProportion", { params: data });
}