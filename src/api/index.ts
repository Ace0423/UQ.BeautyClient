import { postLoginRequest, getUserNameRequest } from "./authRequest";
import { getMemberListRequest, postMemberDataRequest, putMemberDataRequest,getGroupDataRequest,putGroupDataRequest,postGroupDataRequest,getGroupInfoRequest } from "./memberRequest";

export const apiPostLoginRequest = postLoginRequest;
export const apiGetUserNameRequest = getUserNameRequest;

export const apiGetMemberListRequest = getMemberListRequest;
export const apiPostMemberDataRequest = postMemberDataRequest;
export const apiPutMemberDataRequest = putMemberDataRequest;

export const apiGetGroupDataRequest = getGroupDataRequest;
export const apiPostGroupDataRequest = postGroupDataRequest;
export const apiPutGroupDataRequest = putGroupDataRequest;

export const apiGetGroupInfoRequest = getGroupInfoRequest;