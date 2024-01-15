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
  postHttps(httpRequest, "/Product/GroupUpdateOrder", data);
export const addGoodsTypeReq = (data: any) =>
  postHttps(httpRequest, "/Product/ProductGroup", data);
export const updateGoodsTypeReq = (data: any) =>
  putHttps(
    httpRequest,
    "/Product/ProductGroup?pgid=" + data.pgId + "&isList=" + data.isList,
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
export const delGoodsDetailReq = ( pId: any) =>
  deleteHttps(httpRequest, "/Product/ProductInfo/" + pId);
