import axios from "axios";

const memberRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const getMemberListRequest = (data: any) =>
  memberRequest.get("/member/user", { params: data });
export const postMemberDataRequest = (data: any) =>
  memberRequest.post("/member/user", data);
export const putMemberDataRequest = (data: any) =>
  memberRequest.put("/member/user/" + data.userId, data);

export const getGroupDataRequest = (data: any) =>
  memberRequest.get("/member/group", { params: data });
export const postGroupDataRequest = (data: any) =>
  memberRequest.post("/member/group", data);
export const putGroupDataRequest = (data: any) =>
  memberRequest.put("/member/group/" + data.groupId, data);

  export const getGroupInfoRequest = (data: any) =>
  memberRequest.get("/member/grouplist", { params: data });