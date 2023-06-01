import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
const settingRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

export const getPermissionsListRequest = (data: any) => {
    let token: any = getToken('token');
    settingRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return settingRequest.get("/Option/OptionRole", { params: data });
}

export const putOptionRoleRequest = (data: any) => {
    let token: any = getToken('token');
    settingRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return settingRequest.put("/Option/OptionRole?type=edit", data);
}
// export const getPermissionsListRequest = (data: any) =>
//     settingRequest.get("/Option/OptionRole", { params: data });

