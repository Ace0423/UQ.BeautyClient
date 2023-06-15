import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
const managerRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,

});

export const getBusinessHoursRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/Company/TimeTables", { params: data });
}
export const getCheckOutTypeRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/Company/CheckOutType", { params: data });
}
