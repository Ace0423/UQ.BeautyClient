import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
const memberRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const getMemberListRequest = (data: any) => {
  let token: any = getToken('token');
  memberRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
  // return memberRequest.get("/member/user", { params: data });
  return memberRequest.post("/member/user", data);
}

export const postMemberDataRequest = (data: any) => {
  let token: any = getToken('token');
  memberRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
  return memberRequest.post("/member/createUser", data);
}
export const postUpdateMemberDataRequest = (data: any) => {
  let token: any = getToken('token');
  memberRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
  return memberRequest.post("/member/update", data);
}
export const getGroupDataRequest = (data: any) =>
  memberRequest.get("/member/group", { params: data });
export const postGroupDataRequest = (data: any) =>
  memberRequest.post("/member/group", data);
export const putGroupDataRequest = (data: any) =>
  memberRequest.put("/member/group?id=" + data.groupId, data);

export const getGroupInfoRequest = (data: any) =>
  memberRequest.get("/member/grouplist", { params: data });
export const postGroupInfoRequest = (data: any) =>
  memberRequest.post("/member/grouplist", data);
export const putGroupInfoRequest = (data: any) =>
  memberRequest.put("/member/grouplist", data.groupId, data);
export const deleteGroupInfoRequest = (data: any) =>
  memberRequest.delete("/member/grouplist" + data);
export const getMemberExpenseInfoRequest = (data: any) => {
  let token: any = getToken('token');
  memberRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
  return memberRequest.get("/Member/ExpenseInfo", { params: data });
}
export const deleteGroupDataRequest = (data: any) => {
  let token: any = getToken('token');
  memberRequest.defaults.headers.common["Authorization"] = 'bearer ' + JSON.parse(token).token;
  return memberRequest.delete("/member/Group/" + data.groupId, data.groupId);
}