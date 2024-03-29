import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
const managerRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,

});

export const getAdminListRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/manager/Admin", { params: data });
}

export const postAdminDataRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.post("/manager/Admin", data);
}

export const putAdminDataRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.put("/manager/Admin?type=edit", data);
}

export const getRoleListRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/manager/Role", { params: data });
}

export const postRoleDataRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.post("/manager/Role", data);
}

export const putRoleDataRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.put("/manager/Role", data);
}
export const getRoleInfoRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/manager/RoleMapping", { params: data });
}
export const postRoleManagerDataRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.post("/manager/RoleMapping", data);
}
export const deleteRoleManagerRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.delete("/manager/RoleMapping/" + data.roleId + '/' + data.mgrId);
}
export const getWorkingHoursRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/manager/WorkingHours", { params: data });
}
export const postWorkingHoursRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.post("/manager/WorkingHours", data);
}
export const getWorkingDefaultRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/manager/WorkingDefault", { params: data });
}
export const postWorkingDefaultRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.post("/manager/WorkingDefault", data);
}
export const putWorkingDefaultRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.put("/manager/WorkingDefault?mId=" + data.managerId, data);
}
export const getBusinessHoursRequest = (data: any) => {
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.get("/manager/RestTime", { params: data });
}

