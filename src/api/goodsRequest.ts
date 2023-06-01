import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
import { deleteHttps, getHttps, postHttps, putHttps } from "./sendHttps";
const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

//分類
export const getGoodsTypeReq = (data: any, isList: any = 0) =>
  getHttps(
    httpRequest,
    "/Product/ProductGroup?pgid=" +
      data +
      "&isList=" +
      isList +
      "&pageIndex=0&count=0"
  );
export const updateGoodsTypeOrderReq = (data: any) =>
  getHttps(httpRequest, "/Lesson/GroupUpdateOrder", data);
export const addGoodsTypeReq = (data: any) =>
  postHttps(httpRequest, "/Product/ProductGroup", data);
export const updateGoodsTypeReq = (data: any) =>
  postHttps(
    httpRequest,
    "/Product/ProductGroup?pgid=" + data.pgid + "&isList=" + data.isList,
    data
  );
export const delGoodsTypeReq = (data: any) =>
  deleteHttps(httpRequest, "/Product/ProductGroup/" + data);

export const getGoodsDetailReq = (Group: any, id: any) =>
  getHttps(
    httpRequest,
    "Product/ProductInfo?pid=" + id + "&pageIndex=0&count=0"
  );

export const addGoodsDetailReq = (data: any) =>
  postHttps(httpRequest, "/Product/ProductInfo", data);
export const updateGoodsDetailReq = (data: any) =>
  putHttps(httpRequest, "/Product/ProductInfo?pId=" + data.pId, data);
export const delGoodsDetailReq = (data: any, pgId: any) =>
  deleteHttps(httpRequest, "/Product/ProductGroup/" + pgId + "/" + data);

// //分類
// export const getGoodsTypeReq = (data: any) => {
//   updataToken();
//   return httpRequest.get("/Product/ProductGroup?pgid=" + data+"&pageIndex=0&count=0");
// };

// export const addGoodsTypeReq = (data: any) => {
//   return httpRequest.post("/Lesson/Group", data);
// };

// export const updateGoodsTypeReq = (data: any) => {
//   return httpRequest.post("/Lesson/GroupUpdate", data);
// };

// export const updateGoodsTypeOrderReq = (data: any) => {
//   return httpRequest.post("/Lesson/GroupUpdateOrder", data);
// };

// export const delGoodsTypeReq = (data: any) => {
//   return httpRequest.delete("/Lesson/Group/" + data);
// };

// //資料
// export const getGoodsDetailReq = (Group: any, id: any) => {
//   return httpRequest.get(
//     "Product/ProductInfo?pid=" + Group + "&pageIndex=0&count=0"
//   );
// };

// export const addGoodsDetailReq = (data: any) => {
//   return httpRequest.post("/Product/ProductInfo", data);
// };

// export const updateGoodsDetailReq = (data: any) => {
//   return httpRequest.post("/Lesson/DetailUpdate", data);
// };

// export const delGoodsDetailReq = (data: any) => {
//   return httpRequest.delete("/Lesson/Detail/" + data);
// };
