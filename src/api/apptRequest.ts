import axios from "axios";
import { getHttps, postHttps, putHttps } from "./sendHttps";
import { getToken } from "@/plugins/js-cookie";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;",
    // "Content-Type": "multipart/form-data",
  },
});

export const getApptDataRequest = (data: any) =>
  getHttps(httpRequest, "/Booking" + data, data);

  // export const getApptDataRequest = (data: any) => {
  //   return httpRequest.get("/Booking" + data, data);
// }
export const postAddApptDataReq = (data: any) =>
  postHttps(httpRequest, "/Booking/Booking", data);

export const postEditApptDataReq = (data: any) =>
  postHttps(httpRequest, "/Booking/update", data);

export const postEditCourseDataReq = (data: any) =>
  putHttps(httpRequest, "/Lesson/Detail/" + data.id, data);
