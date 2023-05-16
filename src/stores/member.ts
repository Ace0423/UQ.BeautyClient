import { defineStore } from "pinia";
import { apiGetMemberListRequest, apiPostMemberDataRequest, apiPostUpdateMemberDataRequest, apiGetGroupDataRequest, apiPostGroupDataRequest, apiPutGroupDataRequest, apiGetGroupInfoRequest, apiPostGroupInfoRequest, apiDeleteGroupInfoRequest } from "@/api/index";
export const useCounterStore = defineStore("member", () => {
    const memberList: any = reactive({ data: [] });
    const groupListData: any = reactive({ data: [] });
    // const groupListData: any = reactive({ notselected: [], selected: [] });
    const groupInfoData: any = reactive({ data: [] });
    const getMemberList = async () => {
        try {
            const dataRequest = reactive({
                id: 0,
                pageindex: 0,
                count: 0,
            });
            const res = await apiGetMemberListRequest(dataRequest);
            if (res.data.data.table) {
                memberList.data = res.data.data.table;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getMemberData = () => {

    };
    const createMemberData = async (data: any) => {
        let memberVal: any = {
            userId: data.userId,
            email: data.email,
            phone: data.phone,
            nameFirst: data.nameFirst,
            nameLast: data.nameLast,
            nameView: data.nameView,
            birthday: data.birthday,
            sex: data.sex,
            poto: data.poto,
            memo: data.memo,
            groupList: []
        }
        for (let index = 0; index < data.groupList.length; index++) {
            memberVal.groupList.push(data.groupList[index].groupId);
        }
        try {
            const res = await apiPostMemberDataRequest(memberVal);
            if (res.data.state == 1) {
                updataMemberList(res.data.data.table[0]);
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    const editMemberData = async (data: any) => {
        let memberVal: any = {
            userId: data.userId,
            email: data.email,
            phone: data.phone,
            nameFirst: data.nameFirst,
            nameLast: data.nameLast,
            nameView: data.nameView,
            birthday: data.birthday,
            sex: data.sex,
            poto: data.poto,
            memo: data.memo,
            groupList: []
        }

        for (let index = 0; index < data.groupList.length; index++) {
            let val = {
                userId: data.userId,
                groupId: data.groupList[index].groupId
            }
            memberVal.groupList.push(val);
        }
        try {
            const res = await apiPostUpdateMemberDataRequest(memberVal);
            console.log(res.data);
            if (res.data.state == 1) {
                updataMemberList(res.data.data.table[0]);
            }
            return res.data
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    const updataMemberList = (data: any) => {
        if (memberList.data.filter((item: any) => item.userId == data.userId).length > 0) {
            memberList.data.findIndex((item: any) => {
                if (item.userId == data.userId) {
                    item.userId = data.userId;
                    item.email = data.email;
                    item.phone = data.phone;
                    item.nameFirst = data.nameFirst;
                    item.nameLast = data.nameLast;
                    item.nameView = data.nameView;
                    item.birthday = data.birthday;
                    item.sex = data.sex;
                    item.poto = data.poto;
                    item.memo = data.memo;
                    item.groupList = data.groupList;
                    console.log(item);
                }
            })
        } else {
            memberList.data.push(data);
        }
    };

    const getGroupData = async () => {
        try {
            const dataRequest = reactive({
                groupId: 0,
                label: 0,
                memo: 0,
            });
            const res = await apiGetGroupDataRequest(dataRequest);
            if (res.data.data) {
                groupListData.data = res.data.data.table;
            }

        } catch (error) {
            console.log(error);
        }
    };
    const createGroupData = async (data: any) => {
        try {
            const res = await apiPostGroupDataRequest(data);
            if (res.data.state == 1) {
                updataGroupList(res.data.data);
            }
            return res.data.state
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const editGroupData = async (data: any) => {
        try {
            const res = await apiPutGroupDataRequest(data);
            if (res.data.state == 1) {
                updataGroupList(res.data.data);
            }
            return res.data.state
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const updataGroupList = (data: any) => {
        if (groupListData.data.filter((item: any) => item.groupId == data.groupId).length > 0) {
            groupListData.data.findIndex((item: any) => {
                if (item.groupId == data.groupId) {
                    item.groupId = data.groupId;
                    item.label = data.label;
                    item.memo = data.memo;
                }
            })
        } else {
            groupListData.data.push(data);
        }

    };
    const getGroupInfoData = async (data: any) => {
        try {
            groupInfoData.data = [];
            const dataRequest = reactive({
                id: data.groupId,
                pageindex: 0,
                count: 0,
            });
            const res = await apiGetGroupInfoRequest(dataRequest);

            if (res.data.state == 1) {
                console.log(res.data.data);
                groupInfoData.data = res.data.data.table;

            }
            return res.data.state
        } catch (error) {
            console.log(error);
        }
    };
    const addGroupInfoData = async (data: any) => {
        try {
            let val = [{
                groupId: data.groupId,
                userId: data.userId
            }]
            const res = await apiPostGroupInfoRequest(val);
            if (res.data.state == 1) {
                updataGroupInfoData(data, res.data.data[0]);
            }
            return res.data.state;
        } catch (error) {
            console.log(error);
        }
    };
    const deleteGroupInfoData = async (data: any) => {
        try {
            let val: string = '/' + data.groupId + '/' + data.userId;
            const res = await apiDeleteGroupInfoRequest(val);
            if (res.data.state == 1) {
                groupInfoData.data = groupInfoData.data.filter((item: any) => {
                    return item.userId !== res.data.data.userId;
                })
            }
            return res.data.state
        } catch (error) {
            console.log(error);
        }
    };
    const updataGroupInfoData = (data: any, res: any) => {
        let val = {
            groupId: res.groupId,
            label: data.label,
            nameView: data.nameView,
            userId: res.userId
        }
        groupInfoData.data.push(val);
    };
    return {
        memberList,
        getMemberList,
        getMemberData,
        createMemberData,
        editMemberData,
        groupListData,
        getGroupData,
        createGroupData,
        editGroupData,
        getGroupInfoData,
        addGroupInfoData,
        deleteGroupInfoData,
        groupInfoData
    }
})