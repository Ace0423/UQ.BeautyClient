import { postLoginRequest, getUserNameRequest } from "./authRequest";
import { getMemberListRequest, postMemberDataRequest, postUpdateMemberDataRequest, getGroupDataRequest, putGroupDataRequest, postGroupDataRequest, getGroupInfoRequest, postGroupInfoRequest, deleteGroupInfoRequest, } from "./memberRequest";
import { getMemberBankListRequest,postMemberBankRequest,getMemberBankInfoListRequest } from "./memberBankRequest";

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