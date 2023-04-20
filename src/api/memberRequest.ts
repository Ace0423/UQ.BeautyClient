import axios from "axios";

const memberRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const getMemberDataRequest = (data: any) =>
  memberRequest.get("/member/user", { params: data });

export const postMemberDataRequest = (data: any) =>
  memberRequest.post("/member/user", data);
