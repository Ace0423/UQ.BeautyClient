import { defineStore } from "pinia";
import { apiGetPermissionsListRequest, apiPutOptionRoleRequest } from "@/api/index";
export const useSettingStore = defineStore("setting", () => {
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
    return {
        getPermissionsList,
        permissionsList,
        editOptionRole
    }
})