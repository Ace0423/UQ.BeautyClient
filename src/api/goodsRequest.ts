import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
//分類
export const getGoodsTypeReq = (data: any) =>
  httpRequest.get("/Lesson/Group?id=" + data);
export const addGoodsTypeReq = (data: any) =>
  httpRequest.post("/Lesson/Group", data);
export const updateGoodsTypeReq = (data: any) =>
  httpRequest.post("/Lesson/GroupUpdate", data);
export const updateGoodsTypeOrderReq = (data: any) =>
  httpRequest.post("/Lesson/GroupUpdateOrder", data);
export const delGoodsTypeReq = (data: any) =>
  httpRequest.delete("/Lesson/Group/" + data);
//資料
export const getGoodsDetailReq = (Group: any, id: any) =>
  httpRequest.get("Lesson/Detail?id=" + Group + "&lid=" + id);
export const addGoodsDetailReq = (data: any) =>
  httpRequest.post("/Lesson/Detail", data);
export const updateGoodsDetailReq = (data: any) =>
  httpRequest.post("/Lesson/DetailUpdate", data);
export const delGoodsDetailReq = (data: any) =>
  httpRequest.delete("/Lesson/Detail/" + data);
