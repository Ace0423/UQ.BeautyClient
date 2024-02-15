import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
const managerRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

export const getOnlineBusinessHours = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/OnlineWeb/OnlineBusinessHours", { params: data });
}

export const postOnlineBusinessHours = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.post("/OnlineWeb/OnlineBusinessHours", data);
}