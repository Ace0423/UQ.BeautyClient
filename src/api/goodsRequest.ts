import axios from "axios";
import { getToken } from "@/plugins/js-cookie";
import { deleteHttps, getHttps, postHttps, putHttps } from "./sendHttps";
const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

//分類

//#region 群組
export const getGoodsGroupReq = (data: any, isList: any = 0) =>
  getHttps(httpRequest, "/Product/ProductGroup?pgid=" + data + "&isList=" + isList + "&pageIndex=0&count=0");
export const updateGoodsGroupOrderReq = (data: any) =>
  postHttps(httpRequest, "/Product/GroupUpdateOrder", data);
export const addGoodsGroupReq = (data: any) =>
  postHttps(httpRequest, "/Product/ProductGroup", data);
export const updateGoodsGroupReq = (data: any) =>
  putHttps(httpRequest, "/Product/ProductGroup?pgid=" + data.pgId + "&isList=0", data);
export const delGoodsGroupReq = (data: any) =>
  deleteHttps(httpRequest, "/Product/ProductGroup/" + data);
//#endregion

//#region 明細
export const getGoodsDetailReq = (id: any) =>
  getHttps(httpRequest, "Product/ProductInfo?pid=" + id + "&pageIndex=0&count=0");
export const addGoodsDetailReq = (data: any) =>
  postHttps(httpRequest, "/Product/ProductInfo", data);
export const updateGoodsDetailReq = (data: any) =>
  putHttps(httpRequest, "/Product/ProductInfo?pId=" + data.pId, data);
  export const updateGoodsStateReq = (data: any) =>
    putHttps(httpRequest, "/Product/ProductState?pId=" + data.pId, data);
export const delGoodsDetailReq = (pId: any) =>
  deleteHttps(httpRequest, "/Product/ProductInfo/" + pId);
//#endregion

//#region 品牌
export const getGoodsBrandReq = (data: any, isList: any = 0) =>
  getHttps(httpRequest, "/Product/ProductBrand?pbid=" + data + "&isList=" + isList + "&pageIndex=0&count=0");
export const updateGoodsBrandOrderReq = (data: any) =>
  postHttps(httpRequest, "/Product/BrandUpdateOrder", data);
export const addGoodsBrandReq = (data: any) =>
  postHttps(httpRequest, "/Product/ProductBrand", data);
export const updateGoodsBrandReq = (data: any) =>
  putHttps(httpRequest, "/Product/ProductBrand?pbid=" + data.pbId + "&isList=0", data);
export const delGoodsBrandReq = (data: any) =>
  deleteHttps(httpRequest, "/Product/ProductBrand/" + data);
//#endregion

