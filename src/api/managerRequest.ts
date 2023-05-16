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
    return managerRequest.put("/manager/Admin/" + data.managerId, data);
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
    console.log(data);
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return managerRequest.put("/manager/Role?id=" + data.id, data);
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
export const deleteRoleManagerRequest = (data: any) =>{
    let token: any = getToken('token');
    managerRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
    return  managerRequest.delete("/manager/RoleMapping/" + data.roleId +'/' +data.mgrId);
}
