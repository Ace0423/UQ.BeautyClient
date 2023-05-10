import { defineStore } from "pinia";
import { apiGetAdminListRequest, apiPostAdminDataRequest, apiPutAdminDataRequest, apiGetRoleListRequest, apiPostRoleDataRequest, apiPutRoleDataRequest, apiGetRoleInfoRequest, apiDeleteRoleManagerRequest,apiPostRoleManagerDataRequest } from "@/api/index";
export const useCounterStore = defineStore("manager", () => {
    const adminList: any = reactive({ data: [] });
    const roleList: any = reactive({ data: [] });
    const roleInfoList: any = reactive({ data: [] });
    const getAdminList = async (data: any) => {
        try {
            const res = await apiGetAdminListRequest(data);
            adminList.data = res.data.data.table;
        } catch (error) {
            console.log(error);
        }
    };

    const createAdminData = async (data: any) => {
        try {
            const res = await apiPostAdminDataRequest(data);
            updataAdminList(res.data.data)
            return res.data.state;
        } catch (error) {
            console.log(error);
        }
    };
    const editAdminData = async (data: any) => {
        try {
            const res = await apiPutAdminDataRequest(data);
            updataAdminList(res.data.data)
            return res.data.state;
        } catch (error) {
            console.log(error);
        }
    };
    const updataAdminList = (data: any) => {
        if (adminList.data.filter((item: any) => item.managerId == data.managerId).length > 0) {
            adminList.data.findIndex((item: any) => {
                if (item.managerId == data.managerId) {
                    item.email = data.email;
                    item.phone = data.phone;
                    item.nameView = data.nameView;
                    item.sex = data.sex;
                    item.photo = data.photo;
                    item.memo = data.memo;
                    item.userLock = data.userLock;
                    item.lineUserID = data.lineUserID;
                    item.googleUserID = data.googleUserID;
                }
            })
        } else {
            adminList.data.push(data);
        }
    };
    const getRoleList = async (data: any) => {
        try {
            const res = await apiGetRoleListRequest(data);
            if (res.data.data.table) {
                roleList.data = res.data.data.table;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const createRoleData = async (data: any) => {
        try {
            const res = await apiPostRoleDataRequest(data);
            updataRoleList(res.data.data);
            return res.data.state;
        } catch (error) {
            console.log(error);
        }
    };
    const editRoleData = async (data: any) => {
        try {
            const res = await apiPutRoleDataRequest(data);
            updataRoleList(res.data.data);
            return res.data.state;
        } catch (error) {
            console.log(error);
        }
    };
    const updataRoleList = (data: any) => {
        if (roleList.data.filter((item: any) => item.roleId == data.id).length > 0) {
            roleList.data.findIndex((item: any) => {
                if (item.roleId == data.id) {
                    item.label = data.name;
                    item.memo = data.memo;
                }
            })
        } else {
            roleList.data.push(data);
        }
    };
    const getRoleInfoData = async (data: any) => {
        try {
            const res = await apiGetRoleInfoRequest(data);
            if (res.data.data.table) {
                roleInfoList.data = res.data.data.table;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const addRoleManagerData = async (data: any) => {
        try {
            const res = await apiPostRoleManagerDataRequest(data);
            // updataRoleList(res.data.data);
            return res.data.state;
        } catch (error) {
            console.log(error);
        }
    };
    const deleteRoleManagerData = async (data: any) => {
        try {
            const res = await apiDeleteRoleManagerRequest(data);
            if (res.data.data.table) {
                roleInfoList.data = res.data.data.table;
            }
            return res.data.state;
        } catch (error) {
            console.log(error);
        }
    };
    return {
        adminList,
        getAdminList,
        createAdminData,
        editAdminData,
        roleList,
        getRoleList,
        createRoleData,
        editRoleData,
        roleInfoList,
        getRoleInfoData,
        addRoleManagerData,
        deleteRoleManagerData
    }
})