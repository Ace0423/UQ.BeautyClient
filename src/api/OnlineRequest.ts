import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
const onlineRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

export const getOnlineBusinessHours = (data: any) => {
    let token: any = getToken('token');
    onlineRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return onlineRequest.get("/OnlineWeb/OnlineBusinessHours", { params: data });
}

export const postOnlineBusinessHours = (data: any) => {
    let token: any = getToken('token');
    onlineRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return onlineRequest.post("/OnlineWeb/OnlineBusinessHours", data);
}

export const getOnlinePayMeth = (data: any) => {
    let token: any = getToken('token');
    onlineRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return onlineRequest.get("/OnlineWeb/OnlinePayMeth", { params: data });
}

export const postOnlinePayMeth = (data: any) => {
    let token: any = getToken('token');
    onlineRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return onlineRequest.post("/OnlineWeb/OnlinePayMeth", data);
}

export const getOnlineOtherSettings = (data: any) => {
    let token: any = getToken('token');
    onlineRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return onlineRequest.get("/OnlineWeb/OnlineOtherSettings", { params: data });
}

export const postOnlineOtherSettings = (data: any) => {
    let token: any = getToken('token');
    onlineRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return onlineRequest.post("/OnlineWeb/OnlineOtherSettings", data);
}

export const getOnlineStoreWebInfo = (data: any) => {
    let token: any = getToken('token');
    onlineRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return onlineRequest.get("/OnlineWeb/OnlineStoreWebInfo", { params: data });
}