import { defineStore } from "pinia";
import {
    apiGetAdminListRequest,
    apiPostAdminDataRequest,
    apiPutAdminDataRequest,
    apiGetRoleListRequest,
    apiPostRoleDataRequest,
    apiPutRoleDataRequest,
    apiGetRoleInfoRequest,
    apiDeleteRoleManagerRequest,
    apiPostRoleManagerDataRequest,
    apiGetWorkingHoursRequest,
    apiPostWorkingHoursRequest,
    apiGetWorkingDefaultRequest,
    apiPostWorkingDefaultRequest,
    apiPutWorkingDefaultRequest,
    apiGetLineOAListRequest,
    apiPutLineOAListRequest
} from "@/api/index";
export const useManagerStore = defineStore("manager", () => {
    const managerList: any = reactive({ data: [] });
    const roleList: any = reactive({ data: [] });
    const roleInfoList: any = reactive({ data: [] });
    const workingHoursList: any = reactive({ data: [] });
    const LineOAList: any = reactive({ data: [] });
    const managerRoleList: any = ref([]);

    const getManagerList = async (data: any) => {
        try {
            const res = await apiGetAdminListRequest(data);
            if (res.data.state == 1) {
                managerList.data = res.data.data.table;
            }
            return res.data;

        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    const getManagerListNew = async (data: any) => {
        try {
            managerRoleList.value = []
            managerList.data = []

            const res = await apiGetAdminListRequest(data).then((res: any) => {
                if (res.data.state == 1) {
                    managerList.data = res.data.data.table;
                    setManagerRoleListFn(5)
                }
                return res.data;
            });
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    function setManagerRoleListFn(level: any) {
        managerRoleList.value = []
        //芳療師
        for (let i = 0; i < managerList.data.length; i++) {
            const element = managerList.data[i];
            if (element.roleList.length > 0 && element.roleList[0].roleId == level)
                managerRoleList.value.push(element);
        }
    }

    const createManagerData = async (data: any) => {
        try {
            const res = await apiPostAdminDataRequest(data);
            if (res.data.state) {
                updataManagerList(res.data.data.table[0]);
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const editManagerData = async (data: any) => {
        try {
            const res = await apiPutAdminDataRequest(data);
            updataManagerList(res.data.data.table[0])
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const updataManagerList = (data: any) => {
        if (managerList.data.filter((item: any) => item.managerId == data.managerId).length > 0) {
            managerList.data.findIndex((item: any) => {
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
                    item.roleList = data.roleList;
                }
            })
        } else {
            managerList.data.push(data);
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
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    const editRoleData = async (data: any) => {
        try {
            const res = await apiPutRoleDataRequest(data);
            if (res.data.state == 1) {
                updataRoleList(res.data.data);
            }
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    const updataRoleList = (data: any) => {
        for (let i = 0; i < data.length; i++) {
            const index = roleList.data.findIndex((e: any) => e.roleId === data[i].id);
            roleList.data[index].memo = data[i].memo
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

    const getWorkingHours = async (data: any) => {
        try {
            const res = await apiGetWorkingHoursRequest(data).then((res: any) => {
                if (res.data.data.table) {
                    workingHoursList.data = res.data.data.table;
                }
            })
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const postWorkingHours = async (data: any) => {
        try {
            // if (data.mwNo == "") {
            //     const res = await apiPostWorkingDefaultRequest(data);
            //     return res.data
            // } else {
            //     const res = await apiPutWorkingDefaultRequest(data);
            //     return res.data
            // }
            const res = await apiPostWorkingHoursRequest(data);
            return res.data
        } catch (error) {
            console.log(error);
        }
    };
    const getWorkingDefault = async (data: any) => {
        try {
            const res = await apiGetWorkingDefaultRequest(data);
            // if (res.data.data.table) {
            //     workingDefaultList.data = res.data.data.table;
            // }
            return res.data
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const submitWorkingDefault = async (data: any) => {
        try {
            if (data.timeTableList[0].workingHoursId == 0) {
                const res = await apiPostWorkingDefaultRequest(data);
                return res.data
            } else {
                const res = await apiPutWorkingDefaultRequest(data);
                return res.data
            }

        } catch (error) {
            console.log(error);
        }
    };
    const getLineOAList = async (data: any) => {
        try {
            const res = await apiGetLineOAListRequest(data);
            if (res.data.data.table) {
                LineOAList.data = res.data.data.table[0];
            }
            return res.data
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const editLineOAList = async (data: any) => {
        try {
            const res = await apiPutLineOAListRequest(data);
            updataLineOAList(res.data.data)
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const updataLineOAList = async (data: any) => {
        LineOAList.data = data;
    };
    return {
        managerList,
        getManagerList,
        managerRoleList,
        getManagerListNew,
        createManagerData,
        editManagerData,
        roleList,
        getRoleList,
        createRoleData,
        editRoleData,
        roleInfoList,
        getRoleInfoData,
        addRoleManagerData,
        deleteRoleManagerData,
        getWorkingHours,
        workingHoursList,
        postWorkingHours,
        getWorkingDefault,
        submitWorkingDefault,
        LineOAList,
        getLineOAList,
        editLineOAList
    }
})