import axios, { type AxiosInstance } from "axios";
import { getToken } from "@/plugins/js-cookie";
import { deleteHttps, getHttps, postHttps } from "./sendHttps";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {},
});

/**獲取折扣清單 */
export const getAllDiscountReq = (id: any = 0, page: any = 0, count: any = 0) =>
  getHttps(
    httpRequest,
    "/Discounts/Discount" +
      "?no=" +
      id +
      "&pageIndex=" +
      page +
      "&count=" +
      count,
    id
  );
export const postAddAllDiscountReq = (data: any) =>
  postHttps(httpRequest, "/Discounts/Discount", data);
export const postEditApptDataReq = (data: any) =>
  postHttps(httpRequest, "/Discounts/Discount", data);
export const deleteAllDiscountReq = (data: any) =>
  deleteHttps(httpRequest, "/Discounts/Discount" + "?dcNo=" + data, data);
