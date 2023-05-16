import { defineStore } from "pinia";
import { apiGetMemberBankListRequest, apiPostMemberBankRequest, apiGetMemberBankInfoListRequest, apiGetMemberBankDetailRequest, apiPutMemberBankInfoRequest } from "@/api/index";
export const useCounterStore = defineStore("memberBank", () => {
    const memberBankList: any = reactive({ data: [] });
    const memberBankInfoList: any = reactive({ data: [] });
    const getMemberBankList = async (data: any) => {
        try {
            const res = await apiGetMemberBankListRequest(data);
            if (res.data.data) {
                memberBankList.data = res.data.data.table;
            }

        } catch (error) {
            console.log(error);
        }
    };
    const getMemberBankDetail = async (data: any) => {
        try {
            const res = await apiGetMemberBankDetailRequest(data);
            if (res.data.state = 1) {
                return res.data.data;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getMemberBankDetailList = async (data: any) => {
        try {
            const res = await apiGetMemberBankInfoListRequest(data);
            memberBankInfoList.data = [];
            if (res.data.state == 1) {
                memberBankInfoList.data = res.data.data.table;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const creatMemberBankData = async (data: any) => {
        try {
            const res = await apiPostMemberBankRequest(data);
            if (res.data.state == 1) {
                updateMemberBankList(res.data.data.table[0])
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    const updateMemberBankList = (data: any) => {
        try {
            if (memberBankList.data.filter((item: any) => item.userId == data.userId).length > 0) {
                memberBankList.data.findIndex((item: any) => {
                    if (item.userId == data.userId) {
                        item.balaance = data.balaance;
                        item.storedDate = data.storedDate;
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    };
    const editMemberBankInfoData = async (data: any) => {
        try {
            const res = await apiPutMemberBankInfoRequest(data);
            if (res.data.state == 1) {
                updateMemberBankInfoList(res.data.data)
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const updateMemberBankInfoList = (data: any) => {
        try {
            if (memberBankInfoList.data.filter((item: any) => item.ubid == data.ubid).length > 0) {
                memberBankInfoList.data.findIndex((item: any) => {
                    if (item.ubid == data.ubid) {
                        item.memo = data.memo;
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    };
    return {
        memberBankList,
        getMemberBankList,
        creatMemberBankData,
        getMemberBankDetail,
        getMemberBankDetailList,
        editMemberBankInfoData,
        memberBankInfoList
    }
})