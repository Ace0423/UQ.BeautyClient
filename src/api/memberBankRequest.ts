import axios from "axios";

const memberBankRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const getMemberBankListRequest = (data: any) =>
  memberBankRequest.get("/userBank/view", { params: data });
export const postMemberBankRequest = (data: any) =>
  memberBankRequest.post("/userBank/insert", data);
export const getMemberBankInfoListRequest = (data: any) =>
  memberBankRequest.get("/userBank/list", { params: data });
export const getMemberBankDetailRequest = (data: any) =>
  memberBankRequest.get("/userBank/detail", { params: data });
export const putMemberBankInfoRequest = (data: any) =>
  memberBankRequest.put("/userBank/Update?id=" + data.ubid, data);