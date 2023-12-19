import { defineStore } from "pinia";
import { apiGetPermissionsListRequest, apiPutOptionRoleRequest, apiGetApiPermissionsListRequest, apiPostApiPermissionsListRequest, apiUpdateApiPermissionsListRequest } from "@/api/index";
export const useSettingStore = defineStore("setting", () => {
    const apiPermissionsList: any = reactive({ data: [] });
    const permissionsList: any = reactive({ data: [] });
    const getPermissionsList = async () => {
        try {
            const dataRequest = reactive({
                pageindex: 0,
                count: 0,
            });
            const res = await apiGetPermissionsListRequest(dataRequest);
            if (res.data.data) {
                permissionsList.data = res.data.data.table;
            }

        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    const editOptionRole = async (data: any) => {
        try {
            const res = await apiPutOptionRoleRequest(data);
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getApiPermissionsList = async () => {
        try {
            const dataRequest = reactive({
                id: 0,
                pageindex: 0,
                count: 0,
            });
            const res = await apiGetApiPermissionsListRequest(dataRequest);
            if (res.data.data.table) {
                apiPermissionsList.data = res.data.data.table.sort();
            }
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    const addApiPermissionsList = async (data: any) => {
        try {
            const res = await apiPostApiPermissionsListRequest(data);
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    const editApiPermissionsList = async (data: any) => {
        try {
            const res = await apiUpdateApiPermissionsListRequest(data);
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    return {
        getPermissionsList,
        permissionsList,
        editOptionRole,
        apiPermissionsList,
        getApiPermissionsList,
        addApiPermissionsList,
        editApiPermissionsList
    }
})