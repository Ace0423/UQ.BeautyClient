import axios from "axios";

const apptRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
const apptRequest_formbody = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;",
    // 'Content-Type': 'multipart/form-data'
  },
});

export const getApptDataRequest = (data: any) =>
  apptRequest.get("/Booking" + data, data);

export const postAddApptDataReq = (data: any) =>
  apptRequest.post("/Booking/Booking", data);

export const postEditApptDataReq = ( data: any) =>
  apptRequest.post("/Booking/update", data);

export const postEditCourseDataReq = (data: any) =>
  apptRequest.put("/Lesson/Detail/" + data.id, data);
