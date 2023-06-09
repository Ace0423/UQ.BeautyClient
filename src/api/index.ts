import { postLoginRequest, getUserNameRequest } from "./authRequest";
import { getMemberListRequest, postMemberDataRequest, postUpdateMemberDataRequest, getGroupDataRequest, putGroupDataRequest, postGroupDataRequest, getGroupInfoRequest, postGroupInfoRequest, deleteGroupInfoRequest, } from "./memberRequest";
import { getMemberBankListRequest, postMemberBankRequest, getMemberBankInfoListRequest, getMemberBankDetailRequest, putMemberBankInfoRequest } from "./memberBankRequest";
import { getAdminListRequest, postAdminDataRequest, putAdminDataRequest, getRoleListRequest, postRoleDataRequest, putRoleDataRequest, getRoleInfoRequest, postRoleManagerDataRequest, deleteRoleManagerRequest, getWorkingHoursRequest, postWorkingHoursRequest, getWorkingDefaultRequest, postWorkingDefaultRequest, putWorkingDefaultRequest } from "./managerRequest";
import { getPermissionsListRequest, putOptionRoleRequest } from "./settingRequest";
import { getTimeTablesRequest,postTimeTablesRequest, getCheckOutTypeRequest, postCheckOutTypeRequest, putCheckOutTypeRequest,getCompanyInfoRequest,putCompanyInfoRequest,getMessagesRequest,insertMessagesRequest,updateMessagesRequest } from "./companyRequest";

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

export const apiGetTimeTablesRequest = getTimeTablesRequest;
export const apiPostTimeTablesRequest = postTimeTablesRequest;
export const apiGetCompanyInfoRequest = getCompanyInfoRequest;
export const apiPutCompanyInfoRequest = putCompanyInfoRequest;
export const apiGetMessagesRequest = getMessagesRequest;
export const apiInsertMessagesRequest = insertMessagesRequest;
export const apiUpdateMessagesRequest = updateMessagesRequest;

export const apiGetCheckOutTypeRequest = getCheckOutTypeRequest;
export const apiPostCheckOutTypeRequest = postCheckOutTypeRequest;
export const apiPutCheckOutTypeRequest = putCheckOutTypeRequest;