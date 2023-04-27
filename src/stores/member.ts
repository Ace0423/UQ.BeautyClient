import { defineStore } from "pinia";
import { apiGetMemberListRequest, apiPostMemberDataRequest, apiPutMemberDataRequest, apiGetGroupDataRequest, apiPostGroupDataRequest, apiPutGroupDataRequest, apiGetGroupInfoRequest } from "@/api/index";
export const useCounterStore = defineStore("member", () => {
    const memberList: any = reactive({ data: [] });
    const groupData: any = reactive({ data: [] });
    // const groupListData: any = reactive({ notselected: [], selected: [] });
    const groupListData: any = reactive({ data: [] });
    const getMemberList = async () => {
        try {
            const dataRequest = reactive({
                id: 0,
                pageindex: 0,
                count: 0,
            });
            const res = await apiGetMemberListRequest(dataRequest);
            memberList.data = res.data.data;
        } catch (error) {
            console.log(error);
        }
    };
    const getMemberData = () => {

    };
    const createMemberData = async (data: any) => {
        try {
            const res = await apiPostMemberDataRequest(data);
            if (res.data.state == 1) {
                updataMemberList(res.data.data);
                return res.data.state
            }
        } catch (error) {
            console.log(error);
        }
    };
    const editMemberData = async (data: any) => {
        try {
            const res = await apiPutMemberDataRequest(data);
            if (res.data.state == 1) {
                updataMemberList(res.data.data);
                return res.data.state
            }
        } catch (error) {
            console.log(error);
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
            groupData.data = res.data.data;
        } catch (error) {
            console.log(error);
        }
    };
    const createGroupData = async (data: any) => {
        try {
            const res = await apiPostGroupDataRequest(data);
            console.log(res.data);
            if (res.data.state == 1) {
                console.log(res.data.data);
                updataGroupList(res.data.data);
                return res.data.state
            }
        } catch (error) {
            console.log(error);
        }
    };
    const editGroupData = async (data: any) => {
        try {
            const res = await apiPutGroupDataRequest(data);
            if (res.data.state == 1) {
                updataGroupList(res.data.data);
                return res.data.state
            }
        } catch (error) {
            console.log(error);
        }
    };
    const updataGroupList = (data: any) => {
        if (groupData.data.filter((item: any) => item.groupId == data.groupId).length > 0) {
            groupData.data.findIndex((item: any) => {
                if (item.groupId == data.groupId) {
                    item.groupId = data.groupId;
                    item.label = data.label;
                    item.memo = data.memo;
                }
            })
        } else {
            groupData.data.push(data);
        }

    };
    const getGroupInfoData = async (data: any) => {
        try {
            groupListData.data = [];
            const dataRequest = reactive({
                id: data.groupId,
                pageindex: 0,
                count: 0,
            });
            const res = await apiGetGroupInfoRequest(dataRequest);

            if (res.data.state == 1) {
                groupListData.data = res.data.data;
                console.log(groupListData.data);
                // groupListData.selected = res.data.data;
                // groupListData.notselected = [];
                // for (let i: number = 0; i < memberList.data.length; i++) {
                //     if (groupListData.selected.filter((item: any) => item.userId == memberList.data[i].userId).length == 0) {
                //         let val = {
                //             groupId: res.data.data.groupId,
                //             label: res.data.data.label,
                //             nameView: memberList.data[i].nameView,
                //             userId: memberList.data[i].userId,
                //         }
                //         groupListData.notselected.push(val);
                //     }
                // }
                return res.data.state
            }
        } catch (error) {
            console.log(error);
        }
    };
    return {
        memberList,
        getMemberList,
        getMemberData,
        createMemberData,
        editMemberData,
        groupData,
        getGroupData,
        createGroupData,
        editGroupData,
        getGroupInfoData,
        groupListData
    }
})