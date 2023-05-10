import axios from "axios";

const authRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const postLoginRequest = (data: any) =>
  authRequest.post("/Auth/signin", data);

export const getUserNameRequest = () => authRequest.get("/username");

//-----------------------------------------

export const getCourseDetailReq = (Group: any, id: any) =>
  authRequest.get("Lesson/Detail?id=" + Group + "&lid=" + id);
export const getCourseTypeReq = (data: any) =>
  authRequest.get("/Lesson/Group?id=" + data);
export const delCourseTypeReq = (data: any) =>
  authRequest.delete("/Lesson/Group/" + data);
export const delCourseDetailReq = (data: any) =>
  authRequest.delete("/Lesson/Detail/" + data);
export const postAddUQLessonTypeReq = (data: any) =>
  authRequest.post("/Lesson/Group", data);
export const postAddUQLessonDetailReq = (data: any) =>
  authRequest.post("/Lesson/Detail", data);

export const updateCourseDetailReq = (data: any) =>
  authRequest.post("/Lesson/DetailUpdate", data);

export const getBeauticianReq = (id: any) =>
  authRequest.get("member/Beautician?id=" + id);
