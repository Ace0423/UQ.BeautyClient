import { postLoginRequest, getUserNameRequest } from "./authRequest";
import { getMemberListRequest, postMemberDataRequest, postUpdateMemberDataRequest, getGroupDataRequest, putGroupDataRequest, postGroupDataRequest, getGroupInfoRequest, postGroupInfoRequest, deleteGroupInfoRequest, } from "./memberRequest";
import { getMemberBankListRequest, postMemberBankRequest, getMemberBankInfoListRequest, getMemberBankDetailRequest, putMemberBankInfoRequest } from "./memberBankRequest";
import { getAdminListRequest, postAdminDataRequest, putAdminDataRequest, getRoleListRequest, postRoleDataRequest, putRoleDataRequest, getRoleInfoRequest, postRoleManagerDataRequest, deleteRoleManagerRequest, getWorkingHoursRequest, postWorkingHoursRequest, getWorkingDefaultRequest, postWorkingDefaultRequest, putWorkingDefaultRequest } from "./managerRequest";
import { getPermissionsListRequest, putOptionRoleRequest, getApiPermissionsListRequest, postApiPermissionsListRequest, updateApiPermissionsListRequest } from "./settingRequest";
import { getTimeTablesRequest, postTimeTablesRequest, getCheckOutTypeRequest, postCheckOutTypeRequest, putCheckOutTypeRequest, getCompanyInfoRequest, putCompanyInfoRequest, getMessagesRequest, insertMessagesRequest, updateMessagesRequest, getBlackListSetRequest, putBlackListSetRequest, getLineOAListRequest, putLineOAListRequest, getMessageRecords, getInfoRecord } from "./companyRequest";
import { getTopUpCardListRequest, addTopUpCardInfoRequest, editTopUpCardInfoRequest } from "./topUpCardRequest";
import { getOnlineBusinessHours, postOnlineBusinessHours, getOnlinePayMeth, postOnlinePayMeth, getOnlineOtherSettings, postOnlineOtherSettings } from "./onlineRequest";
import { getTotalSalesRequest, getManagerSalesRequest, getTotalBookingRequest, getAverageOrderRequest, getVisitorCountRequest, getVisitorHoursRequest, getServiceProportionRequest } from "./reportRequest";

export const apiPostLoginRequest = postLoginRequest;
export const apiGetUserNameRequest = getUserNameRequest;

export const apiGetMemberListRequest = getMemberListRequest;
export const apiPostMemberDataRequest = postMemberDataRequest;
export const apiPostUpdateMemberDataRequest = postUpdateMemberDataRequest;

export const apiGetGroupDataRequest = getGroupDataRequest;
export const apiPostGroupDataRequest = postGroupDataRequest;
export const apiPutGroupDataRequest = putGroupDataRequest;

export const apiGetGroupInfoRequest = getGroupInfoRequest;
export const apiPostGroupInfoRequest = postGroupInfoRequest;
export const apiDeleteGroupInfoRequest = deleteGroupInfoRequest;

export const apiGetMemberBankListRequest = getMemberBankListRequest;
export const apiPostMemberBankRequest = postMemberBankRequest;
export const apiGetMemberBankInfoListRequest = getMemberBankInfoListRequest;
export const apiGetMemberBankDetailRequest = getMemberBankDetailRequest;
export const apiPutMemberBankInfoRequest = putMemberBankInfoRequest;

export const apiGetPermissionsListRequest = getPermissionsListRequest;
export const apiPutOptionRoleRequest = putOptionRoleRequest;

export const apiGetAdminListRequest = getAdminListRequest;
export const apiPostAdminDataRequest = postAdminDataRequest;
export const apiPutAdminDataRequest = putAdminDataRequest;
export const apiGetRoleListRequest = getRoleListRequest;
export const apiPostRoleDataRequest = postRoleDataRequest;
export const apiPutRoleDataRequest = putRoleDataRequest;
export const apiGetWorkingHoursRequest = getWorkingHoursRequest;
export const apiPostWorkingHoursRequest = postWorkingHoursRequest;
export const apiGetWorkingDefaultRequest = getWorkingDefaultRequest;
export const apiPostWorkingDefaultRequest = postWorkingDefaultRequest;
export const apiPutWorkingDefaultRequest = putWorkingDefaultRequest;



export const apiGetRoleInfoRequest = getRoleInfoRequest;
export const apiPostRoleManagerDataRequest = postRoleManagerDataRequest;
export const apiDeleteRoleManagerRequest = deleteRoleManagerRequest;
export const apiGetApiPermissionsListRequest = getApiPermissionsListRequest;
export const apiPostApiPermissionsListRequest = postApiPermissionsListRequest;
export const apiUpdateApiPermissionsListRequest = updateApiPermissionsListRequest;



export const apiGetTimeTablesRequest = getTimeTablesRequest;
export const apiPostTimeTablesRequest = postTimeTablesRequest;
export const apiGetCompanyInfoRequest = getCompanyInfoRequest;
export const apiPutCompanyInfoRequest = putCompanyInfoRequest;
export const apiGetBlackListSetRequest = getBlackListSetRequest;
export const apiPutBlackListSetRequest = putBlackListSetRequest;
export const apiGetMessagesRequest = getMessagesRequest;
export const apiInsertMessagesRequest = insertMessagesRequest;
export const apiUpdateMessagesRequest = updateMessagesRequest;
export const apiGetLineOAListRequest = getLineOAListRequest;
export const apiPutLineOAListRequest = putLineOAListRequest;
export const apiGetMessageRecords = getMessageRecords;
export const apiGetInfoRecord = getInfoRecord;


export const apiGetCheckOutTypeRequest = getCheckOutTypeRequest;
export const apiPostCheckOutTypeRequest = postCheckOutTypeRequest;
export const apiPutCheckOutTypeRequest = putCheckOutTypeRequest;

export const apiGetTopUpCardListRequest = getTopUpCardListRequest;
export const apiAddTopUpCardInfoRequest = addTopUpCardInfoRequest;
export const apiEditTopUpCardInfoRequest = editTopUpCardInfoRequest;

export const apiGetOnlineBusinessHours = getOnlineBusinessHours;
export const apiPostOnlineBusinessHours = postOnlineBusinessHours;
export const apiGetOnlinePayMeth = getOnlinePayMeth;
export const apiPostOnlinePayMeth = postOnlinePayMeth;
export const apiGetOnlineOtherSettings = getOnlineOtherSettings;
export const apiPostOnlineOtherSettings = postOnlineOtherSettings;

export const apiGetTotalSalesRequest = getTotalSalesRequest;
export const apiGetTotalBookingRequest = getTotalBookingRequest;
export const apiGetManagerSalesRequest = getManagerSalesRequest;
export const apiGetAverageOrderRequest = getAverageOrderRequest;
export const apiGetVisitorCountRequest = getVisitorCountRequest;
export const apiGetVisitorHoursRequest = getVisitorHoursRequest;
export const apiGetServiceProportionRequest = getServiceProportionRequest;