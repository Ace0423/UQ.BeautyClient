import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
const managerRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,

});

export const getTimeTablesRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/Company/TimeTables", { params: data });
}
export const postTimeTablesRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.post("/Company/TimeTables?cId=" + data.cId, data.timeTableList);
}
export const getCheckOutTypeRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/Company/CheckOutType", { params: data });
}
export const getCompanyInfoRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/Company/CompanyInfo", { params: data });
}
export const putCompanyInfoRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.put("/Company/CompanyInfo?cId=" + data.cId, data);
}
export const postCheckOutTypeRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.post("/Company/CheckOutType", data);
}
export const putCheckOutTypeRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.put("/Company/CheckOutType?cotid=" + data.cotId, data);
}
export const getMessagesRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/Company/Messages", { params: data });
}
export const insertMessagesRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.post("/Company/Messages", data);
}
export const updateMessagesRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.put("/Company/Messages?mId=" + data.mId, data);
}
export const getBlackListSetRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/Company/CompanyBlackList", { params: data });
}
export const putBlackListSetRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.put("/Company/CompanyBlackList?cId=" + data.cId, data);
}