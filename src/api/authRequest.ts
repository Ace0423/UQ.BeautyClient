import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
let token: any = getToken("token") ? getToken("token") : "";
console.log("111");

const authRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;",
    // Authorization: "bearer " + JSON.parse(token).token,
  },
});

export const postLoginRequest = (data: any) =>
  authRequest.post("/Auth/signin", data);

export const getUserNameRequest = () => authRequest.get("/username");

//-----------------------------------------課程
//美容師
export const getBeauticianReq = (id: any) =>
  authRequest.get("member/Beautician?id=" + id);
//分類
export const getCourseTypeReq = (data: any) =>
  authRequest.get("/Lesson/Group?id=" + data);
export const postAddUQLessonTypeReq = (data: any) =>
  authRequest.post("/Lesson/Group", data);
export const updateLessonTypeReq = (data: any) =>
  authRequest.post("/Lesson/GroupUpdate", data);
export const updateLessonTypeOrderReq = (data: any) =>
  authRequest.post("/Lesson/GroupUpdateOrder", data);
export const delCourseTypeReq = (data: any) =>
  authRequest.delete("/Lesson/Group/" + data);
//資料
export const getCourseDetailReq = (Group: any, id: any) =>
  authRequest.get("Lesson/Detail?id=" + Group + "&lid=" + id);
export const postAddUQLessonDetailReq = (data: any) =>
  authRequest.post("/Lesson/Detail", data);
export const updateCourseDetailReq = (data: any) =>
  authRequest.post("/Lesson/DetailUpdate", data);
export const delCourseDetailReq = (data: any) =>
  authRequest.delete("/Lesson/Detail/" + data);
