import { defineStore } from "pinia";
import { apiGetTimeTablesRequest, apiPostTimeTablesRequest, apiGetCheckOutTypeRequest, apiPostCheckOutTypeRequest, apiPutCheckOutTypeRequest, apiGetCompanyInfoRequest, apiPutCompanyInfoRequest, apiGetMessagesRequest, apiInsertMessagesRequest, apiUpdateMessagesRequest, apiGetBlackListSetRequest, apiPutBlackListSetRequest, apiGetMessageRecords, apiGetInfoRecord, apiGetOnlineBusinessHours, apiPostOnlineBusinessHours, apiGetOnlinePayMeth,apiPostOnlinePayMeth } from "@/api/index";
import { getCompany } from "@/plugins/js-cookie";
export const useCompanyStore = defineStore("company", () => {
    const businessHoursList: any = reactive({ data: [] });
    const onlineBusinessHoursList: any = reactive({ data: [] });
    const onlinePayMethList: any = reactive({ data: [] });
    const checkOutTypeList: any = reactive({ data: [] });
    const companyInfoList: any = reactive({ data: [] });
    const companyBlackListSet: any = reactive({ data: [] });
    const messagesList: any = reactive({ data: [] });
    const messagesRecordList: any = reactive({ data: [] });

    const getTimeTablesRequest = async (data: any) => {

        try {
            const res = await apiGetTimeTablesRequest(data);
            if (res.data.state == 1 && res.data.data.table) {
                businessHoursList.data = res.data.data.table;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const postTimeTablesRequest = async (data: any) => {

        try {
            const res = await apiPostTimeTablesRequest(data);
            if (res.data.state == 1 && res.data.data.table) {
                businessHoursList.data = res.data.data.table;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getCheckOutType = async () => {
        let data = {
            cotid: 0,
            pageIndex: 0,
            count: 0
        }
        try {
            const res = await apiGetCheckOutTypeRequest(data);
            if (res.data.state == 1) {
                checkOutTypeList.data = res.data.data.table;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const postCheckOutType = async (data: any) => {
        try {
            const res = await apiPostCheckOutTypeRequest(data);
            if (res.data.state == 1) {
                updataCheckOutTypeList(res.data.data)
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const putCheckOutType = async (data: any) => {
        try {
            const res = await apiPutCheckOutTypeRequest(data);
            if (res.data.state == 1) {
                updataCheckOutTypeList(res.data.data)
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const updataCheckOutTypeList = (data: any) => {
        if (checkOutTypeList.data.filter((item: any) => item.cotId == data.cotId).length > 0) {
            checkOutTypeList.data.findIndex((item: any) => {
                if (item.cotId == data.cotId) {
                    item.cotTitle = data.cotTitle;
                    item.enabled = data.enabled;
                }
            })
        } else {
            checkOutTypeList.data.push(data);
        }
    };
    const getCompanyInfo = async () => {
        let data = {
            cid: 0,
            pageIndex: 0,
            count: 0
        }
        try {
            const res = await apiGetCompanyInfoRequest(data);
            if (res.data.state == 1) {
                companyInfoList.data = res.data.data.table[0];
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const putCompanyInfo = async (data: any) => {

        try {
            const res = await apiPutCompanyInfoRequest(data);
            if (res.data.state == 1) {
                updataCompanyInfo(res.data.data)
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    const updataCompanyInfo = async (data: any) => {
        if (companyInfoList.data.cId == data.cId) {
            companyInfoList.data.cName = data.cName;
            companyInfoList.data.cAddress = data.cAddress;
            companyInfoList.data.cPhone = data.cPhone;
            companyInfoList.data.cWebSite = data.cWebSite;
            companyInfoList.data.cEmail = data.cEmail;
            companyInfoList.data.cPhoneOwner = data.cPhoneOwner;
            companyInfoList.data.imageBig = data.imageBig;
            companyInfoList.data.imageSmall = data.imageSmall;
            companyInfoList.data.companyGroup = data.companyGroup
        }
    };

    const getBlackListSet = async () => {
        let data = {
            cid: 0,
            pageIndex: 0,
            count: 0
        }
        try {
            const res = await apiGetBlackListSetRequest(data);
            if (res.data.state == 1) {
                companyBlackListSet.data = res.data.data.table[0];
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const submitBlackListSet = async (data: any) => {
        try {
            const res = await apiPutBlackListSetRequest(data);
            if (res.data.state == 1) {
                updataCheckOutTypeList(res.data.data)
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const updataBlackListSet = async () => {

    };


    const getMessages = async (data: any) => {

        try {
            const res = await apiGetMessagesRequest(data);
            if (res.data.state == 1) {
                messagesList.data = res.data.data.table;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const submitMessages = async (data: any) => {
        try {
            const res = data.mId == 0 ? await apiInsertMessagesRequest(data) : await apiUpdateMessagesRequest(data);
            if (res.data.state == 1) {
                updataMessagesList(res.data.data.table[0]);
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const updataMessagesList = (data: any) => {
        if (messagesList.data.filter((item: any) => item.mId == data.mId).length > 0) {
            messagesList.data.findIndex((item: any) => {
                if (item.mId == data.mId) {
                    item.mTheme = data.mTheme;
                    item.mTitle = data.mTitle;
                    item.mContext = data.mContext;
                    item.mImage = data.mImage;
                    item.mButtonText = data.mButtonText;
                    item.mUrl = data.mUrl;
                    item.mTarget = data.mTarget;
                    item.mSendTimer = data.mSendTimer;
                    item.mSendTimeing = data.mSendTimeing;
                    item.mSendDate = data.mSendDateD + data.mSendDateT;
                    item.mSendDateD = data.mSendDateD;
                    item.mSendDateT = data.mSendDateT;
                    item.mapCouponCards = data.mapCouponCards;
                    item.mapMembers = data.mapMembers;
                    item.mEnabled = data.mEnabled;
                    item.mEnabledLine = data.mEnabledLine;
                    item.mEnabledMessage = data.mEnabledMessage;
                    item.mFilter = data.mFilter;
                }
            })
        } else {
            data.mSendDate = data.mSendDateD + data.mSendDateT;
            messagesList.data.push(data);
        }
    };
    const getMessageRecords = async (data: any) => {

        try {
            const res = await apiGetMessageRecords(data);
            if (res.data.state == 1) {
                messagesRecordList.data = res.data.data.table;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getInfoRecord = async (data: any) => {

        try {
            const res = await apiGetInfoRecord(data);
            // if (res.data.state == 1) {
            //     messagesRecordList.data = res.data.data.table;
            // }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const getOnlineBusinessHours = async () => {
        let data = {
            cid: getCompany("userData"),
            pageIndex: 0,
            count: 0
        }
        try {
            const res = await apiGetOnlineBusinessHours(data);
            if (res.data.state == 1) {
                updataOnlineBusinessHoursList(res.data.data);
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const postOnlineBusinessHours = async (data: any) => {
        for (let index = 0; index < data.data.length; index++) {
            data.data[index].wbUnavailPeriods = JSON.stringify(data.data[index].wbUnavailPeriods);
        }
        try {
            const res = await apiPostOnlineBusinessHours(data);
            if (res.data.state == 1) {
                updataOnlineBusinessHoursList(res.data.data);
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const updataOnlineBusinessHoursList = (data: any) => {
        onlineBusinessHoursList.data = data;
        for (let index = 0; index < onlineBusinessHoursList.data.data.length; index++) {
            onlineBusinessHoursList.data.data[index].wbUnavailPeriods = JSON.parse(onlineBusinessHoursList.data.data[index].wbUnavailPeriods);
        }
    }
    const getOnlinePayMeth = async () => {
        let data = {
            cid: getCompany("userData"),
            pageIndex: 0,
            count: 0
        }
        try {
            const res = await apiGetOnlinePayMeth(data);
            if (res.data.state == 1) {
                onlinePayMethList.data = res.data.data;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    const postOnlinePayMeth = async (data: any) => {
        try {
            const res = await apiPostOnlinePayMeth(data);
            if (res.data.state == 1) {
                onlinePayMethList.data = res.data.data;
            }
            return res.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };
    return {
        businessHoursList,
        getTimeTablesRequest,
        postTimeTablesRequest,
        checkOutTypeList,
        getCheckOutType,
        postCheckOutType,
        putCheckOutType,
        getCompanyInfo,
        putCompanyInfo,
        companyInfoList,
        messagesList,
        getMessages,
        submitMessages,
        getBlackListSet,
        submitBlackListSet,
        companyBlackListSet,
        messagesRecordList,
        getMessageRecords,
        getInfoRecord,
        onlineBusinessHoursList,
        getOnlineBusinessHours,
        postOnlineBusinessHours,
        onlinePayMethList,
        getOnlinePayMeth,
        postOnlinePayMeth
    }
})